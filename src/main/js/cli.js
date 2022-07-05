#!/usr/bin/env node

import {copy} from './index.js'
import { createRequire } from 'node:module'
import minimist from 'minimist'

const camelize = s => s.replace(/-./g, x=>x[1].toUpperCase())
const normalizeFlags = (flags = {}) => Object.entries(flags).reduce((acc, [k, v]) => ({...acc, [camelize(k)]: v}), {})

const argv = normalizeFlags(minimist(process.argv.slice(2)))

if (argv.help || argv.h) {
  console.log(`
  Usage:
    gcp <from> <to> [options]
    
  Options:
    --help -h           Show help
    --version -v        Show version
    --ignore-files -i   Path to ignore files (like .gitignore or .npmignore)

  Examples:
    gcp ./* /foo/bar --ignore-files .gitignore
    gcp ./src/main/ts/**/*.ts ./target/ts
`)
  process.exit(0)
}

if (argv.v || argv.version) {
  console.log(createRequire(import.meta.url)('../../../package.json').version)
  process.exit(0)
}

await copy({
  from:         argv._[0],
  to:           argv._[1],
  baseFrom:     argv.baseFrom,
  baseTo:       argv.baseTo,
  ignoreFiles:  argv.i || argv.ignoreFiles
})
