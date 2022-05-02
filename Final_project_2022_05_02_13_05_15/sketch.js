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
  "b": () => [
    "barrier",
    sprite("wall"),
    area(),
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
    "w      w     w b  l    b      w       w",
    "w  w w   www   wwwwbwww ww ww   w ww  w",
    "ww  wwwwwwwwwwwwwww     wwwwwwwwwwwwwww",
    "www          w    wwwwwww        w    w",
    "wwww   wwwwwb   w l  b l    wwbw   w  w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww  ww",
    "w                                   www",
    "w  ww                              wwww",
    "ww  wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "www                                   w",
    "wwww                                  w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww w",
    "w                                     w",
    "wc                                    w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  ],
  [
    "w                                     w",
    "w                                     w",
    "w                                   D w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "w                                     w",
    "w                                     w",
    "w                                     w",
    "w                                     w",
    "w                                     w",
    "w                                     w",
    "w                                     w",
    "w                                     w",
    "w                                     w",
    "w                                     w",
    "w                                     w",
    "w                                     w",
  ]
]

let levelNum = 0

scene("game",() => {
  
let hp = 3
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
  onKeyRelease("space",()=> {
    if (player.move == false) {
      player.play("idle")
    }
    else {
      player.play("run")
    }
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