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
     list.innerText = 'Name '+ c[i].name + ',' + 'votes ';
     var vote = document.createElement('p');
     vote.innerText = c[i].votes;
     list.append(vote);
     //make form
       var f = document.createElement('form');
       f.setAttribute('method', 'post');
         f.setAttribute('action', "https://bb-election-api.herokuapp.com/vote");

        var submitButton = document.createElement("input"); //input element, Submit button
         submitButton.setAttribute('type',"submit");
         submitButton.setAttribute('value',"Submit");

        f.appendChild(submitButton);

        var refresh = document.createElement("input"); //input element, Submit button
         refresh.setAttribute('type',"submit");
         refresh.setAttribute('value',"Refresh")
        f.appendChild(refresh);

        var nameInput = document.createElement("input"); //input name, hidden element
         nameInput.setAttribute('type',"hidden");
         nameInput.setAttribute('name',"name");
         nameInput.setAttribute('value', c[i].name);

        f.appendChild(nameInput);
      //add form to li
       list.appendChild(f);
     //add li to ul
     ul.appendChild(list);

     refresh.addEventListener('click', function(e){
       e.preventDefault();
       var c = responseData.candidates;
       var r_list = e.target.parentNode.parentNode;
       var r_votes = r_list.getElementsByTagName('p');
       var v_votes = parseInt(r_votes[0].innerText) + 1;
       r_votes[0].innerText = v_votes

              console.log('refreshed');
            });
   } //closes the iteration above

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
