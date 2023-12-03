import * as WriteEls from './writeEls.js'
import * as PlayingData from './data/playingData.js'
import * as CreateData from './data/createData.js'
import * as ElData from './data/elData.js'
import * as HTMLOfPlaying from './htmlOfPlaying.js'

const playingData = PlayingData.getData()

WriteEls.board()

const stoneEls = document.querySelectorAll('.stones_el')

stoneEls[40].classList.add('supper')

for (let i = 0; i < stoneEls.length; i++) {
  stoneEls[i].onclick = () => {
    if (stoneEls[i].classList.contains('g')) {
      HTMLOfPlaying.move(stoneEls, i)
      return
    }
    if (stoneEls[i].lastChild) {
      const { onTurn } = playingData

      if (stoneEls[i].classList.contains('supper')) {
        HTMLOfPlaying.nextStepSupper(i)
        return
      }
      if (stoneEls[i].lastChild.classList.contains(onTurn)) {
        HTMLOfPlaying.nextStep(i)
        return
      }
    }
  }
}
