var dot = 'O' // Player 1
var cross = 'X' // Player 2

var currentPlayer = 1
var tilesClicked = 0
var gameOver = false

var tiles = Array.from(document.querySelectorAll('div.tile'))

var segments = [
  [0, 1, 2], // first row
  [3, 4, 5], // second row
  [6, 7, 8], // third row
  [0, 3, 6], // first column
  [1, 4, 7], // second column
  [2, 5, 8], // third column
  [0, 4, 8], // left diagonal
  [2, 4, 6]  // right diagonal
]

function checkWinner (tiles, segments) {
  segments.forEach(segment => {
    var countDots = 0
    var countCrosses = 0
    segment.forEach(index => {
      if (tiles[index].textContent === dot) {
        countDots++
      }
      if (tiles[index].textContent === cross) {
        countCrosses++
      }
      if (countDots === 3) {
        console.log('Dots won')
        declareWinner(dot)
        return
      }
      if (countCrosses === 3) {
        console.log('Crosses won')
        declareWinner(cross)
        return
      }
    })
  })
}

function declareWinner (winner) {
  gameOver = true
  var displayWinner = document.querySelector('div #display-winner')
  if (winner) {
    displayWinner.textContent = winner + ' is the winner'
  } else {
    displayWinner.textContent = 'It\'s a draw'
  }
}

var body = document.querySelector('body')

body.addEventListener('click', event => {
  if (!gameOver) {
    var tile = event.target
    if (tile.className !== 'tile') return
    if (tilesClicked === 9) {
      declareWinner()
      return
    }
    if (tile.textContent) return
    if (currentPlayer === 1) {
      tile.textContent = dot
      currentPlayer = 2
      tilesClicked++
    } else {
      tile.textContent = cross
      currentPlayer = 1
      tilesClicked++
    }
    checkWinner(tiles, segments)
  }
})
