document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("form-contact"); 

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");

    const nameError = document.getElementById("contact-nameError"); 
    const emailError = document.getElementById("contact-emailError"); 
    const messageError = document.getElementById("contact-messageError"); 

    const allErrors = [nameError, emailError, messageError];

    const isEmptyRegex = /^\s*$/;
    const isValidEmailRegex = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
    const isValidNameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/; 
    const minWordsMessageRegex = /^\s*\S+(?:\s+\S+){4,}\s*$/; 

    const hideErrors = () => {
        allErrors.forEach(error => {
            error.textContent = "";
            error.classList.remove('active');
        });
        nameInput.classList.remove('error');
        emailInput.classList.remove('error');
        messageInput.classList.remove('error');
    };

    const displayError = (inputElement, errorElement, message) => {
        errorElement.textContent = message;
        errorElement.classList.add('active'); 
        inputElement.classList.add('error');
    };

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); 
        let isValid = true; 
        hideErrors();

        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();

        if (isEmptyRegex.test(nameValue)) {
            displayError(nameInput, nameError, "El Nombre Completo es requerido.");
            isValid = false;
        } else if (!isValidNameRegex.test(nameValue)) {
            displayError(nameInput, nameError, "Solo se permiten letras y espacios, y debe tener al menos 3 caracteres.");
            isValid = false;
        }

        if (isEmptyRegex.test(emailValue)) {
            displayError(emailInput, emailError, "El Correo Electrónico es requerido.");
            isValid = false;
        } else if (!isValidEmailRegex.test(emailValue)) {
            displayError(emailInput, emailError, "El formato del email no es válido (ej. usuario@dominio.com).");
            isValid = false;
        }

        if (isEmptyRegex.test(messageValue)) {
            displayError(messageInput, messageError, "El Mensaje es requerido.");
            isValid = false;
        } else if (!minWordsMessageRegex.test(messageValue)) {
            displayError(messageInput, messageError, "El mensaje debe contener al menos 5 palabras para ser útil.");
            isValid = false;
        }
        
        if (isValid) {
            alert(`¡Mensaje enviado con éxito por ${nameValue}! Nos contactaremos pronto a ${emailValue}.`);
            contactForm.reset(); 
        } else {
            const firstErrorElement = document.querySelector('.error-message.active');
            if (firstErrorElement) {
                if (firstErrorElement.id === nameError.id) nameInput.focus();
                else if (firstErrorElement.id === emailError.id) emailInput.focus();
                else if (firstErrorElement.id === messageError.id) messageInput.focus();
            }
        }
    });
});