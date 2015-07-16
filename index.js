var voxel_engine_createGame = require('voxel-engine')
var highlight = require('voxel-highlight')
var createPlayer = require('voxel-player')
var texturePath = require('painterly-textures')(__dirname)
var Clipboard = require('./voxel-clipboard')


var socket = io();


socket.on('chat message', function(msg){
  console.log("Message");
  console.log(msg[0]._source.max_power_ibeacon_id);

  switch (msg[0]._source.max_power_ibeacon_id) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      console.log("iBeacon1");
      player.yaw.position.set(2, 1, 2);
      break;
    case 2:
      console.log("iBeacon2");
      player.yaw.position.set(2, 1, -2);
      break;
    case 3:
      day = "Wednesday";
      player.yaw.position.set(0, 1, -6);
      break;
    case 4:
      day = "Thursday";
        player.yaw.position.set(-2, 1, -2);
      break;
    case 5:
      day = "Friday";
        player.yaw.position.set(-2, 1, 2);
      break;
    case 6:
      day = "Saturday";
        player.yaw.position.set(0, 1, 6);
      break;
  }

});

/*
socket.on('chat message2', function(msg){
  console.log("Message2");
  console.log(msg[0]._source.x);
  console.log(msg[0]._source.y);

  player.yaw.position.set(msg[0]._source.x,1,msg[0]._source.y)

});

*/







function createToggler(keyControl) {
  var active, canToggle
  return function () {
    if (!game.controls.state[keyControl]) {
      canToggle = true  // key released, reset
    } else if (canToggle) {
      canToggle = false
      active = !active
    }
    return active
  }
}

function createNonRepeater(keyControl, fn) {
  var canActivate
  return function () { // will only return true once per long keypress
    if (!game.controls.state[keyControl]) {
      canActivate = true  // key released, reset
    } else if (canActivate) {
      canActivate = false
      if (typeof fn === 'function') fn()
      return true
    }
    return false
  }
}

var materials = [
  ['grass', 'dirt', 'grass_dirt'], // top, bottom, sides
  'diamond',
  'obsidian',
  'brick',
  'grass',
  'plank'
]

var life_board_size = 64



