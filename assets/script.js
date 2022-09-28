function firstSearch(searchTerm) {
  var foodFactsURL = `https://us.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=fruits&json=true`;
  fetch(foodFactsURL)
    .then(function (results) {
      console.log(results);
      return results.json();
    })
    .then(function (data) {
      console.log(data);

      // Macronutrient Data Elements grams of Carbs(parent); grams of Sugar(child to parent Carbs);  total calories; total fat; grams of protein; Serving Size;
      var carbs = data.products[0].nutriments.carbohydrates;
      var carbsUnits = data.products[0].nutriments.carbohydrates_unit;
      var sugar = data.products[0].nutriments.sugars;
      var sugarUnits = data.products[0].nutriments.sugars_unit;
      var fiber = data.products[0].nutriments.fiber;
      var fiberUnits = data.products[0].nutriments.fiber_unit;
      var servingSize = data.products[0].serving_size;
      var cal = data.products[0].nutriments.energy_value;
      var calUnits = data.products[0].nutriments.energy_unit;
      var fat = data.products[0].nutriments.fat;
      var fatUnits = data.products[0].nutriments.fat_unit;
      var protein = data.products[0].nutriments.proteins;
      var proteinUnits = data.products[0].nutriments.proteins_unit;
      var thumbImage = data.products[0].selected_images.front.thumb.en;
      var nutritionalLabel = {
        carbohydrates: carbs + carbsUnits,
        sugar: sugar + sugarUnits,
        fiber: fiber + fiberUnits,
        serving_size: servingSize,
        calories: cal + calUnits,
        fat: fat + fatUnits,
        protein: protein + proteinUnits,
      };
      console.log(nutritionalLabel);
      // console.log(data.products[0]);
      // // brand_tags: Brand of Product
      // console.log(data.products[0].brands_tags[0]);
      // // product_name_en: Name of Product
      // console.log(data.products[0].product_name_en);
      // console.log("Carbohydrates: " + carbs + " " + carbsUnits);
      // console.log("Sugar: " + sugar + " " + sugarUnits);
      // console.log("Fiber: " + fiber + " " + fiberUnits);
      // console.log("Serving Size: " + servingSize);
      // console.log("Calories: " + cal + " " + calUnits);
      // console.log("Fat: " + fat + " " + fatUnits);
      // console.log("Proteins: " + protein + " " + proteinUnits);

      // Additional data element: image of product
      console.log("Product Image info: " + thumbImage);
    });
}
// TO DO: need to fix fetch call to resolve response error
// Get variables from Fruity Vice API
// Setup for loop for the random products pulled in foodfactsAPI
// Append results to display on page
// Review Grading criteria to check for additional functionality
function secondSearch(searchTerm) {
  var fruityViceURL = `https://cors-anywhere.herokuapp.com/https://fruityvice.com/api/fruit/${searchTerm}`;
  console.log(searchTerm);
  fetch(fruityViceURL)
    .then(function (results) {
      console.log(results);
      return results.json();
    })
    .then(function (data) {
      console.log(data);
      var order = data.order;
      var family = data.family;
      var genus = data.genus;
      var scientificFacts = {
        order: order,
        family: family,
        genus: genus,
      };
      console.log(scientificFacts);
    });
}

$("#srch-btn").on("click", function (event) {
  var searchTerm = $("#search-terms").val();
  event.preventDefault();
  firstSearch(searchTerm);
  secondSearch(searchTerm);
});
