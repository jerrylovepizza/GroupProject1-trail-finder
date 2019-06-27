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

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

  var database = firebase.database();

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

  //user info:
  var userName;
  // birthday:
  var userBirthday;
  // email:
  var userEmail;
  // password:
  var userPassword;
  // Difficulty level:
  var userDiffLevel;

  //  the trail array we are going to compare
  var trailList = [];
  var idList = [];
  var greenTrails = [];
  

var queryurlGetTrails = "https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=" + userRadius +"&maxResults=20&sort=quality&sort=distance&key=200490962-902084607f37c24a16f0e3f869dae93f"

var queryurlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + userLocation + "&units=imperial&appid=45d5721b72861d10a7cbdd007c5f0120"
var queryurlForcast = "https://api.apixu.com/v1/forecast.json?key=452ecb2ccebe475b919202954191706&q=" + userLocation + "&days=1"
var ids = "7001635"

$.ajax({
url: queryurlGetTrails,
method: "GET",
})

.then(function(trailResponse){
  // console.log(trailResponse)
  
  for(var i=0; i<trailResponse.trails.length; i++){
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
// console.log(trailList)
    // console.log("Pic", trailList[i].imgSmall)
    // console.log("name", trailList[i].name)
    // console.log("stars", trailList[i].stars)
    TrailLocation = trailList[i].location;
    console.log(TrailLocation)
    // console.log("location", trailList[i].location)
    // console.log("difficulty", trailList[i].difficulty)
    // console.log("summery", trailList[i].summary)
    // console.log("ascent", trailList[i].ascent)
    // console.log("ID ", trailResponse.trails[i].id)
    idList.push(trailResponse.trails[i].id);
  }
})

    .then(function(){
      
        queryurlForcast = "http://api.apixu.com/v1/forecast.json?key=452ecb2ccebe475b919202954191706&q=" + TrailLocation + "&days=1"
        $.ajax({
          url: queryurlForcast,
          method: "GET"
        })
        .then(function(forcastResponse){
          // console.log(TrailLocation)
          locationLat = forcastResponse.location.lat
          locationLon = forcastResponse.location.lon
          locationCode = forcastResponse.forecast.forecastday[0].day.condition.code
          // console.log(forcastResponse)
          // console.log(forcastResponse.forecast.forecastday[0].day.condition.code)
          // console.log(locationCode)
          
        }) .then(function(){
        
            idList.push(trailList[i].id);
            console.log(locationCode)
            
            
            if((TrailConditionStatus === "All Clear")&&(locationCode===1003||locationCode===1000)){
              $("#search").on("click", function() {
              
              for(i=0; i<trailList.length; i++){
                console.log("name ", TrailName)
              console.log("Pic ", TrailImg)
              console.log("stars ", TrailStars)
              console.log("location ", TrailLocation)
              console.log("difficulty ", TrailDifficulty)
              console.log("summary ", TrailSummary)
              console.log("ascent ", TrailAscent)
              console.log("condition status ", TrailConditionStatus)
              // console.log("ID ", trailID)
              console.log("weather Code ", locationCode)
              generateButtons();
              }
            });

          }
        
        
        })
      })
      // console.log(idList)
    
    
    $("#submit-button").on("click", function(){
  // profile data entry :
  // name:
  userName = $("#name").val().trim();
  // birthday:
  userBirthday =$("#birthday").val();
  // email:
  userEmail = $("#email").val().trim();
  // password:
  userPassword = $("#signup-password").val().trim();
  // Difficulty level:
  userDiffLevel = $("#user-difficulty").val();
  // location:
  userLocation = $("#user-location").val().trim();
  userZipcode = $("#user-zip-code").val().trim();
  
  // radius 
  userRadius = $("#user-radius").val();

  // console.log(userName);
  // console.log(userBirthday);
  // console.log(userEmail);
  // console.log(userPassword);
  // console.log(userDiffLevel);
  // console.log(userLocation);
  // console.log(userZipcode);

  //push to firebase
  database.ref().push({
userName: userName,
userBirthday: userBirthday,
userEmail: userEmail,
userPassword: userPassword,
userDiffLevel: userDiffLevel,
userLocation: userLocation,
userZipcode: userZipcode,
dateAdded: firebase.database.ServerValue.TIMESTAMP
  })
  $("#name").val("");
  // birthday:
  $("#birthday").val("");
  // email:
  $("#email").val("");
  // password:
 $("#signup-password").val("");
  // Difficulty level:
  ("#user-difficulty").val(userDiffLevel);
  // location:
  $("#user-location").val(userLocation);
  $("#user-zip-code").val(userZipcode);
  
  // radius 
  $("#user-radius").val(userRadius);
});

