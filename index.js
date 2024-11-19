document.getElementById("shotBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log("here");
        
      if (tabs.length === 0) {
        console.error("No active tabs found.");
        return;
      }
  
      const activeTabId = tabs[0].id;
  
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTabId },
          files: ["content.js"],
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error("Error injecting content script:", chrome.runtime.lastError.message);
            return;
          }
  
          console.log("Content script injected successfully.");
        }
      );
    });
  });
  