var game = voxel_engine_createGame( {
  generate: function (x, y, z) {
    //console.log((y === 10 && x === 0 && z === 0) ? 2:0);
    return (y === 50 && x === 0 && z === 0) ? 2 // single voxel for player start platform
        : (x < -life_board_size || x > life_board_size) ? 0
        : (z < -life_board_size || z > life_board_size) ? 0
        : (y === 0) ? 1   // grassy pastures
        : (y === 4) ? 1   // grassy pastures
      // : (x === 0 && z===0 && y<10 ) ? 4 // obsidian fences:


      //: (x === 20 && z===0 && y===1 ) ? 4 // obsidian fences:
      //: (x === -20 && z===0 && y===1 ) ? 4 // obsidian fences:

      //大門6 ibeacon
        : (z === 8 && x===0 && y===3 ) ? 2 // obsidian fences:
        : (z === 8 && x===0 && y===2 ) ? 3 // obsidian fences:
        : (z === 8 && x===0 && y===1 ) ? 3 // obsidian fences:
      //大門6 Door
        : (z === 8 && x===1 && y===3 ) ? 3 // obsidian fences:
        : (z === 8 && x===1 && y===2 ) ? 3 // obsidian fences:
        : (z === 8 && x===1 && y===1 ) ? 3 // obsidian fences:
        : (z === 8 && x===2 && y===3 ) ? 4 // obsidian fences:
        : (z === 8 && x===2 && y===2 ) ? 4 // obsidian fences:
        : (z === 8 && x===2 && y===1 ) ? 4 // obsidian fences:
        : (z === 8 && x===3 && y===3 ) ? 4 // obsidian fences:
        : (z === 8 && x===3 && y===2 ) ? 4 // obsidian fences:
        : (z === 8 && x===3 && y===1 ) ? 4 // obsidian fences:
        : (z === 8 && x===4 && y===3 ) ? 4 // obsidian fences:
        : (z === 8 && x===4 && y===2 ) ? 4 // obsidian fences:
        : (z === 8 && x===4 && y===1 ) ? 4 // obsidian fences:
        : (z === 8 && x===5 && y===3 ) ? 4 // obsidian fences:
        : (z === 8 && x===5 && y===2 ) ? 4 // obsidian fences:
        : (z === 8 && x===5 && y===1 ) ? 4 // obsidian fences:
        : (z === 8 && x===6 && y===3 ) ? 4 // obsidian fences:
        : (z === 8 && x===6 && y===2 ) ? 4 // obsidian fences:
        : (z === 8 && x===6 && y===1 ) ? 4 // obsidian fences:
        : (z === 8 && x===7 && y===3 ) ? 4 // obsidian fences:
        : (z === 8 && x===7 && y===2 ) ? 4 // obsidian fences:
        : (z === 8 && x===7 && y===1 ) ? 4 // obsidian fences:
        : (z === 8 && x===8 && y===3 ) ? 4 // obsidian fences:
        : (z === 8 && x===8 && y===2 ) ? 4 // obsidian fences:
        : (z === 8 && x===8 && y===1 ) ? 4 // obsidian fences:
        : (z === 8 && x===9 && y===3 ) ? 4 // obsidian fences:
        : (z === 8 && x===9 && y===2 ) ? 4 // obsidian fences:
        : (z === 8 && x===9 && y===1 ) ? 4 // obsidian fences:

        : (z === 8 && x===-1 && y===3 ) ? 3 // obsidian fences:
        : (z === 8 && x===-1 && y===2 ) ? 3 // obsidian fences:
        : (z === 8 && x===-1 && y===1 ) ? 3 // obsidian fences:
        : (z === 8 && x===-2 && y===3 ) ? 4 // obsidian fences:
        : (z === 8 && x===-2 && y===2 ) ? 4 // obsidian fences:
        : (z === 8 && x===-2 && y===1 ) ? 4 // obsidian fences:
        : (z === 8 && x===-3 && y===3 ) ? 4 // obsidian fences:
        : (z === 8 && x===-3 && y===2 ) ? 4 // obsidian fences:
        : (z === 8 && x===-3 && y===1 ) ? 4 // obsidian fences:
        : (z === 8 && x===-4 && y===3 ) ? 4 // obsidian fences:
        : (z === 8 && x===-4 && y===2 ) ? 4 // obsidian fences:
        : (z === 8 && x===-4 && y===1 ) ? 4 // obsidian fences:
        : (z === 8 && x===-5 && y===3 ) ? 4 // obsidian fences:
        : (z === 8 && x===-5 && y===2 ) ? 4 // obsidian fences:
        : (z === 8 && x===-5 && y===1 ) ? 4 // obsidian fences:
        : (z === 8 && x===-6 && y===3 ) ? 4 // obsidian fences:
        : (z === 8 && x===-6 && y===2 ) ? 4 // obsidian fences:
        : (z === 8 && x===-6 && y===1 ) ? 4 // obsidian fences:
        : (z === 8 && x===-7 && y===3 ) ? 4 // obsidian fences:
        : (z === 8 && x===-7 && y===2 ) ? 4 // obsidian fences:
        : (z === 8 && x===-7 && y===1 ) ? 4 // obsidian fences:
        : (z === 8 && x===-8 && y===3 ) ? 4 // obsidian fences:
        : (z === 8 && x===-8 && y===2 ) ? 4 // obsidian fences:
        : (z === 8 && x===-8 && y===1 ) ? 4 // obsidian fences:
        : (z === 8 && x===-9 && y===3 ) ? 4 // obsidian fences:
        : (z === 8 && x===-9 && y===2 ) ? 4 // obsidian fences:
        : (z === 8 && x===-9 && y===1 ) ? 4 // obsidian fences:



      //ibeacon3
        : (z === -8 && x===0 && y===3 ) ? 2 // obsidian fences:
        : (z === -8 && x===0 && y===2 ) ? 4 // obsidian fences:
        : (z === -8 && x===0 && y===1 ) ? 4 // obsidian fences:
      //ibeacon fense
        : (z === -8 && x===1 && y===3 ) ? 4 // obsidian fences:
        : (z === -8 && x===1 && y===2 ) ? 4 // obsidian fences:
        : (z === -8 && x===1 && y===1 ) ? 4 // obsidian fences:
        : (z === -8 && x===2 && y===3 ) ? 4 // obsidian fences:
        : (z === -8 && x===2 && y===2 ) ? 4 // obsidian fences:
        : (z === -8 && x===2 && y===1 ) ? 4 // obsidian fences:
        : (z === -8 && x===3 && y===3 ) ? 4 // obsidian fences:
        : (z === -8 && x===3 && y===2 ) ? 4 // obsidian fences:
        : (z === -8 && x===3 && y===1 ) ? 4 // obsidian fences:
        : (z === -8 && x===4 && y===3 ) ? 4 // obsidian fences:
        : (z === -8 && x===4 && y===2 ) ? 4 // obsidian fences:
        : (z === -8 && x===4 && y===1 ) ? 4 // obsidian fences:

        : (z === -8 && x===-1 && y===3 ) ? 4 // obsidian fences:
        : (z === -8 && x===-1 && y===2 ) ? 4 // obsidian fences:
        : (z === -8 && x===-1 && y===1 ) ? 4 // obsidian fences:
        : (z === -8 && x===-2 && y===3 ) ? 4 // obsidian fences:
        : (z === -8 && x===-2 && y===2 ) ? 4 // obsidian fences:
        : (z === -8 && x===-2 && y===1 ) ? 4 // obsidian fences:
        : (z === -8 && x===-3 && y===3 ) ? 4 // obsidian fences:
        : (z === -8 && x===-3 && y===2 ) ? 4 // obsidian fences:
        : (z === -8 && x===-3 && y===1 ) ? 4 // obsidian fences:
        : (z === -8 && x===-4 && y===3 ) ? 4 // obsidian fences:
        : (z === -8 && x===-4 && y===2 ) ? 4 // obsidian fences:
        : (z === -8 && x===-4 && y===1 ) ? 4 // obsidian fences:

        : (z === -7 && x===-4 && y===3 ) ? 1 // obsidian fences:
        : (z === -7 && x===-4 && y===2 ) ? 1 // obsidian fences:
        : (z === -7 && x===-4 && y===1 ) ? 1 // obsidian fences:



      //大門1 ibeacon
        //: (z === 10 && x===17 && y===3 ) ? 2 // obsidian fences:
        : (z === 4 && x===5 && y===3 ) ? 2 // obsidian fences:
        : (z === 4 && x===5 && y===2 ) ? 4 // obsidian fences:
        : (z === 4 && x===5 && y===1 ) ? 4 // obsidian fences:
      //大門1
        : (z === 3 && x===5 && y===3 ) ? 3 // obsidian fences:
        : (z === 3 && x===5 && y===2 ) ? 4 // obsidian fences:
        : (z === 3 && x===5 && y===1 ) ? 4 // obsidian fences:
        : (z === 2 && x===5 && y===3 ) ? 3 // obsidian fences:
        : (z === 2 && x===5 && y===2 ) ? 4 // obsidian fences:
        : (z === 2 && x===5 && y===1 ) ? 4 // obsidian fences:
        : (z === 1 && x===5 && y===3 ) ? 3 // obsidian fences:
        : (z === 1 && x===5 && y===2 ) ? 4 // obsidian fences:
        : (z === 1 && x===5 && y===1 ) ? 4 // obsidian fences:
        : (z === 0 && x===5 && y===3 ) ? 3 // obsidian fences:
        : (z === 0 && x===5 && y===2 ) ? 4 // obsidian fences:
        : (z === 0 && x===5 && y===1 ) ? 4 // obsidian fences:
        : (z === -1 && x===5 && y===3 ) ? 3 // obsidian fences:
        : (z === -1 && x===5 && y===2 ) ? 4 // obsidian fences:
        : (z === -1 && x===5 && y===1 ) ? 4 // obsidian fences:
        : (z === -2 && x===5 && y===3 ) ? 3 // obsidian fences:
        : (z === -2 && x===5 && y===2 ) ? 4 // obsidian fences:
        : (z === -2 && x===5 && y===1 ) ? 4 // obsidian fences:
        : (z === -3 && x===5 && y===3 ) ? 3 // obsidian fences:
        : (z === -3 && x===5 && y===2 ) ? 4 // obsidian fences:
        : (z === -3 && x===5 && y===1 ) ? 4 // obsidian fences:

        : (z === 4 && x===6 && y===3 ) ? 4 // obsidian fences:
        : (z === 4 && x===6 && y===2 ) ? 4 // obsidian fences:
        : (z === 4 && x===6 && y===1 ) ? 4 // obsidian fences:
        : (z === 4 && x===7 && y===3 ) ? 4 // obsidian fences:
        : (z === 4 && x===7 && y===2 ) ? 4 // obsidian fences:
        : (z === 4 && x===7 && y===1 ) ? 4 // obsidian fences:
        : (z === 4 && x===8 && y===3 ) ? 4 // obsidian fences:
        : (z === 4 && x===8 && y===2 ) ? 4 // obsidian fences:
        : (z === 4 && x===8 && y===1 ) ? 4 // obsidian fences:
        : (z === 4 && x===9 && y===3 ) ? 4 // obsidian fences:
        : (z === 4 && x===9 && y===2 ) ? 4 // obsidian fences:
        : (z === 4 && x===9 && y===1 ) ? 4 // obsidian fences:



      //ibeacon5
        //: (z === 10 && x===-17 && y===3 ) ? 2 // obsidian fences:
        : (z === 4 && x===-5 && y===3 ) ? 2 // obsidian fences:
        : (z === 4 && x===-5 && y===2 ) ? 4 // obsidian fences:
        : (z === 4 && x===-5 && y===1 ) ? 4 // obsidian fences:
      // door5 fense
        : (z === 4 && x===-6 && y===3 ) ? 4 // obsidian fences:
        : (z === 4 && x===-6 && y===2 ) ? 4 // obsidian fences:
        : (z === 4 && x===-6 && y===1 ) ? 4 // obsidian fences:
        : (z === 4 && x===-7 && y===3 ) ? 4 // obsidian fences:
        : (z === 4 && x===-7 && y===2 ) ? 4 // obsidian fences:
        : (z === 4 && x===-7 && y===1 ) ? 4 // obsidian fences:
        : (z === 4 && x===-8 && y===3 ) ? 4 // obsidian fences:
        : (z === 4 && x===-8 && y===2 ) ? 4 // obsidian fences:
        : (z === 4 && x===-8 && y===1 ) ? 4 // obsidian fences:
        : (z === 4 && x===-9 && y===3 ) ? 4 // obsidian fences:
        : (z === 4 && x===-9 && y===2 ) ? 4 // obsidian fences:
        : (z === 4 && x===-9 && y===1 ) ? 4 // obsidian fences:





      //ibeacon2
        : (z === -4 && x===5 && y===3 ) ? 2 // obsidian fences:
        : (z === -4 && x===5 && y===2 ) ? 4 // obsidian fences:
        : (z === -4 && x===5 && y===1 ) ? 4 // obsidian fences:

        : (z === -5 && x===5 && y===3 ) ? 4 // obsidian fences:
        : (z === -5 && x===5 && y===2 ) ? 4 // obsidian fences:
        : (z === -5 && x===5 && y===1 ) ? 4 // obsidian fences:
        : (z === -6 && x===5 && y===3 ) ? 4 // obsidian fences:
        : (z === -6 && x===5 && y===2 ) ? 4 // obsidian fences:
        : (z === -6 && x===5 && y===1 ) ? 4 // obsidian fences:
        : (z === -7 && x===5 && y===3 ) ? 4 // obsidian fences:
        : (z === -7 && x===5 && y===2 ) ? 4 // obsidian fences:
        : (z === -7 && x===5 && y===1 ) ? 4 // obsidian fences:
        : (z === -8 && x===5 && y===3 ) ? 4 // obsidian fences:
        : (z === -8 && x===5 && y===2 ) ? 4 // obsidian fences:
        : (z === -8 && x===5 && y===1 ) ? 4 // obsidian fences:






      //ibeacon4
        : (z === -4 && x===-5 && y===3 ) ? 2 // obsidian fences:
        : (z === -4 && x===-5 && y===2 ) ? 4 // obsidian fences:
        : (z === -4 && x===-5 && y===1 ) ? 4 // obsidian fences:
      //ibeacon4 fences
        : (z === -5 && x===-5 && y===3 ) ? 4 // obsidian fences:
        : (z === -5 && x===-5 && y===2 ) ? 4 // obsidian fences:
        : (z === -5 && x===-5 && y===1 ) ? 4 // obsidian fences:
        : (z === -6 && x===-5 && y===3 ) ? 4 // obsidian fences:
        : (z === -6 && x===-5 && y===2 ) ? 4 // obsidian fences:
        : (z === -6 && x===-5 && y===1 ) ? 4 // obsidian fences:
        : (z === -7 && x===-5 && y===3 ) ? 4 // obsidian fences:
        : (z === -7 && x===-5 && y===2 ) ? 4 // obsidian fences:
        : (z === -7 && x===-5 && y===1 ) ? 4 // obsidian fences:
        : (z === -8 && x===-5 && y===3 ) ? 4 // obsidian fences:
        : (z === -8 && x===-5 && y===2 ) ? 4 // obsidian fences:
        : (z === -8 && x===-5 && y===1 ) ? 4 // obsidian fences:

        : (z === -3 && x===-5 && y===3 ) ? 4 // obsidian fences:
        : (z === -3 && x===-5 && y===2 ) ? 4 // obsidian fences:
        : (z === -3 && x===-5 && y===1 ) ? 4 // obsidian fences:
        : (z === -2 && x===-5 && y===3 ) ? 4 // obsidian fences:
        : (z === -2 && x===-5 && y===2 ) ? 4 // obsidian fences:
        : (z === -2 && x===-5 && y===1 ) ? 4 // obsidian fences:
        : (z === -1 && x===-5 && y===3 ) ? 3 // obsidian fences:
        : (z === -1 && x===-5 && y===2 ) ? 3 // obsidian fences:
        : (z === -1 && x===-5 && y===1 ) ? 3 // obsidian fences:
        : (z === -0 && x===-5 && y===3 ) ? 3 // obsidian fences:
        : (z === -0 && x===-5 && y===2 ) ? 3 // obsidian fences:
        : (z === -0 && x===-5 && y===1 ) ? 3 // obsidian fences:
        : (z === 1 && x===-5 && y===3 ) ? 4 // obsidian fences:
        : (z === 1 && x===-5 && y===2 ) ? 4 // obsidian fences:
        : (z === 1 && x===-5 && y===1 ) ? 4 // obsidian fences:
        : (z === 2 && x===-5 && y===3 ) ? 4 // obsidian fences:
        : (z === 2 && x===-5 && y===2 ) ? 4 // obsidian fences:
        : (z === 2 && x===-5 && y===1 ) ? 4 // obsidian fences:
        : (z === 3 && x===-5 && y===3 ) ? 3 // obsidian fences:
        : (z === 3 && x===-5 && y===2 ) ? 3 // obsidian fences:
        : (z === 3 && x===-5 && y===1 ) ? 3 // obsidian fences:



        : 0 // space!
  }
  , keybindings: {
    'W': 'forward'
    , 'A': 'left'
    , 'S': 'backward'
    , 'D': 'right'
    , 'R': 'view'
    , 'H': 'adjacent'
    , 'I': 'select'
    , 'X': 'select_copy'
    , 'L': 'select_preview'
    , 'E': 'select_paste'
    , 'Y': 'select_export'
    , 'T': 'select_rotate_right'
    , 'G': 'select_rotate_left'
    , 'O': 'life_reset'
    , 'P': 'life_pause'
    , 'U': 'life_faster'
    , 'J': 'life_slower'
    , 'N': 'material_change'
    , '<mouse 1>': 'fire'
    , '<mouse 2>': 'firealt'
    , '<space>'  : 'jump'
    , '<shift>'  : 'crouch'
    , '<control>': 'alt'
  }
  , worldOrigin: [0, 0, 0]
  , controls: {
    discreteFire: true
    , speed: 0.001    // default is 0.0032, see voxel-control/index.js
    , accelTimer: 500 // time to reach max speed
  }
  //, lightsDisabled: true
  , chunkDistance: 4
  , materials: materials
  , texturePath: texturePath
})

