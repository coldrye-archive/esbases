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

import EsNumber from '../src/number';


describe('EsNumber',
function ()
{
    it('Number must be its prototype',
    function ()
    {
        assert.ok(Number.isPrototypeOf(EsNumber));
    });

    it('instances must be instances of Number',
    function ()
    {
        assert.ok(new EsNumber() instanceof Number);
    });

    const origParseFloat = parseFloat;
    const origParseInt = parseInt;

    it('.install() must replace global parseInt and parseFloat',
    function ()
    {
        EsNumber.install();
        assert.ok(origParseInt !== parseInt);
        assert.ok(origParseFloat !== parseFloat);
        EsNumber.uninstall();
    });

    it('.uninstall() must restore the original parseInt and parseFloat',
    function ()
    {
        EsNumber.install();
        EsNumber.uninstall();
        assert.ok(origParseInt === parseInt);
        assert.ok(origParseFloat === parseFloat);
    });

    describe('.isNaN()',
    function ()
    {
        it('must return true on EsNumber(Number.NaN)',
        function ()
        {
            assert.ok(EsNumber.isNaN(Number.NaN));
        });

        it('must return true on EsNumber(new EsNumber(Number.NaN))',
        function ()
        {
            assert.ok(EsNumber.isNaN(new EsNumber(Number.NaN)));
        });

        it('must return true on assorted NaNs',
        function ()
        {
            assert.ok(EsNumber.isNaN(undefined));
            assert.ok(EsNumber.isNaN('a'));
        });
    });

    describe('.isFinite()',
    function ()
    {
        it('must return false on EsNumber(Number.NEGATIVE_INFINITY)',
        function ()
        {
            assert.ok(!EsNumber.isFinite(
                new EsNumber(Number.NEGATIVE_INFINITY)
            ));
        });

        it('must return false on Number.POSITIVE_INFINITY',
        function ()
        {
            assert.ok(!EsNumber.isFinite(Number.POSITIVE_INFINITY));
        });

        it('must return false on EsNumber(Number.POSITIVE_INFINITY)',
        function ()
        {
            assert.ok(!EsNumber.isFinite(
                new EsNumber(Number.POSITIVE_INFINITY)
            ));
        });
    });

    describe('.parseFloat()',
    function ()
    {
        it('must return instance of EsNumber',
        function ()
        {
            const actual = EsNumber.parseFloat('0.005');
            assert.ok(actual instanceof EsNumber);
        });
    });

    describe('.parseInt()',
    function ()
    {
        it('must return instance of EsNumber',
        function ()
        {
            const actual = EsNumber.parseInt('5');
            assert.ok(actual instanceof EsNumber);
        });
    });

    describe('constructor',
    function ()
    {
        it('must accept string value',
        function ()
        {
            assert.deepEqual(new EsNumber('1'), new EsNumber(1));
        });

        it('must accept Number value',
        function ()
        {
            assert.deepEqual(new EsNumber(1), new EsNumber(new Number(1)));
        });

        it('must accept EsNumber value',
        function ()
        {
            assert.deepEqual(new EsNumber(1), new EsNumber(new EsNumber(1)));
        });
    });

    describe('#valueOf()',
    function ()
    {
        it('must not throw not generic error',
        function ()
        {
            assert.doesNotThrow(
            function ()
            {
                new EsNumber(1).valueOf();
            });
        });

        it('must return expected value',
        function ()
        {
            assert.equal(1, new EsNumber(1).valueOf());
        });
    });

    it('#toString() must return expected value',
    function ()
    {
        assert.equal('5', new EsNumber(5).toString());
    });

    it('#toLocaleString() must return expected value',
    function ()
    {
        assert.equal(
            new EsNumber(1000).toLocaleString('en-US', {useGrouping:false}),
            '1000'
        );
    });

    it('#toFixed() must return expected value',
    function ()
    {
        assert.equal(new EsNumber(1).toFixed(2), '1.00');
    });

    it('#toExponential() must return expected value',
    function ()
    {
        assert.equal(new EsNumber(1).toExponential(2), '1.00e+0');
    });

    it('#toPrecision() must return expected value',
    function ()
    {
        assert.equal(new EsNumber(1).toPrecision(4), '1.000');
    });
});

