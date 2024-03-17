const feedbackForm = document.getElementById('feedbackForm');
const thankYouMessage = document.getElementById('thankYouMessage');

feedbackForm.addEventListener('submit', (e) => {
	e.preventDefault();
	thankYouMessage.classList.remove('hidden');
});