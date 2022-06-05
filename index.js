// Fetch data from OMDB API endpoint
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '59ce4c45',
            s: searchTerm
        }
    }); 
    console.log(response.data);
}

// Get input HTML field
const input = document.querySelector('input');

// Debounce function for widget - makes API call with a specified delay
const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay)
    }
};

// As keys are typed call fetchData function
const onInput = event => {
    fetchData(event.target.value);
}

// Event listener for input HTML field
input.addEventListener('input', debounce(onInput, 500));