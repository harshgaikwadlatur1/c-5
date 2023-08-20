var splash
var gameState = "wait"
var playbutton, level1bgimg, level1bg, level2bgimg, level2bg,playeridleimg,playerfightimg
var health = 0
var maxHealth = 400
var score = 0
var obstacle1,obstacle2,obstacle3,enemiesGroup


function preload() {
    splash = loadImage("assets/Killer.gif")
    level1bgimg = loadImage("assets/level1bg.jpg")
    playeridleimg = loadImage("assets/playerfightright.png")
    playerfightimg = loadImage("assets/ab.gif")
    obstacle1=loadImage("assets/pum.png")
    obstacle2=loadImage("assets/spi.png")
    obstacle3=loadImage("assets/tree.png")
}


function setup() {
    createCanvas(windowWidth, windowHeight)

    playbutton = createImg("assets/startbutton.png")
    playbutton.position(width / 2 - 70, height / 2 + height / 4)
    playbutton.size(200, 200)


    level1bg = createSprite(width / 2, height / 2, width, height)
    level1bg.addImage(level1bgimg)
    level1bg.scale = 1.95
    level1bg.visible = false
    level1bg.tint="yellow"


    player = createSprite(200, height - 200, 50, 50)
    // player.addImage(playerimg1)
    player.addImage("idle", playeridleimg)
    player.addImage("fight", playerfightimg)
    player.scale = 1.5
    player.visible = false
    player.debug=true
    player.setCollider("rectangle",0,0,player.width/3,player.height)



    invisibleground = createSprite(width / 2, height - 100, width, 10)
    invisibleground.visible = false

    enemiesGroup= new Group()

}


function draw() {
    if (gameState == "wait") {
        background(splash)
    }

    playbutton.mousePressed(() => {
        gameState = "level1"
        playbutton.hide()
    })

    if (gameState == "level1") {
        // background(level1bgimg)
              level1bg.visible = true
        player.visible=true
        spawnEnemies()

        score = score + Math.round(frameCount/60);
       
        player.visible = true

        if (keyDown("UP_ARROW")) {
            player.changeImage("fight")
        }
        // collectibles()

        if (keyDown("RIGHT_ARROW")) {
            player.changeImage("idle")
            player.x+=5
        }


        if (keyDown("space")) {
            player.velocityY = -10
        }

        player.velocityY += 0.8

        if(player.x>=width){
            player.x=150
        }

        player.collide(invisibleground)

    }

    drawSprites()

    if (gameState == "level1") {
        textSize(50)
        fill("yellow")
        stroke(0,255, 0)
        strokeWeight(2)
        // text("LEVEL 1", width / 2 - 100, 80)
        text("Score: " + score, width / 2 - 100, 80);

        healthlevel1()

    }
}




function healthlevel1() {

    stroke("gold");
    strokeWeight(7);
    noFill();
    rect(10, 10, 200, 20);

    noStroke();
    fill("red");
    rect(10, 10, map(health, 0, maxHealth, 0, 200), 20);
}


function spawnEnemies() {

    if (frameCount % 100 == 0) {

        var randheight=Math.round(random(100,height - 100))
        var enemy = createSprite(width, randheight)
        enemy.velocityX = -6
        enemy.scale=0.25
        //generate random obstacles
        var rand = Math.round(random(1, 3))
        switch (rand) {
            case 1: enemy.addImage(obstacle1);
                break;
            case 2: enemy.addImage(obstacle2);
                break;
            case 3: enemy.addImage(obstacle3);
                break;
            default: break;

        }
        enemy.debug=true
        enemiesGroup.add(enemy)

    }


}