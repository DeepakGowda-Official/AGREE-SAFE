document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get(['criticalSentences', 'riskPoints'], function (data) {
    const criticalTermsDiv = document.getElementById('critical-terms');
    const criticalTerms = data.criticalSentences || [];
    const riskPoints = data.riskPoints || 0;

    if (criticalTerms.length > 0) {
      criticalTerms.forEach(term => {
        const termElement = document.createElement('p');
        termElement.textContent = term;
        criticalTermsDiv.appendChild(termElement);
      });
    } else {
      criticalTermsDiv.textContent = "No critical terms detected.";
    }

    let riskLevelText = "Safe";
    let riskWidth = "0%";

    if (riskPoints > 0 && riskPoints <= 3) {
      riskLevelText = "Low Risk";
      riskWidth = "25%";
    } else if (riskPoints > 3 && riskPoints <= 6) {
      riskLevelText = "Moderate Risk";
      riskWidth = "50%";
    } else if (riskPoints > 6) {
      riskLevelText = "High Risk";
      riskWidth = "75%";
    }

    document.getElementById('risk-level').textContent = `Risk Level: ${riskLevelText}`;
    document.getElementById('risk-indicator').style.width = riskWidth;
  });
});
