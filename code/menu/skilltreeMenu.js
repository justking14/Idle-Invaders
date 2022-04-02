class skillTreeMenu extends menuBase {
     constructor() {

          super("skills")
          this.xIndex = 0
          this.yIndex = 0

          this.currentTree = []
       
          this.speedTreeNodes = []
          this.strengthTree = []

          var speedTreeNodes = this.addTree(speedTree,0)
          var strengthTreeNodes = this.addTree(strengthTree, 1)
          var upgradeTreeNodes = this.addTree(upgradeTree, 2)

          this.allTreeNodes = [speedTreeNodes, strengthTreeNodes, upgradeTreeNodes]
          this.treeIndex = 0
          
     }
     addItems() {
     }
     addTree(tree,index){
          
   
          //this.items = this.speedTree;

          this.items = [] 
          var pos = new Vector(this.body.pos.x/2 + 200 + index * 300,this.body.pos.y + 50)
          for (var j = 0; j < tree.length; j++) {
               this.items.push(new skillTreeItem(tree[j], j, 1280, pos.clone()))
          }
          var closedNodes = []
          var openNodes = [this.items[0]]
          while (openNodes.length !== 0) {
               var startingNode = openNodes[0]

               var childrenNodes = []
               for (var i = 0; i < this.items.length; i++) {
                    if (startingNode.children.includes(this.items[i].name)) {
                         this.items[i].parentNodes.push(startingNode)
                         childrenNodes.push(this.items[i])

                         if (closedNodes.includes(this.items[i]) === false && openNodes.includes(this.items[i]) === false) {
                              openNodes.push(this.items[i])
                         }
                    }
               }
               for (var i = 0; i < childrenNodes.length; i++){
                    if (childrenNodes.length === 1) {
                         childrenNodes[i].pos.x = startingNode.pos.x 
                    } else if (childrenNodes.length === 2) {
                         if (i === 0) {
                              childrenNodes[i].pos.x = startingNode.pos.x - 75
                         } else {
                              childrenNodes[i].pos.x = startingNode.pos.x + 75
                         }
                    }
                    childrenNodes[i].pos.y = startingNode.pos.y + 75
               }
               openNodes.shift()
          }
          return this.items
     }


     advance(event) {
          this.items = this.allTreeNodes[this.treeIndex]
          var keepMoving = true 
          if (event === "down") {
               var item = this.items[this.index]
               if (item.purchased === true) {
                    for (var i = 0; i < this.items.length; i++) {
                         if (item.children.includes(this.items[i].name)) {
                              this.index = this.items[i].itemIndex
                              return
                         }
                    }
               }

          } else if (event === "up") {
               var item = this.items[this.index]
               for (var i = 0; i < this.items.length; i++) {
                    if (item.parents.includes(this.items[i].name)) {
                         console.log(this.items[i].name, this.items[i].itemIndex)
                         this.index = this.items[i].itemIndex
                         return
                    }
               }
          }
     }

     changeValue(event, scope) {
          this.items = this.allTreeNodes[this.treeIndex]

          if (event === "right") {
               var item = this.items[this.index]
               //item.optionIndex += 1
               if (item.parentNodes.length === 0) {
                    this.treeIndex += 1
                    if (this.treeIndex >= this.allTreeNodes.length) {
                         this.treeIndex = 0
                    }
               } else {
                         
                    for (var i = 0; i < this.items.length; i++) {
                         console.log(this.items[i].name, item.siblings)
                         if (item.siblings.includes(this.items[i].name)) {
                              //if (item[i].purchased === true) {
                              this.index = this.items[i].itemIndex
                              //}
                         }
                    }
               }

               //item.changeValue()
          } else if (event === "left") {
               var item = this.items[this.index]
               
               if (item.parentNodes.length === 0) {
                    this.treeIndex -= 1
                    if (this.treeIndex < 0) {
                         this.treeIndex = this.allTreeNodes.length - 1
                    }
               } else {
                    for (var i = 0; i < this.items.length; i++) {
                         if (item.siblings.includes(this.items[i].name)) {
                              //if (item[i].purchased === true) {
                              this.index = this.items[i].itemIndex
                              //}
                         }
                    }
               }

               //item.changeValue()
          } else if (event === "enter") {
               var item = this.items[this.index]
               if (item.parentNodes.length === 0) {
                    if (window.game.state.gold >= item.cost) {
                         window.game.state.gold-=item.cost 
                         scope.skillDict[item.name].purchased = true
                         item.purchased = true
                    }
               } else if (item.parentNodes[0].purchased === true) {
                    if (window.game.state.gold >= item.cost) {
                         window.game.state.gold-=item.cost
                         scope.skillDict[item.name].purchased = true
                         item.purchased = true
                    }
               }
               //item.optionIndex += 1

          }

     }

     draw(ctx) {
          this.items = this.speedTreeNodes
          console.log(this.items, this.speedTreeNodes)

          this.body.color = "black"
          this.body.draw(ctx)
          this.infoBody.color = "black"
          this.infoBody.draw(ctx)

          ctx.fillColor = "white"
          ctx.fillStyle = "white"
          
          ctx.strokeStyle = "rgb(0,255,0)"
     
          ctx.beginPath();
          ctx.moveTo(this.allTreeNodes[0][0].pos.x, this.allTreeNodes[0][0].pos.y + 15);
          ctx.lineTo(this.allTreeNodes[2][0].pos.x + 20, this.allTreeNodes[2][0].pos.y + 15);
          ctx.stroke();

          for (var t = 0; t < this.allTreeNodes.length; t++) {
               this.items = this.allTreeNodes[t]
               for (var i = 0; i < this.items.length; i++) {
                    if (t === this.treeIndex) {
                         this.items[i].draw(ctx, this.index, this.body, this.infoBody)
                    } else {
                         this.items[i].draw(ctx, -1, this.body, this.infoBody)
                    }
               }
          }
          if (this.ranOnce === false) {
               //this.advance("up")
               //this.advance("down")
          }

     }    
}

