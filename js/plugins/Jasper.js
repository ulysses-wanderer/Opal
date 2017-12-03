//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Jasper: Joy's Amazingly Simple Plugin, Easily Readable 
//
(function(){
    "use strict"                                            //  Strict mode helps catch JavaScript errors, very useful!


    window._Gem = {                                         //  Create global variable `_Gem` for private members
        debug           : true,                             //  Set Gem debug mode to true
        beryl_boot_path : 'Gem/Beryl/Boot.js',
    }

    var $               = _Gem                              //  Create easier to read `$` alias for `_Gem`
    var debug           = $.debug
    var beryl_boot_path = $.beryl_boot_path

    //
    //  We only bring up an alert if two conditions are met:
    //
    //      1)  This is running in Gem debug mode;
    //      2)  This is running under nw.js (i.e.: not a normal browser like Firefox, etc.)
    //
    if (debug && window.require) {
        //
        //  NOTE:
        //      There is no way to get the error message, if there is one, when attempting to load Gem/Boot.Beryl.js
        //      (You can't use try/catch on a <script></script> tag that is inserted into the DOM).
        //      
        //      Hence in case of an error, the following is done:
        //
        //          1)  Alert the user with an alert message which says to see Developer Tools for full error;
        //          2)  Force the user to acknowledge the alert box by hitting 'OK';
        //          3)  Then, and only then, bring up Developer tool, so the user can reading the rest of the error.
        //
        $.beryl_boot_error = function beryl_boot_error() {
            alert('Failed to load ' + beryl_boot_path + ': please see Developer Tools for full error')

            if (process.versions.nw == '0.25.4') {      //  Is this RPG Maker MV 1.6.0 with nw.js 0.25.4?
                //  Show developer tools (nw.js 0.25.4 version)
                nw.Window.get().showDevTools(false)
            } else {
                //  Show developer tools (nw.js older version)
                require('nw.gui').Window.get().showDevTools()
            }
        }
    }


    var script = document.createElement('script')           //  Create an element: `<script></script>`

    script.src = beryl_boot_path                            //  Modify to `<script src='Gem/Beryl/Boot.js></script>

    if ($.beryl_boot_error) {
        script.onerror = $.beryl_boot_error                 //  Alert user if any error happens
    }

    document.head.appendChild(script)                       //  Attempt to load 'Gem/Beryl/Boot.js' as a module
})()


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
/*: @plugindesc Joy's Amazingly Simple Plugin, Easily Readable */
