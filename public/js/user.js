document.querySelector('.login-form')?.addEventListener('submit', (event) => apiCall('/api/user/login', event));
document.querySelector('.register-form')?.addEventListener('submit', (event) => apiCall('/api/user/register', event));
document.querySelector('.button-logout')?.addEventListener('click', (event) => apiCall('/api/user/logout', event));
