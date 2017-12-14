//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Beryl: Boot Engine, Reliable Yet Limber
//
(function module_Beryl(){                                   //  Anonymous scope to avoid "polluting" global scope
    "use strict"                                            //  Strict mode helps catch JavaScript errors, very useful!

    //
    //  Create global variable `Gem`
    //
    //      Also for convenience create a local variable '$' as an alias for `Gem`.
    //
    //  NOTE:
    //      Later `Gem` will be replaced with a proper instance of class `Gem.Global`
    //
    var $ = window.Gem = {}

    $.debug           = true                                //  Set Gem debug mode to true
    $.beryl_boot_path = 'Gem/Beryl/Boot.js'                 //  Module to load the rest of Gem modules


    //
    //  Imports
    //
    var parse_integer__or__NaN = Number.parseInt


    //
    //  Node_WebKit version
    //
    //  NOTE:
    //      If not using nw.js, then both `is_node_webkit_12_or_lower` & `is_node_webkit_13_or_higher` will be `false`.
    //
    var node_webkit__major   = NaN
    var node_webkit__minor   = NaN
    var node_webkit__version = (window.process && process.versions && process.versions['node-webkit'])

    if (typeof node_webkit__version == 'string') {
        var version_list = node_webkit__version.split('.')

        if (version_list.length > 0) { node_webkit__major = parse_integer__or__NaN(version_list[0]) }
        if (version_list.length > 1) { node_webkit__minor = parse_integer__or__NaN(version_list[1]) }
    }

    $.is_node_webkit_12_or_lower  = (node_webkit__major === 0 && node_webkit__minor <= 12)
    $.is_node_webkit_13_or_higher = (node_webkit__major >   0 || node_webkit__minor >= 13)


    //
    //  show_developer_tools
    //
    if ($.is_node_webkit_12_or_lower) {                     //  Show developer tools (nw.js 0.12 or lower)
        var game_window = require('nw.gui').Window.get()

        $.show_developer_tools = function show_developer_tools() {
            game_window.showDevTools()
        }
    } else if ($.is_node_webkit_13_or_higher) {             //  Show developer tools (nw.js 0.13 or higher)
        var game_window = nw.Window.get()

        $.show_developer_tools = function show_developer_tools() {
            game_window.showDevTools(false)
        }
    } else {                                                //  Not using nw.js: Don't show developer tools
        $.show_developer_tools = function show_developer_tools() {}
    }


    //
    //  We only bring up an alert if three conditions are met:
    //
    //      1)  This is running in Gem debug mode;
    //      2)  This is running under nw.js (i.e.: not a normal browser like Firefox, etc.); AND
    //      3)  This is running in RPG Maker MV "test" mode.
    //
    if ($.debug && Utils.isNwjs() && Utils.isOptionValid('test')) {
        //
        //  NOTE:
        //      There is no way to get the error message, if there is one, when attempting to load Gem/Boot.Beryl.js
        //      (You can't use try/catch on a <script></script> tag that is inserted into the DOM).
        //
        //      Hence in case of an error, the following is done:
        //
        //          1)  Alert the user with an alert message which says to see Developer Tools for full error;
        //          2)  Force the user to acknowledge the alert box by hitting 'OK';
        //          3)  Then, and only then, bring up Developer tool, so the user can read the rest of the error.
        //
        $.beryl_boot_error = function beryl_boot_error() {
            alert('Failed to load ' + $.beryl_boot_path + ': please see Developer Tools for full error')
            $.show_developer_tools()
        }
    }

    var script = $.beryl_script = document.createElement('script')  //  Create an element: `<script></script>`

    script.src = $.beryl_boot_path                          //  Modify to `<script src='Gem/Beryl/Boot.js></script>`

    if ($.beryl_boot_error) {                               //  *IF* three conditions above met, then:
        if (script.addEventListener) {
            script.addEventListener('error', $.beryl_boot_error)    //  Alert user if any error happens
        } else {
            script.onerror = $.beryl_boot_error             //  Alert user if any error happens (alternate method)
        }
    }

    document.head.appendChild(script)                       //  Attempt to load 'Gem/Beryl/Boot.js' as a module
})();


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
/*: @plugindesc Boot Engine, Reliable Yet Limber */
