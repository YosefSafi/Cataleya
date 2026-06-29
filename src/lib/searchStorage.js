const RECENT_KEY = "cattleya_recent_searches";
const MAX_RECENT = 10;

export function getRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addRecentSearch(query) {
  if (!query?.trim()) return;
  const existing = getRecentSearches().filter(s => s.toLowerCase() !== query.toLowerCase());
  const updated = [query, ...existing].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
}

export function clearRecentSearches() {
  localStorage.removeItem(RECENT_KEY);
}

export function getTrendingSearches() {
  return [
    "BPC-157 tendon recovery",
    "Semaglutide fat loss",
    "CJC-1295 Ipamorelin stack",
    "Tirzepatide vs Semaglutide",
    "Peptides for sleep",
    "IGF-1 LR3 muscle",
    "TB-500 healing",
    "Semax focus cognition",
  ];
}