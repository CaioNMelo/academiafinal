document.addEventListener('DOMContentLoaded', function() {
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const planosCards = document.querySelectorAll('.plano-card');

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filtroBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filtro = this.getAttribute('data-filtro');

            planosCards.forEach(card => {
                if (filtro === 'todos') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-categoria') === filtro) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}); 