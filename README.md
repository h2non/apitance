# apitance [![Build Status](https://api.travis-ci.org/h2non/apitance.svg?branch=master)][travis] [![Dependency Status](https://gemnasium.com/h2non/apitance.svg)][gemnasium] [![Code Climate](https://codeclimate.com/github/h2non/apitance/badges/gpa.svg)](https://codeclimate.com/github/h2non/apitance)  [![NPM](https://img.shields.io/npm/v/apitance.svg)][npm]

<!--
![Downloads](https://img.shields.io/npm/dm/apitance.svg)
-->

<img src="https://developer.atlassian.com/stash/docs/latest/images/home/section-rest.png" width="180" align="right" />

**Elegant**, **versatile** and **expressive** **BBD**-style **acceptance tests** for your **HTTP API** using [Cucumber](http://cukes.info)

Just write what you want and what you expect using Gherkin syntax.
Apitance provides a built-in reusable Cucumber descriptive steps which aims to cover all the test cases that involves an HTTP API

> **Work in progress**

<!--
## Rationale

## Features
-->

## Usage

```bash
$ npm install -g apitance
```

```bash
$ apitance -r features/user.feature
```

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

## Command-line interface

Getting help
```bash
$ apitance --help
```

```bash
$ apitance -r path/to/features -r path/to/steps
```

## Contributing

Wanna help? Cool!

`apitance` is written in JavaScript-next (ECMAScript 6)

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
