function handleLogin() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    document.getElementById('username-error').textContent = '';
    document.getElementById('password-error').textContent = '';

    if (username === '') {
        document.getElementById('username-error').textContent = 'Enter your username!';
        return;
    }

    if (password === '') {
        document.getElementById('password-error').textContent = 'Enter your password!';
        return;
    }

    if (password !== '2020') {
        document.getElementById('password-error').textContent = 'Wrong password!';
        return;
    }

    localStorage.setItem('loggedUser', username);
    window.location.href = '../Pages/home.html';
}