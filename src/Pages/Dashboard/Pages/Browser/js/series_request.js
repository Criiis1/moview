$(document).ready(function () {
                
    const urlParams = new URLSearchParams(window.location.search);
    
    var page = urlParams.get('page');
    var query  = urlParams.get('query');

    const ApiKey = '?api_key=70871dda752f8e0acafbfa0d04de7939'
    let baseURL = 'https://api.themoviedb.org/3/'

        fetch(baseURL + 'search/tv' + ApiKey +'&query=' + query)
        .then(function(response){
            if (!response.ok) {
                throw new Error(
                    "Error Comunication Server! Status" + 
                    response.status
            )}else{
                return response.json();
            }   
    })
        .then(function (data) {
           
              localStorage.setItem('resultsTv',data.results.length)

               var tvTot = localStorage.getItem("resultsTv");
               var movTot = localStorage.getItem("resultsMov");
         
               document.title = `${
                 Number(tvTot) + Number(movTot)
               } resultados encontrados`;

                if(data.total_results == 0){
                    $('.title_first_row').html(`<h2 style='color:#FFF'>Content: '${query}' not found!</h2>`);
                }

                rowtvFind = document.getElementById('row01_tv_popular')

                for(let i = 2; i < data.results.length ; i++){
                    
                    var posterimg = 'http://image.tmdb.org/t/p/w300' + data.results[i].poster_path
                    //var posterimg = `http://image.tmdb.org/t/p/original${data.results[i].backdrop_path}` 

                    rowtvFind.innerHTML +=  
                        `
                        <li>
                            <a href="../../Pages/MediaDetails/index.html?id=${data.results[i].id}&type=tv&page=details">
                                <img src="${posterimg}" id="item0${i}" alt="">
                            </a>
                        </li>
                        `  
                        
                
            }
                
    
    
        })
    
    });