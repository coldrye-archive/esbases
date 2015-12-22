// vim: expandtab:ts=4:sw=4
/*
 * Copyright 2015 Carsten Klein
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

