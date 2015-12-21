// TBD:FILEHEADER

// gimme that last percent... for the darn nack of it
// and to save us from having to test this trivial shit in the browser

import assert from 'esaver';

import EsNumber from '../src/number';


describe('EsNumber',
function ()
{
    const origParseFloat = global.parseFloat;
    const origParseInt = global.parseInt;

    it('.install()/.uninstall() with global window available',
    function ()
    {
        assert.expect(4);

        global.window =
        {
            parseFloat : global.parseFloat,
            parseInt : global.parseInt
        };

        EsNumber.install();
        assert.notEqual(origParseFloat, window.parseFloat);
        assert.notEqual(origParseInt, window.parseInt);

        EsNumber.uninstall();
        assert.equal(origParseFloat, window.parseFloat);
        assert.equal(origParseInt, window.parseInt);

        delete global.window;
    });
});

