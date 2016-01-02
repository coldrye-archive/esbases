# esbases

Collection of base classes for use with Babel projects. **esbases** provides base
classes for common native types such as Error and Number. These native types,
which, when extended directly, will lead to unwanted side effects and even
dysfunctional subclasses such as

- subclasses of error cannot have properties or methods, or,
- Number#getValueOf is not generic.

So, if you ever ran into these problems, then **esbases** is definitely for you.


## Travis-CI

[![Build Status](https://travis-ci.org/coldrye-es/esbases.svg?branch=master)](https://travis-ci.org/coldrye-es/esbases)


## Project Site

The project site, see (2) under resources below, provides more insight into the project,
including test coverage reports and API documentation.


## Contributing

You are very welcome to propose changes and report bugs, or even provide pull
requests on [github](https://github.com/coldrye-es/esbases).

See the [contributing guidelines](https://github.com/coldrye-es/esbases/blob/master/CONTRIBUTING.md) for more information.


### Contributors

 - [Carsten Klein](https://github.com/silkentrance) **Maintainer**


## Runtime Dependencies

 - [babel-runtime](https://github.com/babel/babel)


## Development Dependencies

See [esmake](https://github.com/coldrye-es/esmake#development-dependencies) for more information on development dependencies.


## Building

See [esmake](https://github.com/coldrye-es/esmake#build-process) and the targets listed under
[esmake](https://github.com/coldrye-es/esmake#makefilesoftwarein) for more information on how to build this.


## Installation

``npm --save esbases``


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

