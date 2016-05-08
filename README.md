[![Build Status](https://travis-ci.org/coldrye-es/esbases.svg?branch=master)](https://travis-ci.org/coldrye-es/esbases)
[![NPM](https://nodei.co/npm/esbases.png?mini=true)](https://nodei.co/npm/esbases/)

# esbases

Collection of base classes for use with Babel projects. **esbases** provides base
classes for common native types such as Error and Number. These native types,
which, when extended directly, will lead to unwanted side effects and even
dysfunctional subclasses such as

- subclasses of error cannot have properties or methods, or,
- Number#getValueOf is not generic.

So, if you ever ran into these problems, then **esbases** is definitely for you.


## Releases

See the [changelog](https://github.com/coldrye-es/esbases/blob/master/CHANGELOG.md) for more information.


## Limitations

- installing the optional, global replacements for ``parseInt`` and ``parseFloat`` can lead
  to unwanted side effects such as mocha failing to run your test suites


## Project Site

The project site, see (2) under resources below, provides more insight into the project,
including test coverage reports and API documentation.


## Contributing

You are very welcome to propose changes and report bugs, or even provide pull
requests on [github](https://github.com/coldrye-es/esbases).

See the [contributing guidelines](https://github.com/coldrye-es/esbases/blob/master/CONTRIBUTING.md) for more information.


### Contributors

See [contributors](https://github.com/coldrye-es/esbases/graphs/contributors) for more information.


## Building

See [build process](https://github.com/coldrye-es/esmake#build-process) and the available [build targets](https://github.com/coldrye-es/esmake#makefilesoftwarein)
for more information on how to build this.

See also [development dependencies](https://github.com/coldrye-es/esmake#development-dependencies) and on how to deal with them.


## Installation

``npm --save esbases``


### Runtime Dependencies

 - _[babel-runtime](https://github.com/babel/babel)_

**The dependencies denoted in _italics_ must be provided by the using project.**


## Usage


### class EsError

```
import EsError from 'esbases/error';


class MyError extends EsError
{
    constructor(message, cause, data)
    {
        super(message, cause);

        this._data = data;
    }

    get data()
    {
        return this._data;
    }
}
```


### class EsNumber

See limitations above for possible side effects.


```
import EsNumber from 'esbases/number';

// install global replacements parseFloat/parseInt (optional)
EsNumber.install();

const num1 = parseFloat('0.005');
// -> EsNumber('0.005')

// uninstall global replacements again
EsNumber.uninstall();

const num2 = parseInt('5');
// -> Number('5')

const num3 = EsNumber.parseFloat('5.005');
// -> EsNumber('5.005')
```


## Similar Projects

### babel-plugin-transform-builtin-extend

This new plugin allows you to extend arbitrary native types. While there is nothing
wrong with such an approach, I strongly believe that some native types should be
left as they are, such as Array, String, or RegExp and so on.

See https://github.com/loganfsmyth/babel-plugin-transform-builtin-extend.


## Resources

 - (1) [Github Site](https://github.com/coldrye-es/esbases)
 - (2) [Project Site](http://esbases.es.coldrye.eu)

