let postRatingResolveListener = () => {};
// should render the rating form for shipmentStatus null
const rating = createRating({
  postRating: () => {},
  onPostRatingResolve,
});
const ratingStates = document.querySelectorAll(".rating");

// should set the rating when the user selects one
const ratingOptions = document.querySelectorAll("input");
ratingOptions.forEach((option) => (option.onchange = onOptionChange));

// should render only the loading state for shipmenStatus pending
const submitRating = document.querySelector("button");
submitRating.onclick = onSubmit;

rating.onRatingShipmentChange(() =>
  displayRatingState(rating.getState().shipmentStatus)
);

// should render only the thank you state for shipmentStatus fulfilled
function onPostRatingResolve(listener) {
  postRatingResolveListener = listener;
}
// Refactor --> define displayRatingState(shipmentStatus){}
displayRatingState(rating.getState().shipmentStatus);

// dicovered functions
function displayRatingState(shipmentStatus) {
  if (shipmentStatus === null) {
    ratingStates[1].style.display = "none";
    ratingStates[2].style.display = "none";
  } else if (shipmentStatus === SHIPMENT.pending) {
    ratingStates[0].style.display = "none";
    ratingStates[1].style.display = "";
    ratingStates[2].style.display = "none";
  } else if (shipmentStatus === SHIPMENT.fulfilled) {
    ratingStates[0].style.display = "none";
    ratingStates[1].style.display = "none";
    ratingStates[2].style.display = "";
  }
  console.log(rating.getState());
}

function onOptionChange(e) {
  rating.setSelectedRating(e.target.value);
  console.log(rating.getState());
}

function onSubmit(e) {
  e.preventDefault();
  rating.submitRating();
  console.log("Rating Submitted");
}
