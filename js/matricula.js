document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('matriculaForm');
    const inputs = form.querySelectorAll('input, select');

    
    const cpfInput = document.getElementById('cpf');
    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            e.target.value = value;
        }
    });

    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            e.target.value = value;
        }
    });

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });

    // envio do formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            try {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                data.dataMatricula = new Date().toISOString();
                
                const response = await fetch('http://localhost:3000/matriculas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Matrícula enviada com sucesso! Entraremos em contato em breve.');
                    form.reset();
                    document.querySelectorAll('.error-message').forEach(el => {
                        el.textContent = '';
                    });
                } else {
                    throw new Error('Erro ao enviar matrícula');
                }
            } catch (error) {
                alert('Erro ao enviar matrícula. Por favor, tente novamente.');
                console.error('Erro:', error);
            }
        }
    });

    function validateInput(input) {
        const errorElement = input.parentElement.querySelector('.error-message');
        let isValid = true;
        let errorMessage = '';

        switch(input.id) {
            case 'nome':
                if (input.value.trim().length < 3) {
                    isValid = false;
                    errorMessage = 'Nome deve ter pelo menos 3 caracteres';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    errorMessage = 'E-mail inválido';
                }
                break;

            case 'telefone':
                if (input.value.replace(/\D/g, '').length < 10) {
                    isValid = false;
                    errorMessage = 'Telefone inválido';
                }
                break;

            case 'cpf':
                if (input.value.replace(/\D/g, '').length !== 11) {
                    isValid = false;
                    errorMessage = 'CPF inválido';
                }
                break;

            case 'plano':
            case 'objetivo':
            case 'horario':
                if (!input.value) {
                    isValid = false;
                    errorMessage = 'Este campo é obrigatório';
                }
                break;

            case 'termos':
                if (!input.checked) {
                    isValid = false;
                    errorMessage = 'Você precisa aceitar os termos';
                }
                break;
        }

        // mensagem de erro
        errorElement.textContent = errorMessage;
        
        if (!isValid) {
            input.style.borderColor = 'var(--secondary-color)';
        } else {
            input.style.borderColor = '#ddd';
        }

        return isValid;
    }
}); 