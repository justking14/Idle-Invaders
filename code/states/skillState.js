class Circle {
     constructor(pos) {
          this.pos = pos;
          this.alpha = 1.0
     }
     draw(context) {
          context.globalAlpha = this.alpha 
          context.fillStyle = "#00ff00";
          context.beginPath();
          context.arc(this.pos.x, this.pos.y, 100, 0, 2 * Math.PI);
          context.fill();
          context.globalAlpha = 1.0
     }
}

class skillState extends State {
     constructor() {
          super("skill")
          this.eventKeeper = new GameClock(Math.floor(Date.now() / 1000), 0)
          this.eventKeeper.addEvent({ name: "checkForCollision", timeToTrigger: 0.1, repeat: true })
          this.eventKeeper.addEvent({ name: "spawn", timeToTrigger: 0.25, repeat: false })
          this.eventKeeper.addEvent({ name: "move", timeToTrigger: 0.1, repeat: false })

          this.eventKeeper.addEvent({ name: "makeStronger", timeToTrigger: 5.0, repeat: true })

          this.infoBody = new BodyBuilder().setXY(25, 10).setSize(1280 - 50, 130).build()

          this.aliens = [] 
          this.hpDefault = 20
          this.player = new Player("player", 1280 / 2, 600, 40, 40)
          //his.gold = 0
          this.circles = []
     }
     draw(ctx, scope) {

          ctx.fillColor = "rgb(0,255,0)"
          ctx.fillStyle = "rgb(0,255,0)"
          ctx.strokeStyle = "rgb(0,255,0)"

          for (var i = 0; i < this.circles.length; i++) {
               console.log(this.circles[i])
               this.circles[i].draw(ctx)              
          }


          for (var i = 0; i < 50; i++){
               ctx.beginPath();

               ctx.rect(i * 40, 0, 40, 40)
               ctx.stroke()
          }
          for (var i = 0; i < 50; i++){
               ctx.beginPath();

               ctx.rect(1240, i * 40, 40, 40)
               ctx.stroke()
          }
          for (var i = 0; i < 50; i++){
               ctx.beginPath();

               ctx.rect(0, i * 40, 40, 40)
               ctx.stroke()
          }
          for (var i = 0; i < 50; i++){
               ctx.beginPath();

               ctx.rect(i * 40, 680, 40, 40)
               ctx.stroke()
          }

          for (var i = 0; i < this.aliens.length; i++) {
               this.aliens[i].draw(ctx)
          }
          this.player.draw(ctx)

          ctx.fillColor = "rgb(0,255,0)"
          ctx.fillStyle = "rgb(0,255,0)"
          ctx.strokeStyle = "rgb(0,255,0)"
          this.infoBody.draw(ctx, scope)
          drawText(ctx, "Gold: " + window.game.state.gold, this.infoBody.pos.x + 20, this.infoBody.pos.y + 20, "black", false, 35)

                    ctx.fillColor = "black"
          ctx.fillStyle = "black"
     }
     update(scope) {
          for (var i = 0; i < this.aliens.length; i++) {
               if (this.aliens[i].update(scope) === true) {
                    this.onEnter()
                    return
               }
          }

          if (window.game.state.skillDict["Upgrade3"].purchased === true) {
               this.player.sprite.body.pos = new Vector(this.player.sprite.body.resetPosition.x + Math.sin(Date.now()/1000) * 100 , this.player.sprite.body.resetPosition.y)
               this.player.sprite2.body.pos = new Vector(this.player.sprite2.body.resetPosition.x + Math.sin(Date.now()/1000) * 100, this.player.sprite.body.resetPosition.y)
               this.player.sprite3.body.pos = new Vector(this.player.sprite3.body.resetPosition.x + Math.sin(Date.now()/1000) * 100, this.player.sprite.body.resetPosition.y)

          }


          this.player.update(scope)
          var events = this.eventKeeper.update()
          for (var event in events) { this.dealWithEvent(events[event], scope) }
     }
     onEnter(scope) {
          console.log("Entered store")

          this.hpDefault = 20
          this.eventKeeper = new GameClock(Math.floor(Date.now() / 1000), 0)
          this.eventKeeper.addEvent({ name: "checkForCollision", timeToTrigger: 0.1, repeat: true })
          this.eventKeeper.addEvent({ name: "spawn", timeToTrigger: 0.25, repeat: false })
          this.eventKeeper.addEvent({ name: "move", timeToTrigger: 0.1, repeat: false })
          this.eventKeeper.addEvent({ name: "makeStronger", timeToTrigger: 5.0, repeat: true })

          this.aliens = [] 
          this.player = new Player("player", 1280/2, 600, 40, 40)

     }

