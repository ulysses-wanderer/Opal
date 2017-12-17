//  Copyright (c) 2017 Joy Diamond.  MIT License.
var javascript_path = new RegExp(/ at file:\/\/\/(.*):\d+:\d+$/).exec(new Error().stack)[1];

alert(
      'JavaScript is ' + javascript_path
    + 'HTML       is ' + process.mainModule.filename
);

/*: @plugindesc Opal: Optimium Plugin Automatic Loader */
