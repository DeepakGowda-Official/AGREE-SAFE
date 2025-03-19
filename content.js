const keywords = ["ban", "penalty", "restriction", "liability", "suspend", "terminate", "data sharing", "privacy breach", "claim", "lawsuit", "limited liability", "non-transferable", "non-exclusive", "intellectual property", "trademark", "copyright", "no modification", "prohibited", "confusingly similar", "violation of law", "confidential", "proprietary", "disclosure", "trade secrets", "request for approval", "express written consent", "prior approval", "terminate permission", "revocable"];
const riskKeywords = ["ban", "penalty", "liability", "suspend", "terminate", "claim", "lawsuit", "limited liability", "no modification", "non-transferable", "non-exclusive", "request for approval", "revocable"];

function analyzeDocument() {
  let bodyText = document.body.innerText;
  let criticalSentences = [];
  let riskPoints = 0;

  keywords.forEach(keyword => {
    let regex = new RegExp(`([^.]*\\b${keyword}\\b[^.]*\\.)`, 'gi');
    let matches = bodyText.match(regex);
    if (matches) {
      matches.forEach(sentence => {
        criticalSentences.push(sentence);
      });
    }
  });

  riskPoints = criticalSentences.filter(sentence => riskKeywords.some(keyword => sentence.toLowerCase().includes(keyword))).length;

  if (criticalSentences.length > 0) {
    chrome.storage.local.set({ criticalSentences: criticalSentences, riskPoints: riskPoints });
  } else {
    chrome.storage.local.set({ criticalSentences: ["No critical terms detected."], riskPoints: 0 });
  }

  highlightText(criticalSentences);
}

function highlightText(criticalSentences) {
  let body = document.body.innerHTML;
  criticalSentences.forEach(sentence => {
    let highlightedSentence = `<span style="background-color: yellow">${sentence}</span>`;
    body = body.replace(sentence, highlightedSentence);
  });
  document.body.innerHTML = body;
}

analyzeDocument();
