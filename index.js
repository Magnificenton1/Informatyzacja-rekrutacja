const form = document.getElementById('form');

//    Inputy
const first_name = document.getElementById('name');
const surname = document.getElementById('surname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_repeat = document.getElementById('password-repeat');


form.addEventListener('submit', (e) => {
    e.preventDefault();
                            // check inputs sprawdza ile inputów jest prawidłowych i zwraca liczbę poprawnych inputów - łącznie jest ich 5
    if(checkInputs() == 5){ // w zależności czy input jest poprawny czy nie aktywuje funkcje setError lub setSuccess dla tego elementu
        window.alert("Rejestracja udana"); //1*
    }
});
//1* - w przypadku udanej rejestracji za pierwszym razem, komunikat pojawi się przed zmianą koloru
//     ramki na zielony, czyli gdyby to było przekierowanie strony nie zmieniłby się kolor, co wygląda 
//     lepiej i jest mniej irytujące według mnie

const setError = (chosenInput, message) => {//przyjmuje message który się wyświetli jako wiadomość przy errorze - pojawi sie obok Label tego elementu
    const input_container = chosenInput.parentElement; // chosenInput to input przez który funkcja jest aktywowana
    const error = input_container.querySelector('.errorMessage');

    chosenInput.style.borderColor = 'rgb(' + 255+',' +0+ ',' + 0 + ')'; 
    error.innerText = message;
}

const setSuccess = (element) => {
    const input_container = element.parentElement; // element to input przez który funkcja jest aktywowana
    const error = input_container.querySelector('.errorMessage');

    element.style.borderColor = 'lightgreen';
    error.innerText = ''; // chowa error message
}

const checkEmail = (emailValue) => {
    const validRegex = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/g; // regex code do emaila
    if (emailValue.match(validRegex)) {
        return true;
    } else{
        return false;
    }
}


const checkInputs = () => {
    let success_count = 0; // licznik ile inputów jest poprawnych

    const first_nameValue = first_name.value.trim();
    const surnameValue = surname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password_repeatValue = password_repeat.value.trim();

    if(first_nameValue === ''){
        setError(first_name, 'Imie jest wymagane');
    } else {
        setSuccess(first_name);
        success_count++;
    }

    if(surnameValue === ''){
        setError(surname, 'Nazwisko jest wymagane');
    } else {
        setSuccess(surname);
        success_count++;
    }

    if(emailValue === ''){
        setError(email, 'Email jest wymagany');
    } else if(checkEmail(emailValue) == false){
        setError(email, 'Podany został nieprawidłowy adres email');
    } else{
        setSuccess(email);
        success_count++;
    }

    if(passwordValue === ''){
        setError(password, 'Hasło jest wymagane');
    } else if(passwordValue.length < 8){
        setError(password, 'Hasło musi zawierać co najmniej 8 znaków');
    } else{
        setSuccess(password);
        success_count++;
    }

    if(passwordValue.length < 8){
        setError(password_repeat, '');      // w przypadku, gdy pierwotne hasło jest złe nic nie pisze,
    } else if(password_repeatValue === ''){ // by móc się skupić na poprawieniu pierwotnego hasła
        setError(password_repeat, 'Hasło jest wymagane'); 
    } else if(password_repeatValue !== passwordValue){
        setError(password_repeat, 'Hasła nie są takie same'); 
    } else{                            
        setSuccess(password_repeat);
        success_count++;
    }

    return success_count;
};