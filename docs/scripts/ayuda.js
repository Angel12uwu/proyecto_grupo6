document.addEventListener("DOMContentLoaded", () => {
    const MIN_AGE = 15; 

    const volunteerForm = document.getElementById("volunteerform"); 

    const nameInput = document.getElementById("vol-name");
    const idInput = document.getElementById("vol-id");
    const fechaInput = document.getElementById("vol-fecha");
    const phoneInput = document.getElementById("vol-phone");
    const emailInput = document.getElementById("vol-email");
    const primariaInput = document.getElementById("vol-primaria");
    const secundariaInput = document.getElementById("vol-secundaria");
    const voluntariadosInput = document.getElementById("vol-voluntariados");
    const acercaInput = document.getElementById("vol-acerca-empresa");
    const idiomasInput = document.getElementById("vol-idiomas");
    const cursosInput = document.getElementById("vol-cursos");

    const nameError = document.getElementById("vol-nameError"); 
    const idError = document.getElementById("vol-idError"); 
    const fechaError = document.getElementById("vol-fechaError"); 
    const phoneError = document.getElementById("vol-phoneerror"); 
    const emailError = document.getElementById("vol-correoerror"); 
    const primariaError = document.getElementById("vol-primariaerror"); 
    const secundariaError = document.getElementById("vol-secundariaerror"); 
    const voluntariadosError = document.getElementById("vol-volunteererror"); 
    const acercaError = document.getElementById("vol-sabeserror"); 
    const idiomasError = document.getElementById("vol-idiomaserror"); 
    const cursosError = document.getElementById("vol-cursoserror"); 


    const allErrors = [nameError, idError, fechaError, phoneError, emailError, primariaError, secundariaError, voluntariadosError, acercaError, idiomasError, cursosError];

    const isEmptyRegex = /^\s*$/;
    const isValidEmailRegex = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
    const isValidIdRegex = /^\d{13}$/;
    const isValidPhoneRegex = /^\d{8}$/;
    const isValidNameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
    const minWordsRegex = /^\s*\S+(?:\s+\S+){2,}\s*$/; 

    const calculateAge = (birthDateString) => {
        const today = new Date();
        const birthDate = new Date(birthDateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
    
    const hideErrors = () => {
        allErrors.forEach(error => {
            error.textContent = "";
            error.classList.remove('active'); 
        });
    };

    volunteerForm.addEventListener("submit", (e) => {
        e.preventDefault(); 
        let isValid = true; 
        hideErrors();

        const nameValue = nameInput.value.trim();
        if (isEmptyRegex.test(nameValue)) {
            nameError.textContent = "El Nombre Completo es requerido.";
            nameError.classList.add('active'); 
            isValid = false;
        } else if (!isValidNameRegex.test(nameValue)) {
            nameError.textContent = "Solo se permiten letras y espacios, y debe tener al menos 3 caracteres.";
            nameError.classList.add('active'); 
            isValid = false;
        }

        const idValue = idInput.value.trim();
        if (isEmptyRegex.test(idValue)) {
            idError.textContent = "El Número de Identidad es requerido.";
            idError.classList.add('active'); 
            isValid = false;
        } else if (!isValidIdRegex.test(idValue)) {
            idError.textContent = "Debe ser un número de 13 dígitos sin guiones.";
            idError.classList.add('active'); 
            isValid = false;
        }

        const fechaValue = fechaInput.value;
        if (isEmptyRegex.test(fechaValue)) {
            fechaError.textContent = "La Fecha de Nacimiento es requerida.";
            fechaError.classList.add('active'); 
            isValid = false;
        } else {
            const age = calculateAge(fechaValue);
            if (age < MIN_AGE) {
                fechaError.textContent = `Debes tener al menos ${MIN_AGE} años para aplicar.`;
                fechaError.classList.add('active'); 
                isValid = false;
            }
        }
        
        const phoneValue = phoneInput.value.trim();
        if (!isEmptyRegex.test(phoneValue) && !isValidPhoneRegex.test(phoneValue)) {
            phoneError.textContent = "El Teléfono no es válido (debe ser 8 dígitos numéricos).";
            phoneError.classList.add('active'); 
            isValid = false;
        }

        const emailValue = emailInput.value.trim();
        if (isEmptyRegex.test(emailValue)) {
            emailError.textContent = "El Correo Electrónico es requerido.";
            emailError.classList.add('active'); 
            isValid = false;
        } else if(!isValidEmailRegex.test(emailValue)) {
            emailError.textContent = "El formato del email no es válido (ej. usuario@dominio.com).";
            emailError.classList.add('active'); 
            isValid = false;
        }

        if (isEmptyRegex.test(primariaInput.value)) {
            primariaError.textContent = "La Educación Primaria es requerida.";
            primariaError.classList.add('active'); 
            isValid = false;
        }
        if (isEmptyRegex.test(secundariaInput.value)) {
            secundariaError.textContent = "La Educación Secundaria es requerida.";
            secundariaError.classList.add('active'); 
            isValid = false;
        }
        if (isEmptyRegex.test(voluntariadosInput.value)) {
            voluntariadosError.textContent = "La experiencia en Voluntariados es requerida (ej: 'Primer voluntariado').";
            voluntariadosError.classList.add('active'); 
            isValid = false;
        }
        
        const acercaValue = acercaInput.value;
        if (isEmptyRegex.test(acercaValue)) {
            acercaError.textContent = "Este campo es requerido.";
            acercaError.classList.add('active'); 
            isValid = false;
        } else if (!minWordsRegex.test(acercaValue)) {
            acercaError.textContent = "La respuesta debe contener al menos 3 palabras.";
            acercaError.classList.add('active'); 
            isValid = false;
        }
        
        if (isValid) {
            alert(`¡Solicitud de voluntariado enviada por ${nameInput.value.trim()}!`);
            volunteerForm.reset();
        } else {
             const firstErrorElement = document.querySelector('.error-message.active');
             if (firstErrorElement) {
                const inputId = firstErrorElement.id.replace('error', ''); 
                const inputElement = document.getElementById(inputId);
                if (inputElement) {
                    inputElement.focus();
                }
             }
        }
    });
});