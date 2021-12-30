const quoteContainer = document.getElementById('quote-conteiner');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

//Show new Quote
function newQuote() {
	//Generate new quote
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	//Check if there's an author 
	if (!quote.author) {
		authorText.textContent = 'Unknown';
	} else {
		authorText.textContent = quote.author;
	};
	//Check quote lenght to determine styling
	if (quote.text.length > 120) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	};
	//Show quote
	quoteText.textContent = quote.text;
};

async function getQuotes() {
	const apiUrl = 'https://type.fit/api/quotes';
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		alert('Oooops, something went wrong');
	};
};

//Tweet quote
function tweetQuote() {
	const twitterUrl = `
	https://twitter.com/intent/tweet?text=${quoteText.textContent} — ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
};

//Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();