
      // Initial array of movies
      var topics = ["Spongebob","The Nanny", "Lizzie Mcguire","The Fresh Prince of Belair", "Avatar the Last Airbender","Thats so Raven","Friends","Kim Possible", "The Simpsons", "The Amanda Show","Kenan and Kel"];
          
      var imgURL = [];
      var stillimgURL = [];

        
    //Rendering buttons      
      function renderButtons() {

        $("#buttons-view").empty();

        
        for (var i = 0; i < topics.length; i++) {

          var a = $("<button>");
         
          a.addClass("topic");
        
          a.attr("data-name", topics[i]);
          
          a.text(topics[i]);
          
          $("#buttons-view").append(a);
        }
      }
    
    //input click
        $("#add-gif").on("click", function(event) {
      
        event.preventDefault();
       
        var topic = $("#gif-input").val().trim();

        topics.push(topic);

        renderButtons();

      });
     
    //Rendering gifs of that topic
      function displayTopicName() {
        
        // get topic from clicked button
        var giphy = $(this).attr("data-name");
         // clear image divs
        $("#images-1").empty();
        $("#images-2").empty();
        $("#images-3").empty();
        // make image divs visible
        $("#images-1").show();
        $("#images-2").show();
        $("#images-3").show();
        
       var queryURL ="https://api.giphy.com/v1/gifs/search?api_key=DhW37vIDfAWJstV4q0wiGIV2wcaqJXRV&q="+ giphy +"&limit=10";
        console.log(giphy)

      
      $.ajax({
      url: queryURL,
      method: "GET"
     }).done(function(response) {
          console.log(response); 
          
          for (var i = 0; i < 10; i++) {
            //animated gif  
            imgURL[i] = response.data[i].images.fixed_width.url;
            //still gif
            stillimgURL[i] = response.data[i].images.fixed_width_still.url; //img div and class  
            var giphyDiv = $("<div class='img-div'>");
            //img tag and properties
            var cimg =$("<img>");
            cimg.attr("src", stillimgURL[i]);
            cimg.attr("alt", giphy + " Image #" + i);
            cimg.attr("alt_src", imgURL[i]);
            cimg.addClass("image");
            //append
            giphyDiv.append(cimg); 
            //rating 
            var rating= response.data[i].rating.toUpperCase();
            //p tag 
            var rate= $("<p>").text("Rating: " + rating);
            //append
            giphyDiv.append(rate);
          
          // add image divs to left or right divs based on i.
                    switch (i) {
                        case 0:
                        case 2:
                        case 4:
                        case 6:
                        $("#images-1").append(giphyDiv);
                            break;
                        case 8:
                        case 1:    
                        case 3:
                        $("#images-2").append(giphyDiv);
                            break;
                        case 5:
                        case 7:
                        case 9:
                         $("#images-3").append(giphyDiv);
                            break;  
                    }
          }
      });
      }
        
        function imageSwitch() {
        tmp = $(this).attr('src');
        $(this).attr('src', $(this).attr('alt_src'));
        $(this).attr('alt_src', tmp);
    }


     
 
    // listen for click on image and pass to imageSwitch function
    $(document).on("click", ".image", imageSwitch);
   
    $(document).on("click", ".topic", displayTopicName);

      renderButtons();
   