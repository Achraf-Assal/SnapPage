
function CaptureVisibility (imageList){
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
      // sendResponse({ imageUrl: imageUrl });
      imageList.push(imageUrl)
    }
  });

} 

function MultipleScreenShot(scrollCount,Display_Height) {
  var currentTop = 0
  var imageList = [];
  var currentBottom = Display_Height;
  for (let index = 0; index < scrollCount; index++) {
    window.scroll(currentTop,currentBottom)
    CaptureVisibility(imageList)
    currentTop = currentBottom;
    currentBottom += Display_Height;
  }
  console.log(imageList);
  
}


chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "takeScreenshot") {
    console.log("Full Page Height:", message.Full_Height);
    console.log("Full Page Height:", message.Display_Height);
    const scrollCount = Math.ceil(message.Full_Height / message.Display_Height);
    console.log("times to scroll :", scrollCount);
    MultipleScreenShot(scrollCount,message.Display_Height)
    return true;
  }
});
