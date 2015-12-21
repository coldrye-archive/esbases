// TBD:FILEHEADER

/**
 * The class ProtoError models a base class for establishing the prototype chain
 * using standard (old) javascript idioms.
 *
 * @class
 * @private
 * @returns {void}
 */
function ProtoError()
{}
ProtoError.prototype = new Error();
Object.setPrototypeOf(ProtoError, Error);


/**
 * The class EsError models the base of a hierarchy of derived classes.
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
        super();

        this._message = message;

        // we need a proper stack trace here
        try
        {
            throw new Error(message);
        }
        catch (error)
        {
            this._base = error;
        }
    }

    /**
     * @override
     */
    get message()
    {
        return this._message;
    }

    /**
     * @override
     */
    get stack()
    {
        // augment the stack trace so that it
        // starts with the original calling site
        let stack = this._base.stack.split('\n');
        stack.splice(1, 1);
        return stack.join('\n').replace(/^Error/, this.constructor.name);
    }

    /**
     * @override
     */
    toString()
    {
        return '[' + this.constructor.name + ': ' + this.message + ']';
    }
}

