// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the search button and input field
    const searchBtn = document.getElementById('searchBtn');
    const searchField = document.getElementById('searchField');
    const resultDiv = document.getElementById('result');
    
    // Function to sanitize user input
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
    
    // Function to perform the search
    function performSearch() {
        // Get and sanitize the search query
        const query = sanitizeInput(searchField.value.trim());
        
        // Build the URL with query parameter if query exists
        const url = query ? `superheroes.php?query=${encodeURIComponent(query)}` : 'superheroes.php';
        
        // Make an AJAX request using fetch API
        fetch(url)
            .then(response => response.text())
            .then(data => {
                // Display the result in the result div
                resultDiv.innerHTML = data;
            })
            .catch(error => {
                resultDiv.innerHTML = '<p class="error">Error fetching superheroes: ' + error + '</p>';
            });
    }
    
    // Add click event listener to the button
    searchBtn.addEventListener('click', performSearch);
    
    // Add keypress event listener to search field (Enter key)
    searchField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});

