//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//
(function(){                                                //  Anonymous scope to avoid "polluting" global scope
    var $ = Gem

    $.debug_clear   = true
    $.final_cleanup = false


    //-------------------------------+
    //  Summary: produce module Gem  |
    //-------------------------------+

    var summary = function() {
        show_developer_tools()
        clear_console()
        cleanup()
        domain_object_model__clarity()
        show_script_list()
        last()
    }


    //-------------------------------+
    //  Details: produce module Gem  |
    //-------------------------------+


    //  Imports
    var body                 = document.body
    var head                 = document.head
    var define_property      = Object.defineProperty
    var define_properties    = Object.defineProperties
    var set_prototype_of     = Object.setPrototypeOf
    var create_Object        = Object.create
    var create_Pattern       = RegExp
    var origin_prefix        = window.location.origin + '/'
    var origin_prefix__total = origin_prefix.length


    //  Copy members from $, to local variables (for code clarity below)
    var beryl_boot_error            = $.beryl_boot_error
    var beryl_boot_path             = $.beryl_boot_path
    var beryl_script                = $.beryl_script
    var debug                       = $.debug
    var debug_clear                 = $.debug_clear
    var is_node_webkit_12_or_lower  = $.is_node_webkit_12_or_lower
    var is_node_webkit_13_or_higher = $.is_node_webkit_13_or_higher
    var show_developer_tools        = $.show_developer_tools


    //  log
    if (window.console && console.log) {
        var log = console.log.bind(console)                 //  Easier to type `log` instead of `window.log`
    } else {
        var log = function log(/*...*/) {}
    }


    //  clear_console
    function clear_console() {                              //  Clear console, *IF* in debug mode
        if (debug) {
            if (debug_clear) {
                if (window.console) {
                    console.clear()
                }
            }
        }
    }


    //  cleanup
    function cleanup() {
        if (beryl_script) {
            if (beryl_boot_error) {
                if (beryl_script.removeEventListener) {
                    beryl_script.removeEventListener('error', beryl_boot_error)     //  New way: using event listeners
                } else if (beryl_script.removeAttribute) {          //  Old way: without event listener
                    beryl_script.removeAttribute('onerror')
                } else {                                            //  Really old way: without .removeAttribute
                    beryl_script.onerror = null
                }
            }

            if ($.final_cleanup) {
                delete $.beryl_script
            }
        }

        if (beryl_boot_error) {
            delete $.beryl_boot_error
            delete beryl_boot_error
        }

        if (beryl_boot_path) {
            if ($.final_cleanup) {
                delete $.beryl_boot_path
            }
        }

    }


    function domain_object_model__clarity() {
        var title           = null
        var insert_after    = null
        var setup           = null
        var library_scripts = null
        var rpg_scripts     = null
        var plugins         = null
        var gem_scripts     = null


        function clarity__summary() {
            title_clarity()

            setup = create_division('setup')
            adopt_children(setup, 'meta')
            adopt_children(setup, 'link')

            library_scripts = create_division('library_scripts')
            rpg_scripts     = create_division('rpg_scripts')
            plugins         = create_division('plugins')
            gem_scripts     = create_division('gem_scripts')
        }



        function title_clarity() {
            var title_list  = document.getElementsByTagName('title')
            var title_total = title_list.length

            if (title_total != 1) {
                throw Error('Expected exactly one <title>, found ' + title_total + ' titles')
            }

            title = title_list[0]

            if (title !== head.firstChild) {
                head.insertBefore(title, head.firstChild)
            }

            insert_after = title
        }


        function create_division(id) {
            var division = document.getElementById(id)

            if (division === null) {
                division = document.createElement('div')

                division.setAttribute('id', id)

            }

            head.insertBefore(division, insert_after.nextSibling)
            insert_after = division

            return division
        }


        function adopt_children(parent, tag_name) {
            var tag_list  = document.getElementsByTagName(tag_name)
            var tag_total = tag_list.length

            for (var i = 0; i < tag_list.length; i ++) {
                var tag = tag_list[i]

                if (tag.parentNode != parent) {
                    parent.appendChild(tag)
                }
            }
        }


        clarity__summary()
    }


    //  show_script_list
    function show_script_list() {
        var script_list = document.getElementsByTagName('script')

        for (var i = 0; i < script_list.length; i ++) {
            var script = script_list[i]

            var source = script.src
            var type   = script.type

            if (type == 'text/javascript') {
                script.removeAttribute('type')
            }

            if (source.startsWith(origin_prefix)) {
                source = source.substring(origin_prefix__total)
            }

            if (source === beryl_boot_path && script !== beryl_script) {
                script.parentNode.removeChild(script)
                continue
            }

            var parent = head;

            if (source.startsWith('js/libs/')) {
                parent = library_scripts
            } else if (source.startsWith('js/rpg_') || source == 'js/plugins.js' || source == 'js/main.js') {
                parent = rpg_scripts
            } else if (source.startsWith('js/plugins/')) {
                parent = plugins
            } else if (script === beryl_script || source.startsWith('Gem/')) {
                parent = gem_scripts
            }

            if (script.parentNode !== parent) {
                parent.appendChild(script)
            }
        }
    }


    //  Development code
    function last() {
    }


    //  Finally: Run all the code in module_Gem
    summary()
})()


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
