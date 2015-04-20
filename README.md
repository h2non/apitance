# apitance [![Build Status](https://api.travis-ci.org/h2non/apitance.svg?branch=master)][travis] [![Dependency Status](https://gemnasium.com/h2non/apitance.svg)][gemnasium] [![Code Climate](https://codeclimate.com/github/h2non/apitance/badges/gpa.svg)](https://codeclimate.com/github/h2non/apitance)  [![NPM](https://img.shields.io/npm/v/apitance.svg)][npm]

<img src="https://developer.atlassian.com/stash/docs/latest/images/home/section-rest.png" width="180" align="right" />

**Versatile** and **expressive** **behavior-oriented** **acceptance tests** for **HTTP APIs** based on Gherkin language and built-on-top of [Cucumber](http://cukes.info)

Designed for dissidents. Not for BDD purists. 

> **Still work in progress**

## Features

- Generic and reusable steps with expressiveness and multiple alias
- Full HTTP protocol features support, including authentication, headers, cookies
- High number of assert/expectation expressions for responses validation
- Request/responses caching, reuse and chaining
- Validate body responses against [JSON schema](http://json-schema.org/)
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

<!--
## Steps

#### Defining the request

##### Method definition

```gherkin
Given a request with method ([a-z]{3,7})
```

##### Headers
```gherkin
the request header "(.*)" with value "(.*)"
```

```gherkin
the context type is "(.*)"
```

```gherkin
the accept MIME type is "(.*)"
```

##### Path
```gherkin
the request path is (/path/test)
```

##### Query params
```gherkin
define a query string key (search) with value "Chuck Norris"
```

```gherkin
it have the query string "(.*)"
```

##### Timers control

Maximum timeout
```gherkin
request timeout is (\d+) seconds
```

Wait before send the request
```gherkin
And I wait (\d+) seconds
```

##### Requests pool

```gherkin
And create a pool of 100 clients using a stack of 20 concurrent
```
```gherkin
And wait 100 miliseconds on each pool
```

#### Response verification

```
Then status code should be (\d+)
```

```
Then status code is (\d+)
```
-->

## Command-line interface

Getting help
```bash
$ apitance --help
```

```bash
$ apitance -r path/to/steps path/to/feature
```

## Contributing

Wanna help?

`apitance` is completely written in JavaScript Harmony (ECMAScript 6)

You must add new test cases for any new feature or refactor you do,
always following the same design/code patterns that already exist

### Development

Only [node.js](http://nodejs.org) is required for development

Clone/fork this repository
```
$ git clone https://github.com/h2non/apitance.git && cd apitance
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
