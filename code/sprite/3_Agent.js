class Agent {
     constructor(name, x, y, width, height, classification) {
          this.status = new StatusBuilder(name, classification).build()
          this.sprite = new SpriteBuilder().setBody(new BodyBuilder().setXY(x, y).setSize(width, height).build()).setName(this.status.imgName).build()

          this.unlocked = true 
          this.hasAttacked = false
          this.index = 0

          this.particles = new spriteParticleManager(x, y)
          this.biggerSprite = null;

          this.midLerp = false
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
          if (size === undefined || this.status.dead === true) {
               this.sprite.draw(ctx);
          } else {
               this.biggerSprite.body.setPositionV(this.getPosition())
               this.biggerSprite.draw(ctx)
          }
     }
     drawParticles(ctx) { this.particles.draw(ctx); }
     update() { this.particles.update(); }
}

