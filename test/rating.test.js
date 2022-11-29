const createRating = require("../rating");

describe("Rating Test", () => {
  it("should return the initial state", () => {
    const rating = createRating({
      postRating: () => {},
      onPostRatingResolve: () => {},
    });
    expect(rating.getState()).toEqual({ rating: null, shipmentStatus: null });
  });

  it("should change the selected rating", () => {
    const rating = createRating({
      postRating: () => {},
      onPostRatingResolve: () => {},
    });
    rating.setSelectedRating("4");
    expect(rating.getState().rating).toEqual(4);
  });

  it("should change the shipment status", () => {
    const rating = createRating({
      postRating: () => {},
      onPostRatingResolve: () => {},
    });
    rating.setSelectedRating("4");
    rating.submitRating();
    expect(rating.getState().shipmentStatus).toEqual("pending");
  });

  it("should notify that the rating shipment is pending", () => {
    let count = 0;
    function listener() {
      count++;
    }
    const rating = createRating({
      postRating: () => {},
      onPostRatingResolve: () => {},
    });
    rating.onRatingShipmentChange(listener);
    rating.setSelectedRating("4");
    rating.submitRating();
    expect(count).toEqual(1);
  });

  it("should send the rating to the backend", () => {
    let count = 0;
    function postRating(rating) {
      if (typeof rating === "number") {
        count++;
      }
    }
    const rating = createRating({ postRating, onPostRatingResolve: () => {} });
    rating.setSelectedRating(5);
    rating.submitRating();
    expect(count).toEqual(1);
  });

  it("should listen to the post rating resolution", () => {
    let count = 0;
    let postRatingResolveListener = () => {};

    function onPostRatingResolve(listener) {
      if (typeof listener === "function") {
        count++;
        postRatingResolveListener = listener;
      }
    }

    const rating = createRating({ postRating: () => {}, onPostRatingResolve });
    expect(count).toEqual(1);

    postRatingResolveListener("fulfilled");
    expect(rating.getState().shipmentStatus).toEqual("fulfilled");
  });
});
