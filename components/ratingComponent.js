function ratingComponent({ shipmentStatus, selectedRating }) {
  let rating = "";
  if (shipmentStatus === SHIPMENT.inactive) {
    rating = inactiveState();
  } else if (shipmentStatus === SHIPMENT.pending) {
    rating = loadingState();
  } else if (shipmentStatus === SHIPMENT.fulfilled) {
    rating = thankYouState({ selectedRating });
  }
  return rating;
}

function inactiveState() {
  return `
    <div class="circle" data-icon="star">
    </div>

    <h1>How did we do?</h1>

    <p>
    Please let us know how we did with your support request. All feedback
    is appreciated to help us improve our offering!
    </p>

    ${form()}
    `;
}

function form() {
  const options = [1, 2, 3, 4, 5];

  return `
    <form class="rating__form grid-group" action="#">
      <fieldset class="flex-group-space-b">
        <legend class="none-displayed-element">Select a rating:</legend>

        ${options.map((number) => ratingOption({ number })).join("")}
        
      </fieldset>

      <button class="button">Submit</button>
    </form>`;
}

function ratingOption({ number }) {
  return `
  <input
    class="none-displayed-element"
    type="radio"
    name="rating"
    value="${number}"
    id="${number}"
  />
  <label class="rating__number circle" for="${number}">${number}</label>
  `;
}
