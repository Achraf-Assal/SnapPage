const pageHeight = document.documentElement.scrollHeight;
const displayHeight = window.innerHeight;

// Send height information to the background script
chrome.runtime.sendMessage({
  action: "takeScreenshot",
  Full_Height: pageHeight,
  Display_Height: displayHeight,
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scroll") {
    const { top, bottom } = message.data;
    window.scrollTo({
      top: top,
      behavior: "instant", // Ensures instant scroll without animation
    });
    sendResponse({ success: true });
  }
});