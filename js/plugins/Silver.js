//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Silver: Show Inline Local Values, Extensible Research
//
(function(){
    "use strict"                                            //  Strict mode helps catch JavaScript errors, very useful!


    var Silver = Window.Silver                              //  Create, or reuse, global variable `Silver`
             || (Window.Silver = {})


    Silver.debug       = true                               //  Set Silver debug mode to true
    Silver.debug_clear = true                               //  Only meaningful if .debug is also set


    //----------------------------------+
    //  Summary: produce module Silver  |
    //----------------------------------+


    function summary() {
        clear_console()
        cleanup()
        development()
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
    var $           = Silver                                //  Create easier to read `$` alias for `Silver`
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


    function group_path(header, path, line_number) {
        group_start('%c%s%c %c(from %s, line #%d)%c',
                    'color: green', header, 'color: none',
                    'color: grey', path, line_number, 'color: none')
    }

    function group_nested(header, line_number) {
        group_closed('%c%s%c %c#%d%c',
                     'color: green', header, 'color: none',
                     'color: grey', line_number, 'color: none')
    }


    function show_value(header, value, line_number) {
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


    //  cleanup
    function cleanup() {
    }


    //  Development code
    function development() {
        group_path('Utils', 'rpg_core.js', 155)
        show_value('RPGMAKER_NAME', Utils.RPGMAKER_NAME, 173)
        show_value('RPGMAKER_VERSION', Utils.RPGMAKER_VERSION, 183)

        //  isOptionValid
        {
            group_nested('isOptionValid(name)', 193)
            show_value("Utils.isOptionValid('test')", Utils.isOptionValid('test'))
            group_end()
        }

        group_end()
    }


    //  Finally: Run all the code in `Silver`
    summary()
})()


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
/*: @plugindesc Show Inline Local Values, Extensive Research */
