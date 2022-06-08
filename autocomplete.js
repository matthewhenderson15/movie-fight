const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue }) => {
    // Get the root element
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
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

    // As keys are typed call fetchData function
    const onInput = async event => {
        const movies = await fetchData(event.target.value);
        
        if (!movies.length) {
            dropdown.classList.remove('is-active');
            return;
        }

        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active');
        for (let movie of movies) {
            const option = document.createElement('a');

            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(movie);
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(movie);
                onOptionSelect(movie);
            });

            resultsWrapper.appendChild(option);
            
        }
    }

    // Event listener for input HTML field
    input.addEventListener('input', debounce(onInput, 500));

    // Event listener
    document.addEventListener('click', event => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    });
}

