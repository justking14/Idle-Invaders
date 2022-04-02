class menuBase {
     constructor(name) {
          this.name = name;
                    
          this.hidden = true           
          this.infoBody = new BodyBuilder().setXY(25, 10).setSize(1280 - 50, 130).build()
          this.body = new BodyBuilder().setXY(25, 140).setSize(1280 - 50, 720).build()

          this.index = 0
          this.items = []
          this.ranOnce = false
          this.addItems()

     }
     addItems() {
     }
     advance(event) {
     }
     update() {
     }
     draw(ctx) {
          this.body.draw(ctx)
                    this.infoBody.draw(ctx)

          ctx.fillColor = "white"
          ctx.fillStyle = "white"
          for (var i = 0; i < this.items.length; i++) {
               this.items[i].draw(ctx, this.index, this.body, this.infoBody)
          }
          if (this.ranOnce === false) {
               //this.advance("up")
               //this.advance("down")
          }

     }    
}
