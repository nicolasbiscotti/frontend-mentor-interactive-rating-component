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
    <div class="circle">
      <svg width="17" height="16" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m9.067.43 1.99 4.031c.112.228.33.386.58.422l4.45.647a.772.772 0 0 1 .427 1.316l-3.22 3.138a.773.773 0 0 0-.222.683l.76 4.431a.772.772 0 0 1-1.12.813l-3.98-2.092a.773.773 0 0 0-.718 0l-3.98 2.092a.772.772 0 0 1-1.119-.813l.76-4.431a.77.77 0 0 0-.222-.683L.233 6.846A.772.772 0 0 1 .661 5.53l4.449-.647a.772.772 0 0 0 .58-.422L7.68.43a.774.774 0 0 1 1.387 0Z"
          fill="#FC7614"
        />
      </svg>
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