     dealWithEvent(event, scope) {
          if (event.name === "checkForCollision") {
               for (var i = 0; i < this.circles.length; i++) {
                    this.circles[i].alpha -= 0.25
                    if (this.circles[i].alpha < 0.0) {
                         this.circles[i].alpha = 0.0
                    }
               }


               for (var i = 0; i < this.aliens.length; i++) {
                    for (var j = 0; j < this.player.bullets.length; j++) {
                         if (this.aliens[i].hidden === false && this.player.bullets[j].hidden === false) {
                              var rect1 = new Body(this.aliens[i].getPosition().x, this.aliens[i].getPosition().y, this.aliens[i].getSize().x, this.aliens[i].getSize().y)
                              var rect2 = new Body(this.player.bullets[j].pos.x, this.player.bullets[j].pos.y, this.player.bullets[j].width, this.player.bullets[j].height)

                              if (rect1.pos.x < rect2.pos.x + rect2.width &&
                                   rect1.pos.x + rect1.width > rect2.pos.x &&
                                   rect1.pos.y < rect2.pos.y + rect2.height &&
                                   rect1.height + rect1.pos.y > rect2.pos.y) {
                                   // collision detected!
                                   this.aliens[i].health -= this.player.attack

                                   window.game.state.sounds.playerHurt.play()
                                   this.player.bullets[j].hidden = true
                                   if (this.aliens[i].health <= 0) {
                                        window.game.state.sounds.enemyHurt.play()
                                        window.game.state.gold += 1
                                        this.aliens[i].hidden = true
                                   }

                                   if (scope.skillDict["Strength3"].purchased === true && Math.random() < 0.2) {
                                        this.circles.push(new Circle(new Vector(this.player.bullets[j].pos.x, this.player.bullets[j].pos.y)))
                                        for (var k = 0; k < this.aliens.length; k++) {
                                             let y = this.player.bullets[j].pos.x - this.aliens[k].getPosition().x;
                                             let x = this.player.bullets[j].pos.y - this.aliens[k].getPosition().y;
                                             if (Math.sqrt(x * x + y * y) < 100) {
                                                  this.aliens[k].health -= this.player.attack/2
                                                  if (this.aliens[k].health <= 0) {
                                                       window.game.state.gold += 1
                                                       this.aliens[k].hidden = true
                                                  }
                                             }
                                        }

                                   }

                              }
                         }
                    }
               }
          } else if (event.name === "spawn") {
               this.aliens.push(new Alien("alien", 50, 150, 40, 40, this.hpDefault))
                              
               var time = 0.25
               if (scope.skillDict["Speed4"].purchased === true) {
                    time = 0.5
               }
               this.eventKeeper.addEvent({ name: "spawn", timeToTrigger: time, repeat: false })

          }else if (event.name === "move") {
               for (var i = 0; i < this.aliens.length; i++) {
                    this.aliens[i].move()
               }

               var time = 0.025
               if (scope.skillDict["Speed3b"].purchased === true) {
                    time = 0.05
               }
               this.eventKeeper.addEvent({ name: "move", timeToTrigger: time, repeat: false })
          } else if (event.name === "makeStronger") {
               this.hpDefault*=1.5
          }
     }
     dealWithInteraction(scope, event) {
          if (JSON.stringify(event) === '{}') {
               
          } else {
               if (event.Enter === true) {
                    delete event.Enter
               } else if (event.ArrowDown === true) {
                    delete event.ArrowDown
               }
          }
     }
}