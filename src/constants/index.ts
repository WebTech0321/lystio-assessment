export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
export const BASE_URL = "https://api.lystio.co/";

export const DEFAULT_LOCATION = {
  latitude: 32.711483,
  longitude: -117.161052,
};

export const AMENTITIES: {
  [key: string]: { title: string; highlight?: boolean };
} = {
  "1": {
    title: "Fitnessraum",
    highlight: true,
  },
  "2": {
    title: "Paketservice",
  },
  "3": {
    title: "Waschräume",
    highlight: true,
  },
  "4": {
    title: "Kontrollierter Zugang",
  },
  "5": {
    title: "Wartung vor Ort",
  },
  "6": {
    title: "Hausverwaltung nahe",
  },
  "7": {
    title: "Pförtner",
  },
  "8": {
    title: "Concierge",
    highlight: true,
  },
  "9": {
    title: "24-Stunden-Zugang",
  },
  "10": {
    title: "Einzellhandel vor Ort",
  },
  "11": {
    title: "Recycling",
  },
  "12": {
    title: "Online-Dienste",
  },
  "13": {
    title: "Gesundheitsclub-Rabatt",
  },
  "14": {
    title: "Aufzug",
    highlight: true,
  },
  "15": {
    title: "Lagerraum",
  },
  "16": {
    title: "Müllraum",
  },
  "17": {
    title: "Fitnessstudio",
  },
  "18": {
    title: "Innenhof",
  },
  "19": {
    title: "Geschirrspüler",
  },
  "20": {
    title: "Highspeed-Internetzugang",
    highlight: true,
  },
  "21": {
    title: "Parkettböden",
    highlight: true,
  },
  "22": {
    title: "Rollstuhlgerecht",
  },
  "23": {
    title: "Rauchfrei",
  },
  "24": {
    title: "Kabelanschluss bereit",
  },
  "25": {
    title: "Klimaanlage",
  },
  "26": {
    title: "Sicherheitssystem",
  },
  "27": {
    title: "Badewanne/Dusche",
  },
  "28": {
    title: "Edelstahlgeräte",
  },
  "29": {
    title: "Küche",
  },
  "30": {
    title: "Mikrowelle",
  },
  "31": {
    title: "Herd",
  },
  "32": {
    title: "Begehbare Kleiderschränke",
  },
  "33": {
    title: "Fensterabdeckungen",
  },
  "34": {
    title: "Terasse",
  },
  "35": {
    title: "Klimaanlage",
    highlight: true,
  },
  "36": {
    title: "Hohe Sicherheit",
    highlight: true,
  },
};
