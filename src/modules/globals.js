module.exports = function globals() {
  const module = {
    isMobile: false,
    init: () => {
      module.isMobile = module.isHandheld();
      return module;
    },
    isHandheld() {
      var mediaQ = `screen and (max-width: 630px)`;
      return (
        window.matchMedia &&
        window.matchMedia(mediaQ) &&
        window.matchMedia(mediaQ).matches
      );
    },
  };

  return module;
};
