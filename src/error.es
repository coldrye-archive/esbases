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
     * @param {string} message? - the optional message
     * @param {string} cause? - the optional cause
     * @returns {void}
     */
    constructor(message, cause)
    {
        super();

        let actualCause = cause;
        let actualMessage = message;

        if (message instanceof Error)
        {
            actualCause = message;
            actualMessage = actualCause.message;
        }

        this._cause = actualCause;
        this._message = actualMessage;

        // we need a proper stack trace here
        try
        {
            throw new Error(actualMessage);
        }
        catch (error)
        {
            this._base = error;
        }
    }

    /**
     * Gets the causing exception.
     *
     * @returns {Error} - the causing exception or null
     */
    get cause()
    {
        return this._cause;
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
        // adjust stack trace so that it matches the callsite
        let stack = this._base.stack.split('\n');
        stack.splice(1, 1);
        let result = [
            stack.join('\n').replace(/^Error/, this.constructor.name)
        ];
        let cause = this.cause;
        if (cause)
        {
            result = result.concat(['', 'caused by', '', cause.stack]);
        }

        return result.join('\n');
    }

    /**
     * @override
     */
    toString()
    {
        return '[' + this.constructor.name + ': ' + this.message + ']';
    }
}

