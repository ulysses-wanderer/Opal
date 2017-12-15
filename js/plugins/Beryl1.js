if (Gem.debug && 'Proxy' in window) {
    Gem.codify(
        'lookup_attribute__or__throw_error',
        'Throw an attribute error when an undefined attribute is accessed by mistake.',
        function codify_lookup_attribute__or__throw_error() {
            var Error = window.Error

            return function lookup_attribute__or__throw_error(target, name) {
                //
                //  Throw an attribute error when an undefined attribute is accessed by mistake.
                //
                if (name in target) {
                    return target[name]
                }

                throw Error('AttributeError: `' + target.name + '` does not have a `.' + name + '` member')
            }
        }
    )

    Gem.proxy_traps = Object.create(
            null,
            {
                name : { value : 'Gem.proxy_traps' },

                summary : {
                    value :
                          '`traps` argument to Proxy'
                        + ': To throw an attribute error when an undefined attribute is accessed by mistake.'
                },

                get : { value : Gem.lookup_attribute__or__throw_error },
            },
        )

    window.Gem = new Proxy(
            Object.create(
                null,
                {
                    name                              : { value : Gem.name                              },
                    summary                           : { value : Gem.summary                           },
                    codify                            : { value : Gem.codify                            },
                    debug                             : { value : Gem.debug                             },
                    lookup_attribute__or__throw_error : { value : Gem.lookup_attribute__or__throw_error },

                    modules : {
                        value : new Proxy(
                                Object.create(
                                    null,
                                    {
                                        name    : { value : Gem.modules.name    },
                                        summary : { value : Gem.modules.summary },
                                        Gem     : { value : Gem.modules.Gem     },
                                    }
                                ),
                                Gem.proxy_traps//,
                            )//,
                    },

                    scripts : {
                        value : new Proxy(Object.create(null), Gem.proxy_traps)//,
                    }//,
                }//,
            ),
            Gem.proxy_traps//,
        )
}
    

//
//  We only bring up an alert if four conditions are met:
//
//      1)  This is running in Gem debug mode;
//      2)  This is running in RPG Maker MV "test" mode;
//      3)  This is running under nw.js (i.e.: not a normal browser like Firefox, etc.); AND
//      4)  The browser has a `.addEventListener` method (all modern browsers do).
//
if (
       Gem.debug
    && ('Utils' in window) && Utils.isOptionValid('test')
    && Utils.isNwjs()
    && ('addEventListener' in document)
) {
    Gem.execute(
        'produce_handle_load_error',
        function brew_produce_handle_load_error() {
            var alert                = window.alert
            var show_developer_tools = Gem.show_developer_tools

            return function Gem__produce_handle_load_error(path) {
                //
                //  NOTE:
                //      There is no way to get the error message, if there is one, when attempting to load a script
                //      using <script> (You can't use try/catch on a <script></script> tag that is inserted into the
                //      DOM).
                //
                //      Hence in case of an error, the following is done:
                //
                //          1)  Alert the user with an alert message which says to see Developer Tools for full error;
                //          2)  Force the user to acknowledge the alert box by hitting 'OK';
                //          3)  Then, and only then, bring up Developer tool, so the user can read the rest of the
                //          error.
                //
                return function handle_load_error() {
                    alert('Failed to load ' + path + ': please see Developer Tools for full error')
                    show_developer_tools()
                }
            }
        }
    )
}


Gem.load_script = (
    function enclose_load_script()
    {
        "use strict"

        var produce_handle_load_error = (Gem.produce_handle_load_error || null)
        var script_map         = Gem.scripts


        return function load_script(path, container) {
            var self = script_map[path] || (script_map[path] = {})

            //  Create an element: `<script></script>`
            var script_tag = self.tag = document.createElement('script')

            if (script_tag.setAttribute) {
                script_tag.setAttribute('src', path)    //  Modify to `<script src='Gem/Beryl/Boot.js></script>`
            } else {
                script_tag.src = path                   //  Modify to `<script src='Gem/Beryl/Boot.js></script>`
            }

            if (produce_handle_load_error) {
                var handle_load_error = self.handle_load_error = produce_handle_load_error(path)

                script_tag.addEventListener('error', handle_load_error)
            }

            container.appendChild(script_tag)           //  Attempt to load path as a module
        }
    }
)();


(function module_Beryl(){                                   //  Anonymous scope to avoid "polluting" global scope
    "use strict"                                            //  Strict mode helps catch JavaScript errors, very useful!

    //
    //  Create global variable `Gem`
    //
    //      Also for convenience create a local variable `$` as an alias for `Gem`.
    //
    //  NOTE:
    //      Later `Gem` will be replaced with a proper instance of class `Gem.Global`
    //
    var $ = window.Gem

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
        }

        //
        //  Note, we could do:
        //
        //      else {
        //          script.onerror = $.beryl_boot_error     //  Alert user if any error happens (alternate method)
        //      }
        //      
        //  However, all modern browsers have an 'addEventListener', no need to be backwards compatiable with
        //  super super old browsers.
        //
        //  More importantly, we can't test this code -- untested code should not be inplemented.
        //
    }

    document.head.appendChild(script)                       //  Attempt to load 'Gem/Beryl/Boot.js' as a module
})();


//
//  The "sources" tab of Developer tools shows what has been loaded into the HTML page:
//
//      However, for a JavaScript file to appear under "sources" it must have at least one function that has not
//      been garbage collected.
//
//      In debug mode, `Gem.sources` is used to make sure that there is least once such function from each JavaScript
//      file that has been loaded in.
//
if (Gem.debug) {
    Gem.sources.js_plugins_Gem = function() {}
}


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
/*: @plugindesc Boot Engine, Reliable Yet Limber */
