
function Anime(pName, pSummary, pRanking) {
    this.name= pName;
    this.summary = pSummary;
    this.ranking = pRanking;
    this.watched = false;
  }
  var ClientNotes = [];  // our local copy of the cloud data


document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("submit").addEventListener("click", function () {
        var tName = document.getElementById("name").value;
        var tSummary = document.getElementById("summary").value;
        var tRanking = document.getElementById("ranking").value;
        var oneAnime = new Anime(tName, tSummary, tRanking);

        $.ajax({
            url: '/NewAnime' ,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(oneAnime),
            success: function (result) {
                console.log("added new anime")
            }

        });
    });

    document.getElementById("get").addEventListener("click", function () {
        updateList()
    });
  


    document.getElementById("delete").addEventListener("click", function () {
        
        var whichAnime = document.getElementById('deleteName').value;
        var idToDelete = "";
        for(i=0; i< ClientNotes.length; i++){
            if(ClientNotes[i].name === whichAnime) {
                idToDelete = ClientNotes[i]._id;
           }
        }
        
        if(idToDelete != "")
        {
                     $.ajax({  
                    url: 'DeleteAnime/'+ idToDelete,
                    type: 'DELETE',  
                    contentType: 'application/json',  
                    success: function (response) {  
                        console.log(response);  
                    },  
                    error: function () {  
                        console.log('Error in Operation');  
                    }  
                });  
        }
        else {
            console.log("no matching Subject");
        } 
    });



    document.getElementById("msubmit").addEventListener("click", function () {
        var tName = document.getElementById("mname").value;
        var tSummary = document.getElementById("msummary").value;
        var tRanking = document.getElementById("mranking").value;
        var oneAnime = new Anime(tName, tSummary, tRanking);
        oneAnime.watched =  document.getElementById("mwatched").value;
        
            $.ajax({
                url: 'UpdateAnime/'+idToFind,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(oneAnime),
                    success: function (response) {  
                        console.log(response);  
                    },  
                    error: function () {  
                        console.log('Error in Operation');  
                    }  
                });  
            
       
    });


    
    var idToFind = ""; // using the same value from the find operation for the modify
    // find one to modify
    document.getElementById("find").addEventListener("click", function () {
        var tName = document.getElementById("modName").value;
         idToFind = "";
        for(i=0; i< ClientNotes.length; i++){
            if(ClientNotes[i].name === tName) {
                idToFind = ClientNotes[i]._id;
           }
        }
        console.log(idToFind);
 
        $.get("/FindAnime/"+ idToFind, function(data, status){ 
            console.log(data[0].name);
            document.getElementById("mname").value = data[0].name;
            document.getElementById("msummary").value= data[0].summary;
            document.getElementById("mranking").value = data[0].ranking;
            document.getElementById("mwatched").value = data[0].watched;
           

        });
    });

    // get the server data into the local array
    updateList();

});


function updateList() {
var ul = document.getElementById('listUl');
ul.innerHTML = "";  // clears existing list so we don't duplicate old ones

//var ul = document.createElement('ul')

$.get("/Anime", function(data, status){  // AJAX get
    ClientNotes = data;  // put the returned server json data into our local array

    // sort array by one property
    ClientNotes.sort(compare);  // see compare method below
    console.log(data);
    //listDiv.appendChild(ul);
    ClientNotes.forEach(ProcessOneAnime); // build one li for each item in array
    function ProcessOneAnime(item, index) {
        var li = document.createElement('li');
        ul.appendChild(li);

        li.innerHTML=li.innerHTML + "<b>" + item.name + "</b>" + "<br />" + "Rating: " + item.ranking + "/10  " + "<br />" + "Summary: " + item.summary + "<br />" + "Watched? "+ item.watched + "<br />";
    }
});
}

function compare(a,b) {
    if (a.watched == false && b.watched== true) {
        return -1;
    }
    if (a.watched == false && b.watched== true) {
        return 1;
    }
    return 0;
}
