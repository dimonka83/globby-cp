# globby-cp
> [globby](https://github.com/sindresorhus/globby)-boosted file copying util

## Install
```sh
yarn add globby-cp
```

## Usage
### CLI
```shell
globby-cp src/*.js dist/
npx globby-cp ./* ./foo/bar --ignore-files .gitignore
```


| Option                 | Description                                        | Default         |
|------------------------|----------------------------------------------------|-----------------|
| `--base-from`          | Base dir for `from` pattern                        | `process.cwd()` |
| `--base-to`            | Base dir for `to` argument                         | `process.cwd()` |
| `--ignore-files`, `-i` | Path to ignoreFile (like .gitignore or .npmignore) |                 |


### JS API
```js
import {copy} from 'globby-cp'

await ({
  from:       'src/**/*.js',
  to:         'dist/',
  baseFrom,   // process.cwd()
  baseTo,     // process.cwd(),
  debug,      // () => {}
  ignoreFiles // undefined
})
```

## License
[MIT](./LICENSE)
