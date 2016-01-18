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

        it('#stack must return correct value',
        function ()
        {
            let cstack = cut.stack.split('\n');
            let ostack = org.stack.split('\n');
            assert.equal('EsError: message', cstack[0]);
            cstack.splice(0, 2);
            ostack.splice(0, 2);
            assert.deepEqual(ostack, cstack);
        });

        it('#message must have correct value',
        function ()
        {
            assert.equal(cut2.message, 'message');
            assert.equal(cut3.message, '');
        });

        it('#cause must have correct value',
        function ()
        {
            assert.deepEqual(cut2.cause, org);
            assert.deepEqual(cut3.cause, org);
        });

        it('must include cause stack trace when present',
        function ()
        {
            assert.notEqual(cut2.stack.indexOf('caused by'), -1);
            assert.notEqual(cut2.stack.indexOf(org.stack), -1);
        });
    });

    describe('Derived Classes of EsError',
    function ()
    {
        const TEST_MSG = 'message with extra info';

        class FirstLevelDerivate extends EsError
        {
            get message()
            {
                return super.message + ' with extra info';
            }
        }

        describe('first level derivates',
        function ()
        {
            const cut = new FirstLevelDerivate('message');

            it('#message must return correct value',
            function ()
            {
                assert.equal(cut.message, TEST_MSG);
            });

            it('#toString() must return correct value',
            function ()
            {
                assert.equal(
                    cut.toString(), '[FirstLevelDerivate: ' + TEST_MSG + ']'
                );
            });

            it('#stack must include the correct message',
            function ()
            {
                assert.equal(
                    cut.stack.indexOf('FirstLevelDerivate: ' + TEST_MSG), 0
                );
            });

            it('#stack must not include extraneous information',
            function ()
            {
                const re = new RegExp('^\\s*at (new )? FirstLevelDerivate');
                assert.ok(!cut.stack.match(re));
            });

            it('must be an instance of Error',
            function ()
            {
                assert.ok(cut instanceof Error);
            });

            it('must be an instance of FirstLevelDerivate',
            function ()
            {
                assert.ok(cut instanceof FirstLevelDerivate);
            });

            it('EsError must be its prototype',
            function ()
            {
                assert.ok(EsError.isPrototypeOf(FirstLevelDerivate));
            });

            it('Error must be its prototype',
            function ()
            {
                assert.ok(Error.isPrototypeOf(FirstLevelDerivate));
            });
        });

        class SecondLevelDerivate extends FirstLevelDerivate
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

        describe('second level derivates',
        function ()
        {
            const cut = new SecondLevelDerivate('message', 'data');

            it('#data must return correct value',
            function ()
            {
                assert.equal(cut.data, 'data');
            });

            it('#message must return correct value',
            function ()
            {
                assert.equal(cut.message, TEST_MSG);
            });

            it('#toString() must return expected value',
            function ()
            {
                assert.equal(
                    cut.toString(),
                    '[SecondLevelDerivate: ' + TEST_MSG + ']'
                );
            });

            it('#stack must include the correct message',
            function ()
            {
                assert.equal(
                    cut.stack.indexOf('SecondLevelDerivate: ' + TEST_MSG), 0
                );
            });

            it('#stack must not include extraneous information',
            function ()
            {
                const re = new RegExp('^\\s*at (new )? SecondLevelDerivate');
                assert.ok(!cut.stack.match(re));
            });

            it('must be an instance of Error',
            function ()
            {
                assert.ok(cut instanceof Error);
            });

            it('must be an instance of FirstLevelDerivate',
            function ()
            {
                assert.ok(cut instanceof FirstLevelDerivate);
            });

            it('must be an instance of SecondLevelDerivate',
            function ()
            {
                assert.ok(cut instanceof SecondLevelDerivate);
            });

            it('FirstLevelDerivate must be its prototype',
            function ()
            {
                assert.ok(
                    FirstLevelDerivate.isPrototypeOf(SecondLevelDerivate)
                );
            });

            it('EsError must be its prototype',
            function ()
            {
                assert.ok(EsError.isPrototypeOf(SecondLevelDerivate));
            });

            it('Error must be its prototype',
            function ()
            {
                assert.ok(Error.isPrototypeOf(SecondLevelDerivate));
            });
        });
    });

    describe('regression',
    function ()
    {
    });
});

