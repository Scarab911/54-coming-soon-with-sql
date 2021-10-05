class Form {
    constructor(selector, toastObject) {
        this.selector = selector;
        this.toastObject = toastObject;

        this.formDOM = null;
        this.allInputsDOM = [];
        this.submitButtonDOM = null;
        this.validations = {
            name: this.isValidName,
            email: this.isValidEmail,
            text: this.isValidText,
        };

        this.init();
    }

    init() {
        if (!this.isValidSelector()) {
            console.error('ERROR: nevalidus selector');
            return false;
        }

        this.formDOM = document.querySelector(this.selector);
        if (!this.formDOM) {
            console.error('ERROR: nerastas formos elementas');
            return false;
        }

        this.allInputsDOM = this.formDOM.querySelectorAll('input, textarea');
        this.submitButtonDOM = this.formDOM.querySelector('button[type="submit"]');

        this.addEvents();
    }

    isValidSelector() {
        return true;
    }

    isValidName(name) {
        const maxNameLength = 50;
        if (typeof name !== 'string' || name === '') {
            return 'Vardas turi buti ne tuscias tekstas';
        }
        if (name.length > maxNameLength) {
            return `Vardas negali buti ilgesnis nei ${maxNameLength} simboliu`;
        }
        if (name[0].toUpperCase() !== name[0]) {
            return 'Vardo pirmoji raide turi buti didzioji';
        }
        return true;
    }

    isValidEmail(email) {
        const maxEmailLength = 100;
        if (typeof email !== 'string' || email === '') {
            return 'Email turi buti ne tuscias tekstas';
        }
        if (email.length > maxEmailLength) {
            return `Email negali buti ilgesnis nei ${maxemailLength} simboliu`;
        }
        if (email.indexOf('@') === -1) {
            return 'Email turi tureti @ simboli';
        }
        return true;
    }

    isValidText(text) {
        const maxTextLength = 1000;
        if (typeof text !== 'string' || text === '') {
            return 'Zinute turi buti ne tuscias tekstas';
        }
        if (text.length > maxTextLength) {
            return `Zinute negali buti ilgesne nei ${maxemailLength} simboliu`;
        }
        return true;
    }

    addEvents() {
        this.submitButtonDOM.addEventListener('click', (event) => {
            // submit mygtuko paspaudimo metu reikia isjungti default veikima
            event.preventDefault();

            // issitraukti is visu formos lauku informacija
            // eiti per visus laukus ir atpazinus informacijos tipa atlikti tos informacijos validacija
            let allGood = true;

            for (const inputDOM of this.allInputsDOM) {
                const validationRule = inputDOM.dataset.validation;
                const value = inputDOM.value;

                const validationResult = this.validations[validationRule](value);
                if (validationResult !== true) {
                    this.toastObject.error(validationResult);
                    allGood = false;
                    break;
                }
            }


            // jei patikrinus visus laukus:
            // nerasta nei vienos klaidos, tai "siunciam pranesima"
            // nerasta bent viena klaida, tai parodome visu klaidos pranesimus (kol kas, viskas pateikiama i console)
            if (allGood) {
                this.toastObject.success('Tavo formos informacija buvo issiusta!');
            }
        })
    }
}

export { Form }