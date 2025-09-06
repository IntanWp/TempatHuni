document.getElementById('signin-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const [phone, password] = this.querySelectorAll('input');
  if (!/^\d+$/.test(phone.value)) {
    alert('Nomor HP hanya boleh angka!');
    phone.focus();
    return;
  }

  if (password.value.length < 4) {
    alert('Password minimal 4 karakter');
    password.focus();
    return;
  }

  const passwordInput = document.getElementById('password');
  const errorMessage = document.getElementById('password-error');

  errorMessage.style.display = 'none';
  passwordInput.style.borderColor = '#ccc';

  if (passwordInput.value !== '1234') {
    errorMessage.style.display = 'block';
    passwordInput.style.borderColor = 'var(--red)';
    passwordInput.focus();
    return;
  }

  alert('Sign in successful!');
  redirectHome();
});

function redirectHome() {
  window.location.href = 'homepage-2.html'; 
}

function togglePassword() {
  const passwordInput = document.getElementById('password');
  const eyeVisible = document.getElementById('eye-visible');
  const eyeHidden = document.getElementById('eye-hidden');
  
  if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeVisible.style.display = 'none';
      eyeHidden.style.display = 'block';
  } else {
      passwordInput.type = 'password';
      eyeVisible.style.display = 'block';
      eyeHidden.style.display = 'none';
  }
}
