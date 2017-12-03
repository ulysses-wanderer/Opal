//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  GOOD: good coding stile
//
(function(){
    "use strict";                                           //  Strict mode helps catch JavaScript errors, very useful!

    if (window.require) {
        if (Utils.RPGMAKER_VERSION == '1.5.1') {            //  Is this RPG Maker MV 1.5.1?
            //  Show developer tools (nw.js older version)
            require('nw.gui').Window.get().showDevTools()
        } else {
            //  Show developer tools (nw.js 0.25.4 version)
            nw.Window.get().showDevTools(false)
        }
    }

    cat_fluffy = 7                                          //  Will throw an error
})()


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
/*: @plugindesc Good coding style */
