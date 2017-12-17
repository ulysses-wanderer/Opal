//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Gem: Global Environment Modules
//
(function module_Gem(){                                     //  Anonymous scope to avoid "polluting" global scope
    "use strict"                                            //  Strict mode helps catch JavaScript errors, very useful!


    function GemModule() {}
    GemModule.prototype = Object.create(null, { constructor : { value : GemModule } })


    //  Local variable `$` is a copy of `window.Gem` as it is shorter & easier to read '$'
    var $ = window.Gem                                      //  Reuse global variable `Gem` ...
        || (window.Gem = new GemModule())                   //      ... or create global variable `Gem`


    $.name          = 'Gem'                                 //  Name of module
    $.version       = '0.0.1'                               //  Version 0.0.2
    $.debug         = true                                  //  Set Gem debug mode to true
    $.debug_clear   = true                                  //  Only meaningful if .debug is also set
    $.debug_clarity = true                                  //  Make easier to read objects for Developer Tools.

    $.GemPrototype__prototype__null = true                  //  Make: GemPrototype.prototype = null


    //----------------------------------+
    //  Summary: produce module Gem  |
    //----------------------------------+


    function summary() {
        clear_console()
        cleanup()
        show_developer_tools()
        show_version()
        development()
    }


    //----------------------------------+
    //  Details: produce module Gem  |
    //----------------------------------+


    //  Imports
    var define_property        = Object.defineProperty      //  Currently unused -- will be used in the future
    var define_properties      = Object.defineProperties
    var set_prototype_of       = Object.setPrototypeOf
    var create_Object          = Object.create
//  var create_Pattern         = RegExp
    var console                = window.console || null
    var process                = window.process || null
    var process__versions      = (process && process.versions) || null
    var parse_integer__or__NaN = Number.parseInt
    var is_NaN                 = Number.isNaN
    var NaN                    = window.NaN


    //  Copy members from $, to local variables (for code clarity below)
    var debug         = $.debug
    var debug_clear   = $.debug_clear
    var debug_clarity = $.debug_clarity


    //  log
    if (console && console.log) {
        var log = function log(/*...*/) {                   //  Easier to type 'log' instead of 'console.log'
            if (console) {
                console.log.apply(console, arguments)
            }
        }
    } else {
        var log = function log(/*...*/) {}
    }


    //  clear_console
    if (console && console.clear) {
        var clear_console = function clear_console() {      //  Clear console, *IF* in debug mode
            if (debug) {
                if (debug_clear) {
                    console.clear()
                }
            }
        }
    } else {
        var clear_console = function clear_console() {}
    }


    //  cleanup
    function cleanup() {
    }


    //  VersionInformation
    function VersionInformation(name, major, minor, micro, release_level) {
        this.name          = name
        this.major         = major
        this.minor         = minor
        this.micro         = micro
        this.release_level = release_level
    }


    VersionInformation.prototype = Object.create(null, { constructor : { value : VersionInformation } })


    VersionInformation.prototype.toString = function VersionInformation__toString() {
        var s = '<VersionInformation ' + this.name

        if ( ! is_NaN(this.major)) { s += ', major: ' + this.major.toString() }
        if ( ! is_NaN(this.minor)) { s += ', minor: ' + this.minor.toString() }
        if ( ! is_NaN(this.micro)) { s += ', micro: ' + this.micro.toString() }

        if ( ! is_NaN(this.release_level)) {
            s += ', release_level: ' + this.release_level.toString()
        }

        return s + '>'
    }


    function create_version_information(name) {
        var major         = NaN
        var minor         = NaN
        var micro         = NaN
        var release_level = NaN

        if (process__versions) {
            var versions = process__versions[name].split('.')
            var total    = versions.length

            if (total > 0) { major         = parse_integer__or__NaN(versions[0]) }
            if (total > 1) { minor         = parse_integer__or__NaN(versions[1]) }
            if (total > 2) { micro         = parse_integer__or__NaN(versions[2]) }
            if (total > 3) { release_level = parse_integer__or__NaN(versions[3]) }
        }

        return new VersionInformation(name, major, minor, micro, release_level)
    }


    var node_webkit_version       = create_version_information('node-webkit')
    var is_node_webkit_12_or_less = (node_webkit_version.major == 0) && (node_webkit_version.minor <= 12)
    var is_node_webkit_13_or_more = (node_webkit_version.major > 0 ) || (node_webkit_version.minor >= 13)



    //  show_developer_tools
    function show_developer_tools() {
        //log('node_webkit_version: ', node_webkit_version.toString(), node_webkit_version)

        if (is_node_webkit_13_or_more) {
            //  Show developer tools (nw.js 0.13 or later version)
            nw.Window.get().showDevTools(false)
        } else if (is_node_webkit_12_or_less) {
            //  Show developer tools (nw.js 0.12 or earlier version)
            require('nw.gui').Window.get().showDevTools()
        }
    }


    //  show_version
    function show_version() {
        var begin_font         = 'font-weight: bold'
        var end_color_and_font = 'font-weight: normal; color: none'

        log('%c%s%c %c%s%c %o',
            'color: green;  ' + begin_font, $.name,    end_color_and_font,
            'color: orange; ' + begin_font, $.version, end_color_and_font,
            $)
    }


    //  Development code
    function old_development() {
        //  GemPrototype
        function GemPrototype() {
        }

        if (7) {
            function GemMetaProtoType() {}

            GemMetaProtoType.prototype = null

            var object_like_prototype = new GemMetaProtoType()

            if (0) {
            var object_like_prototype = Object.create(
                null,
                {
//                  constructor : { value : Object },
//                  hasOwnProperty : { value : Object.prototype.hasOwnProperty },
//                  isPrototypeOf : { value : Object.prototype.isPrototypeOf },
//                  propertyIsEnumerable : { value : Object.prototype.propertyIsEnumerable },
//                  toLocaleString : { value : Object.prototype.toLocaleString },
//                  toString : { value : Object.prototype.toString },
//                  valueOf : { value : Object.prototype.valueOf },
//                  __defineGetter__ : { value : Object.prototype.__defineGetter__ },
//                  __defineSetter__ : { value : Object.prototype.__defineSetter__ },
//                  __lookupGetter__ : { value : Object.prototype.__lookupGetter__ },
//                  __lookupSetter__ : { value : Object.prototype.__lookupSetter__ },
                }
            )
            }

            if (0) {
            GemPrototype.prototype = Object.create(
                    object_like_prototype,
                    { constructor : { value : GemPrototype }  }
                )
            }

            if (is_node_webkit_12_or_less) {
                define_property(
                    GemPrototype,
                    '__proto__',
                    { get : Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').get }
                )
            }

            //GemPrototype.prototype.alternate = object_like_prototype
        }


        var BuildGemClass__slot_name    = { value   : null }
        var BuildGemClass__slot_summary = { summary : null }


        var BuildGemClass__properties = {
            name    : BuildGemClass__slot_name,
            summary : BuildGemClass__slot_summary,
        }


        //  BuildGemClass
        function BuildGemClass(name, summary) {
            BuildGemClass__slot_name   .value = name
            BuildGemClass__slot_summary.value = summary

            define_properties(this, BuildGemClass__properties)
        }

        if (is_node_webkit_12_or_less) {
            function GemPrototype() {}

            Object.setPrototypeOf(GemPrototype, null)
            GemPrototype.prototype = null
            GemPrototype.toString  = function() { return 'class GemPrototype' }

            BuildGemClass.prototype = Object.create(null, { constructor : { value : GemPrototype } })


            //
            //  In nw.js 0.12 or earlier, we need to have a 'get __proto__' method, in order for Developer
            //  Tools to show the `.__proto__` member (this is not neccesary in nw.js 0.13 or later).
            //
            //  NOTE:
            //      The '__proto__' member can *ONLY* be set after the class is created.
            //
            //      If you attempt to set it in the call to Object.create, it will fail -- nasty bug ;(
            //      
            Object.defineProperty(
                     BuildGemClass.prototype,
                    '__proto__',
                    { get : Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').get }
                )
        } else {
            BuildGemClass.prototype = Object.create(null, { constructor : { value : BuildGemClass } })
        }

        function create_gem_class(name, summary) {
            return new BuildGemClass(name, summary)
        }


        var Apple = create_gem_class('Apple', 'An example of a GemClass named Apple')

        log('%o', Apple)
    }


    if (debug_clarity) {
        var specific_string_for_clarity = (
                  '`toString` function to show a specific string in Developer Tools for clarity'
                + ' (debug mode only)'
            )


        function show_specific_string_for_clarity() {
            return specific_string_for_clarity
        }


        set_prototype_of(show_specific_string_for_clarity, null)

        define_properties(
                show_specific_string_for_clarity,
                {
                    summary : {
                        value      : specific_string_for_clarity,
                        enumerable : true//,
                    },
                    prototype : { value : null },
                    toString  : { value : show_specific_string_for_clarity }//,
                }//,
            )

        if (is_node_webkit_13_or_more) {
            delete show_specific_string_for_clarity.length
        }

        window.s3 = show_specific_string_for_clarity
    }


    //  scrub_function: Remove unnecessary methods to minimize what is shown in Developer Toolkit
    var scrub_function = function scrub_function(f, documentation, prototype) {
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

        if (documentation) {
            f.documentation = documentation
        }

        if (prototype) {
            f.prototype = prototype
        }


        //
        //  Needed so the function code shows up in Developer Tools.  Without a 'toString' method the
        //  function just shows up as '#Function' (which is not useful).
        //
        var class_name = 'class ' + f.name

        f.toString = (function toString() { return class_name })

        if (is_node_webkit_13_or_more) {
            delete f.length
        }

        return f
    }



    function development() {
        var GemPrototype__prototype__null = $.GemPrototype__prototype__null

        delete $.GemPrototype__prototype__null


        function GemPrototype() {}


        if (GemPrototype__prototype__null) {
            var GemPrototype__prototype = create_Object(
                                              null,
                                              { constructor : { value : GemPrototype } }
                                          )

            if (process__versions) {
                define_property(
                        GemPrototype__prototype,
                        '__proto__',
                        { get : Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').get }
                    )
            }


            GemPrototype.prototype = GemPrototype__prototype
        }

        var GemPrototype = scrub_function(
                               GemPrototype,
                               'A minimized prototype for Gem Classes',
                               GemPrototype__prototype
                           )


        function create_prototype(name) {
            var constructor = eval(
                      '//  A "constructor" function named `' + name + '` so that Developer Tools\n'
                    + '//  shows the "class name" of an Object as `' + name + '`.\n'
                    + '(function ' + name + '(){})\n'
                )

            var prototype = new GemPrototype()

            define_property(
                    prototype,
                    'constructor',
                    { value : constructor }
                )

            constructor.prototype = prototype

            return prototype
        }


        function create_factory(prototype) {
            var constructor = prototype.constructor


            function create() {
                return new constructor()
            }


            return create
        }


        var ABC        = create_prototype('ABC')
        var create_ABC = create_factory(ABC)

        var abc = window.abc = create_ABC()

        abc.color = 'red'
        abc.__proto__.static_size = 22

        log('%o', abc)
    }


    //  Finally: Run all the code in `Gem`
    summary()
})();


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
/*: @plugindesc Global Environment Modules */
