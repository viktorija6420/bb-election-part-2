document.addEventListener("DOMContentLoaded", function() {

  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'JSON'
  }).done(function(responseData){
    var c = responseData.candidates;
    //iterate through candidates
    for (var i=0; i<c.length; i++) {
      //select ul
     var ul = document.querySelector('ul');
     //create li for ul
     var list = document.createElement('li');
     //enter name and votes of candidate inside li
     list.innerText = 'Name '+ c[i].name + ',' + 'votes ' + c[i].votes;

     //make form
       var f = document.createElement('form');
       f.setAttribute('method', 'post');
         f.setAttribute('action', "https://bb-election-api.herokuapp.com/vote");

        var submitButton = document.createElement("input"); //input element, Submit button
         submitButton.setAttribute('type',"submit");
         submitButton.setAttribute('value',"Submit");

        f.appendChild(submitButton);

        var nameInput = document.createElement("input"); //input name, hidden element
         nameInput.setAttribute('type',"hidden");
         nameInput.setAttribute('name',"name");
         nameInput.setAttribute('value', c[i].name);

        f.appendChild(nameInput);
      //add form to li
       list.appendChild(f);
     //add li to ul
     ul.appendChild(list);



   } //closes the iteration above

  //  Now that we can vote, add a "Refresh" button or link
  // to the index.html file. Create a click event handler for
  //  this button in election.js. When it's clicked, update
  //  the vote counts of the various candidates. You'll have
  // to update the existing <li> elements now instead of
  // appending.

     //create a button
     var refresh = document.createElement('button');
      refresh.setAttribute('href', 'file:///home/viktorija/Desktop/bitmaker/projects/bb-election-part-2/index.html')

      //create text on the button
     var t = document.createTextNode ('Refresh');

     //select the refresh button
     var r = document.querySelector('button');
     r.appendChild(t);

     r.addEventListener('click', function(e){
       //prevent default when click button
       e.preventDefault();

       //When it's clicked, update
       //  the vote counts of the various candidates. You'll have
       // to update the existing <li> elements now instead of
       // appending.


       //collect all candidates
       var c = responseData.candidates;
         //iterate through candidates to  get current candidate
        for (var i=0; i<c.length; i++) {
           //increase votes by 1
          c[i].votes +=1
        };
       //find all the list elements
       var findLists = document.querySelectorAll('li');
       //iterate through all the list elements & append the button to the current li
         for (var i=0; i<findLists.length; i++){
           findLists[i].appendChild(r);
         };
     }).done(function(){
          console.log('refreshed');
        });
      
    // })




   var findForm = document.querySelectorAll('form');
   for (var i=0; i<findForm.length; i++){
     findForm[i].addEventListener('submit', function(e){
       e.preventDefault();
       var cand = this.querySelector('input[type=hidden]').value;
       console.log(cand);
     $.ajax({
       method: 'POST',
       url: 'https://bb-election-api.herokuapp.com/vote?name='+cand, //add the name to the url
       dataType: 'JSON'
     }).done(function(){
       console.log('Vote successfull.');
        //console.log('$this.querySelector('input[type=hidden]').value').val()');
     }).fail(function(){
       console.log('Vote failed.');
     })
   });
 } //closes iteration through forms

  }).fail(function(){
  console.log('Request failed.');
});








});
