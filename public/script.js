const loginForm = document.getElementById('login-form');
const qrCodeContainer = document.getElementById('qr-code-container');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Call the API to generate the QR code
  const response = await fetch('/generate-qr', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  });

  const qrCodeData = await response.text();
  qrCodeContainer.innerHTML = `<img src="${qrCodeData}" alt="QR Code">`;
});