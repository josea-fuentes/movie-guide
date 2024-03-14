// Event Listeners
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result =  document.getElementById("result");

// Fetch Data from API 
let getMovie = () => {
    let movieName = movieNameRef.value; 
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`
    //If input field is empty
    if(movieName.length <= 0){ 
        result.innerHTML =  `<h3 class="msg"> Please Enter a Movie Name </h3>`; 
    } 
    // If input field is not empy 
    else { 
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                //if movie exist in database
                if(data.Response == 'True') {
                    result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class ="rating"> 
                                <i class="fa-solid fa-star fa-lg" style="color: #ffb92a;"></i>
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>
                                    ${data.Genre.split(",").join("</div><div>")}
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast: </h3>
                    <p>${data.Actors}</p>
                `
                }
                //If movie does NOT exists in database 
                else {
                    result.innerHTML =
                        `<h3 class="msg">${data.Error}</h3>`
                }
            }) 
            //If error ocurs 
            .catch(() => { 
                result.innerHTML = `<h3 class="msg">Error Ocurred</h3>`
            })
    } 
}; 


// Features
searchBtn.addEventListener("click", getMovie)
window.addEventListener("load", getMovie)



