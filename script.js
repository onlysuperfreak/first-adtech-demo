const leadForm = document.querySelector("#leadForm");
const formStatus = document.querySelector("#formStatus");
const showLeadsButton = document.querySelector("#showLeadsButton");
const clearLeadsButton = document.querySelector("#clearLeadsButton");
const leadDashboard = document.querySelector("#leadDashboard");
const dashboardTotal = document.querySelector("#dashboardTotal");
const leadsByService = document.querySelector("#leadsByService");
const leadsBySource = document.querySelector("#leadsBySource");
const savedLeads = document.querySelector("#savedLeads");
const leadsStorageKey = "bronxProRenovationsLeads";
const trackingStorageKey = "bronxProRenovationsTracking";
const trackedUtmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];

// Reads the current page URL and pulls out supported UTM tracking parameters.
const getUtmValuesFromUrl = () => {
  const params = new URLSearchParams(window.location.search);

  return trackedUtmKeys.reduce((utmValues, key) => {
    const value = params.get(key);

    if (value) {
      utmValues[key] = value.trim();
    }

    return utmValues;
  }, {});
};

// Saves UTM values from the URL so attribution is available when the form is submitted later.
const storeUtmValues = () => {
  const utmValues = getUtmValuesFromUrl();

  if (Object.keys(utmValues).length === 0) {
    return;
  }

  localStorage.setItem(trackingStorageKey, JSON.stringify({
    ...utmValues,
    capturedAt: new Date().toISOString(),
  }));
};

// Returns stored UTM data, or a direct/unknown fallback when no ad parameters were captured.
const getStoredTracking = () => {
  try {
    const storedTracking = JSON.parse(localStorage.getItem(trackingStorageKey));

    if (storedTracking && Object.keys(storedTracking).length > 0) {
      return storedTracking;
    }
  } catch (error) {
    console.warn("Could not read tracking data from localStorage.", error);
  }

  return {
    utm_source: "direct/unknown",
    utm_medium: "direct/unknown",
    utm_campaign: "direct/unknown",
    utm_content: "direct/unknown",
    capturedAt: null,
  };
};

// Creates the short traffic-source label shown in the saved-leads admin demo.
const formatTrafficSource = (tracking) => {
  const source = tracking?.utm_source || "direct/unknown";
  const medium = tracking?.utm_medium || "direct/unknown";
  const campaign = tracking?.utm_campaign || "";

  if (source === "direct/unknown" && medium === "direct/unknown") {
    return "direct/unknown";
  }

  return [source, medium, campaign].filter(Boolean).join(" / ");
};

const getSavedLeads = () => {
  try {
    return JSON.parse(localStorage.getItem(leadsStorageKey)) || [];
  } catch (error) {
    console.warn("Could not read saved leads from localStorage.", error);
    return [];
  }
};

// Adds the newest lead to the top of the demo lead list in localStorage.
const saveLead = (lead) => {
  const leads = getSavedLeads();
  leads.unshift(lead);
  localStorage.setItem(leadsStorageKey, JSON.stringify(leads));
};

// Clears only the saved lead demo data, leaving any captured UTM visit data intact.
const clearSavedLeads = () => {
  localStorage.removeItem(leadsStorageKey);
};

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const setStatus = (message, type) => {
  if (!formStatus) return;

  formStatus.textContent = message;
  formStatus.className = `form-status form-status-${type}`;
};

const clearFieldStates = () => {
  leadForm.querySelectorAll("[aria-invalid='true']").forEach((field) => {
    field.removeAttribute("aria-invalid");
  });
};

// Groups leads into simple counts for dashboard cards, such as service or traffic source.
const countBy = (items, getLabel) => items.reduce((counts, item) => {
  const label = getLabel(item) || "Unknown";
  counts[label] = (counts[label] || 0) + 1;
  return counts;
}, {});