class skillTreeItem{
     constructor(item, i, width, pos) {
          console.log(item)
          this.body = new Body(0, 0, 50, 30)
          this.pos = pos.clone()
          this.name = item.id 
          this.text = item.id
          this.title = item.id

          this.description = item.description
          this.parentNodes = []
          this.parents = item.parents || []
          this.children = item.children || []
          this.siblings = item.siblings || null 
          this.cost = item.cost

          this.type = item.type

          this.itemIndex = i
          this.optionIndex = 1

          this.visible = true //change
          this.purchased = false 

          this.menuType = item.menuType;
          this.subMenu = item.subMenu;

          this.fnt = 32

          this.width = 1000;
     }

     changeCount() {
          var oldCount = this.count
          
               window.game.state.menuDict[this.menuType][this.subMenu]["active"] = (this.count > 0)
               window.game.state.menuDict[this.menuType][this.subMenu]["count"] = this.count;
               window.game.state.worldStateManager.currentState.menuChange(this.subMenu, oldCount)//,  !scope.menuDict[this.menuType][this.subMenu])

     }

     changeValue() {

          if (this.type === "binary") {
               window.game.state.worldStateManager.currentState.menuChange(this.subMenu)//,  !scope.menuDict[this.menuType][this.subMenu])
               window.game.state.menuDict[this.menuType][this.subMenu]["active"] = (this.optionIndex === 0)
          } else {

          }
     }


     draw(ctx, index, body, infoBody) {
          var x =  this.pos.x 
          var y = this.pos.y
          

          this.body.setPosition(x,y)
          this.y = y
          var prevX = x

          this.visible = true   

          if (this.visible === true) {
               if (this.purchased === false) {
                    this.body.draw(ctx, "black")
               } else {
                    this.body.draw(ctx, "green")
               }
               if (index === this.itemIndex) {       
                    ctx.font = '25px Adventure';
                    drawText(ctx, this.description, infoBody.pos.x + 20, infoBody.pos.y + 20, "rgb(0,255,0)", false, 25)
                    if (this.purchased === false) {
                         drawText(ctx, "Cost: " + this.cost, infoBody.pos.x + 20, infoBody.pos.y + 60, "rgb(0,255,0)", false, 25)
                    } else {
                         drawText(ctx, "PURCHASED", infoBody.pos.x + 20, infoBody.pos.y + 60, "rgb(0,255,0)", false, 25)

                    }

               }
               ctx.font = '15px Adventure';
               drawText(ctx, this.text, this.body.pos.x + 10, this.body.pos.y + 10, "rgb(0,255,0)", index === this.itemIndex, 15)
               this.body.width = ctx.measureText(this.text + "").width + 20
               x += ctx.measureText(this.text + "").width + 20

               if (this.parentNodes !== []) {
                    ctx.strokeStyle = "rgb(0,255,0)"

                    ctx.lineWidth = 5;

                    for (var i = 0; i < this.parentNodes.length; i++) {
                         // draw a red line
                         ctx.beginPath();
                         ctx.moveTo(this.pos.x + this.body.width / 2, this.pos.y);
                         ctx.lineTo(this.parentNodes[i].pos.x + this.parentNodes[i].body.width / 2, this.parentNodes[i].pos.y + this.parentNodes[i].body.size.y);
                         ctx.stroke();
                    }
               }

          }
          
     }
}
