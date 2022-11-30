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
