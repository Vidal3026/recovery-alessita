const terminal = document.getElementById("terminalText");
const progressContainer = document.getElementById("progressContainer");
const progress = document.getElementById("progress");
const percent = document.getElementById("percent");
const result = document.getElementById("result");
const repairBtn = document.getElementById("repairBtn");
const repair = document.getElementById("repairBtn");
const gameScreen = document.getElementById("gameScreen");
const terminalCard = document.querySelector(".terminal");

const lines = [

    "Inicializando sistema...",

    "✔ HTML cargado",

    "✔ CSS cargado",

    "✔ JavaScript cargado",

    "Buscando a la persona más bonita...",

    "...",

    "❤️ Persona encontrada.",

    "Escaneando relación..."

];

let i = 0;

function escribir() {

    if (i < lines.length) {

        terminal.innerHTML += lines[i] + "<br>";

        i++;

        setTimeout(escribir, 900);

    } else {

        iniciarCarga();

    }

}

escribir();

function iniciarCarga() {

    progressContainer.classList.remove("hidden");

    let carga = 0;

    const intervalo = setInterval(() => {

        carga++;

        progress.style.width = carga + "%";

        percent.innerHTML = carga + "%";

        if (carga >= 99) {

            clearInterval(intervalo);

            mostrarError();

        }

    }, 40);

}

function mostrarError() {

    document.querySelector(".terminal").classList.add("shake");

    progress.style.background = "#ef4444";

    result.innerHTML += "<br>❌ ERROR LOVE_404<br><br>";

    setTimeout(() => {

        result.innerHTML += "Se detectó un problemita reciente.<br><br>";

    }, 800);

    setTimeout(() => {

        result.innerHTML += "Analizando...<br>";

    }, 1800);

    setTimeout(() => {

        result.innerHTML += "Buscando responsable...<br>";

    }, 2800);

    setTimeout(() => {

        result.innerHTML += "██████████████████████<br><br>";

    }, 4200);

    setTimeout(() => {

        result.innerHTML += "Resultado:<br><br>";

    }, 5200);

    setTimeout(() => {

        result.innerHTML += "<strong>El culpable fui Yo :(</strong><br><br>";

        repairBtn.classList.remove("hidden");

    }, 6200);

}

repair.addEventListener("click", () => {

    terminal.style.display = "none";
    progressContainer.style.display = "none";
    result.style.display = "none";
    repairBtn.style.display = "none";

    gameScreen.classList.remove("hidden");

    iniciarJuego();

});

const gameArea = document.getElementById("gameArea");
const scoreText = document.getElementById("score");

let score = 0;

const buenos = ["❤️", "💌", "🌹", "🥰", "✨", "😂"];
const malos = ["😡", "💥", "😭"];

function crearEmoji() {

    const emoji = document.createElement("div");

    const bueno = Math.random() > 0.3;

    emoji.innerHTML = bueno
        ? buenos[Math.floor(Math.random() * buenos.length)]
        : malos[Math.floor(Math.random() * malos.length)];

    emoji.className = "emoji";

    emoji.style.left = Math.random() * 85 + "%";

    gameArea.appendChild(emoji);

    let y = -50;

    const bajar = setInterval(() => {

        y += 4;

        emoji.style.top = y + "px";

        if (y > 460) {

            clearInterval(bajar);
            emoji.remove();
        }

    }, 20);

    emoji.onclick = () => {

        clearInterval(bajar);

        if (bueno) {

            score++;

        } else {

            score--;

            if (score < 0)
                score = 0;

        }

        scoreText.innerHTML = `Puntos: ${score} / 20`;
        const rect = gameArea.getBoundingClientRect();

        const emojiRect = emoji.getBoundingClientRect();

        mostrarPunto(

            emojiRect.left - rect.left,

            emojiRect.top - rect.top,

            bueno ? "+1 ❤️" : "-1 💥",

            bueno ? "#7CFC00" : "#ff4d4d"

        );
        emoji.remove();

        if (score >= 20) {

            ganar();

        }

    };

}

function mostrarPunto(x, y, texto, color = "#7CFC00") {

    const punto = document.createElement("div");

    punto.innerHTML = texto;

    punto.className = "floatingScore";

    punto.style.left = x + "px";

    punto.style.top = y + "px";

    punto.style.color = color;

    gameArea.appendChild(punto);

    setTimeout(() => {

        punto.remove();

    }, 1000);

}

function ganar() {

    clearInterval(gameInterval);

   lanzarCelebracion();
   
    gameArea.innerHTML = "";

    gameScreen.classList.add("hidden");

    document.getElementById("finalScreen").classList.remove("hidden");

}

let gameInterval;

function iniciarJuego() {

    gameInterval = setInterval(crearEmoji, 800);

}
document.getElementById("restartBtn").onclick = () => {

    location.reload();

}

function lanzarCelebracion(){

    const duracion = 2500;

    const fin = Date.now() + duracion;

    (function frame(){

        confetti({
            particleCount:4,
            angle:60,
            spread:60,
            origin:{x:0}
        });

        confetti({
            particleCount:4,
            angle:120,
            spread:60,
            origin:{x:1}
        });

        if(Date.now() < fin){

            requestAnimationFrame(frame);

        }

    })();

}
