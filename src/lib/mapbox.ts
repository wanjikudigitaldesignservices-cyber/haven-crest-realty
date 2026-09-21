export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';

export const DEFAULT_CENTER = {
  lat: -1.286389,
  lng: 36.817223, // Nairobi Central
  zoom: 12,
};

export const NEIGHBORHOOD_COORDINATES: Record<string, { lat: number; lng: number }> = {
  karen: { lat: -1.3195, lng: 36.7065 },
  muthaiga: { lat: -1.2536, lng: 36.8317 },
  kitisuru: { lat: -1.2384, lng: 36.7725 },
  riverside: { lat: -1.2683, lng: 36.7964 },
};
