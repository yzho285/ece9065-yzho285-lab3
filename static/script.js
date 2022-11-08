function GetGenreDetails(){
    const url = `/api/genres`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) =>{
            let result = data;
            for(i=0;i<result.length;i++){
                text =  "genre names:" + result[i].title + "genre ID:" + result[i].genre_id + "parents ID" + result[i].parent;
                const getPos = document.getElementById("searchartdetailbyartid");
                const addDiv = document.createElement('div');
                const br = document.createElement('br');
                textnode = document.createTextNode(text);
                addDiv.appendChild(textnode);
                addDiv.appendChild(br);
                document.body.insertBefore(addDiv,getPos);
            } 
        })
}

function SearchByartistID(){
    let artistID = document.getElementById("searchartdetailbyartid").value;
    isnumber = isNaN(artistID);
    if(isnumber){
        alert("input should be number");
    }
    else{
        const url = `/api/raw_artists/${artistID}`;
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let result = data;
            //console.log(result);
            let text = 'ArtistID:'+result.artist_id+'artist_active_year_begin:'+result.artist_active_year_begin+'artist_handle:'+result.artist_handle
            +'artist_longitude:'+result.artist_longitude+'artist_members:'+result.artist_members+'artist_name:'+result.artist_name+'artist_related_projects:'
            +result.artist_related_projects;
            const getPos = document.getElementById("searchartdetailbytrackid");
            const addDiv = document.createElement('div');
            textnode = document.createTextNode(text);
            addDiv.appendChild(textnode);
            document.body.insertBefore(addDiv,getPos);
        })
        .catch(function(error) {
            //console.log(error);
            alert(`${artistID} doen not exists.`)
        });
    }
}

function SearchBytrackID(){
    let trackID = document.getElementById("searchartdetailbytrackid").value;
    isnumber = isNaN(trackID);
    if(isnumber){
        alert("input should be number");
    }
    else{
        const url = `/api/raw_tracks/${trackID}`;
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let result = data;
            console.log(result);
            let text = 'album_id:'+result.album_id+'album_title:'+result.album_title+'artist_id:'+result.artist_id
            +'artist_name:'+result.artist_name+'tags:'+result.tags+'track_date_created:'+result.track_date_created+'track_date_recorded:'
            +result.track_date_recorded+'track_duration:'+result.track_duration+'track_genres:'+result.track_genres+'track_number:'+result.track_number
            +'track_title:'+result.track_title;
            const getPos = document.getElementById("searchtrackIDbytracktitlealbum");
            const addDiv = document.createElement('div');
            textnode = document.createTextNode(text);
            addDiv.appendChild(textnode);
            document.body.insertBefore(addDiv,getPos);
        })
        .catch(function(error) {
            console.log(error);
            alert("Track id does not exist");
        });
    }
}

function SearchBytracktitlealbum(){
    let track_album = document.getElementById("searchtrackIDbytracktitlealbum").value;
    const url = `/api/raw_tracks/searchbyalbumtitle/${track_album}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let result = data;
        console.log(result);
        for(i=0;i<result.length;i++){
            text =  "TrackID:"+result[i].track_id+"track title:"+result[i].track_title+"album title:"+result[i].album_title;
            const getPos = document.getElementById("searchartistIDbyartistname");
            const addDiv = document.createElement('div');
            const br = document.createElement('br');
            textnode = document.createTextNode(text);
            addDiv.appendChild(textnode);
            addDiv.appendChild(br);
            document.body.insertBefore(addDiv,getPos);
        } 
      })
      .catch(function(error) {
        console.log(error);
      });
}

function SearchByartistname(){
    let artist_name = document.getElementById("searchartistIDbyartistname").value;
    const url = `/api/raw_tracks/searchbyartistname/${artist_name}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let result = data;
        console.log(result);
        for(i=0;i<result.length;i++){
            text =  "artist name:"+result[i].artist_name+"artist id:"+result[i].artist_id;
            const getPos = document.getElementById("createnewtracklist");
            const addDiv = document.createElement('div');
            const br = document.createElement('br');
            textnode = document.createTextNode(text);
            addDiv.appendChild(textnode);
            addDiv.appendChild(br);
            document.body.insertBefore(addDiv,getPos);
        } 
      })
      .catch(function(error) {
        console.log(error);
      });
}

function CreateNewTrackList(){
    let new_track_name = document.getElementById("createnewtracklist").value;
    const url = `/api/createtracklist/${new_track_name}`;
    fetch(url,{
        method:"PUT",
        body: JSON.stringify({
            tracklistname:new_track_name,
            trackids:"",
        }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
         }
    })
    .then((response) => {
        return response.json();
      })
      .then((data) => {
        let result = data;
        //console.log(result);
        alert("create succeeded.")
      })
      .catch(function(error) {
        //console.log(error);
        alert("List already exists.");
      });
}

