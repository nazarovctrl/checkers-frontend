import * as CreateData from './createData.js'

const data = {
  onTurn: 'w',
  attac: false,
  clickedStones: [],
  // stones indexs
  stoneNums: CreateData.stoneNums(),
  supperStoneNums: {
    w: [1, 3, 5, 7],
    b: [56, 58, 60, 62],
  },
  // attack's arr
  bStones: [],
  attackStones: [],
}

function getData() {
  return data
}

export { getData }
