const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const bestScore = document.querySelector(".best-score > span")
const menu = document.querySelector(".menu-screen")
const menuPass = document.querySelector(".menu-pass")
const buttonPlay = document.querySelector(".btn-play")
const ButtonPlayHome = document.querySelector(".play-home")
const buttonPauseGame = document.querySelector(".btn-pause")

const audio = new Audio("./assets/audio.mp3")
const gameOverAudio = new Audio("./assets/gameover.mp3")
const audioPlay = new Audio("./assets/play.mp3")
const titleAudio = new Audio("./assets/Title.mp3")
const clickAudio = new Audio("./assets/click.mp3")
themeAudio = new Audio("./assets/theme.mp3")

const size = 30

const initialPosition = { x: 270, y: 240 }
let snake = [initialPosition]


function setSpeed (arg) {
    speed = arg;
};

function setLevel (arg) {
    level = arg;
}
function getLevel () {
    return level;
};


//inica o relógio
stop()
start()
//


const incrementScore = () => {
    score.innerText = +score.innerText + 10;
    
}

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

const randomColor = () => {
    const red = randomNumber(111, 255)
    const green = randomNumber(111, 255)
    const blue = randomNumber(111, 255)

   return `rgb(${red}, ${green}, ${blue})`
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

let direction, loopId

const drawFood = () => {
    const { x, y, color } = food
    ctx.shadowColor = color
    ctx.shadowBlur = 30
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

const drawSnake = () => {
    ctx.fillStyle = "#ddd"

    snake.forEach((position, index) => {
        if (index == snake.length - 1) {
            ctx.fillStyle = "#1DBEC0"
           
        }

        ctx.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () => {
    if (!direction) return

    const head = snake[snake.length - 1]

    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y })
        
    }

    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y })
    }

    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size })
    }

    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size })
    }

    snake.shift()
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#3d545e"

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i,600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
}



const chackEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        
        incrementScore()
        snake.push(head)
        audio.play()
        

        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition()
            y = randomPosition()
        }

        food.x = x
        food.y = y
        food.color = randomColor()
    }
}

const checkCollision = () => {
    const head = snake[snake.length - 1]
    const canvasLimit = canvas.width - size
    const neckIndex = snake.length - 2

    const wallCollision =
        head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })
    
    if (wallCollision || selfCollision) {
        
       gameOver() 
       
    }
    
}


const gameOver = () => {
    direction = undefined
    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(5px)"
    pause()
    
    if (finalScore.innerText >= bestScore.innerText) {
        bestScore.innerText = finalScore.innerText
    }
}

const missionPassed = () => {
    
    if (score.innerText == "500") {
    menuPass.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(5px)"
    pause()
    themeAudio.play()
    direction = undefined
   
}}

const gameLoop = () => {
    clearInterval(loopId)
    
    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    chackEat()
    checkCollision()
    missionPassed()
    loopId = setTimeout(() => {
       gameLoop();
    }, 300)
   }

gameLoop()

document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
        play()
    }

    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }

    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }
})

buttonPlay.addEventListener("click", () => {
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"
    titleAudio.play()
    snake = [initialPosition]
    stop()
    start()
})
buttonPauseGame.addEventListener("click", () => {
    direction = undefined
    pause()
   
}
);

ButtonPlayHome.addEventListener("click", () => {
clickAudio.play()
})

                //relógio

var sec=0
var min=0
var hr=0

var interval

function twoDigits(digit){
    if(digit<10){
        return('0'+digit)
    }else{
        return(digit)
    }
}

function start(){
    watch()
    interval= setInterval(watch,1000)
}

function pause(){
    clearInterval(interval)
}

function stop(){
    clearInterval(interval)
    sec=0
    min=0
    
    document.getElementById('watch').innerText='00:00:00'
}

function watch(){
    sec++
    if(sec==60){
        min++
        sec=0
        if(min==60){
            min=0
            hr++
        }
    }
    document.getElementById('watch').innerText=twoDigits(hr)+':'+twoDigits(min)+':'+twoDigits(sec)
}
                    //      Fim Relógio 
