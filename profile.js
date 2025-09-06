document.querySelector(".logout-btn").addEventListener("click", () => {
  if (confirm("Are you sure you want to log out?")) {
    window.location.href = "signIn.html";
  }
});
