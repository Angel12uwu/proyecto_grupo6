document.addEventListener("DOMContentLoaded", () => {
    const donationForm = document.querySelector(".form-donation"); 

    const nameInput = document.getElementById("donor-name");
    const emailInput = document.getElementById("donor-email");
    const amountInput = document.getElementById("donation-amount");
    const messageInput = document.getElementById("donation-message"); 

    const nameError = document.getElementById("nameError"); 
    const emailError = document.getElementById("emailError"); 
    const amountError = document.getElementById("amountError"); 

    const allErrors = [nameError, emailError, amountError];

    const isEmptyRegex = /^\s*$/;
    const isValidEmailRegex = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
    const isValidNameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/; 

    const hideErrors = () => {
        allErrors.forEach(error => {
            error.textContent = "";
            error.classList.remove('active'); 
        });
    };

    donationForm.addEventListener("submit", (e) => {
        e.preventDefault(); 
        let isValid = true; 
        hideErrors();

        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const amountValue = amountInput.value.trim();

        if (isEmptyRegex.test(nameValue)) {
            nameError.textContent = "El Nombre es requerido.";
            nameError.classList.add('active'); 
            isValid = false;
        } else if (!isValidNameRegex.test(nameValue)) {
            nameError.textContent = "Solo se permiten letras y espacios, y debe tener al menos 3 caracteres.";
            nameError.classList.add('active'); 
            isValid = false;
        }

        if (isEmptyRegex.test(emailValue)) {
            emailError.textContent = "El Correo Electrónico es requerido.";
            emailError.classList.add('active'); 
            isValid = false;
        } else if (!isValidEmailRegex.test(emailValue)) {
            emailError.textContent = "El formato del email no es válido (ej. usuario@dominio.com).";
            emailError.classList.add('active'); 
            isValid = false;
        }

        const amountNumber = parseFloat(amountValue);
        if (isEmptyRegex.test(amountValue)) {
            amountError.textContent = "El Monto es requerido.";
            amountError.classList.add('active'); 
            isValid = false;
        } else if (isNaN(amountNumber) || amountNumber <= 0) {
            amountError.textContent = "El Monto debe ser un número positivo (mayor a 0).";
            amountError.classList.add('active'); 
            isValid = false;
        }
        

        if (isValid) {
            alert(`¡Donación registrada con éxito a nombre de ${nameValue}!`);
            donationForm.reset();
        } else {
            const firstErrorElement = document.querySelector('.error-message.active');
            if (firstErrorElement) {
                const inputId = firstErrorElement.id.replace('Error', ''); 
                const inputElement = document.getElementById('donor-' + inputId);
                if (inputElement) {
                    inputElement.focus();
                } else if (inputId === 'amount') {
                    document.getElementById('donation-amount').focus();
                }
            }
        }
    });
});