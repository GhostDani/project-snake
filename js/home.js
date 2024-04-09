
const audio = new Audio("./assets/theme.mp3")
const audioPlay = new Audio("./assets/play.mp3")
const buttonPlay = document.querySelector(".btn-play")
const buttonAudio = document.querySelector(".btn-aud")
 
    audio.play()

    buttonPlay.addEventListener("click", () => {
        score.innerText = "00"
        menu.style.display = "none"
        canvas.style.filter = "none"
        audioPlay.play()
        snake = [initialPosition]})

        buttonAudio.addEventListener("click", () => {
            if( audio.muted ){
                audio.muted = false;
            }else{
                audio.muted = true;
            }
        })