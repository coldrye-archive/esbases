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

The project site, see (3) under resources below, provides more insight into the project,
including test coverage reports and API documentation.


## Installation

``npm --save esbases``


## Usage


### class EsError

```
import EsError from 'esbases/error';


class MyError extends EsError
{
    constructor(message, cause)
    {
        super(message);
        this._cause = cause;
    }

    get cause()
    {
        return this._cause;
    }

    toString()
    {
        let result = super.toString();
        return result + ' caused by: ' + this._cause;
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
 - (2) [Keith Cirkel on "Why we should stop using Grunt & Gulp"](http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt)
 - (3) [Project Site](http://esbases.es.coldrye.eu)

