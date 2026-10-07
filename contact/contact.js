(function () {
    const EMAIL_REGEX = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

    const form = document.querySelector('.contact-form');
    if (!form) return;

    const messages = {
        name:          'Merci d\'indiquer votre nom.',
        emailEmpty:    'Merci d\'indiquer votre adresse email.',
        emailInvalid:  'Cette adresse email n\'est pas valide.',
        subject:       'Merci d\'indiquer un objet.',
        message:       'Merci d\'écrire votre message.'
    };

    function showError(input, msg) {
        const field = input.closest('.form-field');
        if (!field) return;
        const tooltip = field.querySelector('.field-error');
        tooltip.textContent = msg;
        tooltip.classList.add('visible');
        input.classList.add('invalid');
    }

    function clearError(input) {
        const field = input.closest('.form-field');
        if (!field) return;
        const tooltip = field.querySelector('.field-error');
        tooltip.classList.remove('visible');
        input.classList.remove('invalid');
    }

    function validateField(input) {
        clearError(input);
        const value = input.value.trim();
        const name = input.name;

        if (input.hasAttribute('required') && value === '') {
            let msg;
            if (name === 'email')      msg = messages.emailEmpty;
            else if (messages[name])   msg = messages[name];
            else                       msg = 'Ce champ est requis.';
            showError(input, msg);
            return false;
        }

        if (name === 'email' && !EMAIL_REGEX.test(value)) {
            showError(input, messages.emailInvalid);
            return false;
        }

        return true;
    }

    form.querySelectorAll('.form-control').forEach(function (input) {
        input.addEventListener('input', function () {
            if (input.classList.contains('invalid')) {
                validateField(input);
            }
        });
        input.addEventListener('blur', function () {
            if (input.value.trim() !== '') validateField(input);
        });
    });

    form.addEventListener('submit', function (e) {
        let valid = true;
        let firstInvalid = null;

        form.querySelectorAll('.form-control[required]').forEach(function (input) {
            if (!validateField(input)) {
                valid = false;
                if (!firstInvalid) firstInvalid = input;
            }
        });

        if (!valid) {
            e.preventDefault();
            e.stopPropagation();
            if (firstInvalid) firstInvalid.focus();
        }
    });
})();