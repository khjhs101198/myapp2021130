let data = {
  name: "Jimmy",
  age: 20,
  hobbies: ["fishing", "eating", "hiking"],
  place: {
    country: "Taiwan",
    city: "Hinshue"
  }
};
$("button").on("click", function(){
  $.ajax({
    url: "/contact",
    data: JSON.stringify(data),
    type: "POST",
    contentType: "application/json"
  }).done(function(response){
    console.log("Success");
    console.log(response);
  }).fail(function(){
    console.log("Fail");
  });
});
