const express = require('express');
const app = express();
const port = 3000;

const fs = require("fs");
const csvParser = require("csv-parser");
//const { raw } = require('body-parser');
const path = require("path")

var flatCache = require('flat-cache');
const { raw } = require('express');
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






app.use('/', express.static('static'));

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

app.get('/api/raw_artists/:artist_id', (req, res) => {
    const artist_id = req.params.artist_id;
    const artist_details = raw_artists.find(p => p.artist_id === artist_id);
    if (artist_details) {
        res.send(artist_details);
    }
    else {
        res.status(404).send(`Artist ${artist_id} does not exist.`);
    }
});

app.get('/api/raw_tracks/searchbyartistname/:artist_name', (req, res) => {
    const artist_name = req.params.artist_name;
    const artistid_artistname = [];
    let j=0;
    for(i in raw_artists){
        if (raw_artists[i].artist_name.includes(artist_name)){
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

app.get('/api/raw_tracks/:track_id', (req, res) => {
    const track_id = req.params.track_id;
    const track_details = raw_tracks.find(p => p.track_id === track_id);
    if (track_details) {
        res.send(track_details);
    }
    else {
        res.status(404).send(`Track ${track_id} does not exist.`);
    }
});

app.get('/api/raw_tracks/searchbyalbumtitle/:album_track_title', (req, res) => {
    const album_track_title = req.params.album_track_title;
    let trackid_album_track_title = [];
    let j = 0;
    for(i in raw_tracks){
        if ((raw_tracks[i].album_title.includes(album_track_title) || raw_tracks[i].track_title.includes(album_track_title)) && j<5){
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

app.listen(port, () => {
    //console.log(`Listening on port ${port}`);
});


