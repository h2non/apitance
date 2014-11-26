# apitance [![Build Status](https://api.travis-ci.org/h2non/apitance.svg?branch=master)][travis] [![Dependency Status](https://gemnasium.com/h2non/apitance.svg)][gemnasium] [![NPM version](https://badge.fury.io/js/apitance.svg)][npm] [![Stories in Ready](https://badge.waffle.io/h2non/apitance.png?label=ready&title=Ready)](https://waffle.io/h2non/apitance)

Elegant and declarative HTTP API testing steps for Cucumber

> **Work in progress**

## Installation

It's recommended you install apitance as global package
```bash
$ npm install -g apitance
```

If you need to use the API, you should install it as package dependency
```bash
$ npm install apitance --save
```

## Pre-defined steps

#### Request contract

Verb definition
```gherkin
Given a request with method ([a-z]{3,7})
```

Request headers
```gherkin
And the request header "(.*)" with value "(.*)"
```
```gherkin
And the context type is "(.*)"
```
```gherkin
And the accept MIME type is "(.*)"
```

Request path
```gherkin
And the request path is (/path/test)
```

Request query params
```gherkin
And define a query string key (search) with value "Chuck Norris"
```
```gherkin
And it have the query string "(.*)"
```

##### Flow control

Wait/defer
```gherkin
And I wait 10 seconds
```

##### Requests pool

```gherkin
And create a pool of 100 clients using a stack of 20 concurrent
```
```gherkin
And wait 100 miliseconds on each pool
```

#### Response expectation

```
Testing
```

## API

## Contributing

Wanna help? Cool! It will be really apreciated :)

`apitance` is completely written in LiveScript/Wisp language.
Take a look to the language [documentation][livescript] if you are new with it.
and follow the LiveScript language conventions defined in the [coding style guide][coding-style]

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

[livescript]: http://livescript.net
[coding-style]: https://github.com/gkz/LiveScript-style-guide
[travis]: http://travis-ci.org/h2non/apitance
[gemnasium]: https://gemnasium.com/h2non/apitance
[npm]: http://npmjs.org/package/apitance
[glob]: https://github.com/isaacs/node-glob
