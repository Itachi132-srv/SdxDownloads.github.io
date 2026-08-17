const form = document.getElementById('downloadForm');
const analyzeBtn = document.getElementById('analyzeBtn');
const previewCard = document.getElementById('previewCard');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading spinner state
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = `
        <svg class="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    `;

    // Simulate server response delay
    setTimeout(() => {
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = 'Analyze';
        previewCard.classList.remove('hidden');
        previewCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1200);
});