game.appendTo('#container2');

// add the player
player = createPlayer(game)('img/player.png', { gravity: true })
player.possess()
player.yaw.position.set(0.5, 1, 0.5)

/*
 //Start of socket.io
 // And below is a sample usage of this promiseWhile function
 var sum = 0,
 stop = 30000;

 var Promise = require('bluebird');

 var promiseWhile = function(condition, action) {
 var resolver = Promise.defer();

 var loop = function() {
 if (!condition()) return resolver.resolve();
 return Promise.cast(action())
 .then(loop)
 .catch(resolver.reject);
 };

 process.nextTick(loop);

 return resolver.promise;
 };

 promiseWhile(function() {
 // Condition for stopping
 return sum < stop;
 }, function() {
 // Action to run, should return a promise
 return new Promise(function(resolve, reject) {
 // Arbitrary 250ms async method to simulate async process
 // In real usage it could just be a normal async event that
 // returns a Promise.
 setTimeout(function() {
 sum++;
 player.yaw.position.set(sum*0.01, 1, 0.5)
 // Print out the sum thus far to show progress
 console.log(sum);
 resolve();
 }, 10);
 });
 }).then(function() {
 // Notice we can chain it because it's a Promise,
 // this will run after completion of the promiseWhile Promise!
 console.log("Done");
 });

 */

