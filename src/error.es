// TBD:FILEHEADER

/**
 * The class ProtoError models a base class for establishing the prototype chain
 * using standard (old) javascript idioms.
 *
 * @class
 * @private
 * @param {string} [message] - the message
 * @returns {void}
 */
function ProtoError(message)
{
    this._base = new Error(message);
}

ProtoError.prototype = new Error();
Object.setPrototypeOf(ProtoError, Error);


/**
 * The class EsError models the base of a hierarchy of derived classes.
 *
 * FIXME:stack trace
 *
 * @public
 */
export default class EsError extends ProtoError
{
    /**
     * @param {string} [message] - the message
     * @returns {void}
     */
    constructor(message)
    {
        super(message);
    }

    /**
     * @override
     */
    get message()
    {
        return this._base.message;
    }

    /**
     * @override
     */
    toString()
    {
        return '[' + this.constructor.name + ': ' + this.message + ']';
    }
}

