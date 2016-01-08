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

