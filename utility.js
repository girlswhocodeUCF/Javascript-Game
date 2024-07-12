Array.prototype.parse2D = function() {
  const rows = []
  for (let i = 0; i < this.length; i += 40) {
    rows.push(this.slice(i, i + 40))
  }
  return rows
}

Array.prototype.createObjectsFrom2D = function() {
  const objects = []
  this.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol !== 0) {
        objects.push(
          new CollisionBlock({
            position: {
              x: x * 25,
              y: y * 25,
            },
          })
        )
      }
    })
  })

  return objects
}