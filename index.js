// Fetch data from OMDB API endpoint
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '59ce4c45',
            s: searchTerm
        }
    }); 

    if (response.data.Error) {
        return [];
    }

    return response.data.Search;
}

// Get the root element
const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

// Get input HTML field
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

// As keys are typed call fetchData function
const onInput = async event => {
    const movies = await fetchData(event.target.value);
    
    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const option = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

        option.classList.add('dropdown-item');
        option.innerHTML = `
            <img src="${imgSrc}" />
            ${movie.Title}
        `;

        resultsWrapper.appendChild(option);
        
    }
}

// Event listener for input HTML field
input.addEventListener('input', debounce(onInput, 500));