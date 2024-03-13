document.querySelector('.blog-form')?.addEventListener('submit', (event) => apiCall('/api/blog/post', event));
document.querySelector('.comment-form')?.addEventListener('submit', (event) => apiCall('/api/blog/comment', event));
