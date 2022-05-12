kaboom({
  scale: 1,
  background: [10,150,200],
})
loadSpriteAtlas("https://kaboomjs.com/sprites/dungeon.png", "atlas.json");

const levelConfig = {
  width: 16,
  height: 16,
  pos: vec2(32,32),
  "w": () => [
    "wall",
    sprite("wall"),
    area(),
    solid()
  ],
  "f": () => [
    "fakeWall",
    sprite("wall"),
    area(),
  ],
  "o": () => [
    "enemy",
    sprite("ogre",{
      "anim":"run"
    }),
    area({
      "scale": 0.50
    }),
    origin("center"),
    {
      "xVel": 30
    },
  ],
  "l": () => [
    "enemy2",
    sprite("littleOgre",{
      "anim":"run"
    }),
    area({
      "scale": 0.50
    }),
    origin("top"),
    {
      "xVel": 40
    },
  ],
  "m": () => [
    "enemy3",
    sprite("groundMonster",{
      "anim":"idle"
    }),
    area({
      "scale": 0.50
    }),
    origin("topleft"),
    {
      "xVel": 0
    },
  ],
  "b": () => [
    "barrier",
    sprite("wall"),
    area(),
    opacity(0)
  ],
  "t": () => [
    "troll",
    sprite("wall"),
    area(),
    solid(),
    opacity(0)
  ],
  "D": () => [
    "door",
    sprite("closed_door"),
    area({
      "scale":0.60
    }),
    solid(),
    origin("center")
  ],
  "c": () => [
    "chest",
    sprite("chest", {
      "anim":"close"
    }),
    area(),
    solid(),
  ],
}
  

