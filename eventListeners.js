window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'w':
      keys.w.pressed = true;
      break;
    case 'a':
      keys.a.pressed = true;
      break;
    case 'd':
      keys.d.pressed = true;
      break;
    case 'ArrowUp':
      keys.arrowUp.pressed = true;
      break;
    case 'ArrowLeft':
      keys.arrowLeft.pressed = true;
      break;
    case 'ArrowRight':
      keys.arrowRight.pressed = true;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'w':
      keys.w.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
    case 'ArrowUp':
      keys.arrowUp.pressed = false;
      break;
    case 'ArrowLeft':
      keys.arrowLeft.pressed = false;
      break;
    case 'ArrowRight':
      keys.arrowRight.pressed = false;
      break;
  }
});