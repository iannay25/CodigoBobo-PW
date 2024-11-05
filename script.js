const questions = [
    { question: "Qual seu nível de paciência?", options: ["Alta", "Moderada", "Nenhuma"] },
    { question: "Como você reage em uma discussão?", options: ["Tranquilo", "Irritado", "Sarcastico"] },
    { question: "Qual a sua atividade favorita?", options: ["Relaxar", "Conversar", "Assistir TV"] },
    { question: "Quando algo não sai como planejado, você...", options: ["Ri", "Fica bravo", "Desencana"] },
    { question: "Como você reage a uma surpresa?", options: ["Agradece", "Fica chocado", "Desconfia"] }
];

const memes = {
    "Alta": { image: "imagens/meme1.jpg", description: "Você é o meme da Nazaré confusa!" },
    "Moderada": { image: "imagens/meme2.jpg", description: "Você é o meme do 'Já acabou, Jéssica?'" },
    "Nenhuma": { image: "imagens/meme3.jpg", description: "Você é o meme do 'Ai que delícia, cara! Do Jailson Mendes, você  é uma pessoa que ama um suquinho de laranja e ama trabalhar e relaxar ao mesmo tempo kkkkk     ( ͡° ͜ʖ ͡°)'" },
    "Tranquilo": { image: "imagens/meme4.jpg", description: "Você é o meme do 'Que deselegante'." },
    "Irritado": { image: "imagens/meme5.jpg", description: "Você é o meme do 'Por que você não amadurece?'" },
    "Sarcastico": { image: "imagens/meme6.jpg", description: "Você é o meme do 'Parece que o jogo virou'." },
    "Agradece": { image: "imagens/meme7.png", description: "Você é o meme do 'Isso é muito Black Mirror'." },
    "Fica chocado": { image: "imagens/meme8.png", description: "Você é o meme do 'Eu sou rica!'." },
    "Desconfia": { image: "imagens/meme9.png", description: "Você é o meme do 'Breno Inform'." }
};

const audioFiles = [
    "/sons/ah-droga.mp3",
    "/sons/ai-vc-me-quebra.mp3",
    "/sons/bafomeeeeeeeeeee.mp3",
    "/sons/bom-dia-chefe.mp3",
    "/sons/caganeira-gordurosa.mp3",
    "/sons/calma-ai-paizao.mp3",
    "/sons/coringando.mp3",
    "/sons/cr7-bom-dia.mp3",
    "/sons/dom-dom-tava-aqui-no-baile.mp3",
    "/sons/e-gamba-ou-manganga.mp3",
    "/sons/eduardo-pinto.mp3",
    "/sons/eu-finjo-que-nao-percebo-mas-tudo-esta-sendo-obs.mp3",
    "/sons/eu-tentei.mp3",
    "/sons/ja-ganhou-tantantan.mp3",
    "/sons/lapadadokarai.mp3",
    "/sons/lula-free-fire.mp3",
    "/sons/lula-vai-todo-mindo-se-fdr.mp3",
    "/sons/manoel-g-lana.mp3",
    "/sons/manoel-g-quem-manda-e-a-muie.mp3",
    "/sons/miau-triste.mp3",
    "/sons/se-quiser-sim-mano.mp3",
    "/sons/so-quer-mamao-so-quer-mel.mp3"
];

let currentQuestionIndex = 0;
let selectedAnswers = [];

function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";

    const question = document.createElement("h2");
    question.textContent = questions[currentQuestionIndex].question;
    questionContainer.appendChild(question);

    questions[currentQuestionIndex].options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => selectAnswer(option);
        questionContainer.appendChild(button);
    });
}

