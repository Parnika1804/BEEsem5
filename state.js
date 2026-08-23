const defaultState = {
  language: 'en',
  phone: null,
  otpVerified: false,
  abha: {
    linked: false,
    id: null
  },
  emergencyInfo: {
    bloodGroup: null,
    allergies: [],
    medications: [],
    contactName: null,
    contactPhone: null,
    lastUpdated: null
  },
  vault: [],
  auditLog: [],
  consentGranted: false
};

const STORAGE_KEY = 'pulsetag_state';

function getState() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);

    if (!savedState) {
      return defaultState;
    }

    return JSON.parse(savedState);
  } catch (error) {
    return defaultState;
  }
}

function updateState(patch) {
  const currentState = getState();

  const updatedState = {
    ...currentState,
    ...patch
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
  } catch (error) {
    // Storage unavailable; keep the updated state in memory for this call.
  }

  return updatedState;
}

function resetState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    // Storage unavailable; continue with the page reload.
  }

  window.location.reload();
}
