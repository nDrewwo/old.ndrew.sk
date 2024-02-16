document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    filterQuotes(searchTerm);
  });

  fetch('quotes.json')
    .then(response => response.json())
    .then(data => {
      displayQuotes(data);
      setSearchInputAndQuoteWidth();
    })
    .catch(error => console.error('Error fetching quotes:', error));

  function displayQuotes(quotes) {
    const quoteContainer = document.getElementById('quote-container');
    
    quotes.forEach(quote => {
      const quoteElement = document.createElement('div');
      quoteElement.classList.add('quote');
      
      const quoteText = `"${quote.quote}"<br>- ${quote.author}`;
      
      quoteElement.innerHTML = `<p>${quoteText}</p>`;
      
      quoteElement.addEventListener('click', function () {
        copyToClipboard(quote.quote, quote.author);
      });

      quoteContainer.appendChild(quoteElement);
    });
  }

  function setSearchInputAndQuoteWidth() {
    const quotes = document.querySelectorAll('.quote');
    const vwWidth = 80; 

    quotes.forEach(quote => {
      const quoteWidth = `${vwWidth}vw`;
      quote.style.width = quoteWidth;
    });

    searchInput.style.width = `${vwWidth}vw`;
  }

  function filterQuotes(searchTerm) {
    const quotes = document.querySelectorAll('.quote');

    quotes.forEach(quote => {
      const textContent = quote.textContent.toLowerCase();
      if (textContent.includes(searchTerm)) {
        quote.style.display = 'block';
      } else {
        quote.style.display = 'none';
      }
    });
  }

  function copyToClipboard(quote, author) {
    const formattedQuote = `"${quote}"\n- ${author}`;
    const textarea = document.createElement('textarea');
    textarea.value = formattedQuote;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
});
