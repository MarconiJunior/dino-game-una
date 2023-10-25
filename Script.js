const character = document.getElementById("character");
const block = document.getElementById("block");
const highBlock = document.getElementById("high-block");

let isGamePaused = false;
let isCounterPaused = false;
let counter = 0;

resetGame();

function jump() {
    if (character.classList.contains("animate") || isGamePaused) {
        return;
    }
    character.classList.add("animate");
    setTimeout(function () {
        character.classList.remove("animate");
    }, 500);
}

function moveCharacterLeft() {
    const characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));

    if (characterLeft > 0) {
        character.style.left = characterLeft - 10 + "px";
    }
}

function moveCharacterRight() {
    const characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));

    if (characterLeft < 380) {
        character.style.left = characterLeft + 10 + "px";
    }
}

function pauseGame(isPaused) {
    const animationState = isPaused ? "paused" : "running";
    block.style.animationPlayState = animationState;
    character.style.animationPlayState = animationState;
    highBlock.style.animationPlayState = animationState;

    isCounterPaused = isPaused;
}

function checkGameStatus() {
    const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    const characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    const obstacle2Left = parseInt(window.getComputedStyle(highBlock).getPropertyValue("left"));

    if (
        (blockLeft < characterLeft + 20 && blockLeft > characterLeft - 20 && characterTop >= 130) ||
        (obstacle2Left < characterLeft + 20 && obstacle2Left > characterLeft - 20 && characterTop >= 130)
    ) {
        block.style.animation = "none";
        highBlock.style.animation = "none";
        alert("Fim de jogo. Pontuação: " + Math.floor(counter / 100));
        counter = 0;
        resetGame()
    } else {
        if (!isCounterPaused) {
            counter++;
        }
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter / 100);
    }
}

function resetGame() {
    counter = 0;
    block.style.animation = "block 3s infinite linear";
    highBlock.style.animation = "block 5s infinite linear";
    character.style.top = "15  0px";
    character.style.left = "0px";
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        isGamePaused = !isGamePaused;
        pauseGame(isGamePaused);
    } else if (!isGamePaused) {
        if (event.code === "Space") {
            jump();
        } else if (event.key.toLowerCase() === "a") {
            moveCharacterLeft();
        } else if (event.key.toLowerCase() === "d") {
            moveCharacterRight();
        }
    }
});

const checkDead = setInterval(checkGameStatus, 10);
