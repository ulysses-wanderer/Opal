//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//  Opal: Optimum Plugin Automatic Loader
//
(function module_Opal(){                            //  Anonymous scope to avoid "polluting" global scope
    var debug          = true
    var machine        = 'Other'                    //  Used in debug mode to configure environment for Gem
    var module_name    = 'Opal'
    var module_version = '0.0.29'
//  var watching       = 'Gem/Beryl/Boot.js'
//  var watching       = 'js/plugins/Beryl.js'
    var watching       = 'js/plugins/Silver.js'
//  var watching       = 'js/plugins/Jasper.js'
//  var watching       = 'js/plugins/Gem.js'

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
    var module_path = path_join(main_module_directory, watching)
    var first_run   = ( ! P.version)

    function path_changed(event, path) {
        if (event != 'change') { return }

        console.log(path)

        z();
    }

    P.name    = module_name
    P.version = module_version
    P.path    = module_path

    if (0) {
        div = document.createElement('webview')
        div.style.position = 'absolute'
        div.innerHTML = 'Hello'
        div.style.zIndex = 7777
        document.body.appendChild(div)

        window.div = div

        div.showDevTools();
    }

    if (debug) {
        if (debug) {
            if (first_run) {
                console.log(P.name, 'version', P.version, P)
            } else {
                console.log(P)
            }
        }

        //
        //  In debug module create an alias "z", which reloads this module.
        //  The reason 'z' is chosen is it is easy to type & there will be no "suggestions" when it is
        //  entered into developer tools
        //
        window.z = function reload () {
            var script = P.Script || document.createElement('script')

            script.src = watching
            document.body.appendChild(script)
            return P
        }

        if (0) {
            var game_window = NW.Window.get()

            if (process.versions.nw == '0.25.4') {
                game_window.showDevTools(false)
            } else {
                var developer_tools = game_window.showDevTools()
            }
        }


        if (machine == 'Gem') {
            //
            //  In debug module create an alias "j", which is the same as: System.modules[module_name]
            //  The reason 'j' is chosen is it is easy to type & there will be no "suggestions" when it is
            //  entered into developer tools
            //
            window.j = P

            game_window.setShowInTaskbar(true)
            game_window.minimize()
            game_window.moveTo(-900,-777)           //  Joy's second monitor on the left of main monitor

            window.w = game_window

            if (developer_tools) {
                developer_tools.moveTo(-1000,-111)  //  Joy's second monitor on the left of main monitor
                developer_tools.width  = 1000       //  Full screen mode on Joy's first monitor
                developer_tools.height = 777 

                if (0) {
                    developer_tools.width  = 1900           //  Full screen mode on Joy's first monitor
                    developer_tools.height = 1080
                    developer_tools.moveTo(0, 0)

                    //developer_tools.width  = 1900           //  Full screen mode on Joy's first monitor
                    //developer_tools.height = 1080
                    //developer_tools.moveTo(0, 0)
                }

                window.d = developer_tools
            }

        }
    }

    if (P.watcher) { P.watcher.close() }            //  Close any previous watcher first
    P.watcher = FileSystem.watch(module_path, path_changed)
})();                                               //  End of Anonymous scope;  Also execute the anonymous function

//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
/*: @plugindesc Optimum Plugin Automatic Loader */
