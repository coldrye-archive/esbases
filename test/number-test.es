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


import EsNumber from '../src/number';


describe('EsNumber',
function ()
{
    it('Number must be its prototype',
    function ()
    {
        Number.isPrototypeOf(EsNumber).should.be.ok;
    });

    it('instances must be instances of Number',
    function ()
    {
        // chai will call valueOf()
        (new EsNumber() instanceof Number).should.be.ok;
    });

    const origParseFloat = parseFloat;
    const origParseInt = parseInt;

    it('.install() must replace global parseInt and parseFloat',
    function ()
    {
        EsNumber.install();
        parseInt.should.not.equal(origParseInt);
        parseFloat.should.not.equal(origParseFloat);
        EsNumber.uninstall();
    });

    it('.uninstall() must restore the original parseInt and parseFloat',
    function ()
    {
        EsNumber.install();
        EsNumber.uninstall();
        parseInt.should.equal(origParseInt);
        parseFloat.should.equal(origParseFloat);
    });

    it('.isNaN() must return true on assorted NaNs',
    function ()
    {
        EsNumber.isNaN(1).should.not.be.ok;
        EsNumber.isNaN(Number.NaN).should.be.ok;
        EsNumber.isNaN(new EsNumber(Number.NaN)).should.be.ok;
        EsNumber.isNaN(undefined).should.be.ok;
        EsNumber.isNaN('a').should.be.ok;
    });

    it('.isFinite() must return expected value',
    function ()
    {
        EsNumber.isFinite(1).should.be.ok;
        EsNumber.isFinite(Number.POSITIVE_INFINITY).should.not.be.ok;
        EsNumber.isFinite(
            new EsNumber(Number.NEGATIVE_INFINITY)
        ).should.not.be.ok;
        EsNumber.isFinite(
            new EsNumber(Number.POSITIVE_INFINITY)
        ).should.not.be.ok;
        EsNumber.isFinite(new EsNumber(Number.NAN)).should.not.be.ok;
    });

    it('.parseFloat() must return instance of EsNumber',
    function ()
    {
        // chai will call valueOf()
        (EsNumber.parseFloat('0.005') instanceof EsNumber).should.be.ok;
    });

    it('.parseInt() must return instance of EsNumber',
    function ()
    {
        // chai will call valueOf()
        (EsNumber.parseInt('5') instanceof EsNumber).should.be.ok;
    });

    it('new EsNumber() must accept assorted parameter types',
    function ()
    {
        new EsNumber('1').should.equal(1);
        new EsNumber(new Number(1)).should.equal(1);
        new EsNumber(new EsNumber(1)).should.equal(1);
    });

    describe('#valueOf()',
    function ()
    {
        it('must not throw not generic error',
        function ()
        {
            function tc()
            {
                new EsNumber(1).valueOf();
            }
            tc.should.not.throw();
        });

        it('must return expected value',
        function ()
        {
            new EsNumber(1).valueOf().should.equal(1);
        });
    });

    it('#toString() must return expected value',
    function ()
    {
        new EsNumber(5).toString().should.equal('5');
    });

    it('#toLocaleString() must return expected value',
    function ()
    {
        new EsNumber(1000).toLocaleString(
            'en-US', {useGrouping:false}
        ).should.equal('1000');
        new EsNumber(1000).toLocaleString(
            'en-US', {useGrouping:true}
        ).should.equal('1,000');
    });

    it('#toFixed() must return expected value',
    function ()
    {
        new EsNumber(1).toFixed(2).should.equal('1.00');
    });

    it('#toExponential() must return expected value',
    function ()
    {
        new EsNumber(1).toExponential(2).should.equal('1.00e+0');
    });

    it('#toPrecision() must return expected value',
    function ()
    {
        new EsNumber(1).toPrecision(4).should.equal('1.000');
    });
});

