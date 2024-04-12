
const audio = new Audio("./assets/theme.mp3")
const audioPlay = new Audio("./assets/play.mp3")
const buttonPlay = document.querySelector(".btn-play")
const buttonAudio = document.querySelector(".btn-aud")
 
window.onload = function() {
    audio.play()
  };


        buttonAudio.addEventListener("click", () => {
            if( audio.muted ){
                audio.muted = false;
            }else{
                audio.muted = true;
            }
        })

        if( typeof navigator.serviceWorker !== "undefined") {
            navigator.serviceWorker.register("./js/pwabuilder-sw.js")
        }