const url = 'http://localhost:3000/api/genres';

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let genres = data;
    console.log(genres);
  })
  .catch(function(error) {
    console.log(error);
  });

