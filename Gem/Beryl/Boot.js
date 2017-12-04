//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//
(function(){                                                //  Anonymous scope to avoid "polluting" global scope
    var $ = Gem

    if ( ! $.debug_clear) {
        $.debug_clear = false
    }


    //-------------------------------+
    //  Summary: produce module Gem  |
    //-------------------------------+

    var summary = function() {
        show_developer_tools()
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


    //  show_developer_tools
    function show_developer_tools() {
        if (Utils.isOptionValid('test') && Utils.isNwjs()) {
            if (Utils.RPGMAKER_VERSION >= '1.6.0') {        //  Is this RPG Maker MV 1.6.0 or later?
                //  Show developer tools (nw.js 0.25.4 version)
                nw.Window.get().showDevTools(false)
            } else {
                //  Show developer tools (nw.js older version)
                require('nw.gui').Window.get().showDevTools()
            }
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


    //  show_script_list: unused (for now)
    function show_script_list() {
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


    //  Development code
    function last() {
    }


    //  Finally: Run all the code in module_Gem
    summary()
})()


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
