var foodFactsURL = "https://world.openfoodfacts.org/api/2";
var foodFacts2 =
  "https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=fruits";

function search() {
  fetch(foodFacts2, { mode: "no-cors" }).then(function (results) {
    console.log(results);
    return results.json().then(function (data) {
      console.log(data);
    });
  });
}
$("#button").on("click", search());
