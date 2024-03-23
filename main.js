//cardholder name
let nameCard = document.querySelector('.card__name');
let inputName = document.querySelector('#cardholder');
let errorName = document.querySelector('.form__cardholder--error');

//card number
let cardNumber = document.querySelector('.card__number');
let inputNumber = document.querySelector('#card-number');
let errorNumber = document.querySelector('.form__card-number--error');

//MM
let month = document.querySelector('.card__month');
let inputMonth = document.querySelector('#exp-month');
let errorMonth = document.querySelector('.form__input-mm--error');

//YY
let year = document.querySelector('.card__year');
let inputYear = document.querySelector('#exp-year');
let errorYear = document.querySelector('.form__input-yy--error');

//CVC
let cvc = document.querySelector('.card-back__cvc');
let inputCvc = document.querySelector('#cvc');
let errorCvc = document.querySelector('.form__input-cvc--error');

//seccciones formulario y thank you
const form = document.querySelector('.form');
const thankYou = document.querySelector('.thank-you');



//ingreso dinamico de nombre
inputName.addEventListener('input', () => {
    if (inputName.value === '') {
        nameCard.textContent = 'Jane Appleseed';
    } else {
        nameCard.textContent = inputName.value;
    }
})

//ingreso dinamico de numero
inputNumber.addEventListener('input', (e) => {
    let value = e.target.value;

    //actualizo el valor de la tarjeta
    cardNumber.textContent = inputNumber.value;

    //valido el formato, agrego espacio cada cuatro digitos, borrando los espacios ingresados, y solo acepto numeros
    let regExp = /[A-z]/g;
    if (regExp.test(inputNumber.value)) {
        showError(inputNumber, errorNumber, 'Wrong format, numbers only');
    } else {
        inputNumber.value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
        showError(inputNumber, errorNumber, '', false);
    }

    //valido que no este vacio
    if (inputNumber.value === '') {
        cardNumber.textContent = '0000 0000 0000 0000';
    }
})

//ingreso dinamico de mes
inputMonth.addEventListener('input', ()=> {
    month.textContent = inputMonth.value;

    validateNumber(inputMonth, errorMonth);
})

//Ingreso dinamico del año
inputYear.addEventListener('input', ()=> {
    year.textContent = inputYear.value;

    validateNumber(inputYear, errorYear);
})

//Ingreso dinamico de cvc
inputCvc.addEventListener('input', ()=> {
    cvc.textContent = inputCvc.value;

    validateNumber(inputCvc, errorCvc); 

})




//Buttom confirm
let submit = document.querySelector('.form__submit');
submit.addEventListener('click', (e) => {
    e.preventDefault();

    //validar nombre
    (verifyIsFilled(inputName, errorName));

    //validar numero
    verifyIsFilled(inputNumber, errorNumber);
    if (inputNumber.value.length !== 19) {
        showError(inputNumber, errorNumber, 'Wrong format');
    }

    //Validar mes
    verifyIsFilled(inputMonth, errorMonth);
    if (parseInt(inputMonth.value) < 1 || parseInt(inputMonth.value) > 12) {
        showError(inputMonth, errorMonth, 'Wrong month');
    }

    //Validar año
    verifyIsFilled(inputYear, errorYear);
    if (parseInt(inputYear.value) < 24 || parseInt(inputYear.value) > 29) {
        showError(inputYear, errorYear, 'Wrong year');
    }

    //Validar cvc
    verifyIsFilled(inputCvc, errorCvc);
    if (inputCvc.value.length !== 3) {
        showError(inputCvc, errorCvc, 'Wrong CVC');
    }

    //validar que todos los campos esten completos
    if (!errorName.textContent && !errorNumber.textContent && !errorMonth.textContent && !errorYear.textContent && !errorCvc.textContent) {
        form.style.display = 'none';
        thankYou.style.display = 'block';
    }

})





//Funciones
function showError(divInput, divError, message, show = true) {
    if (show) {
        divError.textContent = message;
        divInput.style.borderColor = 'red';
    } else {
        divError.textContent = '';
        divInput.style.borderColor = 'hsl(270, 3%, 87%)';
    }

}

//Funcion de validacion de formulario 
function verifyIsFilled(input, error) {
    if (input.value === '') {
        showError(input, error, 'Can\'t be blank');
    } else {
        showError(input, error, '', false);
    }
}

function validateNumber(input, error) {
    let regExp = /[A-z]/g;
    if (regExp.test(input.value)) {
        showError(input, error, 'Wrong format, numbers only');
    }
}