function selectAnswer(answer) {
    selectedAnswers.push(answer);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function restartQuiz() {
    selectedAnswers = [];
    currentQuestionIndex = 0;
    document.getElementById("result").classList.add("hidden");
    document.querySelector(".quiz-container").classList.remove("hidden");
    loadQuestion();
}

const specificPaths = {
    "Alta,Tranquilo,Relaxar,Ri,Agradece": "Alta",
    "Nenhuma,Sarcastico,Conversar,Fica bravo,Fica chocado": "Nenhuma",
    "Moderada,Sarcastico,Conversar,Desencana,Agradece": "Moderada",
    "Moderada,Tranquilo,Assistir TV,Fica bravo,Agradece": "Fica bravo",
    "Nenhuma,Sarcastico,Relaxar,Fica bravo,Agradece": "Tranquilo",
    "Alta,Irritado,Assistir TV,Desencana,Desconfia": "Desconfia",
    "Moderada,Irritado,Assistir TV,Ri,Agradece": "Agradece",
    "Nenhuma,Irritado,Assistir TV,Desencana,Fica chocado": "Fica chocado",
    "Nenhuma,Irritado,Relaxar,Fica bravo,Agradece": "Agradece",
    "Alta,Irritado,Conversar,Fica bravo,Fica chocado": "Fica chocado",
    "Alta,Sarcastico,Relaxar,Desencana,Desconfia": "Desconfia",
    "Alta,Sarcastico,Conversar,Ri,Fica chocado": "Sarcastico",
    "Alta,Tranquilo,Conversar,Fica bravo,Agradece": "Tranquilo",
    "Nenhuma,Tranquilo,Relaxar,Desencana,Agradece": "Agradece",
    "Nenhuma,Irritado,Assistir TV,Ri,Fica chocado": "Fica chocado",
    "Alta,Irritado,Relaxar,Ri,Desconfia": "Desconfia",
    "Moderada,Sarcastico,Relaxar,Ri,Fica chocado": "Tranquilo",
    "Alta,Irritado,Assistir TV,Ri,Fica chocado": "Nenhuma",
    "Nenhuma,Irritado,Conversar,Desencana,Agradece": "Conversar",
    "Moderada,Sarcastico,Conversar,Ri,Desconfia": "Ri",
    "Nenhuma,Irritado,Relaxar,Ri,Desconfia": "Relaxar",
    "Nenhuma,Sarcastico,Assistir TV,Desencana,Desconfia": "Assistir TV",
    "Moderada,Tranquilo,Relaxar,Ri,Fica chocado": "Tranquilo",
    "Alta,Irritado,Assistir TV,Desencana,Fica chocado": "Irritado",
    "Moderada,Sarcastico,Relaxar,Desencana,Desconfia": "Desencana",
    "Nenhuma,Tranquilo,Relaxar,Fica bravo,Agradece": "Fica bravo",
    "Nenhuma,Sarcastico,Assistir TV,Ri,Fica chocado": "Assistir TV",
    "Alta,Irritado,Relaxar,Fica bravo,Desconfia": "Desconfia",
    "Nenhuma,Tranquilo,Assistir TV,Desencana,Desconfia": "Desconfia",
    "Alta,Irritado,Assistir TV,Desencana,Agradece": "Tranquilo",
    "Nenhuma,Irritado,Conversar,Desencana,Agradece": "Irritado",
    "Nenhuma,Tranquilo,Relaxar,Ri,Desconfia": "Desconfia",
    "Moderada,Tranquilo,Assistir TV,Fica bravo,Fica chocado": "Fica chocado",
    "Moderada,Sarcastico,Assistir TV,Fica bravo,Agradece": "Agradece",
    "Alta,Sarcastico,Conversar,Desencana,Agradece": "Tranquilo",
    "Nenhuma,Tranquilo,Assistir TV,Ri,Fica chocado": "Irritado",
    "Moderada,Tranquilo,Relaxar,Ri,Agradece": "Assistir TV",
    "Nenhuma,Sarcastico,Relaxar,Fica bravo,Fica chocado": "Fica chocado",
    "Moderada,Irritado,Relaxar,Ri,Desconfia": "Desconfia",
    "Alta,Tranquilo,Assistir TV,Ri,Fica chocado": "Fica chocado",
    "Nenhuma,Irritado,Conversar,Ri,Agradece": "Tranquilo",
    "Alta,Tranquilo,Assistir TV,Ri,Agradece": "Agradece",
    "Nenhuma,Irritado,Conversar,Ri,Desconfia": "Alta",
    "Nenhuma,Sarcastico,Conversar,Fica bravo,Agradece": "Agradece",
    "Moderada,Irritado,Conversar,Fica bravo,Desconfia": "Desconfia",
    "Nenhuma,Irritado,Relaxar,Desencana,Fica chocado": "Fica chocado",
    "Alta,Sarcastico,Relaxar,Ri,Agradece": "Tranquilo",
    "Moderada,Tranquilo,Relaxar,Fica bravo,Fica chocado": "Irritado",
    "Nenhuma,Sarcastico,Relaxar,Fica bravo,Desconfia": "Desconfia",
    "Moderada,Sarcastico,Assistir TV,Ri,Agradece": "Agradece",
    "Nenhuma,Irritado,Assistir TV,Fica bravo,Desconfia": "Alta",
    "Nenhuma,Tranquilo,Conversar,Fica bravo,Desconfia": "Alta",
    "Moderada,Irritado,Assistir TV,Ri,Agradece": "Agradece",
    "Alta,Tranquilo,Relaxar,Desencana,Fica chocado": "Irritado",
    "Moderada,Tranquilo,Assistir TV,Desencana,Fica chocado": "Irritado",
    "Alta,Irritado,Relaxar,Fica bravo,Agradece": "Agradece",
    "Moderada,Sarcastico,Relaxar,Fica bravo,Fica chocado": "Fica chocado",
    "Nenhuma,Irritado,Assistir TV,Fica bravo,Fica chocado": "Fica chocado",
    "Alta,Sarcastico,Relaxar,Ri,Desconfia": "Sarcastico",
    "Moderada,Tranquilo,Assistir TV,Ri,Desconfia": "Sarcastico",
    "Moderada,Tranquilo,Conversar,Desencana,Desconfia": "Desconfia",
    "Nenhuma,Tranquilo,Relaxar,Fica bravo,Desconfia": "Assistir TV",
    "Moderada,Tranquilo,Relaxar,Desencana,Desconfia": "Sarcastico",
    "Moderada,Irritado,Conversar,Ri,Agradece": "Agradece",
    "Nenhuma,Irritado,Assistir TV,Ri,Agradece": "Irritado",
    "Nenhuma,Tranquilo,Assistir TV,Fica bravo,Desconfia": "Desconfia",
    "Alta,Irritado,Relaxar,Ri,Agradece": "Agradece",
    "Nenhuma,Irritado,Conversar,Desencana,Fica chocado": "Irritado",
    "Nenhuma,Sarcastico,Relaxar,Ri,Agradece": "Agradece",
    "Alta,Tranquilo,Relaxar,Desencana,Fica chocado": "Fica chocado",
    "Moderada,Tranquilo,Assistir TV,Desencana,Desconfia": "Desconfia",
    "Moderada,Tranquilo,Relaxar,Fica bravo,Desconfia": "Desconfia",
    "Alta,Sarcastico,Conversar,Desencana,Agradece": "Agradece",
    "Alta,Irritado,Assistir TV,Ri,Fica chocado": "Fica chocado",
    "Moderada,Irritado,Relaxar,Ri,Agradece": "Agradece",
    "Moderada,Tranquilo,Assistir TV,Fica bravo,Desconfia": "Desconfia",
    "Moderada,Sarcastico,Relaxar,Fica bravo,Desconfia": "Desconfia",
    "Nenhuma,Tranquilo,Assistir TV,Desencana,Agradece": "Agradece",
    "Nenhuma,Tranquilo,Conversar,Fica bravo,Desconfia": "Desconfia",
    "Nenhuma,Irritado,Assistir TV,Ri,Fica chocado": "Fica chocado",
    "Moderada,Irritado,Assistir TV,Desencana,Agradece": "Agradece",
    "Nenhuma,Sarcastico,Conversar,Desencana,Desconfia": "Desconfia",
    "Moderada,Sarcastico,Assistir TV,Ri,Fica chocado": "Fica chocado",
    "Nenhuma,Sarcastico,Conversar,Fica bravo,Agradece": "Agradece",
    "Nenhuma,Tranquilo,Relaxar,Ri,Fica chocado": "Fica chocado",
    "Nenhuma,Tranquilo,Conversar,Desencana,Desconfia": "Desconfia",
    "Alta,Irritado,Relaxar,Ri,Agradece": "Agradece",
    "Alta,Irritado,Relaxar,Desencana,Fica chocado": "Irritado",
    "Nenhuma,Irritado,Assistir TV,Fica bravo,Desconfia": "Desconfia",
    "Alta,Sarcastico,Assistir TV,Ri,Fica chocado": "Fica chocado",
    "Moderada,Irritado,Assistir TV,Ri,Desconfia": "Desencana",
    "Alta,Tranquilo,Relaxar,Fica bravo,Desconfia": "Desconfia",
    "Nenhuma,Irritado,Assistir TV,Ri,Fica chocado": "Fica chocado",
    "Moderada,Sarcastico,Conversar,Ri,Agradece": "Tranquilo",
    "Alta,Tranquilo,Relaxar,Fica bravo,Agradece": "Desencana",
    "Moderada,Sarcastico,Relaxar,Fica bravo,Agradece": "Agradece",
    "Alta,Sarcastico,Relaxar,Ri,Fica chocado": "Fica chocado",
    "Alta,Irritado,Conversar,Ri,Fica chocado": "Irritado",
    "Alta,Irritado,Assistir TV,Fica bravo,Desconfia": "Desconfia",
    "Moderada,Sarcastico,Assistir TV,Fica bravo,Desconfia": "Desencana",
    "Nenhuma,Tranquilo,Assistir TV,Fica bravo,Fica chocado": "Fica chocado",
    "Alta,Irritado,Assistir TV,Desencana,Desconfia": "Desconfia",
    "Nenhuma,Sarcastico,Assistir TV,Ri,Fica chocado": "Fica chocado",
    "Alta,Sarcastico,Assistir TV,Fica bravo,Desconfia": "Desconfia",
    "Nenhuma,Irritado,Conversar,Desencana,Agradece": "Agradece",
    "Nenhuma,Sarcastico,Assistir TV,Ri,Agradece": "Fica chocado",
    "Nenhuma,Tranquilo,Assistir TV,Desencana,Agradece": "Agradece",
    "Moderada,Tranquilo,Conversar,Fica bravo,Fica chocado": "Fica chocado",
    "Moderada,Tranquilo,Assistir TV,Ri,Desconfia": "Desencana",
    "Alta,Sarcastico,Conversar,Ri,Agradece": "Agradece",
    "Alta,Sarcastico,Assistir TV,Ri,Desconfia": "Desconfia",
    "Moderada,Irritado,Relaxar,Fica bravo,Agradece": "Moderada",
    "Nenhuma,Tranquilo,Assistir TV,Ri,Agradece": "Agradece",
    "Alta,Tranquilo,Relaxar,Desencana,Desconfia": "Desconfia",
    "Moderada,Irritado,Assistir TV,Desencana,Fica chocado": "Fica chocado",
    "Alta,Tranquilo,Assistir TV,Ri,Fica chocado": "Fica chocado",
    "Moderada,Irritado,Conversar,Fica bravo,Fica chocado": "Desencana",
    "Moderada,Sarcastico,Assistir TV,Desencana,Fica chocado": "Agradece",
    "Nenhuma,Tranquilo,Relaxar,Fica bravo,Fica chocado": "Fica chocado",
    "Nenhuma,Tranquilo,Assistir TV,Fica bravo,Fica chocado": "Fica chocado",
    "Moderada,Tranquilo,Relaxar,Fica bravo,Desconfia": "Desconfia",
    "Moderada,Irritado,Relaxar,Desencana,Fica chocado": "Irritado",
    "Nenhuma,Irritado,Relaxar,Ri,Fica chocado": "Desencana",
    "Nenhuma,Tranquilo,Conversar,Desencana,Fica chocado": "Fica chocado",
    "Moderada,Tranquilo,Conversar,Fica bravo,Agradece": "Conversar",
    "Alta,Irritado,Assistir TV,Fica bravo,Agradece": "Irritado",
    "Moderada,Tranquilo,Assistir TV,Desencana,Agradece": "Agradece"

};

function calculateFinalMeme() {
    const answerPath = selectedAnswers.join(",");
    if (specificPaths[answerPath]) {
        return specificPaths[answerPath];
    }

    const answerCounts = selectedAnswers.reduce((acc, answer) => {
        acc[answer] = (acc[answer] || 0) + 1;
        return acc;
    }, {});

    let finalAnswer = selectedAnswers[selectedAnswers.length - 1];
    let maxCount = 0;

    for (const answer in answerCounts) {
        if (answerCounts[answer] > maxCount) {
            maxCount = answerCounts[answer];
            finalAnswer = answer;
        }
    }

    return finalAnswer;
}

function showResult() {
    document.querySelector(".quiz-container").classList.add("hidden");

    const finalAnswer = calculateFinalMeme();
    const meme = memes[finalAnswer];

    document.getElementById("meme-image").src = meme.image;
    document.getElementById("meme-description").textContent = meme.description;

    document.getElementById("result").classList.remove("hidden");

    const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
    const audio = document.getElementById("result-audio");
    audio.src = randomAudio;
    audio.play();
}

window.onload = loadQuestion;