var triggerView = createNonRepeater('view', player.toggle.bind(player))

// highlight blocks when you look at them
var blockPosPlace, blockPosErase
var highlighter = highlight(game, {
  color: 0xffff00
  , distance: 100
  , adjacentActive: createToggler('adjacent')
  , selectActive: createToggler('select')
  , animate: true
})
highlighter.on('highlight', function (voxelPos) { blockPosErase = voxelPos })
highlighter.on('remove', function (voxelPos) { blockPosErase = null })
highlighter.on('highlight-adjacent', function (voxelPos) { blockPosPlace = voxelPos })
highlighter.on('remove-adjacent', function (voxelPos) { blockPosPlace = null })

// block interaction stuff, uses highlight data
var currentMaterial = 2 // default obsidian
var triggerMaterialChange = createNonRepeater('material_change', function () {
  currentMaterial = ++currentMaterial % materials.length
  if (!currentMaterial) currentMaterial = 1
})

game.on('fire', function (target, state) {
  var position = blockPosPlace
  if (position) {
    game.createBlock(position, currentMaterial)

    // add new active life cell
    if (currentMaterial === life.on_material) life.addCell(position)
  }
  else {
    position = blockPosErase
    if (position) game.setBlock(position, 0)
  }
})

// copy-paste multi-voxel selection
var clipboard = new Clipboard(game)
var selection
var triggerCopy        = createNonRepeater('select_copy')
var triggerPreview     = createNonRepeater('select_preview')
var triggerPaste       = createNonRepeater('select_paste')
var triggerExport      = createNonRepeater('select_export')
var triggerRotateRight = createNonRepeater('select_rotate_right')
var triggerRotateLeft  = createNonRepeater('select_rotate_left')


