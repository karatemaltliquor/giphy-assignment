$( document ).ready(function() {
    // An array of funnyFaces, new funnyFaces will be pushed into this array;
    var funnyFaces = ["KevinHart", "WillFerrell", "SteveHarvey", "VinceVaughn", "MartinLawrence", "IssaRae", "ChrisFarley", "EddieMurphy", "DaveChappelle", "LarryDavid"];
    
    function displayGifButtons(){
        $("#gifButtonsView").empty(); 
        for (var i = 0; i < funnyFaces.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("funny");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", funnyFaces[i]);
            gifButton.text(funnyFaces[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function to add a new funny face button
    function addNewButton(){
        $("#addGif").on("click", function(){
        var funny = $("#funnyFaces-input").val().trim();
        if (funny == ""){
          return false; 
        }
        funnyFaces.push(funny);
    
        displayGifButtons();
        return false;
        });
    }
    // Function to remove last button created
    function removeLastButton(){
        $("removeGif").on("click", function(){
        funnyFaces.pop(funny);
        displayGifButtons();
        return false;
        });
    }
    // Function that displays the gifs
    function displayGifs(){
        var funny = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + funny + "&api_key=emamFQzsj2RDb2gOWNLC68Js1MlCPCrJ&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response);
            $("#gifsView").empty(); 
            var results = response.data; 
            if (results == ""){
              alert("There isn't anything funny about that.");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                // getting gif rating
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                // getting gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Calling Functions
    displayGifButtons(); 
    addNewButton();
    removeLastButton();
    // Event Listeners
    $(document).on("click", ".funny", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });    
    });
    