class Player {
     constructor(name, x, y, width, height, classification) {
          //this.status = new StatusBuilder(name, classification).build()
          this.sprite = new SpriteBuilder().setBody(new BodyBuilder().setXY(x, y).setSize(width, height).build()).setName("enemyD").build()
          this.sprite2 = new SpriteBuilder().setBody(new BodyBuilder().setXY(x - 400, y).setSize(width, height).build()).setName("enemyD").build()
          this.sprite3 = new SpriteBuilder().setBody(new BodyBuilder().setXY(x + 400, y).setSize(width, height).build()).setName("enemyD").build()

          this.unlocked = true 
          this.hasAttacked = false
          this.index = 0

          this.particles = new spriteParticleManager(x, y)
          this.biggerSprite = null;

          this.midLerp = false
          this.attack = 25

          this.bullets = []
                    
          this.eventKeeper = new GameClock(Math.floor(Date.now() / 1000), 0)
                    this.eventKeeper.addEvent({ name: "shoot", timeToTrigger: 1.0, repeat: false })
                    this.eventKeeper.addEvent({ name: "moveBullets", timeToTrigger: 0.25, repeat: false })


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
          this.sprite.draw(ctx);
                    

          if (window.game.state.skillDict["Upgrade1"].purchased === true) {
               this.sprite2.draw(ctx)
          }
          if (window.game.state.skillDict["Upgrade2"].purchased === true) {
               this.sprite3.draw(ctx)
          }

          for (var i = 0; i < this.bullets.length; i++){
               this.bullets[i].draw(ctx)
          }
     }
     drawParticles(ctx) { this.particles.draw(ctx); }
     update(scope) {
          //this.particles.update();
                  
          if (window.game.state.skillDict["Strength1"].purchased === true) {
               this.attack = 50
          }
          var events = this.eventKeeper.update()
          for (var event in events) { this.dealWithEvent( events[event], scope) }
     }
     dealWithEvent( event, scope ) {
          //console.log(event.name, event.parent, event)
          if (event.name === "shoot") {
               var time = 1.0
               if (scope.skillDict["Speed1"].purchased === true) {
                    time = 0.75
               }
               if (scope.skillDict["Speed2a"].purchased === true) {
                    time = 0.5
               }
               if (scope.skillDict["Speed3a"].purchased === true) {
                    time = 0.25
               }
               var size = 20
               if (window.game.state.skillDict["Strength2"].purchased === true) {
                    size = 50
               }
               this.bullets.push(new Body(this.getPosition().x + this.getSize().x / 2 - size/1.5, this.getPosition().y - 20, size, size))
               this.bullets[this.bullets.length - 1].color = "black"
                         
               if (window.game.state.skillDict["Upgrade1"].purchased === true) {
                    this.bullets.push(new Body(this.sprite2.getPosition().x + this.getSize().x / 2 - size/1.5, this.sprite2.getPosition().y - 20, size, size))
                    this.bullets[this.bullets.length - 1].color = "black"
               }
                              
               if (window.game.state.skillDict["Upgrade2"].purchased === true) {
                    this.bullets.push(new Body(this.sprite3.getPosition().x + this.getSize().x / 2 - size/1.5, this.sprite3.getPosition().y - 20, size, size))
                    this.bullets[this.bullets.length - 1].color = "black"
               }

               this.eventKeeper.addEvent({ name: "shoot", timeToTrigger: time, repeat: false })

          } else if (event.name === "moveBullets") {
               for (var i = 0; i < this.bullets.length; i++){
                    this.bullets[i].setPosition(this.bullets[i].pos.x, this.bullets[i].pos.y - 10)
               }
               var time = 0.2;
               if (scope.skillDict["Speed2b"].purchased === true) {
                    time = 0.05
               }
               this.eventKeeper.addEvent({ name: "moveBullets", timeToTrigger: time, repeat: false })

          }
     }


}