// Renders one dashboard breakdown list with a label and count for each row.
const renderBreakdown = (container, counts) => {
  if (!container) return;

  const entries = Object.entries(counts).sort((first, second) => second[1] - first[1]);

  if (entries.length === 0) {
    container.innerHTML = "<p>No data yet.</p>";
    return;
  }

  container.innerHTML = entries
    .map(([label, count]) => `
      <div class="dashboard-row">
        <span>${escapeHtml(label)}</span>
        <strong>${count}</strong>
      </div>
    `)
    .join("");
};

// Shows the most recent lead details in the dashboard without exposing raw storage JSON.
const renderSavedLeads = () => {
  if (!savedLeads) return;

  const leads = getSavedLeads();

  if (leads.length === 0) {
    savedLeads.innerHTML = "<p>No recent leads yet. Submit the quote form to add one.</p>";
    return;
  }

  savedLeads.innerHTML = leads
    .slice(0, 5)
    .map((lead, index) => `
      <article class="saved-lead-card">
        <h3>${escapeHtml(lead.name)}</h3>
        <dl>
          <div><dt>Phone</dt><dd>${escapeHtml(lead.phone)}</dd></div>
          <div><dt>Email</dt><dd>${escapeHtml(lead.email || "Not provided")}</dd></div>
          <div><dt>Service</dt><dd>${escapeHtml(lead.service)}</dd></div>
          <div><dt>Zip</dt><dd>${escapeHtml(lead.zip)}</dd></div>
          <div><dt>Traffic Source</dt><dd>${escapeHtml(formatTrafficSource(lead.tracking))}</dd></div>
          <div><dt>Submitted</dt><dd>${new Date(lead.submittedAt).toLocaleString()}</dd></div>
        </dl>
        <p>${escapeHtml(lead.message)}</p>
      </article>
    `)
    .join("");
};

// Updates the owner-style dashboard summary from whatever leads are currently saved.
const renderDashboard = () => {
  if (!leadDashboard) return;

  const leads = getSavedLeads();
  leadDashboard.hidden = false;

  if (dashboardTotal) {
    dashboardTotal.innerHTML = `
      <span>Total leads</span>
      <strong>${leads.length}</strong>
      <p>${leads.length === 1 ? "1 homeowner has requested an estimate." : `${leads.length} homeowners have requested estimates.`}</p>
    `;
  }

  renderBreakdown(leadsByService, countBy(leads, (lead) => lead.service));
  renderBreakdown(leadsBySource, countBy(leads, (lead) => formatTrafficSource(lead.tracking)));
  renderSavedLeads();
};

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearFieldStates();

    const formData = new FormData(leadForm);
    const lead = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      service: String(formData.get("service") || "").trim(),
      zip: String(formData.get("zip") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      tracking: getStoredTracking(),
      submittedAt: new Date().toISOString(),
    };

    const requiredFields = ["name", "phone", "service", "zip", "message"];
    const missingFields = requiredFields.filter((fieldName) => !lead[fieldName]);

    // Custom validation keeps the demo message styled consistently instead of using browser popups.
    if (missingFields.length > 0) {
      missingFields.forEach((fieldName) => {
        leadForm.elements[fieldName]?.setAttribute("aria-invalid", "true");
      });

      setStatus("Please fill out your name, phone, service needed, zip code, and project details.", "error");
      leadForm.elements[missingFields[0]]?.focus();
      return;
    }

    saveLead(lead);
    console.log("New Bronx Pro Renovations lead:", lead);

    setStatus(`Thanks, ${lead.name.split(" ")[0]}. Your ${lead.service.toLowerCase()} estimate request has been saved.`, "success");
    leadForm.reset();

    if (leadDashboard && !leadDashboard.hidden) {
      renderDashboard();
    }
  });
}

if (showLeadsButton) {
  showLeadsButton.addEventListener("click", renderDashboard);
}

if (clearLeadsButton) {
  clearLeadsButton.addEventListener("click", () => {
    clearSavedLeads();
    renderDashboard();
  });
}

storeUtmValues();

document.querySelectorAll(".faq-list details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;

    document.querySelectorAll(".faq-list details").forEach((otherDetail) => {
      if (otherDetail !== detail) {
        otherDetail.removeAttribute("open");
      }
    });
  });
});
