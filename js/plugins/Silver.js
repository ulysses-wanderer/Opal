//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Copyright (c) 2015 KADOKAWA CORPORATION./YOJI OJIMA.  Licensed under the MIT License.
//  Silver: Show Important Local Variables, Extensible Research
//
//  NOTE:
//      This copies some code form rpg_core.js which is "Copyright (c) 2015 KADOKAWA CORPORATION./YOJI OJIMA."
//      Lines that are from rpg_core.js are marked with: // <copied: rpg_core.js />
//
(function(){
    "use strict"                                            //  Strict mode helps catch JavaScript errors, very useful!


    //  Local variable `$` is a copy of `window.Silver` as it is shorter to type '$' & easier to read '$'.
    var $ = window.Silver                                   //  Create, or reuse, global variable `Silver`
             || (new (function GemModule() {})())           //  Create a fake "GemModule" class name for `Silver`


    $.name        = 'Silver'                                //  Name of module
    $.version     = '0.0.2'                                 //  Version 0.0.2
    $.debug       = true                                    //  Set Silver debug mode to true
    $.debug_clear = true                                    //  Only meaningful if .debug is also set


    //----------------------------------+
    //  Summary: produce module Silver  |
    //----------------------------------+


    function summary() {
        clear_console()
        cleanup()
        show_Utils()
        development()
        show_version()
    }


    //----------------------------------+
    //  Details: produce module Silver  |
    //----------------------------------+


    //  Imports
    var define_property     = Object.defineProperty
    var define_properties   = Object.defineProperties
    var set_prototype_of    = Object.setPrototypeOf
    var create_Object       = Object.create
    var create_Pattern       = RegExp
    var console              = window.console || null


    //  Copy members from $, to local variables (for code clarity below)
    var debug       = $.debug
    var debug_clear = $.debug_clear


    //  empty_procedure
    function empty_procedure() {                           //  empty_procedure: does nothing, except avoid errors
    }


    //  group_closed
    if (console && console.groupCollapsed) {
        var group_closed = function group_closed(/*...*/) {//  group_closed: Easier to type `console.groupCollapsed`
            console.groupCollapsed.apply(console, arguments)
        }
    } else {
        var group_closed = function group_closed(/*...*/) {}
    }


    //  group_end                     
    if (console && console.groupEnd) {
        var group_end = function group_end() {              //  group_end: Easier to type `console.groupEnd`
            console.groupEnd()
        }
    } else {
        var group_end = function group_start(/*...*/) {}
    }


    //  group_start
    if (console && console.group) {
        var group_start = function group_start(/*...*/) {   //  group_start: Easier to type `console.group`
            console.group.apply(console, arguments)
        }
    } else {
        var group_start = function group_start(/*...*/) {}
    }


    //  log
    if (console && console.log) {
        var log = function log(/*...*/) {                   //  Easier to type 'log' instead of 'console.log'
            if (console) {
                console.log.apply(console, arguments)
            }
        }
    } else {
        var log = function log(/*...*/) {}
    }


    //  clear_console
    function clear_console() {                              //  Clear console, *IF* in debug mode
        if (debug) {
            if (debug_clear) {
                if (console) {
                    console.clear()
                }
            }
        }
    }


    function group_path(header, path, line_number, comment) {
        if (comment) {
            group_start('%c%s%c: %s %c(from %s, line #%d)%c',
                        'color: green', header, 'color: none',
                        comment,
                        'color: grey', path, line_number, 'color: none')

            return
        }

        group_start('%c%s%c %c(from %s, line #%d)%c',
                    'color: green', header, 'color: none',
                    'color: grey', path, line_number, 'color: none')
    }

    function group_nested(header, line_number, comment) {
        if (comment) {
            group_closed('%c%s%c; %s %c#%d%c',
                         'color: green', header, 'color: none',
                         comment,
                         'color: grey', line_number, 'color: none')

            return
        }

        group_closed('%c%s%c %c#%d%c',
                     'color: green', header, 'color: none',
                     'color: grey', line_number, 'color: none')
    }


    function show_value(header, value, line_number, comment) {
        if (comment) {
            log('%c%s%c: %c%s%c; %s %c#%d%c',
                'color: green', header, 'color: none',
                'font-weight: bold; color: orange', value, 'font-weight: none; color: none',
                comment,
                'color: grey', line_number, 'color: none')

            return
        }

        if (line_number) {
            log('%c%s%c: %c%s%c %c#%d%c',
                'color: green', header, 'color: none',
                'font-weight: bold; color: orange', value, 'font-weight: none; color: none',
                'color: grey', line_number, 'color: none')

            return
        }

        log('%c%s%c: %c%s%c',
            'color: green', header, 'color: none',
            'font-weight: bold; color: orange', value, 'font-weight: none; color: none')
    }


    function show_code(f, line_number)
    {
        group_nested('Code', line_number)
        log(f)
        group_end()
    }

    
    function show_method(
            function_name, comment__line_number, comment,
            explanation, tests,
            f, function__line_number
    ) {
        group_nested(function_name, comment__line_number, comment)
        log(explanation)
        tests()
        show_code(f, function__line_number)
        group_end()
    }


    //  cleanup
    function cleanup() {
        set_prototype_of($.__proto__, null)             //  Cleanup the fake "GemModule" class name for `Silver`
    }


    //  show_Utils
    function show_Utils() {
        group_path(
            'Utils', 'rpg_core.js', 157,
            'The static class that defines utility methods.'//,                 // <copied: rpg_core.js:157 />
        )

        show_value(
            'RPGMAKER_NAME', Utils.RPGMAKER_NAME, 166,
            "The name of the RPG Maker. 'MV' in the current version."//,        // <copied: rpg_core.js:166 />
        )

        show_value(
            'RPGMAKER_VERSION', Utils.RPGMAKER_VERSION, 176,
            'The version of the RPG Maker.'//,                                  // <copied: rpg_core.js:176 />
        )

        show_method(
            'isOptionValid', 186,
            'Checks whether the option is in the query string.',                // <copied: rpg_core.js:186 />
            "Utils.isOptionValid('test') is used to check if running in debug mode.",
            (function() {
                show_value("Utils.isOptionValid('test')",        Utils.isOptionValid('test'))
                show_value("Utils.isOptionValid('nonexistent')", Utils.isOptionValid('nonexistent'))
            }),
            Utils.isOptionValid, 193//,
        )
        
        show_method(
            'isNwjs', 198,
            'Checks whether the platform is NW.js.',                            // <copied: rpg_core.js:198 />
            'Utils.isNwjs is used to check if running under Node WebKit instead of a browser.',
            (function() {
                show_value('Utils.isNwjs', Utils.isNwjs())
            }),
            Utils.isNwjs, 204//,
        )

        log('%s %o', 'Utils.prototype:', Utils.prototype)

        group_end()
    }


    //  Development code
    function development() {
    }


    //  show_version
    function show_version() {
        var begin_font         = 'font-weight: bold'
        var end_color_and_font = 'font-weight: normal; color: none'

        log('%c%s%c %c%s%c %o',
            'color: green;  ' + begin_font, $.name,    end_color_and_font,
            'color: orange; ' + begin_font, $.version, end_color_and_font,
            $)
    }


    //  Finally: Run all the code in `Silver`
    summary()
})()


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//
//  The full MIT License, for the code by Joy Diamond, is available here:
//      https://github.com/Rhodolite/Opal/blob/master/LICENSE
//
//  The full MIT License, for the code by 2015 KADOKAWA CORPORATION./YOJI OJIMA, is available here:
//      https://github.com/rpgtkoolmv/corescript/blob/master/LICENSE
//
/*: @plugindesc Show Important Local Variables, Extensible Research */