//array: An array is used to list certain things, like different levels and what not
const levels = [
  [ "                b l  b                 ", 
    "w               wwwww                 w",
    "w            w                      w w",
    "w        ww      b   o    b   l l  bw w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww w",
    "w                                     w",
    "w      w     w b  l    b      w       w",
    "w  w w   www   wwwwbwww ww ww   w ww  w",
    "ww  wwwwwwwwwwwwwww     wwwwwwwwwwwwwww",
    "www            wwwwwwwwww             w",
    "w            ww                  w    w",
    "wwwww  wwwwwb   w l  b l    wwbw   w  w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww w",
    "w                                     w",
    "w    www  w     w www    www  ww      w",
    "w  wwwwww   www       ww       ww     w",
    "w wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "w                                     w",
    "w       ww                ww          w",
    "w    ww   bwww   l   wwbw    w ww ww  w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww w",
    "w                                     w",
    "w  wwww          wwwwww            wwww",
    "wc w    ww www w      w ww www        w",
    "wwwwb   o         o        o   wb   D w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  ],
  [
    "w                 w w                 w",
    "w                ww ww                w",
    "w               www www               w",
    "wwwwwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwwww",
    "w                   w ww w    w ww    w",
    "w wwwwwwwwwwwwwwwwwww    w ww w    ww w",
    "wb             l      wwb   w l ww bw w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww w",
    "w wm    w   w  mwwwwww   www    wwwww w",
    "w www www www www    w w     ww w     w",
    "wb l          l   ww  bwwwww  w   wwwww",
    "w wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "w w   w        wwww       wm     wm   w",
    "w w       wwww   w   wwww ww  ww ww w w",
    "w   ww  wwwb l w   www  l   bww     w w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww w",
    "w   w   w   w   w     w               w",
    "w w w w   w   w w www w wwwww ttttttttw",
    "w w   wwwwwwwwwb l bw  b  l  btmmmmmmmw",
    "w wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "w w         mw     w  w  w  w  w    f w",
    "w w       w ww www w wwfwwfww ww  www w",
    "w   wwwwwmw    w  b  l   l      bww   w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww w",
    "w    f     f f f       f  f     f   w w",
    "w    wwwwwww www w   w wttwwwwwww w w w",
    "w ww b     l   b wwwb  w    l     w  bw",
    "w wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "w w         w         w              cw",
    "w w   ww ww w   wwwfwfww  w  w     wwww",
    "w www  w  w   www   w  f ww  ww  wwwwww",
    "w w   wwttwww   wtwwwwwwww      ww    w",
    "wb  www  l tb    l   b  l b l b     D w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  ]
]

let levelNum = 0

scene("game",() => {
  
let hp = 10
let hasKey = false
const level =      addLevel(levels[levelNum],levelConfig)
const hpLabel = add([
  text("hp: "+hp,{
  "size":16
  }),
  pos(16,16),
  fixed(),
])
const player = add([
  sprite("hero"),
  pos(level.getPos(2,0)),
  area({scale:0.5}),
  solid(),
  origin("bot"),
  body(),
    {
      "speed": 150,
      "jumpforce": 350
    }
]);

  player.play("idle")
  
  onUpdate("enemy",(e) => {
    e.move(e.xVel,0)
  })
  onUpdate("enemy2",(l) => {
    l.move(l.xVel,0)
  })
  onCollide("enemy","barrier",(e,b) => {
    e.xVel = -e.xVel
    if (e.xVel < 0) {
      e.flipX(true)        
    }
    else {
     e.flipX(false) 
    }
  })
  onCollide("enemy2","barrier",(l,b) => {
    l.xVel = -l.xVel
    if (l.xVel < 0) {
      l.flipX(true)        
    }
    else {
     l.flipX(false) 
    }
  })
  player.onCollide("enemy",() => {
    addKaboom(player.pos)
    hp--
    hpLabel.text = "hp: "+hp
    if(hp == 0) {
      destroy(player)
       wait(1,() => {
       go("lose")
     })
    }
  })
  player.onCollide("enemy2",() => {
    addKaboom(player.pos)
    hp--
    hpLabel.text = "hp: "+hp
    if(hp == 0) {
      destroy(player)
       wait(1,() => {
       go("lose")
     })
    }
  })
  player.onCollide("enemy3",() => {
    addKaboom(player.pos)
    hp--
    hpLabel.text = "hp: "+hp
    if(hp == 0) {
      destroy(player)
       wait(1,() => {
       go("lose")
     })
    }
  })
  player.onCollide("door",() => {
    if (hasKey == true) {
      if (levelNum == levels.length - 1) {
        go("win")  
      }
      else {
        levelNum++
        go("game")
      }  
    }
  })
  onKeyDown("right",() => {
    player.move(player.speed,0)
    player.flipX(false)
  }) 
   onKeyDown("left",() => {
    player.move(-player.speed,0)
    player.flipX(true)
  })
  onKeyPress(["right","left"],() => {
    player.play("run")
  })
  onKeyRelease(["right","left"],() => {
    player.play("idle")
  })
  onKeyPress("space",() => {
    if (player.isGrounded() == true)
    player.jump(player.jumpforce)
    player.play("hit")
  })
  onUpdate(() => {
    camPos(player.pos.x,player.pos.y)
  })
  player.onCollide("chest",(c) => {
    c.play("open")
    hasKey = true
  })
}) //CLOSE game

scene("menu",() => {
  add([
    text("Dragon World"),
    pos(width()/2,height()/2),
    origin("center"),
  ])
  add([
    text("PLAY"),
    "playButton",
    pos(width()/2,height()/1.5),
    origin("center"),
    area()
  ])
  onClick("playButton",() =>{
    go("game")
  })
  add([
    text("CONTROLS"),
    "controls",
    pos(width()/2,height()/3),
    origin("center"),
    area()
  ])
  onClick("controls",() =>{
    go("controls")
  })
})
scene("win",() => {
  add([
    text("You Win!"),
    pos(width()/2,height()/2),
    origin("center"),
  ])
  add([
    text("Play Again"),
    "playButton",
    pos(width()/2,height()/1.5),
    origin("center"),
    area()
  ])
  onClick("playButton",() =>{
    levelNum = 0
    go("menu")
  })
})
scene("lose",() => {
  add([
    text("You Loose."),
    pos(width()/2,height()/2),
    origin("center"),
  ])
  
  add([
    text("RETRY"),
    "playButton",
    pos(width()/2,height()/1.5),
    origin("center"),
    area()
  ])
  
  onClick("playButton",() =>{
    levelNum = 0
    go("game")
  })
})
scene("controls",() => {
   add([
    text("BACK TO MENU"),
    "playButton",
    pos(width()/2,height()/4),
    origin("center"),
    area()
  ])
  onClick("playButton",() =>{
    go("menu")
  })
  add([
    text("A/D = LEFT/RIGHT"),
    pos(width()/2,height()/2),
    origin("center"),
  ])
  add([
    text("SPACE = JUMP"),
    pos(width()/2,height()/1.5),
    origin("center"),
  ])
})

go("menu")