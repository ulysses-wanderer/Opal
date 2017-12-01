//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//
//  Greetings,
//
//      This plugin is intended to teach you how to write plugins for RPG Maker MV, hence it has more
//      comments than usual.
//
//      Best wishes as you start to learn JavaScript and enter the amazing, magical world of programming.
//
//  Sincerely,
//
//  Joy Diamond
//  2017-12-01
//
"use strict"                                            //  Strict mode helps catch JavaScript errors, very useful!


//
//  Introduction:
//
//      The code you are reading here is stored in a module named 'Jasper'.
//
//      The Jasper module is stored in the file 'js/plugins/Jasper.js' under the RPG Maker MV game it is used for.
//
//      RPG Maker MV uses modules stored in 'js/plugins' as "plugins" & can enable, disable & configure them.
//

//
//
//  Usage of `something`
//
//      In comments when you read `something`, then what appears inside the backquotes is JavaScript code
//      or HTML code (often only a very small fragment of code that is used for the explanation).
//

//
//  Jasper: A global variable to store the data for the `Jasper` plugin module for games created by RPG Maker MV.
//  
//      Initially `Jasper` has only one member named `debug`, which is set to `true`.
//
//      NOTE:
//          `Jasper.debug' is only initialized in this module, We don't actually use `jasper.debug` in the
//          code in this file 
//
//          Instead here we set it's value for other module to read & use.
//
//          Later on, you will read code that tests if `jasper.debug` is `true`:
//      
//              When `jasper.debug` is `true`, later on, extra code will be executed to help teach you JavaScript.
//
//  It is traditional to use one & only one global variable per module:
//
//      Secondly it is traditional to name the global variable the same as the module.
//      
//      Thus in this Jasper module we have created a global variable *ALSO* named `Jasper`.
//
Jasper = {
    debug : true,                                       //  Set debug mode to true
}


//
//  Jasper.boot: Create code to start up the Gem module
//  
//      This expands the global variable `Jasper` by adding a method named `boot` to it.
//
//      The reason `Jasper.boot` is called a *method* instead of a member, is because it is an function:
//
//          In other words 'method' is a shorthand for saying 'member function'.
//
Jasper.boot = function boot() {
    //
    //  script: A local variable that will eventually be the HTML tag `<script src='Gem/Boot.js'></script>`
    //  
    //      Since `script` is declared inside the `Jasper.boot` method, it is a local variable that is only visible
    //      inside the `Jasper.boot` method.
    //
    //  document.create: Create a new element inside the DOM.
    //
    //      ('DOM' which means Domain Object Model, which is basically what a HTML page creates using HTML tags,
    //      HTML attributes, and data).
    //
    //      We use the global variable `document` and call the `create` method:
    //      
    //          We pass one argument to `document.create` the string `script`.
    //
    //      The `document.createElement` method will create a new element (similiar to how an HTML tag inside
    //      a web page create elements).
    //
    //          The type of new element created is passed in the first argument, in our case a 'script' element
    //          (this is the same type of element that the HTML tag `<script></script>` creates when seen in a
    //          web page).
    //
    var script = document.createElement('script')           //  Create an element: `<script></script>`

    //
    //  `script.src = 'Gem/Boot.js'`: Indicate what file should be loaded when this tag is seen.
    // 
    //      The `script` local variable, which was created with the element `<script></script>` now adds
    //      the `.src` member.
    //      
    //          Since the `script` is an element, then each created member behaves as an element attribute
    //          (similiar to how HTML tags with attributes create elements with attributes).
    //      
    //          Hence the `script` will now be the element `<script src='Gem/Boot.js'></script>`
    //
    script.src = 'Gem/Boot.js'                              //  Indicate what file should be loaded

    //
    //  document.head.append(script): Add our script element to the HTML page & execute it.
    //  
    //      Above we used the `document.create` to create the 'script' element.
    //
    //      Here we take our created (and modified by adding `.src` attribute) element & add it as the
    //      last child the `document.head`.
    //
    //      `document.head` is a member of `document` and refers to the 'head' element (in a normal
    //      web page this is created by the HTML '<head></head>' tag).
    //
    //      We call the `.appendChild` method on `document.head`, this method takes the first argument, and
    //      appends it the to 'head' element.
    //
    //      Thus in effect the three lines of code in `Jasper.boot` have inserted "<script src='Gem/Boot.js'>"
    //      into the "<head></head>" tag of the HTML document.
    //
    //      This will cause the browser to load the `Gem.Boot` module which is stored in 'Gem/Boot.js'
    //
    document.head.appendChild(script)
}


//
//  Execute 'Jasper.boot'
//


//  The full MIT License is available here: https://github.com/Rhodolite/Jasper/blob/master/LICENSE
/*: @plugindesc Jasper: Joy's Amazingly Simple Plugin, Easily Readable */
