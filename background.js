let activeTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    trackTime();
    const tab = await chrome.tabs.get(activeInfo.tabId);
    activeTab = new URL(tab.url).hostname;
    startTime = Date.now();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        checkBlockedSite(tab);
    }
});

function trackTime() {
    if (activeTab && startTime) {
        const timeSpent = Date.now() - startTime;

        fetch("http://localhost:5000/api/activity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                domain: activeTab,
                timeSpent
            })
        });
    }
}

async function checkBlockedSite(tab) {
    const response = await fetch("http://localhost:5000/api/user/blocked-sites");
    const blockedSites = await response.json();

    const hostname = new URL(tab.url).hostname;

    if (blockedSites.includes(hostname)) {
        chrome.tabs.update(tab.id, {
            url: "https://www.google.com"
        });
    }
}
