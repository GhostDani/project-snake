
const audio = new Audio("./assets/theme.mp3")
const audioPlay = new Audio("./assets/play.mp3")
const buttonPlay = document.querySelector(".btn-play")
const buttonAudio = document.querySelector(".btn-aud")
const audioTransition = new Audio("./assets/transition.mp3")
 
window.onload = function() {
    audio.play()
  };

  function closeGame() {

  }
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

                                  //fullscreen
        function toggleFullScreen() {
          
            if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
             (!document.mozFullScreen && !document.webkitIsFullScreen)) {
              if (document.documentElement.requestFullScreen) {  
                document.documentElement.requestFullScreen();  
              } else if (document.documentElement.mozRequestFullScreen) {  
                document.documentElement.mozRequestFullScreen();  
              } else if (document.documentElement.webkitRequestFullScreen) {  
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
              }  
            } else {  
              if (document.cancelFullScreen) {  
                document.cancelFullScreen();  
              } else if (document.mozCancelFullScreen) {  
                document.mozCancelFullScreen();  
              } else if (document.webkitCancelFullScreen) {  
                document.webkitCancelFullScreen();  
              }  
            }  
          } 