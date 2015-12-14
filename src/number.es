// TBD:FILEHEADER

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
        return new EsNumber(_parseFloat(value));
    }

    /**
     * @param {string} value - the value
     * @returns {EsNumber} - the parsed number
     */
    static parseInt(value)
    {
        return new EsNumber(_parseInt(value));
    }

    /**
     * Installs the global replacements for esParseInt and esParseNumber.
     *
     * @returns {void}
     */
    static install()
    {
        let gobj = typeof window == 'undefined' ? global : window;
        gobj.parseFloat = EsNumber.parseFloat.bind(EsNumber);
        gobj.parseInt = EsNumber.parseInt.bind(EsNumber);
    }

    /**
     * Uninstalls the global replacements for esParseInt and esParseNumber.
     *
     * @returns {void}
     */
    static uninstall()
    {
        let gobj = typeof window == 'undefined' ? global : window;
        gobj.parseFloat = _parseFloat;
        gobj.parseInt = _parseInt;
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


/**
 * @private
 */
const _parseFloat = parseFloat;


/**
 * @private
 */
const _parseInt = parseInt;