// GoL support, life engine wrapper
var life = require('./life-engine')

(game, {
  //frequency: 200
  //, board_size: life_board_size
  // , on_material: 4 // from materials [], 2 is blue diamond
  //, off_material: 6 // trail of planks, replaces original material
})

life.reset()
life.resume()



var triggerLifeReset = createNonRepeater('life_reset', life.reset)
var triggerLifePause = createNonRepeater('life_pause', life.togglePause)
var triggerLifeFaster = createNonRepeater('life_faster', life.speedUp)
var triggerLifeSlower = createNonRepeater('life_slower', life.speedDown)

// main update function, called at about 60 hz
game.on('tick', onUpdate)

function onUpdate(dt) {
  if (triggerCopy() && selection) {
    clipboard.copy(selection.start, selection.end)
  }
  else if (triggerPaste()) {
    clipboard.paste(highlighter.currVoxelAdj || highlighter.currVoxelPos)
    // for life active cells:
    var voxels = clipboard.getContentsAt(highlighter.currVoxelAdj || highlighter.currVoxelPos)
    life.addCells(voxels)
  }
  else if (triggerPreview()) {
    // not working yet...
    //clipboard.preview(highlighter.currVoxelAdj || highlighter.currVoxelPos)
  }

  if (triggerRotateRight()) clipboard.rotateRight()
  if (triggerRotateLeft())  clipboard.rotateLeft()

  if (triggerExport()) {
    var exportedData = JSON.stringify(clipboard.exportData())
    console.log("Selection data: " + exportedData)
  }

  triggerView() // 1st vs 3rd person view
  triggerMaterialChange() // select next material

  // game of life triggers
  triggerLifeReset()
  triggerLifePause()
  triggerLifeFaster()
  triggerLifeSlower()
  life.update(dt)
}

highlighter.on('highlight-select', function (s) {
  selection = s
  console.log(">>> [" + s.start + "][" + s.end + "] highlighted selection")
})

highlighter.on('highlight-deselect', function (s) {
  selection = null
  console.log("<<< [" + s.start + "][" + s.end + "] selection un-highlighted")
})

// add objects to global scope for easy debugging
game.clipboard = clipboard
game.life = life
if (!window.game) window.game = game

//highlighter.on('highlight', function (voxelPos) {
//  console.log(">   [" + voxelPos + "] highlighted voxel")
//})
//highlighter.on('remove', function (voxelPos) {
//  console.log("<   [" + voxelPos + "] removed voxel highlight")
//})
//highlighter.on('highlight-adjacent', function (voxelPos) {
//  console.log(">>  [" + voxelPos + "] highlighted adjacent")
//})
//highlighter.on('remove-adjacent', function (voxelPos) {
//  console.log("<<  [" + voxelPos + "] removed adjacent highlight")
//})

