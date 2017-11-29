//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//
    var core = function() {                                 //  Core module Gem (stored in 'window.Gem')
        Gem.create_Map = create_Map
    }

///
    var find__prototype = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').get

///
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


