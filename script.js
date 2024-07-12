const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 25 * 40 // 1000
canvas.height = 25 * 28 // 700

let parsedCollisions
let collisionBlocks
let background
let doors

let player;
let player2;

// Prompt the user for the level number
let level = parseInt(prompt('Enter level number (1, 2, or 3):'));
while (![1, 2, 3].includes(level)) {
  level = parseInt(prompt('Invalid input. Please enter 1, 2, or 3:'));
}

let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()

      player = new Player({
        collisionBlocks,
        color: 'red'
      });

      player2 = new Player({
        collisionBlocks,
        color: 'blue'
      });

      player.position.x = 900
      player.position.y = 665

      player2.position.x = 200
      player2.position.y = 665

      player.collisionBlocks = collisionBlocks
      player2.collisionBlocks = collisionBlocks

      if (player.currentAnimation) player.currentAnimation.isActive = false
      if (player2.currentAnimation) player2.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/backgroundLevel1.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 90,
            y: -25,
          },
          imageSrc: './img/doors1-sprite.png',
          frameRate: 2,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ]
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()

      player = new Player({
        collisionBlocks,
        color: 'red'
      });

      player2 = new Player({
        collisionBlocks,
        color: 'blue'
      });

      player.position.x = 775
      player.position.y = 500

      player2.position.x = 200
      player2.position.y = 500

      player.collisionBlocks = collisionBlocks
      player2.collisionBlocks = collisionBlocks

      if (player.currentAnimation) player.currentAnimation.isActive = false
      if (player2.currentAnimation) player2.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/backgroundLevel2.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 0,
            y: 0,
          },
          imageSrc: './img/doors2-sprite.png',
          frameRate: 2,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ]
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player = new Player({
        collisionBlocks,
        color: 'red'
      });

      player2 = new Player({
        collisionBlocks,
        color: 'blue'
      });

      player.position.x = 850
      player.position.y = 600

      player2.position.x = 100
      player2.position.y = 600

      player.collisionBlocks = collisionBlocks
      player2.collisionBlocks = collisionBlocks

      if (player.currentAnimation) player.currentAnimation.isActive = false
      if (player2.currentAnimation) player2.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/backgroundLevel3.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 0,
            y: 0,
          },
          imageSrc: './img/doors3-sprite.png',
          frameRate: 2,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ]
    },
  },
}

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
  arrowUp: { pressed: false },
  arrowLeft: { pressed: false },
  arrowRight: { pressed: false },
};

const overlay = {
  opacity: 0,
}

function animate() {
  window.requestAnimationFrame(animate)

  background.draw()
  // collisionBlocks.forEach((collisionBlock) => {
  //   collisionBlock.draw()
  // })

  doors.forEach((door) => {
    door.draw()
  })

  player.handleInput(keys)
  player.draw(c)
  player.update()

  player2.handleInput(keys)
  player2.draw(c)
  player2.update()

  // if (playerIntersectsDoor()) {
  //   level += 1; // Change to the next level
  //   if (levels[level]) {
  //     levels[level].init(); // Initialize the new level if it exists
  //   } else {
  //     // Handle game completion or loop back to the first level
  //     level = 1;
  //     levels[level].init();
  //   }
  // }

  c.save()
  c.globalAlpha = overlay.opacity
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.restore()
}

// function playerIntersectsDoor() {
//   // Loop through all doors and check for intersection with each player
//   for (const door of doors) {
//     // Calculate the bounding box of the door
//     const doorBoundingBox = {
//       x: door.position.x,
//       y: door.position.y,
//       width: door.width,
//       height: door.height,
//     };

//     // Calculate the bounding box of each player
//     const playerBoundingBox1 = {
//       x: player.position.x,
//       y: player.position.y,
//       width: player.width,
//       height: player.height,
//     };

//     const playerBoundingBox2 = {
//       x: player2.position.x,
//       y: player2.position.y,
//       width: player2.width,
//       height: player2.height,
//     };

//     // Check for intersection between player 1 and door bounding boxes
//     if (
//       playerBoundingBox1.x < doorBoundingBox.x + doorBoundingBox.width &&
//       playerBoundingBox1.x + playerBoundingBox1.width > doorBoundingBox.x &&
//       playerBoundingBox1.y < doorBoundingBox.y + doorBoundingBox.height &&
//       playerBoundingBox1.y + playerBoundingBox1.height > doorBoundingBox.y
//     ) {
//       // Intersection detected for player 1
//       return true;
//     }

//     // Check for intersection between player 2 and door bounding boxes
//     if (
//       playerBoundingBox2.x < doorBoundingBox.x + doorBoundingBox.width &&
//       playerBoundingBox2.x + playerBoundingBox2.width > doorBoundingBox.x &&
//       playerBoundingBox2.y < doorBoundingBox.y + doorBoundingBox.height &&
//       playerBoundingBox2.y + playerBoundingBox2.height > doorBoundingBox.y
//     ) {
//       // Intersection detected for player 2
//       return true;
//     }
//   }

//   // No intersection detected with any door for both players
//   return false;
// }



levels[level].init()
animate()