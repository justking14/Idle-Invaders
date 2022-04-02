class Alien {
     constructor(name, x, y, width, height, hpDefault) {
          //this.status = new StatusBuilder(name, classification).build()
          this.sprite = new SpriteBuilder().setBody(new BodyBuilder().setXY(x, y).setSize(width, height).build()).setName("enemyD").build()

          this.unlocked = true 
          this.hasAttacked = false
          this.index = 0
          this.health = hpDefault

          this.particles = new spriteParticleManager(x, y)
          this.biggerSprite = null;

          this.midLerp = false

          this.movingRight = true 
          this.hidden = false
                    
          this.eventKeeper = new GameClock(Math.floor(Date.now() / 1000), 0)
                    this.eventKeeper.addEvent({ name: "move", timeToTrigger: 1.0, repeat: false })


     }
     setPosition(x, y) { this.sprite.setPosition(x, y) }
     setPositionV(V){this.sprite.setPositionV(V)}
     setSize(width, height) { this.sprite.setSize(width, height) }

     getPosition() { return this.sprite.getPosition() }
     getSize() {    return this.sprite.getSize()}
     
     resetReset() {
          this.sprite.resetReset()
          this.midLerp = false
     }
    
     draw(ctx, size) {
          if (this.hidden === false){
               this.sprite.draw(ctx);
          }
     }
     drawParticles(ctx) { this.particles.draw(ctx); }
     update() {
          //this.particles.update();
          var events = this.eventKeeper.update()
          //for (var event in events) { this.dealWithEvent(events[event]) }
          if (this.sprite.body.pos.y > 600 && this.hidden === false) {
               return true 
          }
          return false
     }
     move() {
          if (this.movingRight === true) {
               this.sprite.body.pos.x += 20
               if (this.getPosition().x + this.getSize().x >= 1200) {
                    this.movingRight = false
                    this.sprite.body.pos.y += 40
               }
          } else {
               this.sprite.body.pos.x -= 20
               if (this.getPosition().x < 100) {
                    this.movingRight = true
                    this.sprite.body.pos.y += 40
               }
          }
     }
               ///this.eventKeeper.addEvent({ name: "move", timeToTrigger: 0.1, repeat: false })

       

}