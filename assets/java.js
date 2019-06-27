// Using ajax to call from the hiking api

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




// .then(function(){
  //   $.ajax({
  //     url: queryurlWeather,
  //     method: "GET"
  //   })
    // .then(function(weatherResponse){
      
    //   var WeatherDescription = weatherResponse.weather[0].description 
    //   var WeatherClouds = weatherResponse.clouds.all
    //   var WeatherTemp = weatherResponse.main.temp 
    //   var WeatherTempMax = weatherResponse.main.temp_max
    //   var WeatherTempMin = weatherResponse.main.temp_min
      
    // })


    .then(function(conditionResponse){
    
    
        for(const prop in conditionResponse){
          // console.log(conditionResponse[prop])
          conditionColor = conditionResponse[prop].conditionColor;
          conditionStatus = conditionResponse[prop].conditionStatus;
          conditionDetails = conditionResponse[prop].conditionDetails;
          // console.log(conditionColor)
          if(conditionColor==="Green"){
            
          }
          // console.log(conditionStatus)
          // console.log(conditionDetails)
          }
      })

      .then(function(){
        //  console.log(idList)
         var queryurlGetConditions = "https://www.hikingproject.com/data/get-conditions?ids=" + idList[0] + "," + idList[1] + ","+ idList[2] + ","+ idList[3] +","+ idList[4] +","+ idList[5] +","+ idList[6] +","+ idList[7] +","+ idList[8] +","+ idList[9] +","+ idList[10] +","+ idList[11] +","+ idList[12] +","+ idList[13] +","+ idList[14] +","+ idList[15] +","+ idList[16] +","+ idList[17] +","+ idList[18] +","+ idList[19] +","+ idList[20] +"&key=200490962-902084607f37c24a16f0e3f869dae93f"
          $.ajax({
            url: queryurlGetConditions,
            method: "GET"
          })
        })