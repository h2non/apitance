# apitance [![Build Status](https://api.travis-ci.org/h2non/apitance.svg?branch=master)][travis] [![Code Climate](https://codeclimate.com/github/h2non/apitance/badges/gpa.svg)](https://codeclimate.com/github/h2non/apitance) [![NPM](https://img.shields.io/npm/v/apitance.svg)][npm]

<img src="https://developer.atlassian.com/stash/docs/latest/images/home/section-rest.png" width="180" align="right" />

**Acceptance testing framework** for **HTTP** testing with BDD flavors, built-on-top of [Cucumber](http://cukes.info).

Not for BDD purists.

**Work in progress**

## Features

- Generic and reusable steps with expressiveness and multiple alias
- Full HTTP protocol features support, including authentication, headers, cookies
- High number of assert/expectation expressions for responses validation
- Request/responses caching, reuse and chaining
- Validate body responses against [JSON schema](http://json-schema.org/)
- Supports HAR 1.2
- API discovering based on RAML
- Support all the Cucumber.js features, such as hooks, configuration, stages...
- Built-in support for templating and variables such as environment variables
- Extended syntax with conditionals, control flow and more...
- Send body payload data from external files or remote servers
- Extending support. You can create or overwrite custom steps

## Installation

Apitance requires you have installed [node.js](http://nodejs.org) or [io.js](https://iojs.org)

```bash
[sudo] npm install -g apitance
```

Or install it as standalone self-contained package:
```bash
curl -s -L https://raw.github.com/h2non/apitance/master/scripts/installer.sh | sudo bash -v 0.1.0-beta.1
```

## Usage

```bash
$ apitance -r features/user.feature
```

## Command-line interface

Getting help
```bash
$ apitance --help
```

```bash
$ apitance -r path/to/steps path/to/feature
```

### Development

Only [node.js](http://nodejs.org)/[io.js](http://iojs.org) is required for development

Clone/fork this repository
```
$ git clone https://github.com/h2non/apitance && cd apitance
```

Install dependencies
```
$ npm install
```

Compile code
```
$ make compile
```

Run tests
```
$ make test
```

## License

[MIT](http://opensource.org/licenses/MIT) © Tomas Aparicio

[travis]: http://travis-ci.org/h2non/apitance
[gemnasium]: https://gemnasium.com/h2non/apitance
[npm]: http://npmjs.org/package/apitance
[glob]: https://github.com/isaacs/node-glob
