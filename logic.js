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


  var queryurlGetTrails = "https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200490962-902084607f37c24a16f0e3f869dae93f"
var queryurlGetConditions = "https://www.hikingproject.com/data/get-conditions?ids=7001635,7002742,7000108,7002175,7000130&key=200490962-902084607f37c24a16f0e3f869dae93f"
var ids = "7001635"

$.ajax({
url: queryurlGetTrails,
method: "GET",
})

.then(function(response){

console.log(response)
// console.log(queryurl)
// Recommeded trail information
console.log(response.trails[0].name) //And probably the first 5 mountians for all but im using index 0 as example.
console.log(response.trails[0].stars)
console.log(response.trails[0].location)
console.log(response.trails[0].conditionStatus)


// Trail difficulty and details after search or click details
console.log(response.trails[0].name)
console.log(response.trails[0].location)
console.log(response.trails[0].conditionStatus)
console.log(response.trails[0].difficulty)
console.log(response.trails[0].ascent)
console.log(response.trails[0].imgSmall)
console.log(response.trails[0].summary)
console.log(response.trails[0].id) // Display ID for user search of trails

//  Trail full information after picking 
// USE "https://www.hikingproject.com/data/get-conditions for condition information
console.log(response.trails[0].name)
console.log(response.trails[0].location)
console.log(response.trails[0].difficulty)
console.log(response.trails[0].ascent)
console.log(response.trails[0].imgSmall)
console.log(response.trails[0].summary)

$.ajax({
 url: queryurlGetConditions,
 method: "GET"
})

.then(function(response){
    console.log(response)
     console.log(response[0].conditionStatus)
     console.log(response[0].conditionColor)
     console.log(response[0].conditionDetails)

})

})

//just beceause