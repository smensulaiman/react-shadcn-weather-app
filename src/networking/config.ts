export const API_CONFIG = {
    BASE_URL: "https://api.openweathermap.org/data/2.5/",
    BASE_URL_GEO: "https://api.openweathermap.org/geo/1.0/",
    API_KEY: import.meta.env.VITE_OPENWEATHWER_API_KEY,
    DEFAULT_PARAMS: {
        units: "metric",
        appid: import.meta.env.VITE_OPENWEATHWER_APP_ID,
    }
}