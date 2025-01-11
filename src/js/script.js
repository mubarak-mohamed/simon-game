const red = document.querySelector(".red");
const blue = document.querySelector(".blue");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

const buttonStartStop = document.querySelector("button");
const score = document.querySelector(".score");
const timing = 500;

const couleurJeu = ["red", "blue", "green", "yellow"];
let couleursAleatory = [];
let couleursClick = [];

function addMouseaction() {
  this.classList.add("mouseaction");
}

function delMouseaction() {
  this.classList.remove("mouseaction");
}

function controllerCouleurs() {
  const dernierElement = couleursClick.length - 1;
  if (couleursClick[dernierElement] === couleursAleatory[dernierElement]) {
    if (couleursClick.length === couleursAleatory.length) {
      couleursClick = [];
      const scoreNumber = score.innerText;
      score.innerText = parseInt(scoreNumber) + 1;
      gestionCouleursAleatory();
    }
  } else {
    stopJeu("fin");
  }
}

function actionEventListenerA() {
  const nomCouleurClass = this.classList[1];
  couleursClick.push(nomCouleurClass);
  this.classList.add("active");
  setTimeout(() => {
    this.classList.remove("active");
  }, 200);
  controllerCouleurs();
}

function activationCouleursClick() {
  red.addEventListener("click", actionEventListenerA, true);
  blue.addEventListener("click", actionEventListenerA, true);
  green.addEventListener("click", actionEventListenerA, true);
  yellow.addEventListener("click", actionEventListenerA, true);

  red.style.cursor = "pointer";
  blue.style.cursor = "pointer";
  green.style.cursor = "pointer";
  yellow.style.cursor = "pointer";

  red.addEventListener("mouseenter", addMouseaction, true);
  red.addEventListener("mouseleave", delMouseaction, true);
  blue.addEventListener("mouseenter", addMouseaction, true);
  blue.addEventListener("mouseleave", delMouseaction, true);
  green.addEventListener("mouseenter", addMouseaction, true);
  green.addEventListener("mouseleave", delMouseaction, true);
  yellow.addEventListener("mouseenter", addMouseaction, true);
  yellow.addEventListener("mouseleave", delMouseaction, true);
}

function stopCouleursClick() {
  red.removeEventListener("click", actionEventListenerA, true);
  blue.removeEventListener("click", actionEventListenerA, true);
  green.removeEventListener("click", actionEventListenerA, true);
  yellow.removeEventListener("click", actionEventListenerA, true);

  red.style.cursor = "default";
  blue.style.cursor = "default";
  green.style.cursor = "default";
  yellow.style.cursor = "default";

  red.removeEventListener("mouseenter", addMouseaction, true);
  red.removeEventListener("mouseleave", delMouseaction, true);
  blue.removeEventListener("mouseenter", addMouseaction, true);
  blue.removeEventListener("mouseleave", delMouseaction, true);
  green.removeEventListener("mouseenter", addMouseaction, true);
  green.removeEventListener("mouseleave", delMouseaction, true);
  yellow.removeEventListener("mouseenter", addMouseaction, true);
  yellow.removeEventListener("mouseleave", delMouseaction, true);
}

function gestionCouleursAleatory() {
  stopCouleursClick();
  const randomCouleur = Math.floor(Math.random() * couleurJeu.length);
  couleursAleatory.push(couleurJeu[randomCouleur]);

  let i = 0;
  const intervalId = setInterval(() => {
    if (couleursAleatory[i]) {
      const couleur = couleursAleatory[i];
      document.querySelector(`.${couleur}`).classList.add("active");
      setTimeout(() => {
        document.querySelector(`.${couleur}`).classList.remove("active");
      }, timing);
    } else {
      clearInterval(intervalId);
      if (couleursAleatory.length > 0) {
        activationCouleursClick();
      }
    }
    i++;
  }, 750);
}

function stopJeu(etat = null) {
  if (etat !== null) {
    alert("Game Over, votre score est de " + score.innerText);
  }
  stopCouleursClick();
  couleursAleatory = [];
  couleursClick = [];
  buttonStartStop.innerText = "Start";
}

function lancerJeu() {
  score.innerText = 0;
  gestionCouleursAleatory();
}

buttonStartStop.addEventListener("click", () => {
  if (buttonStartStop.innerText === "Start") {
    lancerJeu();
    buttonStartStop.innerText = "Stop";
  } else {
    stopJeu();
  }
});