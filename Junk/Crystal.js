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
        create_class_TimeDelta()
        run()
    }


    //------------------------------------+
    //  Details: produce module Gem.Opal  |
    //------------------------------------+


    //  Imports
    var create_fake_constructor = Gem.create_fake_constructor
    var create_gem_class        = Gem.create_gem_class
    var high_resolution_time    = Gem.high_resolution_time
    var log                     = Gem.log
    var path_watch              = Gem.path_watch
    var use_fake_constructor    = Gem.use_fake_constructor


    //
    //  Classes
    //
    var create_TimeDelta
    var TimeDelta


    function create_class_TimeDelta() {
        var class_name       = 'TimeDelta'
        var documentation    = class_name + ': Duration expressed as seconds and nanoseconds'
        var fake_constructor = create_fake_constructor(class_name)

        TimeDelta = create_gem_class(class_name, documentation)

        create_TimeDelta = function create_TimeDelta(seconds, nanoseconds) {
            var instance = use_fake_constructor(fake_constructor)

            instance.seconds     = seconds
            instance.nanoseconds = nanoseconds

            return instance
        }

        TimeDelta.toString = function toString() {
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
        }

        TimeDelta.delta = function delta() {
            var now         = high_resolution_time()
            var seconds     = now[0] - this.seconds
            var nanoseconds = now[1] - this.nanoseconds

            if (nanoseconds < 0) {
                seconds    -= 1
                nanoseconds += 1e9
            }

            return TimeDelta(seconds, nanoseconds)
        }
    }


    //  Timing
    var started


    function run() {
        if ( ! Opal.started && 1) {
            var started = high_resolution_time()

            Opal.started = create_TimeDelta(started[0], started[1])
        }

        started = Opal.started

        //log('delta: %s', started.delta().toString())
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
        create_class_Apple()
        last()
    }


    //-------------------------------+
    //  Details: produce module Gem  |
    //-------------------------------+


    //  Imports
    var define_property    = Object.defineProperty
    var define_properties  = Object.defineProperties
    var set_prototype_of   = Object.setPrototypeOf
    var create_Object      = Object.create
    var create_Pattern     = RegExp
    var is_node_120        = window.process && process.versions.node == '1.2.0'


    //  log
    var log = function(/*...*/) {                           //  Easier to type 'log' instead of 'console.log'
        if (window.console) {
            console.log.apply(console, arguments)
        }
    }


    //  function_to_string: convert a function to a string
    var original_function_to_string = Function.toString


    var function_to_string = function toString() {
        return original_function_to_string.call(this)
    }



    //  scrub_function: Remove unnecessary methods to minimize what is shown in Developer Toolkit
    var scrub_function = function scrub_function(f, documentation) {
        //
        //  NOTE #1:
        //      It is quite confusing in Javascript, but a function has two "prototype's":
        //
        //          1.  It's prototype (i.e.: `__proto__`) which is the type of the function, this typically
        //              has the value of `Function.prototype`.
        //          2.  It's `.prototype` member which is the type of the class it creates when used as a
        //              class "constructor".
        //
        //      In the code below both "prototype's" are being set to null.
        //
        //  NOTE #2:
        //      Even worse setting the `.prototype` member to null doesn't really seem work, as JavaScript Engines
        //      will tend to 'recreate' the .prototype member when it is accessed.
        //      
        //      However, if it is not accessed, then on some JavaScript engines, it will actually stay null ...
        //      ... so it is worthwhile to try to set it to null, just in case it actually works ...
        //
        set_prototype_of(f, null)
        f.prototype = null


        if (documentation) {
            f.documentation = documentation
        }


        //
        //  Needed so the function code shows up in Developer Tools.  Without a 'toString' method the
        //  function just shows up as '#Function' (which is not useful).
        //
        f.toString = function_to_string

        if ( ! is_node_120) {
            delete f.length
        }

        return f
    }


    scrub_function = scrub_function(                        //  Scrub myself ;)
            scrub_function,
            'scrub_function: Remove unnecessary methods to minimize what is shown in Developer Toolkit'
        )


    function_to_string = scrub_function(function_to_string) //  Scrub function_to_string

    scrub_function    .to_string = function_to_string       //  Replace my function_to_string with a scrubbed version
    function_to_string.to_string = function_to_string       //  Replace my function_to_string with a scrubbed version


    if (debug) {
        window.sf = scrub_function
    }


    //  create_fake_constructor: Create a fake constructor so that Developer Tools shows the "class name" of an Object
    function create_fake_constructor(name, changes) {
        if (changes) {
            name += '$' + changes
        }

        if (is_node_120) {
            var comment = '//  A "constructor" function named `' + name + '` so that Developer Tools\n'
                        + '//  shows the "class name" of an Object as `' + name + '`.\n'
        } else {
            var comment = '//  An unused fake "constructor" function named `' + name + '` so that\n'
                        + '//  Developer Tools shows the "class name" of Object using this prototype\n'
                        + '//  as `' + name + '`.\n'
        }

        return scrub_function(eval(comment + '(function ' + name + '(){})\n'))
    }


    if (debug) {
        window.cfc = create_fake_constructor
    }


    //  use_fake_constructor: Use a fake constructor so that Developer Tools shows the "class name" of an Object
    var use_fake_constructor


    if (is_node_120) {
        use_fake_constructor = function use_fake_constructor(fake_constructor, properties) {
            //
            //  Creating an object that has a class name in Developer tools for node 1.8.0:
            //      The only way is to call 'new' on a function.
            //      Also, for node 1.8.0, it is irrelevant if the function disappears later
            //
            //      Unlike node 1.8.0 (where it is irrelevant if the function disappears later), this
            //      structure (of `.__proto__.constructor.name` for a class name) *MUST* exist at the time
            //      the object is first examined (in Developer Tools).
            //      
            //      The first time the object is examined in Developer tools it acquires it's "class name" from
            //      `.__proto__.constructor.name`, and henceforth even if `.__proto__.constructor.name` is
            //      changed afterward, it will stick with the first "class name" it acquired.
            //
            var instance = new fake_constructor()

            //
            //  NOTE #3:
            //      See NOTE #2 in `create_fake_constructor` that setting the constructors `.prototype` member
            //      does not work on some JavaScript Engines.
            // 
            //      Due to this insanity, we actually have to set `instance.__proto__` to null, since it
            //      might have inherited the [newly created] `fake_constructor.prototype`.
            //      
            set_prototype_of(instance, null)

            if (properties) {
                define_properties(instance, properties)
            }

            return instance
        }
    } else {
        use_fake_constructor = function use_fake_constructor(fake_constructor, properties) {
            //
            //  Creating an object that has a class name in Developer tools for node 8.6.0:
            //      The only way is to have __proto__.constructor.name, and [fake] constructor must be a function.
            //
            return create_Object(
                            create_Object(
                                null,
                                { constructor : { value : fake_constructor  } }
                            ),
                            properties
                        )
        }
    }


    if (debug) {
        window.ufc = use_fake_constructor
    }
    


    //  ClassMetaClass: means class_GemClass (i.e.: the class of GemClass).
    var GemMetaClass


    function create_class_GemMetaClass() {
        var fake_constructor = create_fake_constructor('GemMetaClass')

        GemMetaClass               = use_fake_constructor(fake_constructor)
        GemMetaClass.documentation = 'The metaclass of all Gem classes (including itself)'
        GemMetaClass.class_type    = GemMetaClass
        GemMetaClass.class_name    = 'GemMetaClass'


        GemMetaClass.methods = function methods(/*...*/) {
            for (var i = 0; i < arguments.length; i ++) {
                var f = arguments[i]

                this[f.name] = f
            }
        }


        var methods = GemMetaClass.methods

        set_prototype_of(methods, null)
        methods.prototype = null

        if ( !is_node_120) {
            delete methods.length
        }

        if (debug) {
            window.mc = GemMetaClass
        }
    }


    //  create_gem_class: create a Gem class
    function create_gem_class(name, documentation) {
        var fake_constructor = create_fake_constructor(name)
        var Meta             = use_fake_constructor(fake_constructor)

        Meta.name          = name
        Meta.documentation = documentation

        function class_type() {
            return this === Meta ? GemMetaClass : r
        }


        function class_name() {
            return this === Meta ? 'GemMetaClass' : name
        }


        define_properties(
                Meta,
                {
                    class_type : { get : class_type },
                    class_name : { get : class_name },
                }
            )

        return Meta
    }


    //  GemSlot: A read only member of a class
    var GemSlot


    function create_class_GemSlot() {
    }



    //  GemExports: Exported symbols from a GemModule
    var create_GemExports
    var GemExports


    function create_class_GemExports()
    {
        var class_name       = 'GemExports'
        var documentation    = class_name + ': Exported symbols from a GemModule'
        var fake_constructor = create_fake_constructor(class_name)

        GemExports = create_gem_class(class_name, documentation)

        create_GemExports = function create_GemExports(name) {
            return use_fake_constructor(fake_constructor, { name : { value : name } })
        }
    }


    //  GemModule: Private members and also the .exports for public members
    var create_GemModule
    var GemModule


    function create_class_GemModule() {
        var class_name       = 'GemModule'
        var documentation    = class_name + ': Private members and also the .exports for public members'
        var fake_constructor = create_fake_constructor(class_name)

        GemModule = create_gem_class(class_name, documentation)

        create_GemModule = function create_GemModule(name) {
                return use_fake_constructor(fake_constructor, { name : { value : name } })
            }
    }


    function last() {
    }


    function create_class_Apple()
    {
        var class_name       = 'Apple'
        var documentation    = class_name + ': Example of a Gem class named Apple'
        var fake_constructor = create_fake_constructor(class_name)

        var construct_Apple = function Apple(name) {
            this.name = name
        }

        var Apple = create_gem_class(class_name, documentation)

        set_prototype_of(fake_constructor, null)            //  Sets `.__proto__` to null
        fake_constructor.prototype = null                   //  Sets `.prototype` to null

        Apple.prototype = construct_Apple

        var create_Apple = function create_Apple(name) {
            return new construct_Apple(name)
        }

        console.log('%o', create_Apple('green'))

        window.CA = create_Apple
        window.A  = Apple
    }


    //  construct_or_transform
    function construct_or_transform(name, instance, constructor) {
        if ( ! instance) {
            log('constructor: %o', constructor)

            return constructor(name)
        }

        //
        //   Need to improve this
        //
        if (0) {
            if (instance.constructor.toString() !== constructor.toString()) {
                log('WARNING: Changing class of', name, 'to [newly changed]', constructor.name)
                Object.setPrototypeOf(instance, constructor.prototype)
            }
        }

        define_property(instance, 'name', { value : name })

        return instance
    }


    //  Implementation: produce window.Gem
    var _Gem                                                //  Private
    var Gem                                                 //  Exported

    function create_window_Gems() {
        Gem  = window.Gem  = construct_or_transform('Gem',  window.Gem,  create_GemExports)
        _Gem = window._Gem = construct_or_transform('_Gem', window._Gem, create_GemModule)

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


    var core = function core() {                            //  Core module Gem (stored in 'window.Gem')
        Gem.create_gem_class        = create_gem_class
        Gem.log                     = log
        Gem.create_fake_constructor = create_fake_constructor
        Gem.use_fake_constructor    = use_fake_constructor
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

            var module  = Gem[name]  = construct_or_transform(name,  Gem[name],  create_GemExports)
            var _module = _Gem[name] = construct_or_transform(_name, _Gem[name], create_GemModule)

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
