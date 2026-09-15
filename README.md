# GTM Engineering & Revenue Attribution Pipeline Automation

Architected a production-grade pipeline to solve critical data leakage in business processes, replacing fragile filters with custom JavaScript routing logic and automation scripts to clean and structure operational datasets.

---

## 🏗️ Architecture Overview
The pipeline functions as a reliable, two-step automation engine designed to catch incoming lead webhooks and accurately attribute revenue sources, even when browser tracking parameters (UTMs) are stripped or blocked.

## ⚙️ Core Features & Attribution Logic
Standard marketing setups fail when UTM parameters are dropped due to privacy tools or browser settings. This pipeline introduces a **Multi-Tier Fallback Hierarchy**:
1. **Tier 1 (Direct Click IDs):** Evaluates `gclid`, `fbclid`, or explicit UTM parameters (`cpc`).
2. **Tier 2 (Portals & Referrals):** Scans source identifiers and form types for third-party lead sources.
3. **Tier 3 (URL Path Fallback):** Intelligently parses landing page strings (e.g., `/lp/waermepumpe-berlin` or `/ratgeber/`) to accurately map leads back to their correct marketing channel when tracking data is absent.

## 🛠️ Tech Stack
* **Automation:** Zapier (Webhooks & Code steps)
* **Scripting:** JavaScript (ES6)
* **Data Flow & Validation:** JSON-based mock payload testing

## 🚀 How to Run / Test Locally
You can test the core routing function independently using Node.js:

```javascript
const { quelleBestimmen } = require('./src/lead_router.js');

const samplePayload = { landingpage: "/lp/waermepumpe-berlin" };
console.log(quelleBestimmen(samplePayload)); // Output: Google Ads
