var foodFactsURL = "https://world.openfoodfacts.org/api/2";
// var foodFacts2 =
//   "https://world.openfoodfacts.org/api/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=fruits";
var searchTerm = $("#search-terms").val();
var foodFacts2 = `https://us.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=fruits&json=true`;

function search() {
  fetch(foodFacts2)
    .then(function (results) {
      console.log(results);
      return results.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

$("#button").on("click", search());
