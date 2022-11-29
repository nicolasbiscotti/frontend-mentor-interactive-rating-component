// should render the rating form for shipmentStatus null
const rating = createRating({
  postRating: () => {},
  onPostRatingResolve: () => {},
});
const ratingStates = document.querySelectorAll(".rating");

if (rating.getState().shipmentStatus === null) {
  ratingStates[1].style.display = "none";
  ratingStates[2].style.display = "none";
}

// should set the rating when the user select one
const ratingOptions = document.querySelectorAll("input");
ratingOptions.forEach((option) => (option.onchange = onOptionChange));

function onOptionChange(e) {
  rating.setSelectedRating(e.target.value);
  console.log(rating.getState());
}


