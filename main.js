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
  root.render(
    createElement(
      "article",
      ratingComponent({
        shipmentStatus,
        selectedRating: rating.getState().rating,
      }),
      { className: "rating", dataset: shipmentStatus }
    )
  );
  console.log(
    createElement(
      "article",
      ratingComponent({
        shipmentStatus,
        selectedRating: rating.getState().rating,
      }),
      { className: "rating", dataset: shipmentStatus }
    )
  );
  console.log(`first render or shipmentStatusChange: `, rating.getState());
}

function createElement(type, innerHTML, attributes) {
  const element = document.createElement(type);
  for (const key in attributes) {
    if (Object.hasOwnProperty.call(attributes, key)) {
      const value = attributes[key];
      if (key === "dataset") {
        element[key]["state"] = value;
      } else {
        element[key] = value;
      }
    }
  }
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
