chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({ criticalSentences: [], riskPoints: 0 });
  });
  
