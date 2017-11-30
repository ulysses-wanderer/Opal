//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//
"use strict"


window._Producer = {
    debug           : true,
    debug_clear     : true,                                 //  Only meaningful if .debug is also set
    debug_font_size : null,                                 //  Null to leave font alone; or an integer like 16
}


//
//  Produce: module Gem.Opal
//
_Producer.module_Opal = function(Opal, _Opal) {
    Opal.version = '0.0.1'


    //------------------------------------+
    //  Summary: produce module Gem.Opal  |
    //------------------------------------+

    var summary = function() {
        run()
    }


    //------------------------------------+
    //  Details: produce module Gem.Opal  |
    //------------------------------------+


    //  Imports
    var GemClass             = Gem.GemClass
    var create_Object        = Gem.create_Object
    var log                  = Gem.log
    var high_resolution_time = Gem.high_resolution_time
    var path_watch           = Gem.path_watch


    //
    //  Classes
    //
    var TimeDeltaClass = GemClass(
            'TimeDelta: Duration expressed as seconds and nanoseconds',
            function TimeDelta(seconds, nanoseconds) {
                var r = create_Object(TimeDeltaClass)

                r.seconds     = seconds
                r.nanoseconds = nanoseconds

                return r
            }//,
        )

    var TimeDelta = TimeDeltaClass.methods(
            function toString() {
                var s = this.seconds    .toString()
                var n = this.nanoseconds.toString()

                switch (n.length) {
                    case 9:     return s + '.'   + n.slice(0, -6) + '_' + n.slice(-6, -3) + '_' + n.slice(-3) + 'ns'
                    case 8:     return s + '.0'  + n.slice(0, -6) + '_' + n.slice(-6, -3) + '_' + n.slice(-3) + 'ns'
                    case 7:     return s + '.00' + n.slice(0, -6) + '_' + n.slice(-6, -3) + '_' + n.slice(-3) + 'ns'
                    case 6:     return s + '.000_'                      + n.slice(0,  -3) + '_' + n.slice(-3) + 'ns'
                    case 5:     return s + '.000_0'                     + n.slice(0,  -3) + '_' + n.slice(-3) + 'ns'
                    case 4:     return s + '.000_00'                    + n.slice(0,  -3) + '_' + n.slice(-3) + 'ns'
                    case 3:     return s + '.000_000_'                                          + n.slice(-3) + 'ns'
                    case 2:     return s + '.000_000_0'                                         + n.slice(-3) + 'ns'
                    case 1:     return s + '.000_000_00'                                        + n.slice(-3) + 'ns'
                }

                throw new TypeError('TimeDelta.toString: invalid nanoseconds: ' + s)
            },

            function delta() {
                var now         = high_resolution_time()
                var seconds     = now[0] - this.seconds
                var nanoseconds = now[1] - this.nanoseconds

                if (nanoseconds < 0) {
                    seconds    -= 1
                    nanoseconds += 1e9
                }

                return TimeDelta(seconds, nanoseconds)
            }
        )


    //  Timing
    var started


    function run() {
        if ( ! Opal.started && 1) {
            var started = high_resolution_time()

            Opal.started = TimeDelta(started[0], started[1])
        }

        started = Opal.started

        log('delta: %s', started.delta().toString())
    }


    //  Finally: Run all the code in module_Opal
    summary()
}


