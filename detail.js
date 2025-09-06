//panggil header
function loadHeader() {
    fetch('./header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
}
//panggil footer
function loadFooter() {
    fetch('./footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}
loadHeader();
loadFooter();

function validateBookingForm() {
  const startDate = document.querySelector('.booking-form input[type="date"]').value.trim();
  const transactionType = document.getElementById("transaction-type").value.trim();

  if (!startDate || !transactionType) {
    alert("Tanggal mulai dan jenis transaksi harus diisi.");
    return false;
  }

  // window.location.href = 'payment.html';
  return true;
}

function validateAppointmentForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone-number").value.trim();
  const date = document.querySelector('.set-appointment input[type="date"]').value.trim();
  const purpose = document.getElementById("purpose-description").value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]+$/;

  if (!name || !email || !phone || !date || !purpose) {
    alert("Semua kolom appointment harus diisi.");
    return false;
  }

  if (!emailRegex.test(email)) {
    alert("Format email tidak valid.");
    return false;
  }

  if (!phoneRegex.test(phone)) {
    alert("Nomor telepon hanya boleh angka.");
    return false;
  }

  alert("Permintaan janji temu berhasil dikirim!");
  return true;
}

//function main detail
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.getElementsByClassName("close")[0];
const images = document.querySelectorAll(".preview-img");

images.forEach(img => {
  img.addEventListener("click", function() {
    modal.style.display = "block";
    modalImg.src = this.src;
  });
});

closeBtn.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

function showLoginAlert() {
  alert("Logging in is required");
  window.location.href = "signIn.html"; 
}
