// TBD:FILEHEADER

// gimme that last percent... for the darn nack of it
// and to save us from having to test this trivial shit in the browser

global.window =
{
    parseFloat : global.parseFloat,
    parseInt : global.parseInt
}

import EsNumber from '../src/number';

EsNumber.install();
EsNumber.uninstall();

delete global.window;

