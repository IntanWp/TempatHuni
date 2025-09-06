document.addEventListener('DOMContentLoaded', function() {
    const paymentButton = document.querySelector('.pay-btn');
    
    if (paymentButton) {
        paymentButton.addEventListener('click', function() {
            window.location.href = 'homepage.html';
        });
    }
});