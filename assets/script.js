function search(searchTerm) {
  var foodFacts2 = `https://us.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=fruits&json=true`;
  console.log(searchTerm);
  fetch(foodFacts2)
    .then(function (results) {
      console.log(results);
      return results.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.products[0]);
      console.log(data.products[0].brands_tags[0]);
      console.log(data.products[0].product_name_en);
    });
}
$("#srch-btn").on("click", function (event) {
  var searchTerm = $("#search-terms").val();
  event.preventDefault();
  search(searchTerm);
});
