// the width of the grid
const title = document.querySelector('h1')
const width = 28;
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
let score = 0
let squares = []
let eatenPacDots = []
const moveLeftBtn = document.querySelector('.move-left')
const moveRightBtn = document.querySelector('.move-right')
const moveUpBtn = document.querySelector('.move-up')
const moveDownBtn = document.querySelector('.move-down')
let btnClicked = ''
//28 * 28 = 784
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]


// create board

function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        //create a square for each element
        const square = document.createElement('div')
        //push square into grid
        grid.appendChild(square)
        // push square into array
        squares.push(square);

        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        }
    }
}

createBoard()


let pacmanCurrentIndex = 490

squares[pacmanCurrentIndex].classList.add('pacman')

function scareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = true)
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        eatenPacDots.push(squares[pacmanCurrentIndex])
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisplay.innerText = score
    }
}

function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        score += 10
        scoreDisplay.innerText = score
        scareGhosts()
        setTimeout(unScareGhosts, 10000)
    }
}

function control(e) {
    squares[pacmanCurrentIndex].classList.remove('pacman')
    switch (e.key) {
        case 'ArrowLeft':
            if (
                !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                pacmanCurrentIndex % width !== 0
            ) pacmanCurrentIndex -= 1
            if (pacmanCurrentIndex === 364) {
                pacmanCurrentIndex = 391
            }
            break
        case 'ArrowDown':
            if (
                !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                pacmanCurrentIndex + width < width * width
            ) pacmanCurrentIndex += width
            break
        case 'ArrowRight':
            if (
                !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                pacmanCurrentIndex % width < width - 1
            ) pacmanCurrentIndex += 1
            if (pacmanCurrentIndex === 391) {
                pacmanCurrentIndex = 364
            }
            break
        case 'ArrowUp':
            if (
                !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
                !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                pacmanCurrentIndex - width >= 0
            ) pacmanCurrentIndex -= width
            break
    }
    pacDotEaten()
    powerPelletEaten()
    checkIfGameWon()
    squares[pacmanCurrentIndex].classList.add('pacman')
}

document.addEventListener('keyup', control)


class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

// draw the ghosts onto my grid
ghosts.forEach(ghost => {
    squares[ghost.startIndex].classList.add(`${ghost.className}`)
    squares[ghost.startIndex].classList.add('ghost')
})

function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(() => {
        if (!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
            //remove ghost class from current index
            squares[ghost.currentIndex].classList.remove(`${ghost.className}`)
            squares[ghost.currentIndex].classList.remove(`ghost`, 'scared-ghost')

            //add direction to curent index
            ghost.currentIndex += direction

            //add class again to new current index
            squares[ghost.currentIndex].classList.add(`${ghost.className}`)
            squares[ghost.currentIndex].classList.add(`ghost`)
        } else {
            direction = directions[Math.floor(Math.random() * directions.length)]
        }

        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }

        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            // add 50 to score
            score += 50
            scoreDisplay.innerText = score
            // remove ghost
            squares[ghost.currentIndex].classList.remove(`${ghost.className}`, 'ghost', 'scared-ghost')
            // remove scared status
            ghost.isScared = false
            // restart ghost to initial position
            ghost.currentIndex = ghost.startIndex
            squares[ghost.currentIndex].classList.add(`${ghost.className}`, 'ghost')
        }
        checkIfGameOver()

    }, ghost.speed)
}


ghosts.forEach(ghost => moveGhost(ghost))

function checkIfGameOver() {
    ghosts.forEach(ghost => {
        if (!ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            ghosts.forEach(ghost => {
                clearInterval(ghost.timerId)
            })
            document.removeEventListener('keyup', control)
            title.innerText = "Game Over! Pacman has been eaten by a ghost!"
        }
    })
}

function checkIfGameWon() {
    if (eatenPacDots.length === 234) {
        ghosts.forEach(ghost => {
            clearInterval(ghost.timerId)
        })
        document.removeEventListener('keyup', control)
        title.innerText = "You Won! Pacman escaped the ghosts!"
    }
}

// mobile controls

moveLeftBtn.addEventListener('click', () => {
    squares[pacmanCurrentIndex].classList.remove('pacman')
    if (
        !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
        pacmanCurrentIndex % width !== 0
    ) pacmanCurrentIndex -= 1
    if (pacmanCurrentIndex === 364) {
        pacmanCurrentIndex = 391
    }

    pacDotEaten()
    powerPelletEaten()
    checkIfGameWon()
    squares[pacmanCurrentIndex].classList.add('pacman')
})

moveRightBtn.addEventListener('click', () => {
    squares[pacmanCurrentIndex].classList.remove('pacman')
    if (
        !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
        pacmanCurrentIndex % width < width - 1
    ) pacmanCurrentIndex += 1
    if (pacmanCurrentIndex === 391) {
        pacmanCurrentIndex = 364
    }

    pacDotEaten()
    powerPelletEaten()
    checkIfGameWon()
    squares[pacmanCurrentIndex].classList.add('pacman')
})

moveUpBtn.addEventListener('click', () => {
    squares[pacmanCurrentIndex].classList.remove('pacman')
    if (
        !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
        pacmanCurrentIndex - width >= 0
    ) pacmanCurrentIndex -= width

    pacDotEaten()
    powerPelletEaten()
    checkIfGameWon()
    squares[pacmanCurrentIndex].classList.add('pacman')
})

moveDownBtn.addEventListener('click', () => {
    squares[pacmanCurrentIndex].classList.remove('pacman')
    if (
        !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
        !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
        pacmanCurrentIndex + width < width * width
    ) pacmanCurrentIndex += width

    pacDotEaten()
    powerPelletEaten()
    checkIfGameWon()
    squares[pacmanCurrentIndex].classList.add('pacman')
})