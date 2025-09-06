document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault(); 

  const inputs = this.querySelectorAll('input');
  const [fullName, phoneNumber, password, repeatPassword] = inputs;

  for (let input of inputs) {
    if (input.value.trim() === '') {
      alert('Semua kolom harus diisi!');
      input.focus();
      return;
    }
  }

  if (!/^\d+$/.test(phoneNumber.value)) {
    alert('Nomor HP hanya boleh angka!');
    phoneNumber.focus();
    return;
  }

  if (password.value !== repeatPassword.value) {
    alert('Password dan Repeat Password tidak sama!');
    repeatPassword.focus();
    return;
  }

  alert('Pendaftaran berhasil!');
  this.reset();
});

function togglePassword(fieldId) {
  const passwordInput = document.getElementById(fieldId);
  const eyeVisible = document.getElementById(`eye-visible-${fieldId}`);
  const eyeHidden = document.getElementById(`eye-hidden-${fieldId}`);
  
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