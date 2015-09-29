# merry-crosstmas 

[![Build Status](https://travis-ci.org/samuelmartineau/gulp-pdf-thumbnail.svg?branch=master)](https://travis-ci.org/samuelmartineau/gulp-pdf-thumbnail)
[![Coverage Status](https://coveralls.io/repos/samuelmartineau/gulp-pdf-thumbnail/badge.svg?branch=master&service=github)](https://coveralls.io/github/samuelmartineau/gulp-pdf-thumbnail?branch=master)
[![Dependency Status](https://david-dm.org/samuelmartineau/gulp-pdf-thumbnail.svg)](https://david-dm.org/samuelmartineau/gulp-pdf-thumbnail)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Dev dependencies

### Node

Installing Node:

[Installing Node!](https://nodejs.org/en/)

```
npm i -g gulp
npm i
```

## Developement

```
gulp dev
```

## Hooks

**npm i** command automatically install **pre-commit hook** which verify if your code is sendable to the repo.


## Multilanguage

The usecase isn't to build all transalations during the development stage due to perf isssue (watch -> re build each file X times).

So by default, *gulp dev* build only the default locale writed in the configuration (tasks/sites.js)

```
$ gulp dev
```

If you want to specify a locale during dev stage, just pass *locale* parameter on your CLI

```
$ gulp dev --locale=it
```

If you really need to test multilinguage rendering:

```
$ gulp dev --locales
```

Of course you are able to mix these two functionality:

```
$ gulp dev --locales --locale=it
```


## Best Practices

Check for outdated, incorrect, and unused dependencies.

```
npm i -g npm-check
npm-check
```
