var firebaseConfig = {
    apiKey: "AIzaSyAf2rHXs92LkdmkKs1qqAij6yiF7nLqnmE",
    authDomain: "hikeoutsideproject.firebaseapp.com",
    databaseURL: "https://hikeoutsideproject.firebaseio.com",
    projectId: "hikeoutsideproject",
    storageBucket: "hikeoutsideproject.appspot.com",
    messagingSenderId: "614003353649",
    appId: "1:614003353649:web:e99b220f003b3d1f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var i = 0
  var userZipcode = "80003"
  var userLocation = "Denver"

  var queryurlGetTrails = "https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200490962-902084607f37c24a16f0e3f869dae93f"
var queryurlGetConditions = "https://www.hikingproject.com/data/get-conditions?ids=7001635,7002742,7000108,7002175,7000130&key=200490962-902084607f37c24a16f0e3f869dae93f"
var queryurlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + userLocation + "&units=imperial&appid=45d5721b72861d10a7cbdd007c5f0120"
var queryurlForcast = "http://api.apixu.com/v1/forecast.json?key=452ecb2ccebe475b919202954191706&q=" + userLocation + "&days=1"
var ids = "7001635"

$.ajax({
url: queryurlGetTrails,
method: "GET",
})

.then(function(response){

console.log(response)
// console.log(queryurl)
// Recommeded trail information
var TrailName = response.trails[i].name //And probably the first 5 mountians for all but im using index 0 as example.
var TrailStars = response.trails[i].stars
var TrailLocation = response.trails[i].location
var TrailConditionStatus = response.trails[i].conditionstatus 


// Trail difficulty and details after search or click details
// TrailName 
// TrailLocation
// TrailConditionStatus
// conditionColor
var TrailDifficulty = response.trails[i].difficulty
var TrailAscent = response.trails[i].ascent
var TrailImg = response.trails[i].imgSmall
var TrailSummary = response.trails[i].summary
var TrailID = response.trails[i].id // Display ID for user search of trails

//  Trail full information after picking 
// TrailName 
// TrailLocation
// TrailDifficulty
// TrailAscent
// TrailImg
// TrailSummary
})

$.ajax({
 url: queryurlGetConditions,
 method: "GET"
})

.then(function(response){
    console.log(response)
    var conditionStatus = response[i].conditionStatus
     var conditionColor = response[i].conditionColor
     var conditionDetails = response[i].conditionDetails

})

$.ajax({
  url: queryurlWeather,
  method: "GET"
})
.then(function(response){
  console.log(response)
  var WeatherDescription = response.weather[0].description 
  var WeatherClouds = response.clouds.all
  var WeatherTemp = response.main.temp 
  var WeatherTempMax = response.main.temp_max
  var WeatherTempMin = response.main.temp_min

})

$.ajax({
  url: queryurlForcast,
  method: "GET"
})
.then(function(response){
  console.log(response)
  var locationLat = response.location.lat
  var locationLon = response.location.lon
})

//just beceause