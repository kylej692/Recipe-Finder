const url = 'https://api.edamam.com/search?'
const queryParams = 'q=';
const app_id = '&app_id=d4183916';
const app_key = '&app_key=9b4713aba7e3dc1fa7798b2bfdf237da'

const recipesField = document.querySelector('#listed-recipes');
$(document).ready(function() {
  const getResponse = () => {
    const foodQuery = $('#searchbox').val();
    const endpoint = `${url}${queryParams}${foodQuery}${app_id}${app_key}`;
    
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
  
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var response = JSON.stringify(xhr.response);
        $('#listed-recipes').html(response);
      }
    }
    
    xhr.open('GET', endpoint);
    xhr.send();
  }

  $('#search').click(function(event) {
      event.preventDefault();
      //while(recipesField.firstChild){
          //recipesField.removeChild(recipesField.firstChild);
      //}
      getResponse();
  })
});