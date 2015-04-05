# envisor

[![npm version badge](https://img.shields.io/npm/v/envisor.svg)](https://www.npmjs.org/package/envisor)
[![Build Status](https://travis-ci.org/monolithed/envisor.png)](https://travis-ci.org/monolithed/envisor)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.txt)


> Universal library for managing your environment variables


*Environment variables are a set of dynamic named values that can affect the way running processes will behave on a computer. <br />
They are part of the environment in which a process runs*


## License
	MIT


## Installation:

```shell
npm install envisor --save-dev
```


## Usage
*For example you could use the following code:*

```js
var env = require('envisor');

env.set('foo', 1);
env.get('foo'); // 1

```

### API

#### .get / .set

*Sets/retrieves an environment variable*

```js
var env = require('envisor');

env.set('foo', 1);
env.set('bar', { a: 2 });

env.get('foo'); // 1
env.get('bar').a; // 2
```

#### .has

*Checks an environment variable*

```js
var env = require('envisor');

env.set('foo', 1);
env.has('foo'); // true
```


#### .use

*Use you personal namespace*

```js
var env = require('envisor');

env.use('foo');
env.set('bar', 1);
env.get('foo'); // 1
process.env.foo_bar; // 1
```


#### .remove

*Removes an environment variable*

```js
var env = require('envisor');

env.set('foo', 1);
env.remove('foo');
env.get('foo'); // ''
```

#### .all

*Returns all environment variables*

```js
var env = require('envisor');

env.all(); // process.env
```


### Tests

```
npm test
```


### Links
[Environment variables](http://en.wikipedia.org/wiki/Environment_variable) <br />
[process.env](https://nodejs.org/api/process.html#process_process_env)


Task submitted by [Alexander Abashkin](https://github.com/monolithed)
