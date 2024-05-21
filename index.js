// Variables globales
let numberOfCells = 30;
let actualChoosed;
let attemps = 0;
let secretNumber;
let maxAttempts;
let randomMessage = ["Lo estas haciendo bien ", "Ya casi"];
let body = document.querySelector("body");
let container = document.getElementById("container");

// Crear la cuadrícula
function fillTablero() {
  secretNumber = getRandomInt();
  console.log(secretNumber);

  let tablero = document.createElement("div");
  tablero.setAttribute("id", "tablero");

  for (let i = 1; i <= numberOfCells; i++) {
    let cell = document.createElement("div");
    cell.setAttribute("id", i);
    cell.classList.add("number");
    cell.innerText = `${i}`;
    tablero.appendChild(cell);
  }

  let attempsDiv = document.createElement("div");
  attempsDiv.innerHTML = `<h3>Número de intentos: ${attemps} / ${maxAttempts}</h3>`;

  container.appendChild(tablero);
  container.appendChild(attempsDiv);

  document.querySelectorAll(".number").forEach((celdas, i) => {
    celdas.addEventListener("click", function () {
      actualChoosed = i + 1;
      testNum(celdas, attempsDiv);
    });
  });
}

// Obtener un número aleatorio
function getRandomInt() {
  return Math.ceil(Math.random() * 30);
}

// Manejar el final del juego
function handleEndGame(winner) {
  let endScreen = document.createElement("div");
  endScreen.setAttribute("id", winner ? "win-screen" : "lose-screen"); // Cambiado a win-screen y lose-screen
  endScreen.innerHTML = `
        <img src="${
          winner ? "path/to/winner-image.png" : "./imagenes/perder.png"
        }" alt="${winner ? "" : ""}">
        <button id="restart" class="btn">RESTART</button>
    `;
  container.innerHTML = "";
  body.appendChild(endScreen);

  document.getElementById("restart").addEventListener("click", function () {
    body.removeChild(endScreen);
    startGame();
  });
}

// Comparar el número seleccionado con el número secreto
function testNum(item, attempsDiv) {
  if (actualChoosed === secretNumber) {
    attemps = 0;
    item.classList.add("Winner");
    handleEndGame(true); // true indica que el jugador ha ganado
  } else {
    item.classList.add("lost");
    attemps++;
    attempsDiv.innerHTML = `<h3>Número de intentos: ${attemps} / ${maxAttempts}</h3>`;
    if (attemps >= maxAttempts) {
      handleEndGame(false); // false indica que el jugador ha perdido
    }
  }
}

// Iniciar el juego
function startGame() {
  // Reiniciar el contador de intentos
  attemps = 0;

  let startScreen = document.createElement("div");
  startScreen.setAttribute("id", "start");
  startScreen.innerHTML = `
     <h3>Selecciona el nivel de dificultad : </h3>
        <select id="difficulty" class="btn">
            <option value="low">Baja</option>
            <option value="high">Alta</option>
        </select>
        <button id="btnStart" class="btn">START</button>
    `;
  body.appendChild(startScreen);

  document.getElementById("btnStart").addEventListener("click", function () {
    let difficulty = document.getElementById("difficulty").value;
    maxAttempts = difficulty === "low" ? 15 : 5;
    body.removeChild(startScreen);
    fillTablero();
  });
}

window.onload = function () {
  startGame();
};
