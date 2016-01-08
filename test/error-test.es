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


import assert from 'esaver';

import EsError from '../src/error';


describe('EsError',
function ()
{
    it('Error must be its prototype',
    function ()
    {
        assert.ok(Error.isPrototypeOf(EsError));
    });

    describe('instances of EsError',
    function ()
    {
        const cut = new EsError('message');
        const org = new Error();
        const cut2 = new EsError('message', org);
        const cut3 = new EsError(org);

        it('must be instances of EsError',
        function ()
        {
            assert.ok(cut instanceof EsError);
        });

        it('must be instances of Error',
        function ()
        {
            assert.ok(cut instanceof Error);
        });

        it('must have the expected stack trace',
        function ()
        {
            let cstack = cut.stack.split('\n');
            let ostack = org.stack.split('\n');
            assert.equal('EsError: message', cstack[0]);
            cstack.splice(0, 2);
            ostack.splice(0, 2);
            assert.deepEqual(ostack, cstack);
        });

        it('must have the expected cause and message',
        function ()
        {
            assert.equal('message', cut2.message);
            assert.deepEqual(org, cut2.cause);
        });

        it('must have the expected cause and empty string message',
        function ()
        {
            assert.equal('', cut3.message);
            assert.deepEqual(org, cut3.cause);
        });

        it('must include cause stack trace when present',
        function ()
        {
            assert.notEqual(-1, cut2.stack.indexOf('caused by'));
            assert.notEqual(-1, cut2.stack.indexOf(org.stack));
        });
    });

    describe('Derived Classes of EsError',
    function ()
    {
        class MarkerError extends EsError
        {}

        let markerError = new MarkerError('message');

        describe('first level derivates',
        function ()
        {
            it('must have the expected message property',
            function ()
            {
                assert.equal('message', markerError.message);
            });

            it('toString() must return expected value',
            function ()
            {
                assert.equal('[MarkerError: message]', markerError.toString());
            });

            it('must be an instance of Error',
            function ()
            {
                assert.ok(markerError instanceof Error);
            });

            it('must be an instance of MarkerError',
            function ()
            {
                assert.ok(markerError instanceof MarkerError);
            });

            it('EsError must its prototype',
            function ()
            {
                assert.ok(EsError.isPrototypeOf(MarkerError));
            });

            it('Error must be its prototype',
            function ()
            {
                assert.ok(Error.isPrototypeOf(MarkerError));
            });
        });

        class ErrorWithProperties extends MarkerError
        {
            constructor(message, data)
            {
                super(message);
                this._data = data;
            }

            get data()
            {
                return this._data;
            }
        }

        let errorWithProperties = new ErrorWithProperties('message', 'data');

        describe('second level derivates',
        function ()
        {
            it('must have the expected data property',
            function ()
            {
                assert.equal('data', errorWithProperties.data);
            });

            it('must have the expected message property',
            function ()
            {
                assert.equal('message', errorWithProperties.message);
            });

            it('toString() must return expected value',
            function ()
            {
                assert.equal(
                    '[ErrorWithProperties: message]',
                    errorWithProperties.toString()
                );
            });

            it('must be an instance of Error',
            function ()
            {
                assert.ok(errorWithProperties instanceof Error);
            });

            it('must be an instance of MarkerError',
            function ()
            {
                assert.ok(errorWithProperties instanceof MarkerError);
            });

            it('must be an instance of ErrorWithProperties',
            function ()
            {
                assert.ok(errorWithProperties instanceof ErrorWithProperties);
            });

            it('MarkerError must be its prototype',
            function ()
            {
                assert.ok(MarkerError.isPrototypeOf(ErrorWithProperties));
            });

            it('EsError must be its prototype',
            function ()
            {
                assert.ok(EsError.isPrototypeOf(ErrorWithProperties));
            });

            it('Error must be its prototype',
            function ()
            {
                assert.ok(Error.isPrototypeOf(ErrorWithProperties));
            });
        });
    });
});

