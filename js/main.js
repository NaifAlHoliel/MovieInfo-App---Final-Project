function scrollFooter(scrollY, heightFooter)
{
    console.log(scrollY);
    console.log(heightFooter);

    if(scrollY >= heightFooter)
    {
        $('footer').css({
            'bottom' : '0px'
        });
    }
    else
    {
        $('footer').css({
            'bottom' : '-' + heightFooter + 'px'
        });
    }
}

$(window).load(function(){
    var windowHeight        = $(window).height(),
        footerHeight        = $('footer').height(),
        heightDocument      = (windowHeight) + ($('.content1').height()) + ($('footer').height()) - 20;

    // Definindo o tamanho do elemento pra animar
    $('#scroll-animate, #scroll-animate-main').css({
        'height' :  heightDocument + 'px'
    });

    // Definindo o tamanho dos elementos header e conteúdo
    $('header').css({
        'height' : windowHeight + 'px',
        'line-height' : windowHeight + 'px'
    });

    $('.wrapper-parallax').css({
        'margin-top' : windowHeight + 'px'
    });

    scrollFooter(window.scrollY, footerHeight);

    // ao dar rolagem
    window.onscroll = function(){
        var scroll = window.scrollY;

        $('#scroll-animate-main').css({
            'top' : '-' + scroll + 'px'
        });

        $('header').css({
            'background-position-y' : 50 - (scroll * 100 / heightDocument) + '%'
        });

        scrollFooter(scroll, footerHeight);
    }
});
$(document).ready(function (){
$("#searchForm").on("submit" , function (e) {
  let searchText = $("#searchText").val();
  getMovies(searchText);
  e.preventDefault();
})
});

function getMovies(searchText) {
  axios.get("http://www.omdbapi.com/?apikey=c9a1b5bd&s="+searchText)

    .then(function (response) {
      let movies = response.data.Search ;
      let output = "";

      $.each(movies , (index , movie) => {
      output +=`
<div class = "col-lg-3">
<div class = "well text-center">

<img src ="${movie.Poster}" class ="img-thumbnail"/>
<h5>${movie.Title}</h5>
<a class ="btn btn-primary" onClick="selectedMovie('${movie.imdbID}')" href"#">Movie Details </a>
</div>
</div>

`;
$("#movies").html(output);
});
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}





function selectedMovie(id) {
sessionStorage.setItem("movieId", id);
window.location = "moviedetails.html"
return false;
}

function getMovieDetails() {
  let id = sessionStorage.getItem("movieId");
  axios.get("http://www.omdbapi.com/?apikey=c9a1b5bd&i="+id)
  .then(function (response) {
    // handle success
let details = response.data ;

let output = "";
output = `<div class = "row">
          <div class= "col-md-4">
          <img src ="${details.Poster}" class ="img-thumbnail"/>

          </div>
          <div class ="col-md-8">
      <h3>${details.Title}</h3>
<ul class="list-group">
<li class="list-group-item"><strong>Genre : </strong>${details.Released}</li>
<li class="list-group-item"><strong>Released :</strong>${details.Released}</li>
<li class="list-group-item"><strong>Actors :</strong>${details.Actors}</li>
<li class="list-group-item"><strong>Writer :</strong>${details.Writer}</li>
<li class="list-group-item"><strong>Director :</strong>${details.Director}</li>
<li class="list-group-item"><strong>imdbVotes :</strong>${details.imdbVotes}</li>
<li class="list-group-item"><strong>Production :</strong>${details.Production}</li>

</ul>
</div>
  </div>

          <div class="row well">
          <h3>Plot :</h3>
          ${details.Plot}
          </hr>
<a class ="btn btn-primary"href="http://www.imdb.com/title/${details.imdbID}"target="_blank">IMDB</a>
  <a class ="btn btn-default" href="index.html">BACK TO HOME </a>
          </div>`;

          $("#moviedetails").html(output);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })


}
