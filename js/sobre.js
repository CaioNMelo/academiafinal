document.addEventListener('DOMContentLoaded', function() {
    const depoimentos = document.querySelectorAll('.depoimento');
    let currentDepoimento = 0;

    function showNextDepoimento() {
        depoimentos[currentDepoimento].style.display = 'none';
        currentDepoimento = (currentDepoimento + 1) % depoimentos.length;
        depoimentos[currentDepoimento].style.display = 'block';
    }

    function initDepoimentosSlider() {
        depoimentos.forEach((depoimento, index) => {
            if (index !== 0) {
                depoimento.style.display = 'none';
            }
        });

        setInterval(showNextDepoimento, 5000);
    }

    if (depoimentos.length > 0) {
        initDepoimentosSlider();
    }

    // imagens
    const galeriaItems = document.querySelectorAll('.galeria-item');
    
    galeriaItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const modal = document.createElement('div');
            modal.className = 'modal';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'close-modal';
            closeBtn.innerHTML = '&times;';
            
            modalContent.appendChild(modalImg);
            modalContent.appendChild(closeBtn);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Fecha o modal ao clicar no X ou fora da imagem
            closeBtn.addEventListener('click', () => {
                modal.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
}); 