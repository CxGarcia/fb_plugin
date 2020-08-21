chrome.webNavigation.onCompleted.addListener(
  function () {
    alert("hello!");
  },
  { url: [{ urlMatches: "https://*.facebank.pr/*" }] }
);
