const url = 'https://api.edamam.com/search?'
const queryParams = 'q=';
const app_id = '&app_id=d4183916';
const app_key = '&app_key=9b4713aba7e3dc1fa7798b2bfdf237da'
var count = 0;

$(document).ready(function() {
  const renderResponse = (res) => {
    var arrayLength = res.hits.length;
    for (var i = 0; i < arrayLength; i += 3) {
      var label = JSON.stringify(res.hits[i].recipe.label);
      var yield = JSON.stringify(res.hits[i].recipe.yield);
      var calories = JSON.stringify(res.hits[i].recipe.calories);
      var weight = JSON.stringify(res.hits[i].recipe.totalWeight);
      var ingredients = JSON.stringify(res.hits[i].recipe.ingredients);
      var dietLabels = JSON.stringify(res.hits[i].recipe.dietLabels);
      recipeNum = count + 1;
      $('#listed-recipes').append('<div id="recipe' + recipeNum + '"><div class="name">' + label + '</div> <div class="yield">' + yield + '</div> <div class="ingredients">' + ingredients + '</div> <div class="calories">' + calories + '</div><div class="weight">' + weight + '</div><div class="diet-labels">' + dietLabels + '</div></div>');
      count++;
    }
  };
  const getResponse = () => {
    const foodQuery = $('#searchbox').val();
    const endpoint = `${url}${queryParams}${foodQuery}${app_id}${app_key}`;
    
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
  
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        renderResponse(xhr.response);
      }
    }
    
    xhr.open('GET', endpoint);
    xhr.send();
  }

  $('#search').click(function(event) {
      event.preventDefault();
      if(count > 0) {
        var i = 1;
        while(i <= count) {
          $('#recipe' + i)[0].remove();
          i++;
        }
        count = 0;
      }
      getResponse();
  })
});