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
  
  // default user location
  var userZipcode = "80003"
  var userLocation = "Denver"
  // default radius 
  var userRadius = "10"
  
  // defined later
  // do we reccommend this trail today true = yes false = no
  var recommend = false;
  // do we display the hikes we don't recommend true = yes false = no
  var displayNonRec = false;
  // trail info to display
  var TrailImg;
  var TrailName;
  var TrailStars;
  var TrailLocation;
  var conditionColor;
  var TrailConditionStatus;
  var TrailDifficulty;
  var TrailSummary;
  var TrailAscent;
  var TrailID;
  // or 
  var conditionStatus;
  var conditionDetails;
  // weather info
  var locationLat;
  var locationLon;
  var locationCode;

  //  the trail array we are going to compare
  var trailList = [""];
  

var queryurlGetTrails = "https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=" + userRadius +"&maxResults=20&sort=quality&sort=distance&key=200490962-902084607f37c24a16f0e3f869dae93f"
var queryurlGetConditions = "https://www.hikingproject.com/data/get-conditions?ids=7001635,7002742,7000108,7002175,7000130&key=200490962-902084607f37c24a16f0e3f869dae93f"
var queryurlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + userLocation + "&units=imperial&appid=45d5721b72861d10a7cbdd007c5f0120"
var queryurlForcast = "http://api.apixu.com/v1/forecast.json?key=452ecb2ccebe475b919202954191706&q=" + userLocation + "&days=1"
var ids = "7001635"

$.ajax({
url: queryurlGetTrails,
method: "GET",
})

.then(function(trailResponse){
  // Recommeded trail information
  TrailImg = trailResponse.trails[i].imgSmall
  TrailName = trailResponse.trails[i].name //And probably the first 5 mountians for all but im using index 0 as example.
  TrailStars = trailResponse.trails[i].stars
  TrailLocation = trailResponse.trails[i].location
  
  TrailConditionStatus = trailResponse.trails[i].conditionStatus 
  TrailDifficulty = trailResponse.trails[i].difficulty
  TrailSummary = trailResponse.trails[i].summary
  TrailAscent = trailResponse.trails[i].ascent
  TrailID = trailResponse.trails[i].id // Display ID for user search of trails
  trailList = trailResponse.trails;//storing the trail array

}).then(function(){
  
  $.ajax({
    url: queryurlGetConditions,
    method: "GET"
  })
  
  .then(function(conditionResponse){
    
    conditionStatus = conditionResponse[i].conditionStatus
    conditionColor = conditionResponse[i].conditionColor
    conditionDetails = conditionResponse[i].conditionDetails
    
    
  }).then(function(){
    $.ajax({
      url: queryurlWeather,
      method: "GET"
    })
    .then(function(weatherResponse){
      
      var WeatherDescription = weatherResponse.weather[0].description 
      var WeatherClouds = weatherResponse.clouds.all
      var WeatherTemp = weatherResponse.main.temp 
      var WeatherTempMax = weatherResponse.main.temp_max
      var WeatherTempMin = weatherResponse.main.temp_min
      
    }).then(function(){
      
      
      $.ajax({
        url: queryurlForcast,
        method: "GET"
      })
      .then(function(forcastResponse){
        
        locationLat = forcastResponse.location.lat
        locationLon = forcastResponse.location.lon
        locationCode = forcastResponse.forecast.forecastday[0].day.condition.code
        console.log(forcastResponse)
        
      }).then(function(){
        for(i=0; i<trailList.length; i++){
          console.log(trailList[i].name)
            
          
            }
          
          console.log(conditionColor)
          if(conditionColor === "Green" && (locationCode===1000 || locationCode===1003)){
            recommend = true;
            
          }
        })
      })
      
    })
    
  })
  
  $("#submit-Button").on("click", function(childSnapshot){

  // profile data entry :
  // name:
  var name = $("#name").val().trim();
  // birthday:
  var birthday = parseInt($("#birthday").val().trim());
  // email:
  var email = $("#email").val().trim();
  // password:
  var password = $("#password").val().trim();
  // Difficulty level:
  var diffLevel = $("#difficulty").val().trim();
  // location:
  userLocation = $("#user-location").val().trim();

  userZipcode = $("#user-zip-code").val().trim();
  
  // radius 
  userRadius = $("#user-radius").val();

  //push to firebase
});
// profile data entry 
$("#display-non-rec").on("click", function(){
  displayNonRec=true;
});

if(displayNonRec===true){
  //display non rec
}else{
  //display rec only 
}

//favorites 
var favorites=[""];
$("#add-favorites").on("click", function(_addFavorite){
  if (favorites.indexOf(trailID)===-1){
    favorites.push($(TrailID));
  }else{
    favorites.splice(indexOf(trailID,1))
  }
})
