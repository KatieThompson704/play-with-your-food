function firstSearch(searchTerm) {
  var foodFactsURL = `https://us.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=fruits&json=true`;
  console.log(searchTerm);
  fetch(foodFactsURL)
    .then(function (results) {
      console.log(results);
      return results.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.products[0]);
      // brand_tags: Brand of Product
      console.log(data.products[0].brands_tags[0]);
      // product_name_en: Name of Product
      console.log(data.products[0].product_name_en);
      // Macronutrient Data Elements grams of Carbs(parent); grams of Sugar(child to parent Carbs);  total calories; total fat; grams of protein; Serving Size;
      console.log(
        "Carbohydrates: " +
          data.products[0].nutriments.carbohydrates +
          " " +
          data.products[0].nutriments.carbohydrates_unit
      );
      console.log(
        "Sugar: " +
          data.products[0].nutriments.sugars +
          " " +
          data.products[0].nutriments.sugars_unit
      );
      console.log(
        "Fiber: " +
          data.products[0].nutriments.fiber +
          " " +
          data.products[0].nutriments.fiber_unit
      );
      console.log("Serving Size: " + data.products[0].serving_size);
      console.log(
        "Calories: " +
          data.products[0].nutriments.energy_value +
          " " +
          data.products[0].nutriments.energy_unit
      );
      console.log(
        "Fat: " +
          data.products[0].nutriments.fat +
          " " +
          data.products[0].nutriments.fat_unit
      );
      console.log(
        "Proteins: " +
          data.products[0].nutriments.proteins +
          " " +
          data.products[0].nutriments.proteins_unit
      );

      // Additional data element: image of product
      console.log(
        "Product Image info: " + data.products[0].selected_images.front.thumb.en
      );
    });
}

function secondSearch(searchTerm) {
  var fruityViceURL = `https://fruityvice.com/api/fruit/${searchTerm}`;
  console.log(searchTerm);
  fetch(fruityViceURL, { method: "GET", mode: "no-cors" })
    .then(function (results) {
      console.log(results);
      return results.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

$("#srch-btn").on("click", function (event) {
  var searchTerm = $("#search-terms").val();
  event.preventDefault();
  firstSearch(searchTerm);
  secondSearch(searchTerm);
});
