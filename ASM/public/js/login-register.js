function login() {
    const form = document.querySelector("#formLogin");
    form.onsubmit = async (event) => {
        console.log("Submitted");
        event.preventDefault();
        const formData = new FormData(form);
        const emailAccount = formData.get('emailAccount');
        const passwordAccount = formData.get('passwordAccount');
        const response = await fetch('/postLogin', {
            method: 'POST',
            body: JSON.stringify({ emailAccount, passwordAccount }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const res = await response.json();
        if (response.status === 400) {
            alert(`Message: ${res.message}`);
        } else if (response.status === 200) {
            alert(`Message: ${res.message}`);
            setTimeout(() => {
                window.location.href = res.redirectTo;
            }, 1000);
        }
    };
}

login();

function register () {
    const form = document.querySelector("#formRegister");
    form.onsubmit = async (event) => {
        console.log("Submitted");
        event.preventDefault();
        const formData = new FormData(form);
        const userName = formData.get('username');
        const emailAccount = formData.get('emailAccount');
        const passwordAccount = formData.get('passwordAccount');
        const response = fetch('/postRegister', {
            method: 'POST',
            body: JSON.stringify({ emailAccount, passwordAccount,userName }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const res = await response.json();
        if(response.status == 400) {
            alert(`Message: ${res.message}`);
        }else if(response.status == 200) {
            alert(`Message: ${res.message}`);
            setTimeout(() => {
                window.location.href = res.redirectTo;
            }, 1000)
        }
    }
}
register();