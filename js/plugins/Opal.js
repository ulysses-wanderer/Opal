//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//
(function(){                                        //  Anonymous scope to avoid "polluting" global scope
    var debug          = true
    var machine        = 'Gem'                      //  Used in debug mode to configure environment for Gem
    var module_name    = 'Opal'
    var module_version = '0.0.39'

    "use strict"

    //
    //  Imports
    //
    var FileSystem = require('fs')
    var NW         = window.nw || require('nw.gui')
    var Path       = require('path')

    var path_directory_name = Path.dirname
    var path_join           = Path.join
    var watch_path          = FileSystem.watch


    //
    //  Functions
    //
    var create_Object     = Object.create
    //var define_properties = Object.defineProperties
    var log               = console.log


    //
    //  Values
    //
    var main_module_directory = path_directory_name(process.mainModule.filename)


    //
    //  We store our module under: System.modules['Opal']
    //  
    var System  = window.System || (
                  window.System = create_Object(null, { name : { value : 'System' } } )
        )

    var modules = System.modules || (
                  System.modules = create_Object(null, { name : { value : 'System.modules' } })
        )

    var P = modules[module_name] || (
            modules[module_name] = create_Object(null)
        )

    //
    //  Store our module name & version (on purpose: override anything there already)
    //  First: Close a previous watcher
    //
    var relative_path = path_join('js/plugins', module_name + '.js')
    var relative_path = 'js/plugins/Test.js'        //  Temporary: Watch Test.js instead of myself
    var full_path     = path_join(main_module_directory, relative_path)
    var url_path      = new RegExp(/ at (.*):\d+:\d+$/).exec(new Error().stack)[1]


    //console.log('url_path: ', url_path)

    function path_changed(event, path) {
        if (event != 'change') { return }

        console.log(path)
        z()
    }


    P.name    = module_name
    P.version = module_version
    P.path    = full_path

    if (0) {
        div = document.createElement('div')
        div.style.position = 'absolute'
        div.innerHTML = 'Hello Joy & Ulysses'
        div.style.zIndex = 7777
        document.body.appendChild(div)

        window.div = div
    }

    if (debug) {
        console.log(P.version, P.name, P)

        //
        //  In debug module create an alias "z", which reloads this module.
        //  The reason 'z' is chosen is it is easy to type & there will be no "suggestions" when it is
        //  entered into developer tools
        //
        window.z = function reload () {
            var found       = null
            var script_list = document.getElementsByTagName('script')

            for (var i = 0; i < script_list.length; i ++) {
                var script = script_list[i]
                var source = script.src

                if (source == url_path) {
                    found = script
                    break
                }
            }

            if (found || 1) {
                if (found) {
                    document.body.removeChild(found)

                }
                var script = document.createElement('script')

                script.src = relative_path

                //console.log('set ', relative_path)
                //console.log('got ', script.src)

                document.body.appendChild(script)
            } else {
                throw new Error('did not find a script tag mataching ', url_path)
            }

            return P
        }

        var game_window     = NW.Window.get()

        if (process.versions.nw == '0.25.4') {
            var developer_tools;

            function callback(x) {
                console.log('callback ', x)
            }

            game_window.showDevTools(false, callback)
        } else {
            var developer_tools = game_window.showDevTools()
        }

        if (machine == 'Gem') {
            //
            //  In debug module create an alias "j", which is the same as: System.modules[module_name]
            //  The reason 'j' is chosen is it is easy to type & there will be no "suggestions" when it is
            //  entered into developer tools
            //
            window.j = P

            game_window.moveTo(-900,-600)           //  Joy's second monitor on the left of main monitor

            window.w = game_window

            if (developer_tools) {
                developer_tools.width  = 1900           //  Full screen mode on Joy's first monitor
                developer_tools.height = 1080
                developer_tools.moveTo(0, 0)

                //developer_tools.width  = 1900           //  Full screen mode on Joy's first monitor
                //developer_tools.height = 1080
                //developer_tools.moveTo(0, 0)
                //
                developer_tools.focus()

                window.d = developer_tools
            }
        }
    }

    //
    //  Make sure to do these two last, so if there is any bug above, we don't close the previous watcher.
    //
    if (P.watcher) { P.watcher.close() }            //  Close any previous watcher first
    P.watcher = FileSystem.watch(full_path, path_changed)
})();                                               //  End of Anonymous scope;  Also execute the anonymous function

/*: @plugindesc Opal: Optimium Plugin Automatic Loader */
