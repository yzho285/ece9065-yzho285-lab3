function SearchByartistID(){
    let artistID = document.getElementById("searchartdetailbyartid").value;
    const url = `/api/raw_artists/${artistID}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let result = data;
        console.log(result);
        let text = 'ArtistID:'+result.artist_id+'artist_active_year_begin:'+result.artist_active_year_begin+'artist_handle:'+result.artist_handle
        +'artist_longitude:'+result.artist_longitude+'artist_members:'+result.artist_members+'artist_name:'+result.artist_name+'artist_related_projects:'
        +result.artist_related_projects;
        const getPos = document.getElementById("searchartdetailbytrackid");
        const addDiv = document.createElement('div');
        addDiv.id = "Div1";
        textnode = document.createTextNode(text);
        addDiv.appendChild(textnode);
        document.body.insertBefore(addDiv,getPos);
      })
      .catch(function(error) {
        console.log(error);
      });
    
}


