document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');

    function criarBola(x, y) {
        const bola = document.createElement('div');
        bola.classList.add('bola');
        bola.style.left = `${x}px`;
        bola.style.top = `${y}px`;
        bola.style.backgroundColor = gerarCorAleatoria(); // Define uma cor aleatória

        bola.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede o clique de propagar para a bolinha pai
            multiplicarBolinha(bola);
        });

        container.appendChild(bola);
        moverBola(bola);
    }

    function gerarCorAleatoria() {
        const letras = '0123456789ABCDEF';
        let cor = '#';
        for (let i = 0; i < 6; i++) {
            cor += letras[Math.floor(Math.random() * 16)];
        }
        return cor;
    }

    function multiplicarBolinha(bola) {
        const posX = bola.offsetLeft;
        const posY = bola.offsetTop;

        // Criar novas bolinhas em torno da original
        criarBola(posX + 40, posY);
        criarBola(posX - 40, posY);
        criarBola(posX, posY + 40);
        criarBola(posX, posY - 40);
    }

    function moverBola(bola) {
        setInterval(() => {
            const maxX = container.clientWidth - bola.clientWidth;
            const maxY = container.clientHeight - bola.clientHeight;

            // Movimenta a bolinha para uma posição aleatória
            const deltaX = (Math.random() - 0.5) * 20; // Movimento aleatório horizontal
            const deltaY = (Math.random() - 0.5) * 20; // Movimento aleatório vertical

            let novaPosX = bola.offsetLeft + deltaX;
            let novaPosY = bola.offsetTop + deltaY;

            // Garantir que a bolinha não saia da tela
            novaPosX = Math.max(0, Math.min(maxX, novaPosX));
            novaPosY = Math.max(0, Math.min(maxY, novaPosY));

            bola.style.left = `${novaPosX}px`;
            bola.style.top = `${novaPosY}px`;
        }, 100); // Movimenta a cada 100 milissegundos
    }

    // Criar a primeira bolinha no centro
    criarBola(container.clientWidth / 2, container.clientHeight / 2);
});