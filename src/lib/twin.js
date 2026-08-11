// Set in Netlify (and .env.local for dev) once the digital twin is deployed.
// Left unset, every AI Twin entry point hides itself rather than linking
// nowhere.
export const TWIN_URL = import.meta.env.VITE_DIGITAL_TWIN_URL || "";
