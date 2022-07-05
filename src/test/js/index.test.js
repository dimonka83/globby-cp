import test from 'node:test'
import * as tempy from 'tempy'
import assert from 'node:assert'
import fs from 'fs-extra'
import path from 'node:path'
import tinysh from 'tinysh'
import {copy} from '../../main/js/index.js'

test('copy() abs to abs (JS API)', async (t) => {
  const from = tempy.temporaryDirectory()
  const to = tempy.temporaryDirectory()

  await fs.outputFile(path.resolve(from, 'foo.txt'), 'foo')

  await copy({from, to})
  assert.equal(await fs.readFile(path.resolve(from, 'foo.txt')), 'foo')
})

test('copy() abs to abs (CLI)', async (t) => {
  const {gcp} = tinysh
  const from = tempy.temporaryDirectory()
  const to = tempy.temporaryDirectory()

  await fs.outputFile(path.resolve(from, 'bar.txt'), 'bar')

  gcp(from, to)
  assert.equal(await fs.readFile(path.resolve(from, 'bar.txt')), 'bar')
})

