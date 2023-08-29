import "./style.css";
<<<<<<< HEAD

const root = document.querySelector('#root')
const gameboardArr = Array.from({ length: 9 }, (_, index) => ({ mark: "", index }))
const players = [
    { name: 'P1', isHuman: true, mark: "x" },
    { name: 'P2', isHuman: true, mark: "o" }
]

let currentPlayer = players[1]


const renderGameboard = (arr, root) => {
    const element = document.createElement('div')
    element.classList.add('gameboard')
    element.innerHTML = ''
    
    arr.forEach(cell => {
        element.appendChild(createGameboardCell(cell))
    })

    return root.appendChild(element)
}

const createGameboardCell = (cell) => {
    const element = document.createElement('div')
    element.classList.add('cell')
    element.dataset.mark = cell.mark
    element.dataset.index = cell.index

    element.tabIndex = "0"

    return element
}

const computerChoice = () => {
}

const gameController = () => {
    changePlayer()
    if (currentPlayer.isHuman) {
            const cells = Array.from(document
            .querySelectorAll('.cell'))

        cells.forEach(cell => 
            cell.addEventListener('click', (e) => {
                console.log('PC')
                gameController()
            })
        )
    }
}

const changePlayer = () => {
    currentPlayer === players[0]
    ? currentPlayer = players[1]
    : currentPlayer = players[0]
}



renderGameboard(gameboardArr, root)
gameController()
=======
import { gameSetup } from "./game/game";

const root = document.querySelector("#root");

gameSetup();
>>>>>>> dev
