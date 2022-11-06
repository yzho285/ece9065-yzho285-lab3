const express = require('express');
const app = express();
const port = 3000;

const fs = require("fs");
const csvParser = require("csv-parser");
const path = require("path");
const { check, validationResult } = require("express-validator");

var flatCache = require('flat-cache');
//var cache = flatCache.load('cacheId');


let genres = [];
let raw_albums = [];
let raw_artists = [];
let raw_tracks = [];

/*
fs.createReadStream("C:/yijie/ECE9065/lab3-resource/lab3-data/lab3-data/genres.csv")
  .pipe(csvParser())
  .on("data", (data) => {
    genres.push(data);
  })
  .on("end", () => {
    //console.log(genres);
    var cache = flatCache.load('genre', path.resolve('./flat-cache'));
    for(i=0;i<genres.length;i++){
        genreKey='genres'+genres[i].genre_id;
        cache.setKey(genreKey,genres[i]);
        cache.save(true);
    }
  });

fs.createReadStream("C:/yijie/ECE9065/lab3-resource/lab3-data/lab3-data/raw_albums.csv")
  .pipe(csvParser())
  .on("data", (data) => {
    raw_albums.push(data);
  })
  .on("end", () => {
    //console.log(raw_albums);
    var cache = flatCache.load('albums', path.resolve('./flat-cache'));
    for(i=0;i<raw_albums.length;i++){
        albumKey='albums'+raw_albums[i].album_id;
        cache.setKey(albumKey,raw_albums[i]);
        cache.save(true);
    }
  });

fs.createReadStream("C:/yijie/ECE9065/lab3-resource/lab3-data/lab3-data/raw_artists.csv")
  .pipe(csvParser())
  .on("data", (data) => {
    raw_artists.push(data);
  })
  .on("end", () => {
    //console.log(raw_artists);
    var cache = flatCache.load('artists', path.resolve('./flat-cache'));
    for(i=0;i<raw_artists.length;i++){
        artistKey='artists'+raw_artists[i].artist_id;
        cache.setKey(artistKey,raw_artists[i]);
        cache.save(true);
    }
  });

fs.createReadStream("C:/yijie/ECE9065/lab3-resource/lab3-data/lab3-data/raw_tracks.csv")
  .pipe(csvParser())
  .on("data", (data) => {
    raw_tracks.push(data);
  })
  .on("end", () => {
    //console.log(raw_tracks);
    var cache = flatCache.load('tracks', path.resolve('./flat-cache'));
    for(i=0;i<raw_tracks.length;i++){
        trackKey='tracks'+raw_tracks[i].track_id;
        cache.setKey(trackKey,raw_tracks[i]);
        cache.save(true);
    }
  });
*/
var cache = flatCache.load('genre', path.resolve('./flat-cache'));
let genres_temp = cache.all();
let genres_key = Object.keys(genres_temp);
for(i=0;i<Object.keys(genres_key).length;i++){
    let tempindex = genres_key[i];
    genres.push(genres_temp[tempindex]);
}

var cache = flatCache.load('albums', path.resolve('./flat-cache'));
let albums_temp = cache.all();
let albums_key = Object.keys(albums_temp);
for(i=0;i<Object.keys(albums_key).length;i++){
    let tempindex = albums_key[i];
    raw_albums.push(albums_temp[tempindex]);
}

var cache = flatCache.load('artists', path.resolve('./flat-cache'));
let artists_temp = cache.all();
let artist_key = Object.keys(artists_temp);
for(i=0;i<Object.keys(artist_key).length;i++){
    let tempindex = artist_key[i];
    raw_artists.push(artists_temp[tempindex]);
}

var cache = flatCache.load('tracks', path.resolve('./flat-cache'));
let tracks_temp = cache.all();
let track_key = Object.keys(tracks_temp);
for(i=0;i<Object.keys(track_key).length;i++){
    let tempindex = track_key[i];
    raw_tracks.push(tracks_temp[tempindex]);
}

/*
let track_list = [{"tracklistname":"tracklistname","trackids":"trackids"}];
var cache = flatCache.load('tracklist', path.resolve('./flat-cache'));
for(i=0;i<track_list.length;i++){
    trackKey='trackslist'+track_list[i].tracklistname;
    cache.setKey(trackKey,track_list[i]);
    cache.save(true);
}
*/

let track_list = [];
let track_list_name = [];

