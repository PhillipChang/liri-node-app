require("dotenv").config();
var moment = require("moment");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var chalk = require("chalk");
const header = chalk.bold.blue;
const detail = chalk.bold.underline.green;
const other = chalk.bold.red;

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
        console.log(chalk.blue("Location Name:",chalk.green.underline.bold(response.data[0].venue.name)));
        console.log(chalk.blue("Venue Location:", chalk.green.underline.bold(response.data[0].venue.city, response.data[0].venue.country)));
        console.log(chalk.blue("Date of the Event:", chalk.red.underline(moment(response.data[0].datetime).format("MM/DD/YYYY"))));        
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
console.log(header("Artist:", detail(data.tracks.items[0].artists[0].name)));
console.log(header("Song Name:", detail(data.tracks.items[0].name)));
console.log(header("Preview:", other(data.tracks.items[3].preview_url)));
console.log(header("Album:", detail(data.tracks.items[0].album.name)));
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
          console.log(header("Title:", detail(result.Title)));
          console.log(header("Release Year:", detail(result.Released)));
          console.log(header("Imdb Rating:", detail(result.Ratings[0].Value)));
          console.log(header("Rotten Tomatoes Rating:", detail(result.Ratings[2].Value)));
          console.log(header("Country:", detail(result.Country)));
          console.log(header("Language:", detail(result.Language)));
          console.log(header("Plot:", other(result.Plot)));
          console.log(header("Actors:", other(result.Actors)));
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