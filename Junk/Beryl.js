//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Beryl: Boot Engine, Reliable Yet Limber
//
//  NOTE:
//      The code is easily readable ... the comments, well that is another matter, LOL!
//
//      (not my fault JavaScript has such a convoluted usage of "prototype".  The Gem modules do their
//      best to hide these amazingly complex details from a first time user of JavaScript)
//
(function module_Beryl(){                                   //  Anonymous scope to avoid "polluting" global scope
    "use strict"                                            //  Strict mode helps catch JavaScript errors, very useful!

    //
    //  Constructor to give a "class name" of 'GemGlobal' to `window.Gem`
    //
    //  NOTE #1:
    //      There are two different unique ways to give a "class name" to an instance (so it shows up in
    //      Developer Tool nicely):
    //
    //          1.  In nw.js, version 0.12, the only way to give an instance a class name is if the instance
    //              was originally created via the 'new' syntax.
    //
    //              (It is irrelevant how the instance looks when it is examined in Developer Tools; only the
    //              moment of it's original creation matters).
    //
    //              (In other words, after the instance is created, you can discard [or change] the instance's
    //              `.__proto__` member & it will still retain it's "class name" from the moment of it's
    //              original creation; whereas, in nw.js, version 0.13 or later, this will definitly not work,
    //              as explained below).
    //
    //          2.  In nw.js, version 0.13 or later, the only way to give an instance a "class name" is if the
    //              instance, the first time it is printed out to the console, has a `.__proto__.constructor.name`
    //              (where `.__proto__.constructor` must be a function ... nothing else works but a function).
    //
    //              (It is irrelevant how the instance was created, or how it looks *after* it is printed out
    //              to the console the first time; it is only relevant how it looks at the moment it is first
    //              printed to the console matters).
    //
    //              (In other words after printing it to the console the first time, you can discard [or change]
    //              the instance's `.__proto__.constructor` [or discard or change the instance's `.__proto__`] ...
    //              it will still retain it's class name from the moment it was first printed to the console;
    //              and will ignore any attempt to change it's class name afterwards).
    //
    //              (Also unlike nw.js, version 0.12, it is irrelevant if this constructor was ever even
    //              used to create the instance or not; whereas, in nw.js, version 0.12, it is totally
    //              relevant -- the constructor must be called in nw.js, version 0.12).
    //
    //  The code below satisfies both [crazy] conditions.
    //
    function GemGlobal() {}

    //
    //  Cleanup `GemGlobal.prototype.__proto__` to be `null` instead of `Object.prototype`:
    //
    //      This way less irrelevant "stuff" is shown in Developer Tools when examining `window.Gem`
    //
    //  NOTE #2:
    //      To avoid messing up JavaScript Engine optimizer's it is important *NOT* to change
    //      the `.__proto__` member of an object after it is created.
    //
    //      Please read this WARNING:
    //
    //          https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
    //
    //  NOTE #3:
    //      It is quite confusing in Javascript, but a function has two "prototype's":
    //
    //          1.  It's prototype (i.e.: `__proto__`) which is the type of the function, this typically
    //              has the value of `Function.prototype` (this is what the warning in Note #2 above applies to);
    //
    //          2.  It's `.prototype` member which is the type of the class it creates when used as a
    //              class "constructor" (the warning in Note #2 above does not apply to this `.prototype` member).
    //
    //  NOTE #4:
    //      In the code below we change the `GemGlobal.protototype` by setting it to a new object
    //      (this is *different* than the `GemGlobal.__proto__` which the warning in Note #2 above applies to)
    //
    //  NOTE #5:
    //      Contrawise, we avoid the following code, which would be very wrong (and the warning above in
    //      Note #2 would apply to):
    //
    //          Object.setPrototypeOf(GemGlobal.prototype, null)    //  BAD ... VERY BAD ... REALLY BAD: DO *NOT* DO!
    //
    //      This would set `GemGlobal.prototype.__proto__` to null, thus *totally* messing up JavaScript engine
    //      optimizers.
    //
    //  The code below creates a new `GemGlobal.prototype` (which has a `GemGlobal.prototype.__proto__` of null)
    //  thus meeting all the above [crazy] conditions.
    //  
    GemGlobal.prototype = Object.create(null, { constructor : { value : GemGlobal } })  // The "right" way to do this!

    //
    //  Create global variable `Gem` with "class name" `GemGlobal`:
    //
    //      Also for convenience create a local variable '$' as an alias for `Gem`.
    //
    var $ = window.Gem = new GemGlobal()

    // FIX:
    if (Utils.RPGMAKER_VERSION == '1.5.1') {                //  Is this RPG Maker MV 1.5.1?
        //  Show developer tools (nw.js older version)
        require('nw.gui').Window.get().showDevTools()
    } else {
        //  Show developer tools (nw.js 0.25.4 version)
        nw.Window.get().showDevTools(false)
    }

    $.debug           = true                                //  Set Gem debug mode to true
    $.beryl_boot_path = 'Gem/Beryl/Boot.js'                 //  Module to load the rest of Gem modules

    //
    //  We only bring up an alert if three conditions are met:
    //
    //      1)  This is running in Gem debug mode;
    //      2)  This is running under nw.js (i.e.: not a normal browser like Firefox, etc.); AND
    //      3)  This is running in RPG Maker MV "test" mode.
    //
    if ($.debug && Utils.isNwjs() && Utils.isOptionValid('test')) {
        //
        //  NOTE:
        //      There is no way to get the error message, if there is one, when attempting to load Gem/Boot.Beryl.js
        //      (You can't use try/catch on a <script></script> tag that is inserted into the DOM).
        //      
        //      Hence in case of an error, the following is done:
        //
        //          1)  Alert the user with an alert message which says to see Developer Tools for full error;
        //          2)  Force the user to acknowledge the alert box by hitting 'OK';
        //          3)  Then, and only then, bring up Developer tool, so the user can read the rest of the error.
        //
        $.beryl_boot_error = function beryl_boot_error() {
            alert('Failed to load ' + $.beryl_boot_path + ': please see Developer Tools for full error')

            if (Utils.RPGMAKER_VERSION == '1.5.1') {                //  Is this RPG Maker MV 1.5.1?
                //  Show developer tools (nw.js older version)
                require('nw.gui').Window.get().showDevTools()
            } else {
                //  Show developer tools (nw.js 0.25.4 version)
                nw.Window.get().showDevTools(false)
            }
        }
    }

    var script = document.createElement('script')           //  Create an element: `<script></script>`

    script.src = $.beryl_boot_path                          //  Modify to `<script src='Gem/Beryl/Boot.js></script>

    if ($.beryl_boot_error) {                               //  *IF* three conditions above met, then:
        script.onerror = $.beryl_boot_error                 //      Alert user if any error happens
    }

    document.head.appendChild(script)                       //  Attempt to load 'Gem/Beryl/Boot.js' as a module
})();


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
/*: @plugindesc Boot Engine, Reliable Yet Limber */
