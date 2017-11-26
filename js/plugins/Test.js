//
//  Copyright (c) 2017 Joy Diamond & Ulysses Wanderer.  Licensed under the MIT License
//
(function(){                                        //  Anonymous scope to avoid "polluting" global scope
    var debug          = true
    var machine        = 'Gem'                      //  Used in debug mode to configure environment for Gem
    var module_name    = 'Test'
    var module_version = '0.0.6'

    "use strict"

    //
    //  Imports
    //
    var NW         = window.nw || require('nw.gui')
    var Path       = require('path')

    var path_directory_name = Path.dirname
    var path_join           = Path.join

    //
    //  Functions
    //
    var create_Object     = Object.create
    //var define_properties = Object.defineProperties


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


    P.name    = module_name
    P.version = module_version
    P.path    = 'js/plugins/Test.js'

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
    }

    window.t = P
})();                                               //  End of Anonymous scope;  Also execute the anonymous function

/*: @plugindesc Test: Temporary Erstwhile Simple Tutorial */
