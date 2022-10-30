const express = require('express');
const app = express();
const port = 3000;

const fs = require("fs");
const csvParser = require("csv-parser");

const genres = [];
const raw_albums = [];
const raw_artists = [];
const raw_tracks = [];


fs.createReadStream("./lab3-data/genres.csv")
  .pipe(csvParser())
  .on("data", (data) => {
    genres.push(data);
  })
  .on("end", () => {
    //console.log(genres);
  });

fs.createReadStream("./lab3-data/raw_albums.csv")
  .pipe(csvParser())
  .on("data", (data) => {
    raw_albums.push(data);
  })
  .on("end", () => {
    //console.log(raw_albums);
  });

fs.createReadStream("./lab3-data/raw_artists.csv")
  .pipe(csvParser())
  .on("data", (data) => {
    raw_artists.push(data);
  })
  .on("end", () => {
    //console.log(raw_artists);
  });

fs.createReadStream("./lab3-data/raw_tracks.csv")
  .pipe(csvParser())
  .on("data", (data) => {
    raw_tracks.push(data);
  })
  .on("end", () => {
    //console.log(raw_tracks);
  });


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
        if (artist_name == raw_artists[i].artist_name){
            artistid_artistname[j] = raw_artists[i].artist_id;
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
    res.send(raw_tracks);
});

app.get('/api/raw_tracks/searchbyalbumtitle/:album_title', (req, res) => {
    const album_title = req.params.album_title;
    const trackid_albumtitle = [];
    let j = 0;
    for(i in raw_tracks){
        if (album_title == raw_tracks[i].album_title && j<5){
            trackid_albumtitle[j] = raw_tracks[i].track_id;
            j++;
        }
    }
    if (trackid_albumtitle[0]!=null) {
        res.send(trackid_albumtitle);
    }
    else {
        res.status(404).send(`Album ${album_title} does not exist.`)
    }
});

app.get('/api/raw_tracks/searchbytracktitle/:track_title', (req, res) => {
    const track_title = req.params.track_title;
    const trackid_tracktitle = [];
    let j = 0;
    for(i in raw_tracks){
        if (track_title == raw_tracks[i].track_title && j<5){
            trackid_tracktitle[j] = raw_tracks[i].track_id;
            j++;
        }
    }
    if (trackid_tracktitle[0]!=null) {
        res.send(trackid_tracktitle);
    }
    else {
        res.status(404).send(`Track ${track_title} does not exist.`)
    }
});

app.listen(port, () => {
    //console.log(`Listening on port ${port}`);
});