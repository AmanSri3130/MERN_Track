// Database Mock Repository Matrix Map for Product Tab Updates
const productDetailsMap = {
    'mf': {
        title: "Direct Mutual Funds investment",
        desc: "Invest in standard direct mutual funds zero commission infrastructure completely free of hidden pricing mechanics."
    },
    'stocks': {
        title: "Dematerialized Share Market Trading",
        desc: "Open direct zero account maintenance charge Demat access gates. Deploy instant stock buyout executions with low brokerage flat charges pricing structures."
    },
    'fd': {
        title: "High Yield Corporate Fixed Deposits",
        desc: "Lock liquidity safety shields within premier banking partner groups returning up to 8.55% structured premium yields safely."
    },
    'us-stocks': {
        title: "Global International Equities Portal",
        desc: "Own fractionated fractional balance holdings shares directly inside top market capitalization giants like Apple, Google or Tesla without extra outward remittance penalty margins."
    }
};

// DOM Node Element References Links Hookups
const tabCardsList = document.querySelectorAll('.tab-card');
const showcaseTitleNode = document.getElementById('showcase-title');
const showcaseDescNode = document.getElementById('showcase-desc');
const showcasePanelNode = document.getElementById('product-showcase-box');

const niftyPointsNode = document.getElementById('nifty-points');
const niftyChangeNode = document.getElementById('nifty-change');
const sensexPointsNode = document.getElementById('sensex-points');
const sensexChangeNode = document.getElementById('sensex-change');

// Tab Selection Change Controller Event routine
tabCardsList.forEach(card => {
    card.addEventListener('click', () => {
        // Clear active status styling tokens off all rows elements links layout
        tabCardsList.forEach(c => c.classList.remove('active'));
        
        // Append active status flags token directly on explicit event targeting element context pointer
        card.classList.add('active');
        
        const selectedProductKey = card.getAttribute('data-product');
        const contentModelData = productDetailsMap[selectedProductKey];

        // Trigger swift cross-fade visually mutating panel parameters metrics data text fields
        showcasePanelNode.style.opacity = 0.3;
        setTimeout(() => {
            showcaseTitleNode.textContent = contentModelData.title;
            showcaseDescNode.textContent = contentModelData.desc;
            showcasePanelNode.style.opacity = 1;
        }, 150);
    });
});

// Live Interactive Financial Ticker Data Generator Engine Algorithm Routine
function simulateLiveMarketFluctuationsTickSequence() {
    // Generate fractional random floating baseline delta metrics transforms parameters
    const niftyDeltaValue = (Math.random() * 4 - 1.95);
    const sensexDeltaValue = (Math.random() * 12 - 5.8);

    // Parse existing baseline element numeric properties context
    let currentNiftyPointsValue = parseFloat(niftyPointsNode.textContent.replace(/,/g, ''));
    let currentSensexPointsValue = parseFloat(sensexPointsNode.textContent.replace(/,/g, ''));

    // Compute updated point parameters safely
    currentNiftyPointsValue += niftyDeltaValue;
    currentSensexPointsValue += sensexDeltaValue;

    // Push converted values back out inside display formatting contexts layers
    niftyPointsNode.textContent = currentNiftyPointsValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    sensexPointsNode.textContent = currentSensexPointsValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Procedural formatting adjustment rule handlers mapping trends indicator displays
    updateTrendDisplayUIFields(niftyChangeNode, 182.35 + (currentNiftyPointsValue - 22147.60), 0.83);
    updateTrendDisplayUIFields(sensexChangeNode, 545.20 + (currentSensexPointsValue - 72831.95), 0.75);
}

function updateTrendDisplayUIFields(domNode, totalAbsoluteChange, baselinePercentageValue) {
    const isPositiveChange = totalAbsoluteChange >= 0;
    const computedPercentage = (baselinePercentageValue + (totalAbsoluteChange / 22000)).toFixed(2);
    
    if (isPositiveChange) {
        domNode.className = "index-trend positive";
        domNode.innerHTML = `<i class="fa-solid fa-caret-up"></i> +${totalAbsoluteChange.toFixed(2)} (${computedPercentage}%)`;
    } else {
        domNode.className = "index-trend negative";
        domNode.innerHTML = `<i class="fa-solid fa-caret-down"></i> ${totalAbsoluteChange.toFixed(2)} (${computedPercentage}%)`;
    }
}

// Set market fluctuation simulation loop engine timing cadence clock frequency markers values
setInterval(simulateLiveMarketFluctuationsTickSequence, 2500);

// Auxiliary interactive feature actions notification triggers setup
document.getElementById('auth-trigger').addEventListener('click', () => {
    alert("Groww Secure Single-Sign-On Central Security Authentication Token Gateways Activated.");
});

document.getElementById('start-invest-btn').addEventListener('click', () => {
    alert("Routing data profile stream context directly into KYC compliance verification wizard workflow.");
});

const searchFieldElement = document.getElementById('global-search');
searchFieldElement.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const queryText = searchFieldElement.value.trim();
        if (queryText) {
            alert(`Querying centralized equity index records directories databases metrics matching filters for: "${queryText}"`);
        }
    }
});