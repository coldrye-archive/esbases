

//import assert from 'esaver';
import assert from 'assert';

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
        it('must be instances of EsError',
        function ()
        {
            assert.ok(new EsError() instanceof EsError);
        });

        it('must be instances of Error',
        function ()
        {
            assert.ok(new EsError() instanceof Error);
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

