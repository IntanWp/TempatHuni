document.addEventListener("DOMContentLoaded", function () {
  const propertyCards = document.getElementById("propertyCards");

  const dummyProperties = [
    {
      name: "Kostan Indah Permata",
      location: "Bekasi",
      price: "Rp. 880.000 / Month",
      image: "assetAOL/fasilitas2.jpg"
    },
    {
      name: "Azalea Hills Regency",
      location: "Jakarta Barat",
      price: "Rp. 57.000.000 / Tahun",
      image: "assetAOL/airbnb3.jpg"
    },
    {
      name: "Single-Family House",
      location: "Jakarta Barat",
      price: "Rp. 2.800.000.000",
      image: "assetAOL/fasilitas6.jpg"
    }
  ];

  dummyProperties.forEach(prop => {
    const card = document.createElement("div");
    card.classList.add("property-card");
    card.innerHTML = `
      <img src="${prop.image}" alt="${prop.name}">
      <div class="info">
        <h4>${prop.name}</h4>
        <p>${prop.location}</p>
        <p><strong>${prop.price}</strong></p>
      </div>
    `;
    propertyCards.appendChild(card);
  });
});

document.querySelectorAll('.homepage-catalogue-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function () {
        window.location.href = 'detail-2.html';
    });
});
