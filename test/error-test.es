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


import EsError from '../src/error';


describe('EsError',
function ()
{
    it('Error must be its prototype',
    function ()
    {
        Error.isPrototypeOf(EsError).should.be.ok;
    });

    describe('instances of EsError',
    function ()
    {
        let cut;
        try
        {
            throw new EsError('message');
        }
        catch (err)
        {
            cut = err;
        }
        const org = new Error();
        const cut2 = new EsError('message', org);
        const cut3 = new EsError(org);

        it('must be instances of EsError',
        function ()
        {
            cut.should.be.an.instanceOf(EsError);
        });

        it('must be instances of Error',
        function ()
        {
            cut.should.be.an.instanceOf(Error);
        });

        it('#stack must have expected value',
        function ()
        {
            let cstack = cut.stack.split('\n');
            let ostack = org.stack.split('\n');
            cstack[0].should.equal('EsError: message');
            cstack.splice(0, 2);
            ostack.splice(0, 2);
            cstack.should.deep.equal(ostack);
        });

        it('#message must have expected value',
        function ()
        {
            cut2.message.should.equal('message');
            cut3.message.should.equal('');
        });

        it('#cause must have expected value',
        function ()
        {
            cut2.cause.should.deep.equal(org);
            cut3.cause.should.deep.equal(org);
        });

        it('must include cause stack trace when present',
        function ()
        {
            cut2.stack.should.contain('caused by');
            cut2.stack.should.contain(org.stack);
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
                return `${super.message} with extra info`;
            }
        }

        describe('first level derivates',
        function ()
        {
            let cut;

            try
            {
                throw new FirstLevelDerivate('message');
            }
            catch (err)
            {
                cut = err;
            }

            it('#message must have expected value',
            function ()
            {
                cut.message.should.equal(TEST_MSG);
            });

            it('#toString() must return expected value',
            function ()
            {
                cut.toString().should.equal(
                    `[FirstLevelDerivate: ${TEST_MSG}]`
                );
            });

            it('#stack must include expected message',
            function ()
            {
                cut.stack.should.contain(`FirstLevelDerivate: ${TEST_MSG}`);
            });

            it('#stack must not include extraneous information',
            function ()
            {
                const re = new RegExp('^\\s*at (new )? FirstLevelDerivate');
                should.not.exist(cut.stack.match(re));
            });

            it('must be an instance of Error',
            function ()
            {
                cut.should.be.an.instanceOf(Error);
            });

            it('must be an instance of FirstLevelDerivate',
            function ()
            {
                cut.should.be.an.instanceOf(FirstLevelDerivate);
            });

            it('EsError must be its prototype',
            function ()
            {
                EsError.isPrototypeOf(FirstLevelDerivate).should.be.ok;
            });

            it('Error must be its prototype',
            function ()
            {
                Error.isPrototypeOf(FirstLevelDerivate).should.be.ok;
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

            it('#data must have expected value',
            function ()
            {
                cut.data.should.equal('data');
            });

            it('#message must have expected value',
            function ()
            {
                cut.message.should.equal(TEST_MSG);
            });

            it('#toString() must return expected value',
            function ()
            {
                cut.toString().should.equal(
                    `[SecondLevelDerivate: ${TEST_MSG}]`
                );
            });

            it('#stack must include expected message',
            function ()
            {
                cut.stack.should.contain(`SecondLevelDerivate: ${TEST_MSG}`);
            });

            it('#stack must not include extraneous information',
            function ()
            {
                const re = new RegExp('^\\s*at (new )? SecondLevelDerivate');
                should.not.exist(cut.stack.match(re));
            });

            it('must be an instance of Error',
            function ()
            {
                cut.should.be.an.instanceOf(Error);
            });

            it('must be an instance of FirstLevelDerivate',
            function ()
            {
                cut.should.be.an.instanceOf(FirstLevelDerivate);
            });

            it('must be an instance of SecondLevelDerivate',
            function ()
            {
                cut.should.be.an.instanceOf(SecondLevelDerivate);
            });

            it('FirstLevelDerivate must be its prototype',
            function ()
            {
                FirstLevelDerivate.isPrototypeOf(
                    SecondLevelDerivate
                ).should.be.ok;
            });

            it('EsError must be its prototype',
            function ()
            {
                EsError.isPrototypeOf(SecondLevelDerivate).should.be.ok;
            });

            it('Error must be its prototype',
            function ()
            {
                Error.isPrototypeOf(SecondLevelDerivate).should.be.ok;
            });
        });
    });
});

