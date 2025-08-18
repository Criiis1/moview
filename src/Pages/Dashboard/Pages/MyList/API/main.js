$(document).ready(function () {
  const ApiKey = "?api_key=70871dda752f8e0acafbfa0d04de7939";
  let baseURL = "https://api.themoviedb.org/3/";

  var JsonDB = JSON.parse(localStorage.getItem("FavoritesList"));

  localStorage.getItem("FavoritesList") == `{"results":{}}` || !localStorage.getItem("FavoritesList") ? document.getElementById("text_title_page").innerHTML = `Favorite Content` : document.getElementById("text_title_page").innerHTML = `My list`; 

  for (var count in JsonDB.results) {
    
    var getID = JsonDB.results[count].codigo;
    var getTipo = JsonDB.results[count].tipo;


    fetch(baseURL + `${getTipo}/${getID}` + ApiKey)
      .then(function (response) {
        if (!response.ok) {
          throw new Error(
            "Error Comunication Server! Status" +
              response.status
          );
        } else {
          return response.json();
        }
      })
      .then(function (data) {
        var posterimg = "http://image.tmdb.org/t/p/w300" + data.poster_path;

        displayShow = document.getElementById("show_media");

        if ( data.backdrop_path == null) {
          displayShow.innerHTML += `    
                 <div class="col mt-4 p-2" style='display:none;'>
                    <a href="../../Pages/MediaDetails/index.html?id=${data.id}&type=${JSON.stringify(data.id).length === 6 ? "movie" : "tv" }">
                        <img src="${posterimg}" class="item${data.id}" id="item${data.id}" alt="">
                    </a>
                </div>

            `;
        } else {
          displayShow.innerHTML += `
                <div class="col mt-4 p-2" id="col">
                    <a href="../../Pages/MediaDetails/index.html?id=${data.id}&type=${JSON.stringify(data.id).length === 6 ? "movie" : "tv" }">
                        <img src="${posterimg}" class="item${data.id}" id="item${data.id}" alt="">
                    </a>
                </div>
            `;
        }
      });
  }
});
