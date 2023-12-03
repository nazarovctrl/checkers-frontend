import * as PlayingData from './data/playingData.js'

const playingData = PlayingData.getData()

function nextStep(i) {
  const stoneEls = document.querySelectorAll('.stones_el')
  const { onTurn } = playingData

  const { clickedStones } = playingData
  const lastStone = clickedStones[clickedStones.length - 1] || false
  const currentStone = stoneEls[i]

  const num1 = i + (onTurn == 'w' ? -9 : 9),
    num2 = i + (onTurn == 'w' ? -7 : 7)
  const [stone1, stone2] = [stoneEls[num1], stoneEls[num2]]

  if (lastStone) lastStone.classList.remove('active')
  currentStone.classList.add('active')

  removeClass(stoneEls, 'attack')
  removeClass(stoneEls, 'g')

  checkStones(stone1, num1, i)
  checkStones(stone2, num2, i)

  playingData.clickedStones.push(currentStone)
  return
}

function nextStepSupper(i) {
  const stoneEls = document.querySelectorAll('.stones_el')

  const { clickedStones } = playingData
  const lastStone = clickedStones[clickedStones.length - 1] || false
  const currentStone = stoneEls[i]

  if (lastStone) lastStone.classList.remove('active')
  currentStone.classList.add('active')

  removeClass(stoneEls, 'attack')
  removeClass(stoneEls, 'g')

  const stones = getSupperIndex(i)

  for (let i = 0; i < stones.length; i++) {
    stones[i].classList.add('g')
  }

  playingData.clickedStones.push(currentStone)
  return
}

function getSupperIndex(index) {
  const stoneEls = document.querySelectorAll('.stones_el')
  const res = []

  let mainIndexs = [-9, -7, 7, 9]
  let i = 1

  while (i < 8) {
    const indexs = mainIndexs.map((m) => i * m)
    for (let j = 0; j < indexs.length; j++) {
      const elI = index + indexs[j]

      if (playingData.stoneNums.includes(elI) && !stoneEls[elI].lastChild) {
        res.push(stoneEls[elI])
        console.log(stoneEls[elI])
      }
    }
    i++
  }

  return res
}

const { stoneNums } = playingData

function checkStones(stone, num, i) {
  checkG(stone, num)

  const setBStones = new Set()
  const setAttackStones = new Set()
  attacking(stone, i, [setBStones, setAttackStones])

  if (setBStones.size > 1) {
    playingData.bStones = Array.from(setBStones)
  }
  if (setAttackStones.size > 1) {
    playingData.attackStones = Array.from(setAttackStones)
    console.log(setAttackStones)
  }
}

function attacking(stone, i, [setBStones, setAttackStones]) {
  const attack = checkAttack(stone, i, [setBStones, setAttackStones])
  const bbStones = attack[0]

  if (bbStones.length > 0) {
    let arr = []
    for (let j = 0; j < bbStones.length; j++) {
      checkAttack(bbStones[j], attack[1][j], [setBStones, setAttackStones])
      arr.push(
        checkAttack(bbStones[j], attack[1][j], [setBStones, setAttackStones])
      )
    }

    const attackArr = []
    for (let j = 0; j < arr.length; j++) {
      for (let n = 0; n < arr[j].length; n++) {
        if (arr[j][n].length > 0) {
          const newArr = arr[j]
          const resultArr = []
          for (let m = 0; m < newArr.length; m++) {
            resultArr.push(...newArr[m])
          }
          attackArr.push(resultArr)
        }
      }
    }

    for (let j = 0; j < attackArr.length; j++) {
      checkAttack(...attackArr[j], [setBStones, setAttackStones])
    }
  }
}

function checkG(stone, num) {
  if (!stone.lastChild && stoneNums.includes(num)) stone.classList.add('g')
}

const offsets = [9, 7, -7, -9]
function checkAttack(stone, i, [setBStones, setAttackStones]) {
  const stoneEls = stone.parentElement

  const bArr = getBStones(stoneEls, i)
  const bbArr = getBStones(stoneEls, i, 2)

  const bStones = bArr[0]
  const bbStones = bbArr[0]

  const indexArr = []
  const elArr = []
  const attackArr = []

  for (let j = 0; j < bStones.length; j++) {
    if (
      bStones[j] &&
      bbStones[j] &&
      bStones[j].lastChild &&
      !bbStones[j].lastChild &&
      !bStones[j].lastChild.classList.contains(playingData.onTurn) &&
      stoneNums.includes(bbArr[1][j])
    ) {
      bStones[j].classList.add('attack')
      bbStones[j].classList.add('g')
      bbStones[j].classList.add('attack_g')

      attackArr.push(bStones[j])
      indexArr.push(bbArr[1][j])
      elArr.push(bbStones[j])
    }
  }
  setBStones.add(...elArr)
  setAttackStones.add(...attackArr)

  return [elArr, indexArr]
}

function getBStones(stoneEls, i, index = 1) {
  const stones = []
  const indexs = []

  offsets.map((offset) => {
    const bStoneIndex =
      playingData.onTurn === 'b' ? i + index * offset : i - index * offset
    stones.push(stoneEls.children[bStoneIndex])
    indexs.push(bStoneIndex)
  })

  return [stones, indexs]
}

function removeClass(els, className) {
  for (let i = 0; i < els.length; i++) {
    if (els[i].classList.contains(className)) {
      els[i].classList.remove(className)
    }
  }
}

function move(stoneEls, i) {
  const activeStone = document.querySelector('.active')

  const { onTurn, bStones, attackStones, supperStoneNums } = playingData

  const stoneIndex = bStones.indexOf(stoneEls[i])
  bStones.length = attackStones.length = stoneIndex + 1

  attackStones.push(activeStone)
  for (let i = 0; i < attackStones.length; i++) {
    if (attackStones[i].lastChild) {
      attackStones[i].lastChild.remove()
    }
  }

  if (supperStoneNums[onTurn].includes(i)) {
    stoneEls[i].classList.add('supper')
  }

  let stoneSupper = false
  if (activeStone.classList.contains('supper')) {
    stoneSupper = stoneEls[i]
  }

  stoneEls[i].innerHTML = `<div class="stone ${onTurn}"></div>`

  removeClass(stoneEls, 'g')
  removeClass(stoneEls, 'active')
  removeClass(stoneEls, 'attack')
  removeClass(stoneEls, 'attack_g')
  for (let i = 0; i < stoneEls.length; i++) {
    if (stoneEls[i].classList.contains('supper') && !stoneEls[i].lastChild) {
      stoneEls[i].classList.remove('supper')
    }
  }

  if (stoneSupper) {
    stoneSupper.classList.add('supper')
  }

  onTurn == 'w'
    ? (PlayingData.getData().onTurn = 'b')
    : (PlayingData.getData().onTurn = 'w')
}

export { nextStep, nextStepSupper, removeClass, move }
