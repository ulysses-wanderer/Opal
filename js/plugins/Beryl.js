//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Beryl: Boot Engine, Reliable Yet Limber
//
"use strict"                                                //  Strict mode helps catch JavaScript errors, very useful!


//
//  Create global variable `Gem`
//
//  NOTE:
//      Later `Gem` will be replaced with a proper instance of class `Gem.module.Gem.Global`
//
window.Gem = {
        clarity : true,                                     //  Set Gem clarity mode to true
        debug   : true,                                     //  Set Gem debug mode to true
        scripts : {}//,
    }


//
//  In Gem "clarity" mode, *every* object created has a `.$name` and `.$summary` member to help introspect the object
//  in developer tools:
//
//      This makes it a lot clearer what the object is used for.
//
//      All "clarity" objects begin with `$` (see below for an exeption, when instead `.__name__`
//      or `.__summary__` is used to avoid conflicts).
//
//      Also each module appears in `Gem.$modules.ModuleName`, with each member of that module having a
//      `.$name` & `.$summary` members.
//
//      By *every* object this includes all closure objects that are used.  This make it very easy to examine
//      the `.[[Scopes]]` member of a function and introspect the value of each of it's closure objects.
//
//      When an object uses `.$name` or `.$summary` members for it's own purposes, then the extra members created
//      are named `.__name__` and `.__summary__` to avoid conflicts.
//
if (Gem.clarity) {
    Gem.$name    = 'Gem'                                     //  Name of this variable.
    Gem.$summary = 'The only global variable used by Gem.'   //  What `Gem` is used for

    Gem.$modules = {                                         //  Modules
        $name    : 'Gem.$modules',
        $summary : 'Map of introspection of all the Gem modules.',
        Beryl   : {
            $name    : 'Gem.$modules.Beryl',
            $summary : 'An introspection of the Beryl module.'//,
        }//,
    }

    Gem.scripts.$name    = 'Gem.scripts'
    Gem.scripts.$summary = 'Map of all the scripts loaded (or loading).'
}


//
//  Bootstrap `Gem.codify`
//
//      The reason the function is named `Beryl__codify` (meaning `Gem.codify`) is so that it shows
//      up in stack traces as the full name `Beryl__codify` instead of shorter name `codify`
//      (this is really really helpful when reading stack traces).
// 
Gem.codify = function Beryl__codify(name, $summary, codifier) {
    Gem[name] = codifier()

    if (Gem.clarity) {
        Gem.$modules.Beryl[name] = { $name : name, $summary : $summary, $code : Gem[name] }
    }
}


