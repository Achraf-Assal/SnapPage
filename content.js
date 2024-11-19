const pageHeight = document.documentElement.scrollHeight;
const displayHeight = window.innerHeight;

// Send height information to the background script
chrome.runtime.sendMessage({
  action: "takeScreenshot",
  Full_Height: pageHeight,
  Display_Height: displayHeight,
});