var cache = flatCache.load('tracklist', path.resolve('./flat-cache'));
let tracklist_temp = cache.all();
let tracklist_key = Object.keys(tracklist_temp);
for(i=0;i<Object.keys(tracklist_key).length;i++){
    let tempindex = tracklist_key[i];
    track_list.push(tracklist_temp[tempindex]);
    track_list_name.push(tracklist_temp[tempindex].tracklistname);
}
//console.log(track_list);
//console.log(track_list_name);



app.use('/', express.static('static'));

app.use(express.json());

app.get('/api/genres', (req, res) => {
    //console.log(`GET request for ${req.url}`)
    res.send(genres);
});

app.get('/api/raw_albums', (req, res) => {
    //console.log(`GET request for ${req.url}`)
    res.send(raw_albums);
});

app.get('/api/raw_artists', (req, res) => {
    //console.log(`GET request for ${req.url}`)
    res.send(raw_artists);
});

app.get('/api/raw_artists/:artist_id', check('artist_id').isNumeric().trim().escape(),(req, res) => {
    const artist_id = req.params.artist_id;
    const artist_details = raw_artists.find(p => p.artist_id === artist_id);
    if (artist_details) {
        res.send(artist_details);
    }
    else {
        res.status(404).send(`Artist ${artist_id} does not exist.`);
    }
});

app.get('/api/raw_tracks/searchbyartistname/:artist_name', check('artist_name').trim().escape(),(req, res) => {
    const artist_name = req.params.artist_name;
    const artistid_artistname = [];
    let j=0;
    for(i in raw_artists){
        if (raw_artists[i].artist_name.toLowerCase().includes(artist_name.toLowerCase())){
            let temp = {"artist_id":raw_artists[i].artist_id,"artist_name":raw_artists[i].artist_name};
            artistid_artistname.push(temp);
            j++;
        }
    }
    if (artistid_artistname[0]!=null) {
        res.send(artistid_artistname);
    }
    else {
        res.status(404).send(`Artist name ${artist_name} does not exist.`)
    }
});

app.get('/api/raw_tracks', (req, res) => {
    //console.log(`GET request for ${req.url}`)
    res.send(raw_tracks);
});

app.get('/api/raw_tracks/:track_id', check('track_id').isNumeric().trim().escape(),(req, res) => {
    const track_id = req.params.track_id;
    const track_details = raw_tracks.find(p => p.track_id === track_id);
    if (track_details) {
        res.send(track_details);
    }
    else {
        res.status(404).send(`Track ${track_id} does not exist.`);
    }
});

app.get('/api/track_list/:track_listname', check('track_listname').trim().escape(),(req, res) => {
    const track_listname = req.params.track_listname;
    const track_list_details = track_list.find(p => p.tracklistname === track_listname);
    if (track_list_details) {
        res.send(track_list_details);
    }
    else {
        res.status(404).send(`Tracklist ${track_listname} does not exist.`);
    }
});

app.get('/api/raw_tracks/searchbyalbumtitle/:album_track_title', check('album_track_title').trim().escape(),(req, res) => {
    const album_track_title = req.params.album_track_title;
    let trackid_album_track_title = [];
    let j = 0;
    for(i in raw_tracks){
        if ((raw_tracks[i].album_title.toLowerCase().includes(album_track_title.toLowerCase()) || raw_tracks[i].track_title.toLowerCase().includes(album_track_title.toLowerCase())) && j<5){
            let temp = {"track_id":raw_tracks[i].track_id,"track_title":raw_tracks[i].track_title,"album_title":raw_tracks[i].album_title};
            trackid_album_track_title.push(temp);
            j++;
        }
    }
    if (trackid_album_track_title[0]!=null) {
        res.send(trackid_album_track_title);
    }
    else {
        res.status(404).send(`Album/track ${album_track_title} does not exist.`)
    }
});

app.get('/api/track_list_overview', (req, res) => {
    //console.log(track_list);
    let track_list_details = [];
    for(i=0;i<Object.keys(track_list).length;i++){
        let track_list_ids = track_list[i].trackids.split(",");
        let numberOftracks = track_list_ids.length;
        console.log(numberOftracks);
        let totalmin = 0;
        let totalsec = 0;
        for(j=0;j<numberOftracks;j++){
            let temptimeindex = raw_tracks.findIndex(p => p.track_id === track_list_ids[j]);
            if(temptimeindex==-1){
                totalmin = 0;
                totalsec = 0;
                numberOftracks = 0;
            }
            else{
                let timetemp = raw_tracks[temptimeindex].track_duration;
                let tempmin = parseInt(timetemp.split(":")[0]);
                let tempsec = parseInt(timetemp.split(":")[1]);
                totalmin = totalmin + tempmin;
                totalsec = totalsec + tempsec;
            }
            
        }
        let sec = totalsec%60;
        let min = (totalmin+parseInt(totalsec/60))%60;
        let hour = parseInt((totalmin+parseInt(totalsec/60))/60);
        if(hour==0){
            track_duration_temp = min+":"+sec;
        }
        else{
            track_duration_temp = hour+":"+min+":"+sec;
        }
        let track_list_detail_temp = {"tracklistname":track_list[i].tracklistname,"numberOftracks":numberOftracks,"timeduration":track_duration_temp};
        track_list_details.push(track_list_detail_temp);
    }
    res.send(track_list_details);
});

