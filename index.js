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

// Get input HTML field
const input = document.querySelector('input');

// As keys are typed call fetchData function
const onInput = async event => {
    const movies = await fetchData(event.target.value);
    
    for (let movie of movies) {
        const div = document.createElement('div');

        div.innerHTML = `
            <img src="${movie.Poster}" />
            <h1>${movie.Title}</h1>
        `;

        document.querySelector('#target').appendChild(div);
        
    }
}

// Event listener for input HTML field
input.addEventListener('input', debounce(onInput, 500));