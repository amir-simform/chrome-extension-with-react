console.log("content script loaded")

chrome.runtime.sendMessage({ cmd: "message" }, function(res) {
    console.log(res)
})

fetch(fe)