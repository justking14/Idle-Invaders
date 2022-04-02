

class menuState extends State{
     constructor() {
          super("menu")
          this.hidden = true 
          this.body = new BodyBuilder().setXY(25, 25).setSize(1024 - 50, 768 - 50)
          
          this.infoBody = new BodyBuilder().setXY(25, 10).setSize(1280 - 50, 130)
          this.body = new BodyBuilder().setXY(25, 140).setSize(1280 - 50, 720 - 150)
          this.infoBody.color = "rgb(0,255,0)"
          this.body.color = "rgb(0,255,0)"


          this.storeUI = new skillTreeMenu("options")
 
          console.log(this.storeUI.items)
          
          this.index = 0
          this.color = null 
      
     }
          
     onEnter(scope) {

     }
     update() {}
     draw(ctx, scope) {

          ctx.font = "32px Adventure"

          this.storeUI.draw(ctx)

     }

     onExit() {}
     
     dealWithInteraction(scope, event) {
          if (JSON.stringify(event) === '{}') {
               
          } else {
               
               if (event.ArrowDown === true) {
                    delete event.ArrowDown
                    this.storeUI.advance("down")

               } else if (event.ArrowUp === true) {
                    delete event.ArrowUp
                    this.storeUI.advance("up")
                    
               }

               if (event.ArrowRight === true) {
                    delete event.ArrowRight

                    this.storeUI.changeValue("right")

                    
               } else if (event.ArrowLeft === true) {
                    delete event.ArrowLeft

                    this.storeUI.changeValue("left")
               }               

               if (event.Enter === true) {
                    delete event.Enter
                    this.storeUI.changeValue("enter", scope)
               }
          }
          //               scope.worldStateManager.currentState.menuChange("travel",  !scope.menuDict["automation"]["travel"])

     }
     
}

