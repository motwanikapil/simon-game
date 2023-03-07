let buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let gameStarted = false
let level = 0

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed")
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed")
    },100)
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            userClickedPattern = []
            setTimeout(function () { 
                nextSequence()
            }, 1000)
        }
    }
    else {
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Press any key to start")
        startOver()
        $(document).keypress(function () {
            if (!gameStarted) {
                gameStarted = true
                nextSequence()
            }
        })
    }
}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`)
    audio.play()
}

function nextSequence() {
    level++
    $('#level-title').text(`Level ${level}`)
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    $(`#${randomChosenColor}`).fadeTo(100, 0.3, function () { $(this).fadeTo(500, 1.0); });
    playSound(randomChosenColor)   
}

function startOver() {
    gamePattern = []
    userClickedPattern = []
    gameStarted = false
    level = 0
}

$(document).ready(function () {

    $(document).keypress(function () {
        if (!gameStarted) {
            gameStarted = true
            nextSequence()
        }
    })

    $(".btn").on("click", function (event) {
        let userChosenColor = event.target.id
        animatePress(userChosenColor)
        playSound(userChosenColor)
        userClickedPattern.push(userChosenColor)
        checkAnswer(userClickedPattern.length - 1)
    })
})