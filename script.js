let btnXHR = document.getElementById('xhrSearch');
let btnFetch = document.getElementById('fetchSearch');
let btnAsync = document.getElementById('AsyncAwaitSearch');

let searchQuere = document.getElementById("query");
let searchResults = document.getElementById("results");


var url = "https://api.giphy.com/v1/gifs/search";
var apiKey = "AJx0HckardmE9BtXjn6pUZvFrGbxrb2a"

btnXHR.addEventListener("click", function () {
    // clear previous search results
    searchResults.innerHTML = "";
    fetchGiphyAPI_UsingXHR(searchQuere.value);
});

btnFetch.addEventListener("click", function () {
    searchResults.innerHTML = "";
    fetchGiphyAPI_UsingFetch(searchQuere.value);
});

btnAsync .addEventListener("click", function (){
    // clear previous search results
    searchResults.innerHTML = "";
    fetchGiphyAPI_UsingFetchAsyncAwait(searchQuere.value)
    .catch((e) => {
        console.error(e);
    });
});

function fetchGiphyAPI_UsingXHR(query) {
    if (!query || query.trim().length == 0) {
        return;
    }
    var xhr = new XMLHttpRequest();
    var params = "api_key=" + apiKey + "&limit=5&rating=g&q=" +encodeURIComponent(query);
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            processResponse(JSON.parse(this.responseText));
        }
    });
    xhr.open("GET", url + "?" + params);
    xhr.send();

}


function fetchGiphyAPI_UsingFetch(query) {
    if (!query || query.trim().length == 0) {
        return;
    }
    var params = "api_key=" + apiKey + "&limit=5&rating=g&q=" +encodeURIComponent(query);
    var requestOptions = {
        method: 'GET'
    };
    fetch(url + "?" + params, requestOptions)
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            processResponse(JSON.parse(data))
        })
        .catch((e) => {
            console.error(e);
        })
}



async function fetchGiphyAPI_UsingFetchAsyncAwait(query) {
    if (!query || query.trim().length == 0) {
        return;
    }
    var params = "api_key=" + apiKey + "&limit=5&rating=g&q=" +encodeURIComponent(query);
    var requestOptions = {
        method: 'GET'
    };
    
    const response = await fetch(url + "?" + params, requestOptions); // Wait until the request completes.
    const data = await response.json(); // waits until the response completes
    processResponse(data);
}


function processResponse(resp) {
    for (item of resp.data) {
        let imgElement = document.createElement("img");
        imgElement.src = item.images.downsized_medium.url;
        imgElement.alt = item.title;
        searchResults.appendChild(imgElement);
    }
}