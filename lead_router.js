// ---------------------------------------------------------------------------
// 1. Quelle bestimmen (Mit Fallback-Logik für fehlende UTM-Parameter)
// ---------------------------------------------------------------------------
function quelleBestimmen(p) {
  const src = String(p.utm_source || "").toLowerCase();
  const landing = String(p.landingpage || "").toLowerCase();
  const form = String(p.formular || "").toLowerCase();

  // 1. Check Click IDs (Direct evidence of paid traffic)
  if (p.gclid || src.indexOf("google") > -1 || p.utm_medium === "cpc") {
    return "Google Ads";
  }
  if (p.fbclid || src.indexOf("facebook") > -1 || src.indexOf("instagram") > -1 || src.indexOf("meta") > -1) {
    return "Meta";
  }

  // 2. Check Portals & Referrals
  if (src.indexOf("aroundhome") > -1 || src.indexOf("daa") > -1 || form.indexOf("portal") > -1) {
    return "Leadportal";
  }
  if (src.indexOf("empfehlung") > -1) {
    return "Empfehlung";
  }

  // 3. Landing Page URL Fallbacks (When UTMs are stripped by browsers)
  if (landing.indexOf("/lp/waermepumpe-berlin") > -1 || landing.indexOf("/lp/foerderung-2026") > -1) {
    return "Google Ads";
  }
  if (landing.indexOf("/lp/heizung-tauschen") > -1) {
    return "Meta";
  }
  if (landing.indexOf("/ratgeber/") > -1 || landing.indexOf("/seo/") > -1) {
    return "SEO Agentur";
  }

  // Fallback default
  return "Website";
}