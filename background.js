function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function CaptureVisibility(imageList, sendResponse) {
  return new Promise((resolve, reject) => {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (imageUrl) => {
      if (chrome.runtime.lastError) {
        console.error("Error capturing screenshot:", chrome.runtime.lastError.message);
        sendResponse({
          farewell: "Failed to take screenshot",
          error: chrome.runtime.lastError.message,
        });
        reject(chrome.runtime.lastError.message);
      } else if (!imageUrl) {
        console.error("Screenshot capture returned undefined URL.");
        sendResponse({
          farewell: "Screenshot capture returned undefined URL.",
        });
        reject("Screenshot capture returned undefined URL.");
      } else {
        console.log("Screenshot URL:", imageUrl);
        imageList.push(imageUrl);
        resolve();
      }
    });
  });
}


async function MultipleScreenShot(scrollCount, Display_Height,sendResponse) {
  var currentTop = 0;
  var imageList = [];
  var currentBottom = Display_Height;

  for (let index = 0; index < scrollCount; index++) {
    console.log("top", currentTop);
    console.log("bottom", currentBottom);

    await new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            action: "scroll",
            data: {
              top: currentTop,
              bottom: currentBottom,
            },
          },
          (res) => {
            resolve();
          }
        );
      });
    });

    await CaptureVisibility(imageList,sendResponse);

    await sleep(1000);

    currentTop = currentBottom;
    currentBottom += Display_Height;
  }

  sendResponse({ farewell: "Screenshots captured", imageList: imageList });
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "takeScreenshot") {
    console.log("Full Page Height:", message.Full_Height);
    console.log("Display Height:", message.Display_Height);
    const scrollCount = Math.ceil(message.Full_Height / message.Display_Height);
    console.log("Times to scroll:", scrollCount);
    MultipleScreenShot(scrollCount, message.Display_Height, sendResponse);
    return true; // Indicates that sendResponse will be called asynchronously
  }
});