function SaveTrackID(){
    let track_name = document.getElementById("savetrackidlist").value;
    let track_ids = document.getElementById("savetrackid").value;
    let track_ids_array = track_ids.split(",");
    let isvalid = true;
    for(i=0;i<track_ids_array.length;i++){
        if(isNaN(track_ids_array[i])){
            alert("Input should only include number and `,`");
            isvalid = false;
            break;
        }
    }
    if(isvalid){
        const url = `/api/savetrackid/${track_name}`;
        fetch(url,{
            method:"POST",
            body: JSON.stringify({
                tracklistname:track_name,
                trackids:track_ids,
            }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let result = data;
            console.log(result);
            alert("Save succeeded.")
        })
        .catch(function(error) {
            //console.log(error);
            alert("tracklists doesn't exists.");
        });
    }
}

function SearchByTracklistname(){
    let tracklist_name = document.getElementById("searchtracklistidbyname").value;
    const url = `/api/track_list/${tracklist_name}`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) =>{
            let result = data;
            console.log(result.trackids);
            text =  "TrackIDs:" + result.trackids;
            const getPos = document.getElementById("deletetracklistidbyname");
            const addDiv = document.createElement('div');
            const br = document.createElement('br');
            textnode = document.createTextNode(text);
            addDiv.appendChild(textnode);
            addDiv.appendChild(br);
            document.body.insertBefore(addDiv,getPos);
        })
        .catch(function(error) {
            //console.log(error);
            alert("List name doesn't exists.");
          });
}

function DeleteByTracklistname(){
    let tracklist_name = document.getElementById("deletetracklistidbyname").value;
    const url = `/api/deletetracklist/${tracklist_name}`;
    fetch(url,{
        method:"DELETE",
    })
    .then((response) => {
        return response.json();
      })
      .then((data) => {
        let result = data;
        console.log(result);
        alert("Delete succeeded.")
      })
      .catch(function(error) {
        //console.log(error);
        alert("tracklist name doesn't exists.");
      });
}

function GetTrackListOverview(){
    const url = `/api/track_list_overview`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) =>{
            let result = data;
            for(i=0;i<result.length;i++){
                text =  "Tracklist name:" + result[i].tracklistname + "numberOftracks:" + result[i].numberOftracks + "timeduration:" + result[i].timeduration;
                const getPos = document.getElementById("getdetailsbyartistnametrackalbumtitle");
                const addDiv = document.createElement('div');
                const br = document.createElement('br');
                textnode = document.createTextNode(text);
                addDiv.appendChild(textnode);
                addDiv.appendChild(br);
                document.body.insertBefore(addDiv,getPos);
            } 
        })
}

function Getdetailsbyartistnametrackalbumtitle(){
    const name = document.getElementById("getdetailsbyartistnametrackalbumtitle").value;
    const sort = document.getElementById("sort1").value;
    const url = `/api/raw_tracks/searchbyartisttrackalbum/${name}`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) =>{
            let result = data;
            function compare(p){
                return function(m,n){
                    var a = m[p];
                    var b = n[p];
                    return a-b;
                }
            }
            result.sort(compare(sort));
            for(i=0;i<result.length;i++){
                text =  JSON.stringify(result[i]);
                const getPos = document.getElementById("getlistdetails");
                const addDiv = document.createElement('div');
                const br = document.createElement('br');
                textnode = document.createTextNode(text);
                addDiv.appendChild(textnode);
                addDiv.appendChild(br);
                document.body.insertBefore(addDiv,getPos);
            } 
        })
        .catch(function(error) {
            //console.log(error);
            alert("Name doesn't exists.");
          });
}

function Getlistdetails(){
    const listname = document.getElementById("getlistdetails").value;
    const sort = document.getElementById("sort2").value;
    const url = `/api/track_list_details/${listname}`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) =>{
            let result = data;
            function compare(p){
                return function(m,n){
                    var a = m[p];
                    var b = n[p];
                    return a-b;
                }
            }
            result.sort(compare(sort));
            for(i=0;i<result.length;i++){
                text =  "Artist name:" + result[i].artist_name + "Track title:" + result[i].track_title + "Album title:" + result[i].album_title + "Play time:" + result[i].track_duration;
                const getPos = document.getElementById("end");
                const addDiv = document.createElement('div');
                const br = document.createElement('br');
                textnode = document.createTextNode(text);
                addDiv.appendChild(textnode);
                addDiv.appendChild(br);
                document.body.insertBefore(addDiv,getPos);
            } 
        })
        .catch(function(error) {
            //console.log(error);
            alert("list name doesn't exists.");
          });
}