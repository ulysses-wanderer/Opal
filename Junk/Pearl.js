//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//
(function(){                                    //  Anonymous scope to avoid "polluting" global scope
    var debug          = true
    var developer      = 'Joy'
    var module_name    = 'Opal'
    var module_version = '0.0.11'

    "use strict"

    //
    //  We store our module under: System.modules['Pearl']
    //  
    var System  = window.System        = (window.System        || { name : 'System'         })
    var modules = System.modules       = (System.modules       || { name : 'System.modules' })
    var Gem     = modules.Gem          = (modules.Gem          || { name : 'Gem'            })
    var P       = modules[module_name] = (modules[module_name] || {                         })

    //  Imports
    var nw = window.nw || require('nw.gui')


    //
    //  Store our module name & version (on purpose: override anything there already)
    //
    P.name    = module_name
    P.version = module_version


    if (debug) {
        //
        //  In debug module create an alias "J", which is the same as: System.modules[module_name]
        //
        window.J = P

        if (debug) { console.log(P.name, P.version); }

        var script = P.Script || document.createElement('script')
        script.src = 'C:/rmmv/Pearl5/js/plugins/Pearl.js'

        window.R = function reload () {
            document.body.appendChild(script)
            return P.name + ', previous version: ' + P.version
        }

        var game_window     = nw.Window.get()
        var developer_tools = game_window.showDevTools()

        if (developer === 'Joy') {
            game_window.moveTo(-900,-600)           //  Joy's second monitor on the left of main monitor

            developer_tools.height = 1900           //  Full screen mode on Joy's first monitor
            developer_tools.width  = 1080
            developer_tools.moveTo(0, 0);
            developer_tools.focus();
        }
    }
})();                                               //  End of Anonymous scope;  Also execute the anonymous function
