function thankYouState({ selectedRating }) {
  return `
  <div class="grid-group center-content" data-illustration="thank-you">
  </div>
  
  <div class="grid-group center-content">
  <p class="rating__summary-choice">
    You selected ${selectedRating}
    out of 5
  </p>
  </div>
  
  <h1 class="text-center">Thank you!</h1>
  <p class="text-center">
  We appreciate you taking the time to give a rating. If you ever need
  more support, don’t hesitate to get in touch!
  </p>`;
}
