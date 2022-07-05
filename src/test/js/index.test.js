import assert from 'node:assert'
import childProcess from 'node:child_process'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import * as tempy from 'tempy'
import fs from 'fs-extra'

import {copy} from '../../main/js/index.js'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

test('copy() abs to abs (JS API)', async (t) => {
  const from = tempy.temporaryDirectory()
  const to = tempy.temporaryDirectory()
  const footxt = path.resolve(from, 'foo.txt')

  await fs.outputFile(footxt, 'foo')

  await copy({from: footxt, to})
  assert.equal(await fs.readFile(path.resolve(to, 'foo.txt')), 'foo')
})

test('copy() abs to abs (CLI)', async (t) => {
  const from = tempy.temporaryDirectory()
  const to = tempy.temporaryDirectory()

  await fs.outputFile(path.resolve(from, 'bar.txt'), 'bar')

  childProcess.execSync(`node ${__dirname}/../../main/js/cli.js ${from} ${to}`)
  assert.equal(await fs.readFile(path.resolve(to, 'bar.txt')), 'bar')
})

