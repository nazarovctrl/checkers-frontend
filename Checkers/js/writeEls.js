import * as PlayingData from './data/playingData.js'

const numbers = PlayingData.getData().stoneNums
function board() {
  for (let i = 0; i < 64; i++) {
    boardColors(i)
    boardStones(i)
  }
  boardText()
}

const boardColorsEl = document.querySelector('.board_colors')
function boardColors(i) {
  let className = `dark_color`
  if (!numbers.includes(i)) className = `light_color`

  boardColorsEl.innerHTML += `<div class="board_colors_el ${className}"></div>`
}

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const boardTextEl = document.querySelector('.board_text_area')
function boardText() {
  for (let i = 0; i < 4; i++) {
    const resultArr = []
    for (let j = 0; j < 8; j++) {
      resultArr.push(
        `<div class="board_text_el">${i % 2 == 0 ? j + 1 : letters[j]}</div>`
      )
    }
    boardTextEl.innerHTML += `<div class="board_text">${resultArr.join('')}</div>`
  }
}

const stoneEl = document.querySelector('.stones')
function boardStones(i) {
  stoneEl.innerHTML += `<div class="stones_el"></div>`

  const stoneEls = stoneEl.children

  if (i < 8 && i % 2 == 1) {
    stoneEls[i].innerHTML = `<div class="stone b"></div>`
  }
  if (i >= 8 && i < 16 && i % 2 == 0) {
    stoneEls[i].innerHTML = `<div class="stone b"></div>`
  }
  if (i >= 16 && i < 24 && i % 2 == 1) {
    stoneEls[i].innerHTML = `<div class="stone b"></div>`
  }

  if (i >= 40 && i < 48 && i % 2 == 0) {
    stoneEls[i].innerHTML = `<div class="stone w"></div>`
  }
  if (i >= 48 && i < 56 && i % 2 == 1) {
    stoneEls[i].innerHTML = `<div class="stone w"></div>`
  }
  if (i >= 56 && i % 2 == 0) {
    stoneEls[i].innerHTML = `<div class="stone w"></div>`
  }
  return
}

export { board }
