const form = document.getElementById('downloadForm');
const analyzeBtn = document.getElementById('analyzeBtn');
const previewCard = document.getElementById('previewCard');
const urlInput = document.getElementById('urlInput');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const url = urlInput.value.trim();
    if (!url) return;

    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = `
        <svg class="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    `;

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        if (data.success) {
            previewCard.classList.remove('hidden');
            previewCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            alert(data.message || 'Error analyzing link.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to connect to the server.');
    } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = 'Analyze';
    }
});

// Handle Download Button Click
const downloadFileBtn = previewCard.querySelector('button');
downloadFileBtn.addEventListener('click', () => {
    // Direct browser to download endpoint
    window.location.href = '/api/download';
});
