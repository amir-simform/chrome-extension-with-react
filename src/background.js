chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((req, sender, sendses) => {
    const { cmd } = req

    if (cmd == "message") {
        sendses({success: true})
    }

    return true
})