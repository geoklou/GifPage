//array to store initial topics
var topics = ["Cat", "Dog", "Bird", "Goat", "Lion", "Fish"];

//make buttons from topics array
makeButtons();

//user add new topic to array
$("#add").on("click", function(event) {
  event.preventDefault();
  //get input from textbox
  var input = $("#addTopic").val().trim();
  //add input to array
  topics.push(input);
  //create more buttons!!!
  makeButtons();
});

//function to make buttons
function makeButtons(){
  //clear previous buttons
  $("#showButtons").empty();
      // create buttons with topic array
      for (var i=0; i<topics.length; i++){
        //create variable to make button element real
        var btn = $("<button>");
        //add handle style btn, handler pix and cursor pointer
        btn.addClass("btn pix a");
        //add attribute data-image for linking in function display that corresponds with button value
        btn.attr("data-image", topics[i]);
        //show array value on button
        btn.text(topics[i]);
        //show in html element
        $("#showButtons").append(btn);
      }//for loop end
  }//makeButtons ends

//function to display output
function display(){
    //attach attribute "data-image" from buttons to search key word in queryURL
    var picture = $(this).attr("data-image");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + picture + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(picture);
    //open ajax blackbox for jQuery to work
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      //create variable to store retrieved data
      var results = response.data;
      //clear previous display
      $("#images").empty();
      //look for retrieved data for new display
      for (var i=0; i<results.length; i++){
        var topicDiv = $("<div>");
        //create h4 heading to store rating data
        var r = $("<h4>").text("Rating: " + results[i].rating);
        //create a tag to store image in img tag
        var animalImage = $("<img>");
          //first appereance - call category still pictures by the topic array button
          animalImage.attr("src", results[i].images.fixed_height_still.url);
          //provide all the possible display options -- there maybe more
          animalImage.attr("data-still", results[i].images.fixed_height_still.url);
          animalImage.attr("data-animate", results[i].images.fixed_height.url);
          //default display to start the animate function loop
          animalImage.attr("data-state", "still");

        //display images and rating in HTML
        topicDiv.append(r);
        topicDiv.append(animalImage);
        //add handle class 'animate', style and cursor pointer
        topicDiv.addClass("animate left a");
        //append entire output to html panel
        $("#images").prepend(topicDiv);
      }//for loop ends
    })//ajax done ends
}//function display ends

//function for event handler - animate gifs by clicking on class animate in topicDiv
function animate(){
    //create variable to display alternate states of <img> in animalImage
    var state = $(this).find("img").attr("data-state");
    //find for image states
    //toggle between still and animated states
      if (state === "still"){
        $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
        $(this).find("img").attr("data-state", "animate");
      } else{
        $(this).find("img").attr("src", $(this).find("img").attr("data-state"));
        $(this).find("img").attr("data-state", "still");
      }//if loop ends
}//function animate ends

//call function display by clicking class "pix" buttons to show picture and rating
$(document).on("click", ".pix", display);
//call function animate by clikcing class "animate" to look for animated gifs
$(document).on("click", ".animate", animate);
