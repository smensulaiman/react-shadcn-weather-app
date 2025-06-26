import {API_CONFIG} from "@/networking/config.ts";
import type {Coordinates, ForecastResponse, GeocodingResponse, WeatherResponse} from "@/networking/types.ts";

class WeatherAPI {

    private createUrl(
        endpoint: string,
        params: Record<string, string | number>,
    ): string {

        const searchParams = new URLSearchParams({
            appid: API_CONFIG.API_KEY,
            ...params
        });

        return `${endpoint}?${searchParams.toString()}`;
    }

    private async fetchData<T>(url: string): Promise<T> {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Weather API Error: ${response.statusText}`);
        }

        return await response.json() as T;
    }

    public async getCurrentWeather(coordinates: Coordinates): Promise<WeatherResponse> {
        const url = this.createUrl(API_CONFIG.BASE_URL + 'weather', {
            lat: coordinates.latitude,
            lon: coordinates.longitude
        })

        return await this.fetchData<WeatherResponse>(url);
    }

    public async getCurrentForecast(coordinates: Coordinates): Promise<ForecastResponse> {
        const url = this.createUrl(API_CONFIG.BASE_URL + 'forecast', {
            lat: coordinates.latitude,
            lon: coordinates.longitude
        })

        return await this.fetchData<ForecastResponse>(url);
    }

    public async reverseGeocode(coordinates: Coordinates): Promise<GeocodingResponse[]> {
        const url = this.createUrl(API_CONFIG.BASE_URL_GEO + 'reverse', {
            lat: coordinates.latitude,
            lon: coordinates.longitude,
            limit: 1
        })

        return await this.fetchData<GeocodingResponse[]>(url);
    }
}

export const weatherApi = new WeatherAPI();