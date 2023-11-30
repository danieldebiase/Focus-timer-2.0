/* TEMPORIZADOR */

// Selecionar os elementos HTML
const timer = document.querySelector(".timer");
const minutes = document.querySelector(".minutes");
const secondss = document.querySelector(".seconds");
const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const reset = document.querySelector(".reset");
const sum = document.querySelector(".sum");
const minus = document.querySelector(".minus");

// Definir o tempo inicial em segundos
const initialTime = 25 * 60;

// Definir o tempo restante em segundos, inicialmente igual ao tempo inicial
let remainingTime = initialTime;

// Definir o intervalo de tempo em segundos que será adicionado ou subtraído pelo botão sum ou minus
const timeInterval = 5 * 60;

// Definir uma variável para armazenar o id do intervalo que atualiza o tempo restante
let intervalId = null;

// Definir uma função para formatar o tempo restante em minutos e segundos, usando dois dígitos para cada um
function formatTime(second) {
  // Calcular os minutos e os segundos a partir dos segundos totais
  let minutes = Math.floor(second / 60);
  let seconds = second % 60;

  // Adicionar um zero à esquerda se os minutos ou os segundos forem menores que 10
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  // Retornar o tempo formatado como uma string
  return minutes + ":" + seconds;
}

// Definir uma função para atualizar o texto dos elementos span de class minutes e seconds, usando a função de formatação
function updateTime(seconds) {
  // Obter o tempo formatado como uma string
  let time = formatTime(seconds);

  // Separar os minutos e os segundos pela posição do caractere ":"
  let minutesText = time.substring(0, time.indexOf(":"));
  let secondsText = time.substring(time.indexOf(":") + 1);

  // Atribuir os minutos e os segundos aos elementos span de class minutes e seconds
  minutes.textContent = minutesText;
  secondss.textContent = secondsText;
}

// Trocar os botões quando clicar e vice-versa
function togglePlayBtn() {
  play.classList.toggle("hide");
  pause.classList.toggle("hide");
  buttonPress.play()
  return;
}

// Definir uma função para iniciar o temporizador
function startTimer() {
  // Verificar se o temporizador já está rodando, e se sim, não fazer nada
  if (intervalId) {
    return;
  } 

  // Atualizar o tempo na tela
  updateTime(remainingTime);

  // Decrementar o tempo restante em um segundo
  remainingTime--;

  // Criar um intervalo que atualiza o tempo restante a cada segundo
  intervalId = setInterval (function () {
    if (remainingTime <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      resetAudio.play()
      resetTimer()
      return;
    }


    // Atualizar o tempo na tela
    updateTime(remainingTime);

    // Decrementar o tempo restante em um segundo
    remainingTime--;
  } ,1000)
}

// Definir uma função para pausar o temporizador
function pauseTimer() {
  // Verificar se o temporizador está rodando, e se sim, pará-lo
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Definir uma função para resetar o temporizador
function resetTimer() {
  
  // Atribuir o tempo inicial ao tempo restante
  remainingTime = initialTime;
  
  // Atualizar o tempo na tela
  updateTime(remainingTime);
  // Parar o temporizador se estiver rodando
  pauseTimer();

  play.classList.remove("hide");
  pause.classList.add("hide");

  buttonPress.play()
}

// Definir uma função para adicionar tempo ao temporizador
function addTime() {

  // Somar o intervalo de tempo ao tempo restante
  remainingTime += timeInterval;

  // Atualizar o tempo na tela
  updateTime(remainingTime);

  buttonPress.play()
}

// Definir uma função para subtrair tempo do temporizador
function subtractTime() {

  // Subtrair o intervalo de tempo do tempo restante
  remainingTime -= timeInterval;

  // Verificar se o tempo restante ficou negativo, e se sim, atribuir zero ao tempo restante
  if (remainingTime < 0) {
    remainingTime = 0;
  }

  // Atualizar o tempo na tela
  updateTime(remainingTime);

  buttonPress.play()
}

// Adicionar eventos de clique aos botões play, pause, reset, sum e minus, para chamar as respectivas funções
play.addEventListener("click", function() {
  togglePlayBtn();
  startTimer();});
pause.addEventListener("click", function() {
  togglePlayBtn();
  pauseTimer();});
reset.addEventListener("click", resetTimer);
sum.addEventListener("click", addTime);
minus.addEventListener("click", subtractTime);




/* SOUNDS */

const buttonPress = new Audio('./assets/button-press.wav');
const resetAudio = new Audio('./assets/kitchen-timer.mp3');
const floresta = new Audio('./assets/Floresta.wav');
const chuva = new Audio('./assets/chuva.wav');
const cafeteria = new Audio('./assets/Cafeteria.wav');
const lareira = new Audio('./assets/Lareira.wav');

floresta.loop = true;
chuva.loop = true;
cafeteria.loop = true;
lareira.loop = true;

/* CARDS */

// VARIÁVEIS
const forest = document.querySelector(".forest");
const rain = document.querySelector(".rain");
const coffee = document.querySelector(".coffee");
const fire = document.querySelector(".fire");

let currentAudio = null;

function playAudio(audio, card) {
  if (currentAudio) {
    if (currentAudio === audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.card.style.backgroundColor = "";
      currentAudio.card.querySelector("path").style.fill = "";
      currentAudio = null;
      return;
    } else {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.card.style.backgroundColor = "";
      currentAudio.card.querySelector("path").style.fill = "";
    }
  }
  currentAudio = audio;
  currentAudio.card = card;
  currentAudio.play();
  card.style.backgroundColor = "var(--bg-card-active)";
  card.querySelector("path").style.fill = "white";
}

forest.addEventListener("click", () => playAudio(floresta, forest));
rain.addEventListener("click", () => playAudio(chuva, rain));
coffee.addEventListener("click", () => playAudio(cafeteria, coffee));
fire.addEventListener("click", () => playAudio(lareira, fire));