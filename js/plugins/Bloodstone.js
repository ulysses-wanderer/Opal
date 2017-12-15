//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  BLOODSTONE: Bugs Lack Object Oriented Development.  Strict Testing Obligatory, No Errors
//
//  This plugin demonstrates why to use strict mode:
//      For more details please read: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
//


//
//  Since this plugin is only for demo purposes in the Developer Tools:
//      Bring up Developer tools by default in test mode.
//
if (Utils.isOptionValid('test') && Utils.isNwjs()) {
    if (Utils.RPGMAKER_VERSION == '1.5.1') {                //  Is this RPG Maker MV 1.5.1?
        //  Show developer tools (nw.js older version)
        require('nw.gui').Window.get().showDevTools()
    } else {
        //  Show developer tools (nw.js 0.25.4 version)
        nw.Window.get().showDevTools(false)
    }
}


//  BAD: Bad coding style
(function BAD(){
    //  "use strict"                                        //  Bad coding style: missing strict mode!!!

    var bag = 444                                           //  Create a local variable named `ant`

    //
    //   Here we want to change the value of `bag` to 666, but due to being a bad typist we misspelled it as `bug`,
    //   So instead of throwing an error, it does three bad things:
    //
    //      1)  *NOT* nodify `bag`:
    //      2)  Accidently create global variable `bug`; AND
    //      3)  WORSE OF ALL: Waste hours of our time chasing down the bug.
    //
    bug = 666                                               //  Will *NOT* throw an error
})();


//  GOOD: Good coding style
(function GOOD(){
    "use strict"                                            //  Strict mode helps catch JavaScript errors, very useful 

    var dig = 444;                                          //  Create a local variable named `dig`

    window.cat = 777                                        //  Here we create a global on purpose using `window.cat`

    //
    //   Here we want to change the value of `dig` to 888, but due to being a bad typist we misspelled it as `dog`,
    //   Since we are "use strict" mode above, it does three good things:
    //
    //      1)  *NOT* modify `dig`:
    //      2)  *NOT* Accidently create global variable `dog`; AND
    //      3)  BEST OF ALL: *NOT* Waste hours of our time chasing down the bug.
    //
    dog = 888                                               //  Will throw an error, and not create `dog` by mistake
})();


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
/*: @plugindesc Bugs Lack Object Oriented Development.  Strict Testing Obligatory, No Errors */
