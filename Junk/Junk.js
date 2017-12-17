//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//
    var core = function() {                                 //  Core module Gem (stored in 'window.Gem')
        Gem.create_Map = create_Map
    }

///
    var find__prototype = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').get

///
    //  Apple
    var Apple


    function create_class_Apple()
    {
        var class_Apple = GemClass(
                'Example of a class named Apple',
                function Apple(name) {
                    return create_Object(class_Apple, { name : { value : name } })
                },
            )

        Apple = class_Apple.constructor

        console.log(Apple('green'))

        class Cherry extends GemClass.constructor {
            constructor(name) {
                return create_Object(Cherry.prototype, { name : { value : name } })
            }
        }

        console.log(new Cherry('red'))
    }



    var GemPrivate = GemGlobal.modules
                 || (GemGlobal.modules = new (function GemModules() {})()) //  Create a fake "GemModules" class name
    //      2.  At least one function from within 'js/plugins/Jasper.js' is required to be "live" for
    //          'js/plugins/Jasper.js' to appear under 'Sources' in Developer tools.


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
