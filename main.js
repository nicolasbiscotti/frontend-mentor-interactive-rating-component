// 1 should render the rating form for shipmentStatus null
// 2 should set the rating when the user selects one
// 3 should render only the loading state for shipmenStatus pending
// 4 should render only the thank you state for shipmentStatus fulfilled
// 5 should display the selected rating on thank you state render

const rating = createRating(fakeBackend);

const main = document.querySelector("main");

const root = (function (element) {
  function render(child) {
    while (element.firstChild) {
      element.removeChild(element.lastChild);
    }
    element.append(child);
  }

  return { render };
})(main);

renderRatingState(rating.getState().shipmentStatus);
const ratingOptions = document.querySelectorAll("input");
const submitRating = document.querySelector("button");

rating.onRatingShipmentChange(() =>
  renderRatingState(rating.getState().shipmentStatus)
);

ratingOptions.forEach((option) => (option.onchange = onOptionChange));

submitRating.onclick = onSubmit;

function renderRatingState(shipmentStatus) {
  if (shipmentStatus === SHIPMENT.inactive) {
    root.render(createElement("article", "rating", ratingFormState()));
  } else if (shipmentStatus === SHIPMENT.pending) {
    root.render(createElement("article", "rating", loadingState()));
  } else if (shipmentStatus === SHIPMENT.fulfilled) {
    root.render(
      createElement(
        "article",
        "rating",
        thankYouState({ selectedRating: rating.getState().rating })
      )
    );
  }
  console.log(`first render or shipmentStatusChange: `, rating.getState());
}

function createElement(type, className, innerHTML) {
  const element = document.createElement(type);
  element.className = className;
  element.innerHTML = innerHTML;
  return element;
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
