let quotesData;

async function fetchQuotes() {
	try {
		const response = await $.ajax({
			url: "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
			headers: {
				Accept: "application/json",
			},
		});

		quotesData =
			typeof response === "string" ? JSON.parse(response) : response;
	} catch (error) {
		throw error;
	}
}

function getRandomQuote(quotes) {
	const randomIndex = Math.floor(Math.random() * quotes.length);
	return quotes[randomIndex];
}

function updateTweetLink(quote, author) {
	const tweetLink = `https://twitter.com/intent/tweet?text="${encodeURIComponent(
		quote
	)}" - ${encodeURIComponent(author)}`;
	$("#tweet-quote").attr("href", tweetLink);
}

function animateQuote(quote, author) {
	$("#text, #author").animate({ opacity: 0 }, 500, function () {
		$(this).animate({ opacity: 1 }, 500);
		$("#text").text(quote);
		$("#author").text(author);
	});
}

function generateRandomQuote(quotes) {
	const randomQuote = getRandomQuote(quotes);
	const quote = randomQuote.quote;
	const author = randomQuote.author;

	updateTweetLink(quote, author);
	animateQuote(quote, author);
}

$(document).ready(() => {
	fetchQuotes().then(() => {
		generateRandomQuote(quotesData.quotes);
	});

	$("#new-quote").on("click", () => generateRandomQuote(quotesData.quotes));
});