//
//  Properly define `Gem.codify` like all other functions will be defined:
//
//      One time only: Uses previously defined bootstrap version of `Gem.codify`.
// 
Gem.codify(
    'produce_codify',
    (
          'Produce a "codify" function for a specific module'
        + '.  A "codify" function creates the code for a function or procedure'
        + ', typically as a closure to avoid the use of any global variables'
        + '.'
    ),
    function codifier__Beryl__produce_codify() {
        var Gem = window.Gem


        if (Gem.clarity) {
            var $name    = '<closure Gem.$modules.ModuleName.produce_codify>'
            var $summary = (
                      'The closure for `Gem.$modules.ModuleName.produce_codify`'
                    + '.  Contains all closure variables *EXCEPT* `$module`'
                    + ' (`$module` is created in a different closure)'
                    + '.'
                )

            function _force_$name_and_$summary_to_appear_in_the_closure() { return $name + $summary }
        }


        var create_object = Object.create


        function _create_enumerable_property_with_uninitialized_value($name) {
            //
            //  `r` is a alias for `result`, less typing ...
            //
            var r = create_object(
                    null,
                    {
                        enumerable : { value : true }//,
                        //value    : { value : uninitialized }  //  `.value` is set below
                    }//,
                )

            if (Gem.clarity) {
                Object.defineProperties(
                        r,
                        {
                            $name : {
                                    value : 'Gem.codify.properties.' + $name,
                                    enumerable : true//,
                                },

                            $summary : {
                                    value : (
                                              'Property descriptor used to initialize the `.' + $name + '`'
                                             + ' attribute of a new member of `Gem.$modules.ModuleName`.'
                                        ),

                                    enumerable : true//,
                                }//,
                        }//,
                    )
            }

            return r
        }


        var property_$name    = _create_enumerable_property_with_uninitialized_value('$name')
        var property_$summary = _create_enumerable_property_with_uninitialized_value('$summary')
        var property_$code    = _create_enumerable_property_with_uninitialized_value('$code')

        var properties = create_object(
                null,
                {
                    $name    : { value : property_$name,    enumerable : true },
                    $summary : { value : property_$summary, enumerable : true },
                    $code    : { value : property_$code,    enumerable : true }//,
                }//,
            )
            
        if (Gem.clarity) {
            //
            //  `Gem.codify.properties` has 5 members, but only 3 are enumerable:
            //
            //      Two members `.__name__` & `.__summary__` are to document `Gem.codify.properties`, and are thus
            //      *NOT* enumerable.
            //
            //      Three members `.$name`, `.$summary`, and `.$code` are to be used to create other attributes, and
            //      thus are enumerable.
            //      
            //      Thus when `Gem.codify.properties` is used to add attributes to an object, it only adds the
            //      three enumerable attributes (i.e.: `.$name`, `.$summary`, and `.$code`).
            //
            Object.defineProperties(
                    properties,
                    {
                        __name__ : {
                                value        : 'Gem.codify.properties'//,
                                //enumerable : false//,     //  Only to document `properties`, hence not enumerable
                            },

                        __summary__ : {
                                value : (
                                          'Property descriptors used to initialize'
                                         + ' a new member of `Gem.$modules.ModuleName`.'
                                    )//,
                                //enumerable : false//,     //  Only to document `properties`, hence not enumerable
                            }//,
                    }//,
                )
        }

        return function Beryl__produce_codify($module) {
            if (Gem.clarity) {
                var $name    = '<closure Gem.$modules.ModuleName.codify>'
                var $summary = (
                          'The closure for `Gem.$modules.ModuleName.codify`'
                        + '.  Contains `$module` which is the module this codify function is specifically for'
                        + '.'
                    )

                function _force_$name_and_$summary_to_appear_in_the_closure() { return $name + $summary }
            }

            return function Beryl__codify(name, $summary, codifier) {
                //
                //  Create the code for a function or procedure, typically as a closure to avoid the use of any global
                //  variables.
                //
                var $code = Gem[name] = codifier()

                property_$name   .value = name
                property_$summary.value = $summary
                property_$code   .value = $code

                $module[name] = create_object(null, properties)

                //
                //  Delete these unused attributes, for two reasons:
                //
                //      1.  So they do not appear when introspecting in Developer Tools; AND
                //      2.  So the can be properly garbage collected if `Gem.$modules.Beryl[name]` is deleted.
                //
                delete property_$name   .value
                delete property_$summary.value
                delete property_$code   .value
            }
        }
    }
)


Gem.codify(
    'codify',
    (
          'Create the code for a function or procedure'
        + ', typically as a closure to avoid the use of any global variables.'
    ),
    function codifier__Beryl__codify() {
        return Gem.produce_codify(Gem.$modules.Beryl)
    }
)


//
//  Now run `Gem.codify` on `Gem.produce_codify` & `Gem.codify` (so it uses it's newly defined itself on itself).
//
Gem.codify(
    Gem.$modules.Beryl.produce_codify.$name,
    Gem.$modules.Beryl.produce_codify.$summary,
    function codifier__Beryl__produce_codify() {
        return Gem.$modules.Beryl.produce_codify.$code
    }
)

Gem.codify(
    Gem.$modules.Beryl.codify.$name,
    Gem.$modules.Beryl.codify.$summary,
    function codifier__Beryl__codify() {
        return Gem.$modules.Beryl.codify.$code
    }
)

console.log(Gem.$modules.Beryl)
