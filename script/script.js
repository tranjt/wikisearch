const searchResultList = document.getElementById('searchResult');
const searchDatalist = document.getElementById('searchDatalist');
const searchButton = document.querySelector('#searchButton');
const searchInput = document.querySelector('#searchInput');		
const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&redirects=1&exsentences=1&exlimit=max&exintro=1&explaintext=1&gsrlimit=10&origin=*&gsrsearch=";

//Display search result from data fetch.
function displaySearchResult(data) {
	const pages = data.query.pages;

	//Create new li for each search item found.
	const searchResultHtml = Object.keys(pages).map( function(key){
		const { title, extract } = pages[key];

		return html = `
			<li>
				<a href="https://en.wikipedia.org/wiki/${title}">
					<div class="resultItem">						
						<h1> ${title} </h1> <br>
						${extract} 
					
					</div>
				</a>
			</li>
			`;
	});		
	//Put all li search result item in ul list.
	searchResultList.innerHTML = searchResultHtml.join("");		
};

//Display search result from data fetch as input field autocomplete.
function displayAutocomplete(data) {	
	const pages = data.query.pages;
	
	//Create a datalist option for each search item found.
	const searchResultHtml = Object.keys(pages).map( function(key){
		const { title } = pages[key];
		return html = ` <option value="${title}">${title}</option> `;
	});	
	//Put all datalist option search result item in input datalist.	
	searchDatalist.innerHTML = searchResultHtml.join("");
}


//Create a fetch function using chosen url and callback function for ajax call.
const fetchData = function(urlString, displayFunction) {
	return function() {		
		fetch(urlString +  searchInput.value)			
		.then(resp => resp.json())
		.then(displayFunction) 
		.catch(err => console.log(JSON.stringify(err)));
	}
}

//Do search if enter key is press
function doSearch(event){	
	//If enter key is pressed do search on current input value deselect input box after	
	if (event.keyCode === 13){
		fetchData(url, displaySearchResult).bind(this)();	
		searchInput.blur();
	}
}

//Hook up listeners for input box search button and handle enter key.
searchButton.addEventListener('click', fetchData(url, displaySearchResult));
searchInput.addEventListener('keyup', fetchData(url, displayAutocomplete));
window.addEventListener('keydown', doSearch);