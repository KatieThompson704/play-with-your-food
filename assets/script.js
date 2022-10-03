var searchTermArray = JSON.parse(localStorage.getItem("searchTerms")) || [];
var searchHistory = $("#search-history");

async function firstSearch(searchTerm) {
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
      var productName = data.products[0].product_name_en;
      var brand = data.products[0].brands_tags[0];
      var nutritionalLabel = {
        carbohydrates: carbs + carbsUnits,
        sugar: sugar + sugarUnits,
        fiber: fiber + fiberUnits,
        serving_size: servingSize,
        calories: cal + calUnits,
        fat: fat + fatUnits,
        protein: protein + proteinUnits,
        product_name: productName,
        brand: brand,
      };
      console.log(nutritionalLabel);
      displayNutritionLabel(nutritionalLabel);
    });
}

async function secondSearch(searchTerm) {
  console.log(searchTerm);
  var fruityViceURL = `https://cors-anywhere.herokuapp.com/https://fruityvice.com/api/fruit/${searchTerm}`;
  console.log(searchTerm);
  fetch(fruityViceURL, {
    mode: "cors",
  })
    .then(function (results) {
      console.log(results);
      return results.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.error) {
        console.log("No Food Facts found for " + searchTerm);
        // initialize modal element
        var modalEl = document.createElement("div");
        modalEl.setAttribute("id", "modal-element");
        modalEl.textContent =
          "OOPS! The word you searched, " +
          searchTerm +
          ", is not a fruit! Please try again.";
        // show modal
        mui.overlay("on", modalEl);
      } else {
        var order = data.order;
        var family = data.family;
        var genus = data.genus;
        var scientificFacts = {
          order: order,
          family: family,
          genus: genus,
        };
        console.log(scientificFacts);
        displayScience(scientificFacts);
      }
    });
}

function displayNutritionLabel(nutritionalLabel) {
  $("#product-name").text(nutritionalLabel.product_name);
  $("#product-brand").text(nutritionalLabel.brand);
  $("#serving-size").text(nutritionalLabel.serving_size);
  $("#calories").text(nutritionalLabel.calories);
  $("#total-fat").text(nutritionalLabel.fat);
  $("#carbohydrates").text(nutritionalLabel.carbohydrates);
  $("#sugar").text(nutritionalLabel.sugar);
  $("#fiber").text(nutritionalLabel.fiber);
  $("#protein").text(nutritionalLabel.protein);
  $("prod-image").attr("src", nutritionalLabel.prod_image);
}

function logSearch() {
  console.log(searchTermArray);
  // var searchHistory = $("#search-history");
  searchTermArray.forEach(function (searchTerm) {
    var foodButton = $("<button>")
      .attr("id", "history-button")
      .addClass("mui-btn mui-btn--raised mui-btn--primary");
    foodButton.text(searchTerm);
    foodButton.attr("value", searchTerm);
    foodButton.click(async function () {
      firstSearch(this.value).then(secondSearch(this.value));
    });
    searchHistory.append(foodButton);
  });
}

function displayScience(scientificFacts) {
  $("#order").text(scientificFacts.order);
  $("#family").text(scientificFacts.family);
  $("#genus").text(scientificFacts.genus);
}

$("#srch-btn").on("click", function (event) {
  var searchTerm = $("#search-terms").val();
  event.preventDefault();
  if (searchTermArray.indexOf(searchTerm) === -1) {
    searchTermArray.push(searchTerm);
    localStorage.setItem("searchTerms", JSON.stringify(searchTermArray));
    // add button for searched term
    var foodButton = $("<button>")
      .attr("id", "history-button")
      .addClass("mui-btn mui-btn--raised mui-btn--primary");
    foodButton.text(searchTerm);
    foodButton.attr("value", searchTerm);
    foodButton.click(async function () {
      firstSearch(this.value).then(secondSearch(this.value));
    });
    searchHistory.append(foodButton);
  }
  firstSearch(searchTerm).then(secondSearch(searchTerm));
});

logSearch();
