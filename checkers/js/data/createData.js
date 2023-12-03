function stoneNums() {
  const arr = []
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const index = row * 8 + col
      if ((row + col) % 2 == 1) {
        arr.push(index)
      }
    }
  }
  return arr
}

export { stoneNums }
