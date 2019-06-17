// Using ajax to call from the hiking api

var queryurl = "https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200490962-902084607f37c24a16f0e3f869dae93f"


$.ajax({
    url: queryurl,
    method: "GET",
})

.then(function(response){

    // Recommeded trail information
    console.log(response)
    console.log(queryurl)

})





