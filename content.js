// takes the screenshot url and downs it or displays it
const screenshotBtn = document.querySelector(".shotBtn");

screenshotBtn.addEventListener("click", () => {
  console.log("clicked");
  chrome.runtime.sendMessage({ action: "takeScreenshot" }, (response) => {
    if (response.imageUrl) {
      console.log("Url: ", response.imageUrl);
      //download img
      const downloadLink = document.createElement("a");
      downloadLink.href = response.imageUrl;
      downloadLink.download = "Screenshot.png";
      downloadLink.click();

      //display img
      const imgTag = document.createElement("img");
      imgTag.src = response.imageUrl;
      imgTag.style.width = "40px";
      imgTag.style.height = "40px";
      document.body.appendChild(imgTag);
    } else {
      console.error(response.farewell);
    }
  });
});
