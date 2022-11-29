const SHIPMENT = {
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
};
function createRating({ postRating, onPostRatingResolve }) {
  const initialState = { rating: null, shipmentStatus: null };
  let shipmentChangeListener = () => {};

  onPostRatingResolve((status) => {
    if (status === SHIPMENT.fulfilled) {
      setShipmentStatus(SHIPMENT.fulfilled);
    }
  });

  function getState() {
    return initialState;
  }

  function setSelectedRating(rating) {
    initialState.rating = Number(rating);
  }
  function setShipmentStatus(status) {
    initialState.shipmentStatus = status;
    shipmentChangeListener();
  }
  function submitRating() {
    postRating(initialState.rating);
    setShipmentStatus(SHIPMENT.pending);
  }

  function onRatingShipmentChange(listener) {
    shipmentChangeListener = listener;
  }

  return {
    getState,

    setSelectedRating,
    submitRating,

    onRatingShipmentChange,
  };
}
// module.exports = createRating;
