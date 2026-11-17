"""Negative tests for #278: missing bytes, collisions, traversal and remote writes."""
import contextlib
import hashlib
import importlib.util
import io
import json
import os
import re
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch

ROOT=Path(__file__).resolve().parents[1]
def module(filename):
    spec=importlib.util.spec_from_file_location(filename.replace('-','_'),ROOT/'scripts'/filename)
    mod=importlib.util.module_from_spec(spec); spec.loader.exec_module(mod); return mod
inventory=module('prototype-migration-inventory.py')
gate=module('claude-sync-gate.py')

class InventoryTests(unittest.TestCase):
    def entry(self,source='old.bin',destination='new.bin'):
        return {'source':source,'destination':destination,'sha256':hashlib.sha256(b'\x00\xffbinary').hexdigest()}
    def test_binary_move_and_corruption(self):
        with tempfile.TemporaryDirectory() as d:
            root=Path(d); (root/'new.bin').write_bytes(b'\x00\xffbinary')
            counts,errors=inventory.verify({'files':[self.entry()]},root,True)
            self.assertEqual(counts,{'moved':1});self.assertFalse(errors)
            (root/'new.bin').write_bytes(b'corrupted')
            self.assertTrue(inventory.verify({'files':[self.entry()]},root,True)[1])
    def test_missing_file_is_failure(self):
        with tempfile.TemporaryDirectory() as d:
            self.assertTrue(inventory.verify({'files':[self.entry()]},Path(d),True)[1])
    def test_case_insensitive_collision(self):
        with tempfile.TemporaryDirectory() as d:
            entries=[self.entry(destination='New.bin'),self.entry('second.bin','new.bin')]
            self.assertTrue(any('collision' in e for e in inventory.verify({'files':entries},Path(d),True)[1]))
    def test_traversal_is_rejected(self):
        with tempfile.TemporaryDirectory() as d:
            errors=inventory.verify({'files':[self.entry(destination='../escape')]},Path(d),True)[1]
            self.assertEqual(errors,['Unsafe path: ../escape'])
    def test_historical_versions_never_become_new_app(self):
        for version in ['0.1.0','0.1.1']:
            target,category=inventory.destination(f'prototypes/exam-app-{version}__index.html')
            self.assertTrue(target.startswith('prototype/archive/claude/'+version+'/'))
            self.assertEqual(category,'unapproved-historical-app')
        self.assertEqual(inventory.destination('prototypes/02-workspace-e-ux.md')[0],
                         'prototype/boards/02-design/index.md')
    def test_full_source_tree_and_hashes_are_reproducible(self):
        manifest=json.loads((ROOT/'prototypes/issue278-inventory.json').read_text(encoding='utf-8'))
        actual=inventory.snapshot(manifest['baseline_commit'])
        self.assertEqual(actual,manifest)

class RemoteHoldTests(unittest.TestCase):
    def test_missing_invalid_and_reenabled_policy_all_fail_closed(self):
        with tempfile.TemporaryDirectory() as d:
            policy=Path(d)/'policy.json'
            with patch.object(gate,'POLICY',policy),contextlib.redirect_stderr(io.StringIO()):
                self.assertEqual(gate.main(),1)
                policy.write_text('invalid');self.assertEqual(gate.main(),1)
                policy.write_text('{"state":"enabled"}');self.assertEqual(gate.main(),1)
    def test_hooks_never_call_remote_commands(self):
        if os.name=='nt':self.skipTest('POSIX hook invocation requires Git Bash; Linux exercises it in CI')
        with tempfile.TemporaryDirectory() as d:
            tmp=Path(d); log=tmp/'commands'; bindir=tmp/'bin';bindir.mkdir()
            for command in ['agents','git','uvx','npm']:
                stub=bindir/command
                stub.write_text('#!/bin/sh\nprintf "%s\\n" "'+command+' $*" >> "$TEST_LOG"\n')
                stub.chmod(0o755)
            env={**os.environ,'PATH':str(bindir)+os.pathsep+os.environ['PATH'],'TEST_LOG':str(log)}
            for hook in ['post-commit','post-merge']:
                subprocess.run(['sh',str(ROOT/'.githooks'/hook)],env=env,check=True,capture_output=True)
            self.assertEqual(log.read_text().splitlines(),['agents sync','agents sync'])
    def test_remote_workflow_writers_are_paused(self):
        for path in (ROOT/'.github/workflows').glob('*.yml'):
            text=path.read_text(encoding='utf-8')
            jobs=text.split('\njobs:\n',1)[1]
            for job in re.split(r'(?m)^  [A-Za-z0-9_-]+:\n',jobs)[1:]:
                if 'git push' in job or 'git commit' in job:
                    self.assertRegex(job,r'^    if: false # Issue #278:')
            if path.name=='sync-artifact.yml':
                self.assertNotIn('git push',jobs)
                self.assertNotIn('claude-artifact publish',jobs)
                self.assertNotIn('secrets.CLAUDE_ARTIFACT_TOKEN',jobs)

    def test_package_publish_entry_is_guarded(self):
        scripts=json.loads((ROOT/'package.json').read_text(encoding='utf-8'))['scripts']
        self.assertEqual(scripts['sync:artifact'],'python scripts/claude-sync-gate.py')
        self.assertIn('&& npm run sync:artifact',scripts['sync:all'])
        result=subprocess.run(['python',str(ROOT/'scripts/claude-sync-gate.py')],capture_output=True,text=True)
        self.assertNotEqual(result.returncode,0)

if __name__=='__main__':unittest.main()
