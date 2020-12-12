const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");



const ui = new UI();


const storage = new Storage();



eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);

    });

    cardbody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);

}
function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === ""){
        
        ui.displayMessages("Fill in all fields ...","danger");

    }
    else {
        
        const newFilm = new Film(title,director,url);

        ui.addFilmToUI(newFilm); 
        storage.addFilmToStorage(newFilm); 

        ui.displayMessages("The movie was successfully added ...","success");


    }


    ui.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}

function deleteFilm(e){

    if (e.target.id === "delete-film") {
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        ui.displayMessages("Deletion is successful ..","success");

    }

}
function clearAllFilms(){

    if (confirm("Are you sure ?")) {
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();

    }
   

}