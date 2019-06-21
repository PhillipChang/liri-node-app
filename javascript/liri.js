require("dotenv").config();
var moment = require("moment");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");
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
        omdbSearch();
    break;

    case 'do-what-it-says':
        doStuff();
    break;
}



function bandSearch(parameter){
    var artist = '';
    if (inquiry === undefined && parameter === undefined){
        artist = "maroon5";
    }
    else if (action === 'do-what-it-says'){
        artist = parameter;
    }
    else {
        artist = process.argv.splice(3).join();
    }
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(    
    function(response){
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

function spotifySong(parameter){
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var song = '';
if (inquiry === undefined && parameter === undefined){
    song = "Ace of Base The Sign";
}
else if (action === 'do-what-it-says'){
    song = parameter;
}
else {
    song = process.argv.splice(3).join(" ");
}

console.log("song",song);
spotify.search({type: 'track', query: song}, function(err,data){
    if (err) {
        return console.log("Error Occurred", err);
    }
console.log("Artist:", data.tracks.items[0].artists[0].name);
console.log("Song Name:", data.tracks.items[0].name);
console.log("Preview:", data.tracks.items[3].preview_url);
console.log("Album:", data.tracks.items[0].album.name);
});
}

function omdbSearch(parameter){
    var title = '';
    if (inquiry === undefined && parameter === undefined){
        title = "Mr.Nobody";
    }
    else if (action === 'do-what-it-says'){
        title = parameter;
    }
    else {
        title = process.argv.splice(3).join(" ");
    }
    axios.get("http://www.omdbapi.com/?t="+title+"&y=&plot=short&apikey=trilogy").then(
        function(response) {
          var result = response.data;
          console.log("Title:", result.Title);
          console.log("Release Year:", result.Released);
          console.log("Imdb Rating:", result.Ratings[0].Value);
          console.log("Rotten Tomatoes Rating:", result.Ratings[2].Value);
          console.log("Country:", result.Country);
          console.log("Language:", result.Language);
          console.log("Plot:", result.Plot);
          console.log("Actors:", result.Actors);
        }
      );
}

function doStuff(){
fs.readFile("random.txt","utf8", function(error,data){
    if(error){
        return console.log(error);
    }
    var dataArr = data.split(",");
    var doIt = dataArr[0];
    dataArr[1] = dataArr[1].replace("\"", "");
    var parameter = dataArr[1];
    switch(doIt){
        case 'concert-this':
        bandSearch(parameter);
        break;
    
        case 'spotify-this-song':
            spotifySong(parameter);
        break;
    
        case 'movie-this':
            omdbSearch(parameter);
        break;
    
        case 'do-what-it-says':
            doStuff();
        break;
    }
});
}
// inquirer.prompt([
//     {
//     type:'list',
//     name:'title',
//     message:'What do you wish to do?',
//     choices: {
//         'spotify-this-song'
//     }
// ])
