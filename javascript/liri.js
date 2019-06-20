require("dotenv").config();
var moment = require("moment");
var axios = require("axios");
var Spotify = require("node-spotify-api");
// var inquirer = require("inquirer");

var action = process.argv[2];
var inquiry = process.argv[3];


switch(action){
    case 'concert-this':
    bandSearch();
    break;

    case 'spotify-this-song':
        spotifySong();
    break;

    case 'movie-this':
    break;

    case 'do-what-it-says':
    break;
}

function bandSearch(){
    // for (i = 3; i<process.argv.length;i++){
    //     inquiry += process.argv[i];
    //     }
    axios.get("https://rest.bandsintown.com/artists/" + inquiry + "/events?app_id=codingbootcamp").then(    
    function(response){
        // console.log("data:", response.data);
        console.log("Location Name:", response.data[0].venue.name);
        console.log("Venue Location:", response.data[0].venue.city, response.data[0].venue.country);
        console.log("Date of the Event:", moment(response.data[0].datetime).format("MM/DD/YYYY"));        
    })
    .catch(function(error){
        if (error.result){
            console.log("Error is", error.response.data);
            console.log("Error is", error.response.status);
            console.log("Error is", error.response.headers);
        }
        else if (error.request) {
            console.log(error.request);
        }
        else {
            console.log("error", error.message);
        }
        console.log(error.config);
    })
};

function spotifySong(){
var keys = require("./keys.js");
var spotify = new spotify(keys.spotify);
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
