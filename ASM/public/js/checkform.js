var btnRegister = document.getElementById('register');
if (btnRegister) {
    btnRegister.onclick = function (e) {
        e.preventDefault();
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const pass = document.getElementById('pass');
        const errorMessageUsername = document.getElementById('error-message-username');
        console.log(errorMessageUsername);
        const errorMessageEmail = document.getElementById('error-message-email');
        const errorMessagePass = document.getElementById('error-message-pass');
        if (username.value.trim() === "") {
            errorMessageUsername.innerText = "Tên đăng nhập không được để trống!";
        } else {
            errorMessageUsername.innerText = "";
        }   
        function checkEmail(inputEmail) {
            const check = /\S+@\S+\.\S+/;
            return check.test(inputEmail);
        }        
            

        if (!checkEmail(email.value)) {
            errorMessageEmail.innerText = "Bạn chưa nhập đúng định dạng email!";
        } else {
            errorMessageEmail.innerText = "";
        }
        

        if (pass.value.length < 6) {
            errorMessagePass.innerText = "Mật khẩu cần ít nhất 6 ký tự!";
        } else {
            errorMessagePass.innerText = "";
        }
    };
}

var btnLogin = document.getElementById('login');
if (btnLogin) {
    btnLogin.onclick = function (e) {
        e.preventDefault();
        var email = document.getElementById('email');
        var pass = document.getElementById('pass');
        var errorMessageEmail = document.getElementById('error-message-email');
        var errorMessagePass = document.getElementById('error-message-pass');

        function checkEmail(email) {
            const check = /\S+@\S+\.\S+/;
            return check.test(email);
        }
        if (!checkEmail(email.value)) {
            errorMessageEmail.innerText = "Bạn chưa nhập đúng định dạng email!";
        } else {
            email.classList.remove('error');
            errorMessageEmail.innerText = "";
        }
        if (pass.value.length < 6) {
            errorMessagePass.innerText = "Mật khẩu cần ít nhất 6 ký tự!";
        } else {
            errorMessagePass.innerText = "";
        }
    };
}
