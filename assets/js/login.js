document.getElementById('loginForm').addEventListener('submit', handleLogin);

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const loginButton = document.getElementById('loginButton');
    const buttonText = document.getElementById('buttonText');
    const spinner = document.getElementById('loadingSpinner');

    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
    buttonText.style.display = 'none';
    spinner.style.display = 'inline-block';
    loginButton.disabled = true;

    try {
        const response = await fetch('https://dummyjson.com/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) throw new Error();

        const user = await response.json();
        localStorage.setItem('firstName', user.firstName);

        successMessage.textContent = 'Login berhasil! Lur';
        successMessage.style.display = 'block';

        setTimeout(() => {
            window.location.href = 'recipes.html';
        }, 1500);
    } catch {
        errorMessage.textContent = 'Username atau password salah!';
        errorMessage.style.display = 'block';
    } finally {
        spinner.style.display = 'none';
        buttonText.style.display = 'inline';
        loginButton.disabled = false;
    }
}
