// 1 should render the rating form for shipmentStatus null
// 2 should set the rating when the user selects one
// 3 should render only the loading state for shipmenStatus pending
// 4 Refactor --> define displayRatingState(shipmentStatus){}
// 5 should render only the thank you state for shipmentStatus fulfilled
// 6 should display the selected rating on thank you state render

const fakeBackend = (function () {
  let selfListener = () => {};

  function postRating() {
    setTimeout(() => selfListener("fulfilled"), 500);
  }
  function onPostRatingResolve(listener) {
    selfListener = listener;
  }

  return {
    postRating,
    onPostRatingResolve,
  };
})();

const rating = createRating(fakeBackend);

const ratingStates = document.querySelectorAll(".rating");
const ratingOptions = document.querySelectorAll("input");
const submitRating = document.querySelector("button");

rating.onRatingShipmentChange(() =>
  displayRatingState(rating.getState().shipmentStatus)
);

ratingOptions.forEach((option) => (option.onchange = onOptionChange));

submitRating.onclick = onSubmit;

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
  console.log(`first render or shipmentStatusChange: `, rating.getState());
}

function onOptionChange(e) {
  rating.setSelectedRating(e.target.value);
  console.log("Rating Option Selected: ", rating.getState());
}

function onSubmit(e) {
  e.preventDefault();
  rating.submitRating();
  console.log("Rating Submitted");
}
