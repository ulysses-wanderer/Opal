//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Copyright (c) 2015 KADOKAWA CORPORATION./YOJI OJIMA.  Licensed under the MIT License.
//  Silver: Show Important Local Variables, Extensible Research
//
//  NOTE:
//      This copies some code form rpg_core.js which is "Copyright (c) 2015 KADOKAWA CORPORATION./YOJI OJIMA."
//      Lines that are from rpg_core.js are marked with: // <copied: rpg_core.js />
//
(function module_Silver(){                                  //  Anonymous scope to avoid "polluting" global scope
    "use strict"                                            //  Strict mode helps catch JavaScript errors, very useful!


    function GemModule() {}
    GemModule.prototype = Object.create(null, { constructor : { value : GemModule } })


    //  Local variable `$` is a copy of `window.Silver` as it is shorter & easier to read '$'
    var $ = window.Silver                                   //  Reuse global variable `Silver` ...
        || (window.Silver = new GemModule())                //      ... or create global variable `Silver`


    $.name        = 'Silver'                                //  Name of module
    $.version     = '0.0.2'                                 //  Version 0.0.2
    $.debug       = true                                    //  Set Silver debug mode to true
    $.debug_clear = true                                    //  Only meaningful if .debug is also set


    //----------------------------------+
    //  Summary: produce module Silver  |
    //----------------------------------+


    function summary() {
        clear_console()
        cleanup()
        show_developer_tools()
        show_Utils()
        development()
        show_version()
    }


    //----------------------------------+
    //  Details: produce module Silver  |
    //----------------------------------+


    //  Imports
//  var define_property        = Object.defineProperty      //  Currently unused -- will be used in the future
//  var define_properties      = Object.defineProperties
    var set_prototype_of       = Object.setPrototypeOf
//  var create_Object          = Object.create
//  var create_Pattern         = RegExp
    var console                = window.console || null
    var process                = window.process || null
    var process__versions      = (process && process.versions) || null
    var parse_integer__or__NaN = Number.parseInt
    var is_NaN                 = Number.isNaN
    var NaN                    = window.NaN


    //  Copy members from $, to local variables (for code clarity below)
    var debug       = $.debug
    var debug_clear = $.debug_clear


    //  group_closed
    if (console && console.groupCollapsed) {
        var group_closed = function group_closed(/*...*/) {//  group_closed: Instead of `console.groupCollapsed`
            console.groupCollapsed.apply(console, arguments)
        }
    } else {
        var group_closed = function group_closed(/*...*/) {}
    }


    //  group_end                     
    if (console && console.groupEnd) {
        var group_end = function group_end() {              //  group_end: Easier to type than `console.groupEnd`
            console.groupEnd()
        }
    } else {
        var group_end = function group_end(/*...*/) {}
    }


    //  group_open
    if (console && console.group) {
        var group_open = function group_open(/*...*/) {   //  group_open: Easier to type than `console.group`
            console.group.apply(console, arguments)
        }
    } else {
        var group_open = function group_open(/*...*/) {}
    }


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
    function clear_console() {                              //  Clear console, *IF* in debug mode
        if (debug) {
            if (debug_clear) {
                if (console) {
                    console.clear()
                }
            }
        }
    }


    function group_path(header, path, line_number, comment) {
        if (comment) {
            group_open('%c%s%c: %s %c(from %s, line #%d)%c',
                       'color: green', header, 'color: none',
                       comment,
                       'font-style: italic; color: #C0C0C0', path, line_number, 'font-style: none; color: none')

            return
        }

        group_open('%c%s%c %c(from %s, line #%d)%c',
                   'color: green', header, 'color: none',
                   'font-style: italic; color: #C0C0C0', path, line_number, 'font-style: none; color: none')
    }

    function group_nested(header, line_number, comment, options) {
        if (options && options.show_open) {
            var group_start = group_open
        } else { 
            var group_start = group_closed
        }

        if (comment) {
            group_start('%c%s%c; %s %c#%d%c',
                        'color: green', header, 'color: none',
                        comment,
                        'font-style: italic; color: #C0C0C0', line_number, 'font-style: none; color: none')

            return
        }

        if (line_number) {
            group_start('%c%s%c %c#%d%c',
                        'color: green', header, 'color: none',
                        'font-style: italic; color: #C0C0C0', line_number, 'font-style: none; color: none')

            return
        }

        group_start('%c%s%c', 'color: green', header, 'color: none')
    }


    function show_code(f, line_number)
    {
        group_nested('Code', line_number)
        log(f)
        group_end()
    }


    function show_test_code(test_code)
    {
        group_nested('Test Code')
        log(test_code)
        group_end()
    }

    
    function show_method(
            function_name, comment__line_number, comment,
            explanation, tests,
            f, function__line_number,
            test_code,
            options
    ) {
        group_nested(function_name, comment__line_number, comment, options)

        if (explanation) {
            log(explanation)
        }

        tests()
        show_code(f, function__line_number)

        if (test_code) {
            show_test_code(test_code)
        }

        group_end()
    }


    function show_value(header, value, line_number, comment) {
        if (comment) {
            if (line_number) {
                log('%c%s%c: %c%s%c; %s %c#%d%c',
                    'color: green', header, 'color: none',
                    'font-weight: bold; color: orange', value, 'font-weight: none; color: none',
                    comment,
                    'font-style: italic; color: #C0C0C0', line_number, 'font-style: none; color: none')

                return
            }

            log('%c%s%c: %c%s%c; %s',
                'color: green', header, 'color: none',
                'font-weight: bold; color: orange', value, 'font-weight: none; color: none',
                comment)

            return
        }

        if (line_number) {
            log('%c%s%c: %c%s%c %c#%d%c',
                'color: green', header, 'color: none',
                'font-weight: bold; color: orange', value, 'font-weight: none; color: none',
                'font-style: italic; color: #C0C0C0', line_number, 'font-style: none; color: none')

            return
        }

        log('%c%s%c: %c%s%c',
            'color: green', header, 'color: none',
            'font-weight: bold; color: orange', value, 'font-weight: none; color: none')
    }


    //  cleanup
    function cleanup() {
    }


    function VersionInformation(name, major, minor, micro, release_level) {
        this.name          = name
        this.major         = major
        this.minor         = minor
        this.micro         = micro
        this.release_level = release_level
    }


    VersionInformation.prototype = Object.create(
            null,
            {
                constructor : { value : VersionInformation },
                toString    : {
                    value : function VersionInformation__toString() {
                                var s = '<VersionInformation ' + this.name

                                if ( ! is_NaN(this.major)) { s += ', major: ' + this.major.toString() }
                                if ( ! is_NaN(this.minor)) { s += ', minor: ' + this.minor.toString() }
                                if ( ! is_NaN(this.micro)) { s += ', micro: ' + this.micro.toString() }

                                if ( ! is_NaN(this.release_level)) {
                                    s += ', release_level: ' + this.release_level.toString()
                                }

                                return s + '>'
                            }//,
                }//,
            }//,
        )


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


    //  show_developer_tools
    function show_developer_tools() {
        var version = create_version_information('node-webkit')

        log('version: ', version.toString(), version)

        if (version.major > 0 || version.minor > 12) {
            //  Show developer tools (nw.js 0.13 or later version)
            nw.Window.get().showDevTools(false)
        } else {
            //  Show developer tools (nw.js 0.12 or earlier version)
            require('nw.gui').Window.get().showDevTools()
        }
    }


    //  show_Utils
    function show_Utils() {
        group_path(
            'Utils', 'rpg_core.js', 157,
            'The static class that defines utility methods.'//,             // <copied: rpg_core.js:157 />
        )

        show_value(
            'RPGMAKER_NAME', Utils.RPGMAKER_NAME, 166,
            "The name of the RPG Maker. 'MV' in the current version."//,    // <copied: rpg_core.js:166 />
        )

        show_value(
            'RPGMAKER_VERSION', Utils.RPGMAKER_VERSION, 176,
            'The version of the RPG Maker.'//,                              // <copied: rpg_core.js:176 />
        )

        function show_IsOptionValid() {
            show_method(
                'isOptionValid', 186,
                'Checks whether the option is in the query string.',            // <copied: rpg_core.js:186 />
                "Utils.isOptionValid('test') is used to check if running in debug mode.",
                (function() {
                    show_value("Utils.isOptionValid('test')",        Utils.isOptionValid('test'))
                    show_value("Utils.isOptionValid('nonexistent')", Utils.isOptionValid('nonexistent'))
                }),
                Utils.isOptionValid, 193,
                show_IsOptionValid//,
            )
        }

        show_IsOptionValid()

        
        show_method(
            'isNwjs', 198,
            'Checks whether the platform is NW.js.',                        // <copied: rpg_core.js:198 />
            'Utils.isNwjs is used to check if running under Node WebKit instead of a browser.',
            (function() {
                show_value('Utils.isNwjs()', Utils.isNwjs())
            }),
            Utils.isNwjs, 204//,
        )

        show_method(
            'isMobileDevice', 209,
            'Checks whether the platform is a mobile device.',              // <copied: rpg_core.js:209 />
            null,
            (function() {
                show_value('Utils.isMobileDevice()', Utils.isMobileDevice())
            }),
            Utils.isMobileDevice, 215//,
        )

        show_method(
            'isMobileSafari', 221,
            'Checks whether the browser is Mobile Safari.',                 // <copied: rpg_core.js:221 />
            null,
            (function() {
                show_value('Utils.isMobileSafari()', Utils.isMobileSafari())
            }),
            Utils.isMobileSafari, 227//,
        )

        show_method(
            'isAndroidChrome', 234,
            'Checks whether the browser is Android Chrome.',                // <copied: rpg_core.js:234 />
            null,
            (function() {
                show_value('Utils.isAndroidChrome()', Utils.isAndroidChrome())
            }),
            Utils.isAndroidChrome, 240//,
        )

        show_method(
            'canReadGameFiles', 246,
            'Checks whether the browser can read files in the game folder.',// <copied: rpg_core.js:246 />
            null,
            (function() {
                show_value('Utils.canReadGameFiles()', Utils.canReadGameFiles())
            }),
            Utils.canReadGameFiles, 252//,
        )

        function show_rgbToCssColor() {
            show_method(
                'rgbToCssColor', 267,
                'Makes a CSS color string from RGB values.',                    // <copied: rpg_core.js:267 />
                null,
                (function show_colors() {
                    log('Colors can be found at: ', 'https://www.w3schools.com/colors/colors_names.asp')

                    var test_list = [
                        [   'blue',           0,      0,    255     ],
                        [   'blue-violet',  138,     43,    226     ],
                        [   'dark-orange',  255,    140,      0     ],
                        [   'chocolate',    210,    105,     30     ],
                        [   'green',          0,    255,      0     ],
                        [   'golden-rod',   218,    165,     32     ],
                        [   'light-pink',   255,    182,    193     ],
                        [   'red',          255,      0,      0     ],
                        [   'purple',       255,      0,    255     ],
                    ]


                    var non_breaking_space = String.fromCharCode(160)


                    function three_digits(v) {
                        var s = v.toString()

                        switch (s.length) {
                            case 1: return non_breaking_space + non_breaking_space + s
                            case 2: return non_breaking_space                      + s
                            case 3: return                                         + s
                        }
                    }


                    for (var i = 0; i < test_list.length; i ++) {
                        var test   = test_list[i]
                        var name   = test[0]
                        var red    = test[1]
                        var green  = test[2]
                        var blue   = test[3]
                        var color  = Utils.rgbToCssColor(red, green, blue)
                        var header = 'Utils.rgbToCssColor'
                                   + '('  + three_digits(red  )
                                   + ', ' + three_digits(green)
                                   + ', ' + three_digits(blue )
                                   + ')'

                        log('%c%s%c: %c%s%c',
                            'color: green', header, 'color: none',
                            'font-weight: bold; color: ' + color, name, 'font-weight: none; color: none')
                    }
                }),
                Utils.rgbToCssColor, 252,
                show_rgbToCssColor,
                { show_open : true }//,                         //  This one is pretty, show open by default
            )
        }

        show_rgbToCssColor()


        function show_generateRuntimeId() {
            show_method(
                'generateRuntimeId', 284,
                'Generates a unique identifier each time it is called',
                null,
                (function() {
                    log('Everytime Utils.GenerateRunTimeId() is called it generates a new unique identifier')
                        
                    show_value(
                        '_id', Utils._id, 283,
                        'The sample here shows the initial value of Utils._id'
                    )

                    show_value('Utils.generateRuntimeId()', Utils.generateRuntimeId())

                    for (var i = 0; i < 3; i ++) {
                        show_value(
                            'Utils.generateRuntimeId()',
                            Utils.generateRuntimeId(),
                            null,
                            'One more than previous line'
                        )
                    }

                    show_value(
                        '_id', Utils._id, 283,
                        'After the four calls above, the updated value of Utils._id'
                    )
                }),
                Utils.generateRuntimeId, 284,
                show_generateRuntimeId//,
            )
        }

        show_generateRuntimeId()

        show_method(
            'isSupportPassiveEvent', 290,
            'Test [if] this browser support[s] [the] passive event feature',    // <copied: rpg_core.js:290/>
            null,
            (function() {
                show_value('Utils.isSupportPassiveEvent()', Utils.isSupportPassiveEvent())

                show_value(
                    '_supportPassiveEvent', Utils._supportPassiveEvent, 288,
                    'Cached value from calling Utils.isSupportPassiveEvent() the first time'//,
                )
            }),
            Utils.isSupportPassiveEvent, 296//,
        )

        log('%s %o %c%s%c',
            'Utils.prototype:',
            Utils.prototype,
            'font-style: italic; color: #C0C0C0',
            'You can click on Utils.constructor to see how Developer Tools shows what is in Utils',
            'font-style: none; color: none'//,
        )

        group_end()
    }


    //  Development code
    function development() {
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


    //  Finally: Run all the code in `Silver`
    summary()
})()


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//
//  The full MIT License, for the code by Joy Diamond, is available here:
//      https://github.com/Rhodolite/Opal/blob/master/LICENSE
//
//  The full MIT License, for the code by KADOKAWA CORPORATION./YOJI OJIMA, is available here:
//      https://github.com/rpgtkoolmv/corescript/blob/master/LICENSE
//

/*: @plugindesc Show Important Local Variables, Extensible Research */
