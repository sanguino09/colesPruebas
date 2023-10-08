const login = document.querySelector(".loginField");
const username = document.getElementById('username');
const password = document.getElementById('password');
const form = document.getElementById('form');
let qu;

/* GUARDAR DATOS REGISTRO */
form.addEventListener('submit', function(e){
    e.preventDefault();

    const usernameValue = username.value;
    const passwordValue = password.value;
    
    if(usernameValue == 'padre1' && passwordValue == '123'){
        qu = 'Select A,B';
        localStorage.setItem('quValue',qu);
        window.location.href = "alfalfa.html"; 
    }
    else if(usernameValue == 'padre2' && passwordValue == '123'){
        qu = 'Select A,C';
        localStorage.setItem('quValue',qu);
        window.location.href = "alfalfa.html"; 
    }
    else{
        alert('error');
    }

     
})

