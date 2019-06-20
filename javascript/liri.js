require("dotenv").config();
var moment = require("moment");
var axios = require("axios");
var Spotify = require("node-spotify-api");
// var inquirer = require("inquirer");

var action = process.argv[2];
var inquiry = process.argv[3];


switch(action){
    case 'concert-this':
    // bandSearch();
    break;

    case 'spotify-this-song':
        spotifySong();
    break;

    case 'movie-this':
    break;

    case 'do-what-it-says':
    break;
}

// function bandSearch(){
    // for (i = 3; i<process.argv.length;i++){
    //     inquiry += process.argv[i];
    //     }
//     axios.get("https://rest.bandsintown.com/artists/" + inquiry + "/events?app_id=codingbootcamp").then(    
//     function(result){
//         console.log("the band name is:",artist);
//         console.log("Name of the Venue:"+ result);
//         // console.log("Venue Location:", response.venue.city);
//         // console.log("Date of the Event:", response.datetime);        
//     }
//     )};

function spotifySong(){
var spotify = new Spotify({
    id:"5ee05a6f5ff0415eaf9e9a71b5c918ef",
    secret:"269e186460ce4f2e8edbec2a2dfb92be",
});
// for (i = 3; i<process.argv.length;i++){
//     inquiry += process.argv[i];
//     }
if (inquiry === undefined){
    inquiry = "Ace of Base The Sign";
}
spotify.search({type: 'track', query: inquiry}, function(err,data){
    if (err) {
        return console.log("Error Occurred", err);
    }
console.log("Artist:", data.tracks.items[0].artists[0].name);
console.log("Song Name:", data.tracks.items[0].name);
console.log("Preview:", data.tracks.items[3].preview_url);
console.log("Album:", data.tracks.items[0].album.name);
});
}
