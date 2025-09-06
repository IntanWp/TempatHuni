function validateRanges() {
    // Function to extract numeric value from formatted price
    function extractNumericValue(value, isPrice = false) {
        if (!value) return 0;
        if (isPrice) {
            // Remove "Rp. " and commas, then convert to number
            return parseInt(value.replace(/[Rp.\s,]/g, '')) || 0;
        }
        return parseInt(value) || 0;
    }
    
    // Function to validate all ranges and return true if valid
    function validateAllRanges() {
        const minPriceInput = document.getElementById('minPrice');
        const maxPriceInput = document.getElementById('maxPrice');
        const minSqftInput = document.getElementById('minSqft');
        const maxSqftInput = document.getElementById('maxSqft');
        
        const minPrice = extractNumericValue(minPriceInput.value, true);
        const maxPrice = extractNumericValue(maxPriceInput.value, true);
        const minSqft = extractNumericValue(minSqftInput.value);
        const maxSqft = extractNumericValue(maxSqftInput.value);
        
        // Check price range
        if (minPrice > 0 && maxPrice > 0 && minPrice > maxPrice) {
            alert('Minimum price cannot be greater than maximum price');
            maxPriceInput.focus();
            return false;
        }
        
        // Check square feet range
        if (minSqft > 0 && maxSqft > 0 && minSqft > maxSqft) {
            alert('Minimum square feet cannot be greater than maximum square feet');
            maxSqftInput.focus();
            return false;
        }
        
        return true;
    }
    
    // Return the validation function for use in search
    return validateAllRanges;
}

document.addEventListener('DOMContentLoaded', function() {
// Modal elements
const filterBtn = document.getElementById('filterBtn');
const modalOverlay = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('closeBtn');
const resetBtn = document.getElementById('resetBtn');
const searchBtn = document.getElementById('searchBtn');
const validateAllRanges = validateRanges();

// Toggle buttons
const toggleBtns = document.querySelectorAll('.toggle-btn');
const propertyTypeBtns = document.querySelectorAll('.property-type-btn');

// Open modal
filterBtn.addEventListener('click', function() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close modal
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';

  document.querySelectorAll('.counter-dropdown-menu').forEach(menu => {
      menu.classList.remove('active');
  });
}

closeBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// Buy/Rent toggle
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        toggleBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Show/hide shared facility section based on selection
        const sharedFacilitySection = document.getElementById('sharedFacilitySection');
        const buyFacilitySection = document.getElementById('buyFacilitySection');
        const rentFacilitySection = document.getElementById('rentFacilitySection');

        if (this.dataset.type === 'rent') {
            sharedFacilitySection.style.display = 'block';
            rentalPeriodSection.style.display = 'block';

            buyFacilitySection.style.display = 'none';
            rentFacilitySection.style.display = 'block';
            document.querySelectorAll('#buyFacilitySection input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });
        } else {
            sharedFacilitySection.style.display = 'none';
            rentalPeriodSection.style.display = 'none';

            buyFacilitySection.style.display = 'block';
            rentFacilitySection.style.display = 'none';
            // Reset shared facility checkboxes when hiding
            document.querySelectorAll('#sharedFacilitySection input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });
        }
    });
});

// Property type selection
document.getElementById('propertyType').value = 'house';

// Counter functionality
const counterBtns = document.querySelectorAll('.counter-btn');

counterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const target = this.dataset.target;
        const display = document.getElementById(target);
        let currentValue = parseInt(display.value) || 0;
        
        if (this.textContent === '+') {
            // Increment (max 10 for reasonable limit)
            if (currentValue < 10) {
                currentValue++;
            }
        } else if (this.textContent === '−') {
            // Decrement (min 0)
            if (currentValue > 0) {
                currentValue--;
            }
        }
        
        display.value = currentValue;
        
        // Update button states
        updateCounterButtons(target, currentValue);
    });
});

// Function to update counter button states
function updateCounterButtons(target, value) {
    const minusBtn = document.getElementById(target + 'Minus');
    const plusBtn = document.getElementById(target + 'Plus');
    
    // Disable minus button if value is 0
    minusBtn.disabled = value <= 0;
    
    // Disable plus button if value is at max (10)
    plusBtn.disabled = value >= 10;
}

// Initialize counter button states
updateCounterButtons('bedroom', 0);
updateCounterButtons('bathroom', 0);


// Reset all filters
resetBtn.addEventListener('click', function() {
    // Reset toggles
    toggleBtns.forEach(btn => btn.classList.remove('active'));
    toggleBtns[0].classList.add('active');

    // Reset property types
    document.getElementById('propertyType').value = 'house';

    // Reset radio buttons
    document.getElementById('popular').checked = true;

    // Reset inputs
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('minSqft').value = '';
    document.getElementById('maxSqft').value = '';

    // Reset counters
    document.getElementById('bedroom').value = '0';
    document.getElementById('bathroom').value = '0';
    updateCounterButtons('bedroom', 0);
    updateCounterButtons('bathroom', 0);

    // Reset checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });

    console.log('All filters reset');
});

// Search with filters
searchBtn.addEventListener('click', function() {
    if (!validateAllRanges()) {
            return; // Stop if validation fails
    }

    const filters = {
        type: document.querySelector('.toggle-btn.active').dataset.type,
        propertyType: document.getElementById('propertyType').value,
        sortBy: document.querySelector('input[name="filter"]:checked').value,
        priceRange: {
            min: document.getElementById('minPrice').value,
            max: document.getElementById('maxPrice').value
        },
        squareFeet: {
            min: document.getElementById('minSqft').value,
            max: document.getElementById('maxSqft').value
        },
        bedroom: parseInt(document.getElementById('bedroom').value) || 0,
        bathroom: parseInt(document.getElementById('bathroom').value) || 0,
        facilities: Array.from(document.querySelectorAll('#sharedFacilitySection input[type="checkbox"]:checked, .checkbox-group:not(.shared-facility-grid) input[type="checkbox"]:checked'))
            .map(cb => cb.value),
        sharedFacilities: Array.from(document.querySelectorAll('#sharedFacilitySection input[type="checkbox"]:checked'))
            .map(cb => cb.value)
    };
    
    console.log('Search filters:', filters);
    console.log('About to close modal');
    
    // Close modal after search
    closeModal();
    window.location.href = 'searchResult.html'; 
    
});

});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.homepage-catalogue-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function () {
            window.location.href = './detail.html';
        });
    });
});