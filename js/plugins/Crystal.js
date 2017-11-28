//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//
"use strict"


window.Producer = {
    debug           : true,
    debug_clear     : true,                                 //  Only meaningful if .debug is also set
    debug_font_size : null,                                 //  Null to leave font alone; or an integer like 16
}


//
//  Produce: module Gem.Opal
//
Producer.produce_Opal = function(Opal, _Opal) {
    Opal.version = '0.0.1'


    //------------------------------------+
    //  Summary: produce module Gem.Opal  |
    //------------------------------------+

    var summary = function() {
    }


    //------------------------------------+
    //  Details: produce module Gem.Opal  |
    //------------------------------------+

    summary()                                               //  Finally: Run all the code in produce_Opal
}


//
//  Produce: module Gem
//
Producer.produce_Gem = function() {
    var _Gem                                                //  Private (forward reference, created below)
    var Gem                                                 //  Exported (forward reference, created below)
    var Producer        = window.Producer
    var debug           = Producer.debug
    var debug_clear     = Producer.debug_clear
    var debug_font_size = Producer.debug_font_size


    //-------------------------------+
    //  Summary: produce module Gem  |
    //-------------------------------+

    var summary = function() {
        clear_console()
        create_Gem()
        cleanup()
        add_methods()
        core()
        Gem.add_portray(Gem)
        core_NodeWebKit()
        execute_producers()
        show_version(_Gem)
        last()
    }


    //-------------------------------+
    //  Details: produce module Gem  |
    //-------------------------------+


    //  Imports
    var define_properties = Object.defineProperties
    var create_Object     = Object.create
    var create_Pattern    = RegExp


    //
    //  GemClass: The metaclass of all Gem classes (including itself)
    //
    var GemMetaClass = create_Object(null)


    GemMetaClass.documentation = 'The metaclass of all Gem classes (including itself)'
    GemMetaClass.class_type = GemMetaClass
    GemMetaClass.class_name = 'GemMetaClass'

    
    function GemClass(constructor, documentation) {
        var name = constructor.name


        function class_type() {
            return this === r ? GemMetaClass : r
        }


        function class_name() {
            return this === r ? 'GemMetaClass' : name
        }


        var r = create_Object(GemMetaClass)

        r.name          = name
        r.documentation = documentation
        r.constructor   = constructor

        define_properties(
                r,
                {
                    class_type:  { get : class_type },
                    class_name : { get : class_name },
                }
            )

        return r
    }


    GemMetaClass.constructor = GemClass


    var AppleClass = GemClass(
            function Apple(name) {
                return create_Object(AppleClass, { name : { value : name } })
            },
            'Example of a class named Apple'
        )

    var Apple = AppleClass.constructor

    window.A = Apple
    window.oc = Object.create

    function last() {
        var a = Apple('green')

        console.log(a)
        window.a = a
    }


    //
    //  Convenience "Classes":
    //      This makes it so "instances" appears as "GemExports" & "GemModule" in the debugger
    //      (which is way nicer than the ubiquitous "Object" appearing in the debugger)
    //
    function GemExports(name) {
        this.name = name
    }


    function GemModule(name) {
        this.name = name
    }


    //  Convenience Functions
    var log = function(/*...*/) {                           //  Easier to type 'log' instead of 'console.log'
        if (window.console) {
            console.log.apply(console, arguments)
        }
    }


    function construct_or_transform(name, instance, constructor) {
        if ( ! instance) {
            return new constructor(name)
        }

        if (instance.constructor.toString() !== constructor.toString()) {
            log('WARNING: Changing class of', name, 'to [newly changed]', constructor.name)
            Object.setPrototypeOf(instance, constructor.prototype)
            log('c:', instance.constructor.toString())
        }

        instance.name = name

        return instance
    }


    //  Implementation: produce window.Gem
    function create_Gem() {
        Gem  = window.Gem  = construct_or_transform('Gem',  window.Gem,  GemExports)
        _Gem = window._Gem = construct_or_transform('_Gem', window._Gem, GemModule)

        Gem.version = '0.0.9'
        _Gem.exports = Gem
    }


    var cleanup = function() {                              //  Remove Producer code
        delete Producer.produce_Gem
        delete window.Producer
    }


    var clear_console = function() {                        //  Clear console, *IF* in debug mode
        if (debug) {
            if (debug_clear) {
                if (window.console) {
                    console.clear()
                }
            }
        }
    }


    var add_methods = function() {
        Gem.add_portray = function(module) {
            module.toString = function() {
                return 'Module(' + module.name + ', ' + module.version + ')'
            }
        }
    }


    var core = function() {                                 //  Core module Gem (stored in 'window.Gem')
    }


    var core_NodeWebKit = function() {                      //  Core NodeWebKit (and others), *IF* using nw.js
        var require = window.require

        if ( ! require) {
            return                                          //   Not running under node-webkit: Done
        }

        //  Import Modules
        var NodeWebKit = (window.nw || require('nw.gui'))
        var FileSystem = require('fs')
        var Path       = require('path')
        var Process    = window.process || require('process')

        //  Imported Functions
        var path_directory_name = Path.dirname
        var path_join           = Path.join
        var path_watch          = FileSystem.watch

        var main_module_directory = path_directory_name(Process.mainModule.filename)
    }


    var execute_producers = function() {                    //  Execute all producers in producer_list
        var producer_pattern = create_Pattern(/^produce_(.*)$/)
        var producer_list    = []                           //  List of producers

        for (var k in Producer) {
            var m = producer_pattern.exec(k)

            if ( ! m) {
                continue                                    //  Ignore: Did not match produce_*
            }

            producer_list.push([m[1], Producer[k]])         //  Sub module name & it's producer function
        }


        producer_list.sort()                                //  Always initialize sub modules in alphabetical order


        for (var i = 0; i < producer_list.length; i ++) {
            var producer_data = producer_list[i]
            var name          = producer_data[0]
            var producer      = producer_data[1]

            var _name = '_' + name

            var module  = Gem[name]  = construct_or_transform(name,  Gem[name],  GemExports)
            var _module = _Gem[name] = construct_or_transform(_name, _Gem[name], GemModule)

            _module.exports = module

            producer(module, _module)

            if (debug) {
                show_version(_module)
            }
        }
    }


    var show_version = function(_module) {                  //  Show version, *IF* in debug mode
        if ( ! debug) {
            return
        }

        var module = _module.exports

        if (_module.changes) {
            _module.changes += 1
            module.version  += '.' + _module.changes
        } else {
            _module.changes = 1
        }

        var begin_font = 'font-weight: bold'
        var end_font   = 'font-weight: normal'

        if (debug_font_size) {
            begin_font += '; font-size: ' + debug_font_size + 'px'
            end_font   += '; font-size: none'
        }

        var end_color_and_font = 'color: none; ' + end_font

        log('%c%s%c %c%s%c %o',
            'color: green;  ' + begin_font, module.name,    end_color_and_font,
            'color: orange; ' + begin_font, module.version, end_color_and_font,
            module,
            _module)
    }


    summary()                                               //  Finally: Run all the code in produce_Gem
}


Producer.produce_Gem()


//
//  NOTE:
//      The full MIT License is available here: https://github.com/Rhodolite/Crystal/blob/master/LICENSE
//      (It is a traditional, unmodified MIT License)
//


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


/*: @plugindesc Opal: Optimal Plugin Automatic Loader */
