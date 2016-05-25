// vim: expandtab:ts=4:sw=4
/*
 * Copyright 2015-2016 Carsten Klein
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * The class ProtoNumber models a base class for establishing the prototype chain
 * using standard (old) javascript idioms.
 *
 * @class
 * @private
 * @param {string|Number} [value] - the value
 * @returns {void}
 */
function ProtoNumber(value)
{
    this._base = value instanceof EsNumber
        ? value._base : value instanceof Number
        ? value : new Number(value);
}

ProtoNumber.prototype = new Number();
Object.setPrototypeOf(ProtoNumber, Number);


/**
 * The class EsNumber models the base of a hierarchy of derived classes.
 *
 * @public
 */
export default class EsNumber extends ProtoNumber
{
    /**
     * @param {string|Number} [value] - the value
     * @returns {void}
     */
    constructor(value)
    {
        super(value);
    }

    /**
     * @override
     */
    static isNaN(value)
    {
        let tester = value;

        if (value instanceof EsNumber)
        {
            tester = value._base;
        }

        return isNaN(tester);
    }

    /**
     * @override
     */
    static isFinite(value)
    {
        let tester = value;

        if (value instanceof EsNumber)
        {
            tester = value._base;
        }

        return isFinite(tester);
    }

    /**
     * @param {string} value - the value
     * @returns {EsNumber} - the parsed number
     */
    static parseFloat(value)
    {
        return new EsNumber(parseFloat(value));
    }

    /**
     * @param {string} value - the value
     * @returns {EsNumber} - the parsed number
     */
    static parseInt(value)
    {
        return new EsNumber(parseInt(value));
    }

    /**
     * @override
     */
    toExponential(fractionDigits)
    {
        return this._base.toExponential(fractionDigits);
    }

    /**
     * @override
     */
    toFixed(digits)
    {
        return this._base.toFixed(digits);
    }

    /**
     * @override
     */
    toLocaleString()
    {
        return Number.prototype.toLocaleString.apply(this._base, arguments);
    }

    /**
     * @override
     */
    toPrecision(precision)
    {
        return this._base.toPrecision(precision);
    }

    /**
     * @override
     */
    toString()
    {
        return this._base.toString();
    }

    /**
     * @override
     */
    valueOf()
    {
        return this._base.valueOf();
    }
}