//
//  Produce: module Gem
//
_Producer.module_Gem = function() {
    var _Producer        = window._Producer
    var debug           = _Producer.debug
    var debug_clear     = _Producer.debug_clear
    var debug_font_size = _Producer.debug_font_size


    //-------------------------------+
    //  Summary: produce module Gem  |
    //-------------------------------+

    var summary = function() {
        clear_console()
        create_class_GemMetaClass()
        create_class_GemClass()
        create_class_GemExports()
        create_class_GemModule()
        create_window_Gems()
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
    var define_property   = Object.defineProperty
    var define_properties = Object.defineProperties
    var set_prototype_of  = Object.setPrototypeOf
    var create_Object     = Object.create
    var create_Pattern    = RegExp
    var is_node_120       = window.process && process.versions.node == '1.2.0'


    //  log
    var log = function(/*...*/) {                           //  Easier to type 'log' instead of 'console.log'
        if (window.console) {
            console.log.apply(console, arguments)
        }
    }


    //  ClassMetaClass means class_GemClass (i.e.: the class of GemClass).
    var GemMetaClass


    function create_class_GemMetaClass() {
        if (is_node_120) {
            //
            //  Creating an object that has a class name in Developer tools for node 1.8.0:
            //      The only way is to call 'new' on a function, irrelevant if the function disappears later
            //
            GemMetaClass = new (function GemMetaClass() {}) ()

            set_prototype_of(GemMetaClass, null)
        } else {
            //
            //  Creating an object that has a class name in Developer tools for node 8.6.0:
            //      The only way is to have __proto__.constructor.name, and constructor must be a function
            //
            GemMetaClass = create_Object(
                               create_Object(
                                   null,
                                   { constructor : { value : function GemMetaClass() {} } }
                                )
                            )
        }

        GemMetaClass.documentation = 'The metaclass of all Gem classes (including itself)'
        GemMetaClass.class_type    = GemMetaClass
        GemMetaClass.class_name    = 'GemMetaClass'


        if (debug) {
            window.GemMetaClass = GemMetaClass
        }
    }


    //  GemClass: The metaclass of all Gem classes (including itself)
    var GemClass


    function create_class_GemClass() {
        //
        //  ClassMetaClass means class_GemClass (i.e.: the class of GemClass).
        //
        GemClass = function GemClass(documentation, constructor) {
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

            define_properties(
                    r,
                    {
                        constructor : { value : constructor },
                        class_type  : { get : class_type },
                        class_name  : { get : class_name },
                    }
                )

            return r
        }


        GemMetaClass.methods = function methods(/*...*/) {
            for (var i = 0; i < arguments.length; i ++) {
                var f = arguments[i]

                this[f.name] = f
            }

            return this.constructor
        }


        if (debug) {
            window.GemMetaClass = GemMetaClass
            window.GemClass     = GemClass
        }
    }


    //  GemExports: Exported symbols from a GemModule
    var GemExports


    function create_class_GemExports()
    {
        var class_GemClass = GemClass(
                'GemExports: Exported symbols from a GemModule',
                function GemExports(name) {
                    return create_Object(class_GemClass, { name : { value : name } })
                }//,
            )

        GemExports = class_GemClass.methods()
    }


    //  GemModule: Private members and also the .exports for public members
    var GemModule


    function create_class_GemModule() {
        var class_GemModule = GemClass(
                'GemModule: Private members and also the .exports for public members',
                function GemModule(name) {
                    return create_Object(class_GemModule, { name : { value : name } })
                }//,
            )

        GemModule = class_GemModule.methods()

        if (debug) {
            window.GemModule = GemModule
        }
    }


    function last() {
        log('%o', GemMetaClass)
    }


    function create_class_Apple()
    {
        var class_Apple = GemClass(
                'Example of a class named Apple',
                function Apple(name) {
                    log('class_Apple:', class_Apple)
                    return create_Object(class_Apple, { name : { value : name } })
                }
            )

        var Apple = class_Apple.constructor

        console.log(Apple('green'))

        var a = Apple('red')

        window.a = a
        window.Apple = Apple

        log('%o', a)
    }


    //  construct_or_transform
    function construct_or_transform(name, instance, constructor) {
        if ( ! instance) {
            return new constructor(name)
        }

        //
        //   Need to improve this
        //
        if (instance.constructor.toString() !== constructor.toString()) {
            log('WARNING: Changing class of', name, 'to [newly changed]', constructor.name)
            Object.setPrototypeOf(instance, constructor.prototype)
        }

        define_property(instance, 'name', { value : name })

        return instance
    }


    //  Implementation: produce window.Gem
    var _Gem                                                //  Private
    var Gem                                                 //  Exported

    function create_window_Gems() {
        Gem  = window.Gem  = construct_or_transform('Gem',  window.Gem,  GemExports)
        _Gem = window._Gem = construct_or_transform('_Gem', window._Gem, GemModule)

        Gem.version = '0.0.9'
        _Gem.exports = Gem
    }


    var cleanup = function() {                              //  Remove _Producer code
        delete _Producer.module_Gem
        delete window._Producer
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
        Gem.GemClass      = GemClass
        Gem.create_Object = create_Object
        Gem.log           = log
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
        var Process    = window.process

        //  Imported Functions
        var path_directory_name = Path.dirname
        var path_join           = Path.join

        Gem.high_resolution_time = Process.hrtime
        Gem.path_watch           = FileSystem.watch

        var main_module_directory = path_directory_name(Process.mainModule.filename)
    }


    var execute_producers = function() {                    //  Execute all producers in producer_list
        var producer_pattern = create_Pattern(/^module_(.*)$/)
        var producer_list    = []                           //  List of producers

        for (var k in _Producer) {
            var m = producer_pattern.exec(k)

            if ( ! m) {
                continue                                    //  Ignore: Did not match module_*
            }

            producer_list.push([m[1], _Producer[k]])         //  Sub module name & it's _producer function
        }


        producer_list.sort()                                //  Always initialize sub modules in alphabetical order


        for (var i = 0; i < producer_list.length; i ++) {
            var producer_data = producer_list[i]
            var name          = producer_data[0]
            var _producer      = producer_data[1]

            var _name = '_' + name

            var module  = Gem[name]  = construct_or_transform(name,  Gem[name],  GemExports)
            var _module = _Gem[name] = construct_or_transform(_name, _Gem[name], GemModule)

            _module.exports = module

            _producer(module, _module)

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


    //  Finally: Run all the code in module_Gem
    summary()
}


_Producer.module_Gem()


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

//-----------------------------------------------------------------------------------------------+
//  This code does not use the 'class' keyword on purpose.                                       |
//  Reasoning: https://medium.com/javascript-scene/how-to-fix-the-es6-class-keyword-2d42bb3f4caf |
//-----------------------------------------------------------------------------------------------+


/*: @plugindesc Opal: Optimal Plugin Automatic Loader */
