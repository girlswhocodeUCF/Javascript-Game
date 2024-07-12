class Player {
  constructor({ collisionBlocks = [], color }) {
    this.position = {
      x: 0,
      y: 0,
    }

    this.velocity = {
      x: 0,
      y: 0,
    }

    this.width = 25;
    this.height = 25;

    this.sides = {
      bottom: this.position.y + this.height,
    }
    this.gravity = 1
    this.jumpHeight = 20

    this.collisionBlocks = collisionBlocks
    this.color = color

    this.jumping = false
  }

  draw(c) {
    // Draw the player as a simple rectangle
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  handleInput(keys) {
    if (this.preventInput) return;
    this.velocity.x = 0;

    if (this === player) {
      if (keys.d.pressed) {
        this.velocity.x = 5;
        this.lastDirection = 'right';
      } else if (keys.a.pressed) {
        this.velocity.x = -5;
        this.lastDirection = 'left';
      }

      else if (keys.w.pressed && !this.jumping) {
        this.velocity.y = -this.jumpHeight;
        this.jumping = true;
      }
    } else if (this === player2) {
      if (keys.arrowRight.pressed) {
        this.velocity.x = 5;
        this.lastDirection = 'right';
      } else if (keys.arrowLeft.pressed) {
        this.velocity.x = -5;
        this.lastDirection = 'left';
      }

      else if (keys.arrowUp.pressed && !this.jumping) {
        this.velocity.y = -this.jumpHeight;
        this.jumping = true;
      }
    }
  }

  update() {

    this.position.x += this.velocity.x

    this.checkForHorizontalCollisions()
    this.applyGravity()
    this.checkForVerticalCollisions()

  }

  checkForHorizontalCollisions() {
    // check horizontal collisions
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]
      //if collision exists
      if (this.position.x <= collisionBlock.position.x + collisionBlock.width && // left
        this.position.x + this.width >= collisionBlock.position.x && // right
        this.position.y + this.height >= collisionBlock.position.y && // top
        this.position.y <= collisionBlock.position.y + collisionBlock.height // bottom
      ) {
        // collision on x-axis going left
        if (this.velocity.x < 0) {
          this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
          break
        }
        // collision on x-axis going right
        if (this.velocity.x > 0) {
          this.position.x = collisionBlock.position.x - this.width - 0.01
          break
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
  }

  checkForVerticalCollisions() {
    // check for vertical collisions
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]
      //if collision exists
      if (this.position.x <= collisionBlock.position.x + collisionBlock.width && // left
        this.position.x + this.width >= collisionBlock.position.x && // right
        this.position.y + this.height >= collisionBlock.position.y && // top
        this.position.y <= collisionBlock.position.y + collisionBlock.height // bottom
      ) {
        // collision on y-axis going up
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
          break
        }
        // collision on y-axis going down
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          this.position.y = collisionBlock.position.y - this.height - 0.01
          this.jumping = false
          break
        }
      }
    }
  }

}