app.get('/api/raw_tracks/searchbyartisttrackalbum/:name', check('name').trim().escape(),(req, res) => {
    const name = req.params.name;
    let results = [];
    let j = 0;
    for(i in raw_tracks){
        if (raw_tracks[i].album_title.toLowerCase().includes(name.toLowerCase()) || raw_tracks[i].track_title.toLowerCase().includes(name.toLowerCase()) || raw_tracks[i].artist_name.toLowerCase().includes(name.toLowerCase())){
            let temp = raw_tracks[i];
            results.push(temp);
            j++;
        }
    }
    if (results[0]!=null) {
        res.send(results);
    }
    else {
        res.status(404).send(`Album/track ${name} does not exist.`)
    }
});

app.get('/api/track_list_details/:listname', check('listname').trim().escape(),(req, res) => {
    let listname = req.params.listname;
    let track_list_details = [];
    if(track_list_name.indexOf(listname)!=-1){
        const track_list_ids = track_list.find(p => p.tracklistname === listname).trackids.split(",");
        for(i=0;i<track_list_ids.length;i++){
            let track_details_temp = raw_tracks.find(p => p.track_id === track_list_ids[i]);
            track_list_details.push(track_details_temp);
        }
        res.send(track_list_details);
    }
    else{
        res.status(404).send(`${listname} dose not exists.`)
    }
    

});

app.put('/api/createtracklist/:tracklistname', check('tracklistname').trim().escape(),(req, res) => {
    const newtracklist = req.body;
    const newtracklistname = req.params.tracklistname;
    //console.log(newtracklist);
    //console.log(track_list_name);
    if(track_list_name.includes(newtracklistname)){
        res.status(404).send(`${newtracklistname} exists`);
    }
    else{
        track_list.push(newtracklist);
        track_list_name.push(newtracklist.tracklistname);
        var cache = flatCache.load('tracklist', path.resolve('./flat-cache'));
        let trackKey='trackslist'+newtracklist.tracklistname;
        cache.setKey(trackKey,newtracklist);
        cache.save(true);
        console.log(track_list);
        console.log(track_list_name);
        res.send(track_list);
    }
});

app.post('/api/savetrackid/:tracklistname', check('tracklistname').trim().escape(),(req, res) => {
    const newtracklistid = req.body;
    const tracklistname = req.params.tracklistname;
    const trackids = req.body.trackids;
    console.log(track_list);
    console.log(newtracklistid);
    console.log(trackids);
    const trackindex = track_list.findIndex(p => p.tracklistname === tracklistname);
    if(trackindex<0){
        res.status(404).send(`${tracklistname} doesn't exist`);
    }
    else{
        track_list[trackindex].trackids = newtracklistid.trackids;
        var cache = flatCache.load('tracklist', path.resolve('./flat-cache'));
        let trackKey='trackslist'+newtracklistid.tracklistname;
        cache.setKey(trackKey,newtracklistid);
        cache.save(true);
        console.log(track_list);
        console.log(track_list_name);
        res.send(track_list);
    }
});

app.delete('/api/deletetracklist/:tracklistname', check('tracklistname').trim().escape(),(req, res) => {
    const tracklistname = req.params.tracklistname;
    const trackindex = track_list.findIndex(p => p.tracklistname === tracklistname);
    const tracknameindex = track_list_name.findIndex(p => p === tracklistname);
    //console.log(track_list_name);
    if(trackindex<0){
        res.status(404).send(`${tracklistname} doesn't exist`);
    }
    else{
        track_list.splice(trackindex,1);
        track_list_name.splice(tracknameindex,1)
        var cache = flatCache.load('tracklist', path.resolve('./flat-cache'));
        let trackKey='trackslist'+tracklistname;
        cache.removeKey(trackKey);
        cache.save(true);
        //console.log(track_list);
        //console.log(track_list_name);
        res.send(track_list);
    }
});

app.listen(port, () => {
    //console.log(`Listening on port ${port}`);
});