database.ref().on("child_added", function(event){
var usernameDB = event.val().userName;
var userEmailDB = event.val().userEmail
var userBirthdayDB = event.val().userBirthday;
var userPasswordDB = event.val().userPassword;
var userDiffLevelDB = event.val().userDiffLevel;
var userLocationDB = event.val().userLocation;
var userZipcodeDB = event.val().userZipcode;
// console.log(userPasswordDB)
// console.log(usernameDB);
//   console.log(userBirthdayDB);
//   console.log(userEmailDB);
//   console.log(userPasswordDB);
//   console.log(userDiffLevelDB);
//   console.log(userLocationDB);
//   console.log(userZipcodeDB);
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


function generateButtons(){
  
  var newCard = $("<div>");
  newCard.addClass("col-sm-12 col-md-6 col-lg-6 col-xl-4");
  
  // card container
  var cardContainer = $("<div>");
  cardContainer.addClass("card mt-3");
  cardContainer.text("Card info");

  // card image
  var cardImage = $("<img>");
  cardImage.attr("src", trailList[i].imgSmall);
  cardImage.addClass("card-img-top trailThumbnail");
  cardImage.attr("data-toggle", "modal");
  cardImage.attr("data-target", ".exampleModal");

  // card body
  var cardBody = $("<div>");
  cardBody.addClass("card-body");
  
  
  // card title
  var cardTitle = $("<h5>");
  cardTitle.addClass("card-title");
  cardTitle.attr("data-toggle", "modal");
  cardTitle.attr("data-target", ".exampleModal");
  cardTitle.text(trailList[i].name);
  
  // card text
  var cardText = $("<p>");
  cardText.addClass("card-text");
  cardText.text(trailList[i].summary);
  
  // card info
  var cardInfo = $("<ul>");
  cardInfo.addClass("list-group list-group-flush");
  
  var cardInfoItem1 = $("<li>");
  cardInfoItem1.addClass("list-group-item");
  cardInfoItem1.text("Trail Difficulty: ");
  
  var cardInfo1Difficulty = $("<p>");
 
  
  var cardInfo1DifficultyImage = $("<p>");
  cardInfo1DifficultyImage.text(trailList[i].difficulty);
  
  
  var cardInfoItem2 = $("<li>");
  cardInfoItem2.addClass("list-group-item");
  cardInfoItem2.text("Trail Distance: ");
  
  var cardInfo2Radius = $("<a>");
  cardInfo2Radius.attr("href", "#");
  cardInfo2Radius.addClass("btn bg-light");
  
  // card footer
  var cardFooter = $("<div>");
  cardFooter.addClass("card-footer bg-success text-center");
  
  var cardFooterText = $("<small>");
  cardFooterText.addClass("text-white");
  cardFooterText.attr("data-toggle", "modal");
  cardFooterText.attr("data-target", ".exampleModal");
  cardFooterText.text(trailList[i].difficulty + " Trail")
  
  cardFooter.html(cardFooterText);
  
  // put cardContainer inside newCard
  newCard.html(cardContainer);
  
  // put cardImage and cardBody inside cardContainer
  cardContainer.html(cardImage);
  cardContainer.append(cardBody);
  cardContainer.append(cardFooter);
  
  // combine all cardInfo elements to cardInfo
  cardInfo.html(cardInfoItem1);
  cardInfoItem1.append(cardInfo1Difficulty);
  cardInfo1Difficulty.html(cardInfo1DifficultyImage);
  
  
  cardInfo.append(cardInfoItem2);
  cardInfoItem2.append(cardInfo2Radius);
  cardInfo2Radius.append(trailList[i].length, " miles");
  
  // put cardTitle, cardText, cardInfo inside cardBody
  cardBody.html(cardTitle);
  cardBody.append(cardText);
  cardBody.append(cardInfo);
  
  $("#recommended-trails").append(newCard);

  // ------- Populates trail card modals

  // modal container
  var modalContainer = $("<div>");
  modalContainer.addClass("modal fade exampleModal");
  modalContainer.attr("tabindex", "-1");
  modalContainer.attr("role", "dialog");
  modalContainer.attr("area-hidden", "true");

  // modal dialog
  var modalDialog = $("<div>");
  modalDialog.addClass("modal-dialog modal-lg");
  modalDialog.attr("role", "document");

  // modal content
  var modalContent = $("<div>");
  modalContent.addClass("modal-content")

  // modal header
  var modalHeader = $("<div>");
  modalHeader.addClass("modal-header");
  
  var modalTitle = $("<h5>");
  modalHeader.html(modalTitle);
  modalTitle.text(trailList[i].name);

  var modalCloseButton = $("<button>");
  modalCloseButton.addClass("close");
  modalCloseButton.attr("data-dismiss", "modal");
  modalCloseButton.attr("aria-label", "Close");
  modalHeader.html(modalCloseButton);

  var modalCloseButtonIcon = $("<span>");
  modalCloseButtonIcon.attr("aria-hidden", "true");
  modalCloseButtonIcon.html("&times");
  modalCloseButton.html(modalCloseButtonIcon);

  // modal body
  var modalBody = $("<div>");
  modalBody.addClass("modal-body");

  var featuredImg = $("<img>");
  featuredImg.attr("src", trailList[i].imgMedium);
  featuredImg.addClass("card-img-top");

  var modalDetails = $("<div>");
  modalDetails.addClass("row m-5");
  
  modalDetails.append("<div class='col-md'>" + "<strong>" + "Difficulty: " + "</strong>" + trailList[i].difficulty + "</div>")
  modalDetails.append("<div class='col-md'>" + "<strong>" + "Rating: " + "</strong>" + trailList[i].stars + "</div>")


  var trailSummary = $("<p>");
  trailSummary.text(trailList[i].summary);

  // modal footer
  var modalFooter = $("<div>");
  modalFooter.addClass("modal-footer");

  var modalFooterButton = $("<button>");
  modalFooterButton.addClass("btn btn-secondary");
  modalFooterButton.attr("type", "button");
  modalFooterButton.attr("data-dismiss", "modal");
  modalFooterButton.text("Close");


  // append modalBody to the new trail card
  newCard.append(modalContainer);

  // put modal dialog inside modal body
  modalContainer.append(modalDialog);
 
  // put modal content inside modal dialog
  modalDialog.append(modalContent);

  // put modal header inside modal content
  modalContent.append(modalHeader);
      modalHeader.append(modalTitle);
      modalHeader.append(modalCloseButton);

  // modal body inside modal content
  modalContent.append(modalBody);
      modalBody.append(featuredImg);
      modalBody.append(modalDetails);
      modalBody.append("<hr>");
      modalBody.append(trailSummary);

  // modal footer inside modal content
  modalContent.append(modalFooter);
      modalFooter.append(modalFooterButton);
}