//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//
    //
    //  Values
    //


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
    var module_path = path_join(main_module_directory, 'js/plugins', 'Crystal' + '.js')
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

            script.src = 'js/plugins/Crystal.js'
            document.body.appendChild(script)
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
                game_window.moveTo(-900,600)       //  Joy's second monitor on the left of main monitor

                if (0) {
                    developer_tools.width  = 1900           //  Full screen mode on Joy's first monitor
                    developer_tools.height = 1080
                    developer_tools.moveTo(0, 0)

                    //developer_tools.width  = 1900           //  Full screen mode on Joy's first monitor
                    //developer_tools.height = 1080
                    //developer_tools.moveTo(0, 0)
                }

                developer_tools.focus()

                window.d = developer_tools
            }

        }
    }

    if (P.watcher) { P.watcher.close() }            //  Close any previous watcher first
    P.watcher = FileSystem.watch(module_path, path_changed)
})();                                               //  End of Anonymous scope;  Also execute the anonymous function
