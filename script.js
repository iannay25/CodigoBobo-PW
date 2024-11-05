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
    "Nenhuma": { image: "imagens/meme3.jpg", description: "Você é o meme do 'Ai que delícia, cara!'" },
    "Tranquilo": { image: "imagens/meme4.jpg", description: "Você é o meme do 'Que deselegante'." },
    "Irritado": { image: "imagens/meme5.jpg", description: "Você é o meme do 'Por que você não amadurece?'" },
    "Sarcastico": { image: "imagens/meme6.jpg", description: "Você é o meme do 'Parece que o jogo virou'." },
    "Relaxar": { image: "imagens/meme7.png", description: "Você é o meme do 'Isso é muito Black Mirror'." },
    "Conversar": { image: "imagens/meme8.png", description: "Você é o meme do 'Eu sou rica!'." },
    "Assistir TV": { image: "imagens/meme9.png", description: "Você é o meme do 'Breno Inform'." }
};

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

function showResult() {
    document.querySelector(".quiz-container").classList.add("hidden");

    const finalAnswer = selectedAnswers[selectedAnswers.length - 1];
    const meme = memes[finalAnswer];

    document.getElementById("meme-image").src = meme.image;
    document.getElementById("meme-description").textContent = meme.description;

    document.getElementById("result").classList.remove("hidden");
}

function restartQuiz() {
    selectedAnswers = [];
    currentQuestionIndex = 0;
    document.getElementById("result").classList.add("hidden");
    document.querySelector(".quiz-container").classList.remove("hidden");
    loadQuestion();
}

window.onload = loadQuestion;
