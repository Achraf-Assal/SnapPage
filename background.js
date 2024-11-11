// handles logic to screenshot webpage

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "takeScreenshot") {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (imageUrl) => {
      if (chrome.runtime.lastError) {
        console.error(
          "Error capturing screenshot:",
          chrome.runtime.lastError.message
        );
        sendResponse({
          farewell: "Failed to take screenshot",
          error: chrome.runtime.lastError.message,
        });
      } else if (!imageUrl) {
        console.error("Screenshot capture returned undefined URL.");
        sendResponse({
          farewell: "Screenshot capture returned undefined URL.",
        });
      } else {
        console.log("Screenshot URL:", imageUrl);
        sendResponse({ imageUrl: imageUrl });
      }
    });
    // async
    return true;
  }
});
