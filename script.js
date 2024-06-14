document.addEventListener("DOMContentLoaded", () => {
  const gBtns = document.getElementsByClassName("box");
  const resultScreen = document.querySelector(".resultScreen");
  const player1 = document.getElementById("player1");
  const player2 = document.getElementById("player2");
  const player1Symbol = document.getElementById("player1Symbol");
  const player2Symbol = document.getElementById("player2Symbol");
  const name1 = document.getElementById("player1Name");
  const name2 = document.getElementById("player2Name");
  const player1_Count = document.getElementById("player1Symbol_Count");
  const player2_Count = document.getElementById("player2Symbol_Count");

  // Audio start
  var bg_audio = new Audio("./sounds/new_sounds/game_bg_audio.mp3");
  var btn1_audio = new Audio("./sounds/new_sounds/btn1_clicked_audio.wav");
  var btn2_audio = new Audio("./sounds/new_sounds/btn2_clicked_audio.mp3");
  var winner_audio = new Audio("./sounds/new_sounds/winner_audio.mp3");
  var draw_audio = new Audio("./sounds/new_sounds/draw_audio.mp3");
  bg_audio.loop = true; // Set the loop property to true
  





  // Audio end

  // Splash screen for 3 seconds
  setTimeout(() => {
    document.querySelector(".splashScreen").style.display = "none";
    document.querySelector(".playerNamesSection").style.display = "flex";
    name1.focus();
  }, 3000);

  // Current player
  // Random between X and O
  const randomPlayer = Math.random() > 0.5 ? "X" : "O";
  let currentPlayer = randomPlayer;
  

  // start button
  const startBtn = document.getElementById("startGameBtn");
  startBtn.addEventListener("click", () => {
    player1Symbol.textContent = currentPlayer;
    

    // check if inputs are empty
    if ((name1.value !== "") & (name2.value !== "")) {
      name1.style.border = "none";
      name2.style.border = "none";
      // player1.innerHTML = `Player 1 : ${name1.value}`;
      // player2.innerHTML = `Player 2 : ${name2.value}`;
      player1.innerHTML = `${name1.value}`;
      player2.innerHTML = `${name2.value}`;

      if (player1Symbol.textContent === "X") {
        player1Symbol.innerHTML = "X";
        player2Symbol.innerHTML = "O";
      } else if (player1Symbol.textContent === "O") {
        player1Symbol.innerHTML = "O";
        player2Symbol.innerHTML = "X";
      }
      setCurrentPlayer();
      setTimeout(() => {
        bg_audio.play();
        bg_audio.volume = 0.5;
        document.querySelector(".playerNamesSection").style.display = "none";
        document.querySelector(".gameSection").style.display = "flex";
        //   document.querySelector(".resultScreen").style.display = "none";
      }, 500);
    } else if (name1.value === "") {
      name1.style.border = "2px solid orange";
    } else if (name2.value === "") {
      name2.style.border = "2px solid orange";
    } else {
      name1.style.border = "none";
      name2.style.border = "none";
    }
  });

  // Array buttons click listner
  Array.from(gBtns).forEach((btn) => {
    btn.addEventListener("click", () => {
      handleBtnClick(btn);
      checkWinner();
    });
  });

  function handleBtnClick(btn) {
    if (btn.textContent === "") {
      btn.textContent = currentPlayer;
      btn.style.backgroundColor = "var(--clickedButton)";
      btn.style.boxShadow = "0 0 15px var(--shadowColor) inset";
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      setCurrentPlayer();
    }
    if (player1Symbol.style.border === "3px solid white") {
      btn.classList.add("p2BtnSelected");
      btn.classList.remove("p1BtnSelected");
      btn1_audio.play();
      btn1_audio.volume = 0.8;
      setTimeout(() => {
        btn.style.pointerEvents = "none";
      }, 500);
    } else {
      btn.classList.add("p1BtnSelected");
      btn.classList.remove("p2BtnSelected");
      btn2_audio.play();
      setTimeout(() => {
        btn.style.pointerEvents = "none";
      }, 500);
    }
  }

  function setCurrentPlayer() {
    const currentPlayerIs = document.getElementById("currentPlayerIs");
    if (currentPlayer === player1Symbol.textContent) {
      player1Symbol.style.border = "3px solid white";
      player2Symbol.style.border = "none";
      currentPlayerIs.innerHTML = `${name1.value} - Turn`;
    } else {
      player2Symbol.style.border = "3px solid white";
      player1Symbol.style.border = "none";
      currentPlayerIs.innerHTML = `${name2.value} - Turn`;
    }

    // Array buttons hover listner
    const gBtns = document.getElementsByClassName("box");
    Array.from(gBtns).forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        if (player1Symbol.style.border === "3px solid white") {
          if (btn.textContent === "") {
            btn.classList.add("hoverP1Btn");
            // disable click on the clicked button
            btn.classList.remove("hoverP2Btn");
          }
        } else {
          if (btn.textContent === "") {
            btn.classList.add("hoverP2Btn");
            btn.classList.remove("hoverP1Btn");
          }
        }
      });
    });
  }

  function checkWinner() {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    let isDraw = true; // Flag to track if it's a draw
  
    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      if (
        gBtns[a].innerHTML !== "" &&
        gBtns[a].innerHTML === gBtns[b].innerHTML &&
        gBtns[a].innerHTML === gBtns[c].innerHTML
      ) {
        if (gBtns[a].textContent === "X" || gBtns[a].textContent === "O") {
          gBtns[a].classList.add("winningBtn");
          gBtns[b].classList.add("winningBtn");
          gBtns[c].classList.add("winningBtn");
          winner_audio.play();
          if (gBtns[a].textContent === player1Symbol.textContent) {
            document.getElementById("resultPlayerName").innerHTML = name1.value;
            player1_Count.innerHTML = Number(player1_Count.innerHTML) + 1;
          } else if (gBtns[a].textContent === player2Symbol.textContent) {
            document.getElementById("resultPlayerName").innerHTML = name2.value;
            player2_Count.innerHTML = Number(player2_Count.innerHTML) + 1;
          }
          setTimeout(() => {
            resultScreen.style.display = "flex";
          }, 2500);
          return; // Exit function if winning condition is met
        }
      } else if (gBtns[a].innerHTML === "") {
        isDraw = false; // At least one button is empty, game is not a draw
      }
    }
  
    // If all buttons are filled and no winning condition met, it's a draw
    if (isDraw) {
      draw_audio.play();
      setTimeout(() => {
        document.getElementById("drawScreen").style.display = "flex";
      },400);
    }
  }
  


  

  document.getElementById("playAgainButton").addEventListener("click", () => {
    resultScreen.style.display = "none";
    // Reset the game initially
    resetGame();
  });
  document.getElementById("playAgainButtonDraw").addEventListener("click", () => {
    document.getElementById("drawScreen").style.display = "none";
    resetGame();
  });
  document.getElementById("resetButton").addEventListener("click", () => {
    player1_Count.innerHTML = 0;
    player2_Count.innerHTML = 0;
    resetGame();
  });

  function resetGame() {
    setCurrentPlayer();

    // Reset buttons
    Array.from(gBtns).forEach((btn) => {
      btn.textContent = "";
      btn.style.backgroundColor = "var(--buttonBg)";
      btn.classList.remove(
        "p1BtnSelected",
        "p2BtnSelected",
        "hoverP1Btn",
        "hoverP2Btn",
        "winningBtn"
      );
      btn.style.pointerEvents = "auto";
    });

    resultScreen.style.display = "none";
  }



  document.getElementById("speakerDiv").addEventListener("click", () => {
    const spkrImg = document.getElementById("speakerIMG");
    if (spkrImg.src.includes("speaker_off_img.svg")) {
        spkrImg.src = "./assets/svgs/speaker_on_img.svg";
        bg_audio.play();
    } else {
        spkrImg.src = "./assets/svgs/speaker_off_img.svg";
        bg_audio.pause();
    }
});



  ///////// code to prevent F12
//   document.addEventListener('keydown', function(event) {
//     // Check if the pressed key is F5
//     if (event.key === 'F12') {
//         // Prevent the default behavior (refresh)
//         event.preventDefault();
        
//         // Perform your action here
//         // console.log('F12 key was pressed. Custom action performed.');
//     }
// });
document.addEventListener('keydown', function(event) {
  // Check if the pressed key is U and the Ctrl key is pressed simultaneously
  if ((event.key === 'u' || event.key === 'U') && (event.ctrlKey || event.metaKey)) {
      // Prevent the default behavior (view page source)
      event.preventDefault();
      
      // Perform your action here
      // console.log('Ctrl + U key combination was pressed. Custom action performed.');
  }
  // ctrl+s
    if ((event.key === 's' || event.key === 'S') && (event.ctrlKey || event.metaKey)) {
      // Prevent the default behavior (save page)
      event.preventDefault();
      
      // Perform your action here
      // console.log('Ctrl + S key combination was pressed. Custom action performed.');
  }
});
window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
  ///////// code to prevent F12


  // End
});
