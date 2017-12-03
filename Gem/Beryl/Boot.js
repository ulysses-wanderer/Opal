//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//
(function(){                                                //  Anonymous scope to avoid "polluting" global scope
    var $ = _Gem

    if ( ! $.debug_clear) {
        $.debug_clear = true;
    }


    //-------------------------------+
    //  Summary: produce module Gem  |
    //-------------------------------+

    var summary = function() {
        clear_console()
        cleanup()
        last()
    }


    //-------------------------------+
    //  Details: produce module Gem  |
    //-------------------------------+


    //  Imports
    var define_property   = Object.defineProperty
    var define_properties = Object.defineProperties
    var set_prototype_of  = Object.setPrototypeOf
    var create_Object     = Object.create
    var create_Pattern    = RegExp


    //  Copy members from $, to local variables (for code clarity below)
    var beryl_boot_path   = $.beryl_boot_path
    var debug             = $.debug
    var debug_clear       = $.debug_clear


    //  log
    function log(/*...*/) {                                 //  Easier to type 'log' instead of 'console.log'
        if (window.console) {
            console.log.apply(console, arguments)
        }
    }


    //  clear_console
    function clear_console() {                              //  Clear console, *IF* in debug mode
        if (debug) {
            if (debug_clear) {
                if (window.console) {
                    console.clear()
                }
            }
        }
    }


    //  cleanup
    function cleanup() {
        //delete $.beryl_boot_error
    }


    //  Development code
    function last() {
        var script_list = document.getElementsByTagName('script')

        for (var i = 0; i < script_list.length; i ++) {
            var script = script_list[i]

            if (script.src == beryl_boot_path) {
                document.removeChild(script)
                continue
            }

            log(script.src)
            //log(script.src.toString())
        }
    }


    //  Finally: Run all the code in module_Gem
    summary()
})()


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
