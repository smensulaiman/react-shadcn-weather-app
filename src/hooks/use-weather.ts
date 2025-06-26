import type {Coordinates, ForecastResponse, GeocodingResponse, WeatherResponse} from "@/networking/types.ts";
import {useQuery} from "@tanstack/react-query";
import {weatherApi} from "@/networking/weater.ts";

export const WEATHER_KEYS = {
    weather: function (coordinates: Coordinates) {
        return ["weather", coordinates] as const;
    },
    forecast: function (coordinates: Coordinates) {
        return ["forecast", coordinates] as const;
    },
    location: function (coordinates: Coordinates) {
        return ["location", coordinates] as const;
    }
}

export function useWeatherQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? {latitude: 0, longitude: 0} as Coordinates),
        queryFn: function (): Promise<WeatherResponse> | null {
            return coordinates ? weatherApi.getCurrentWeather(coordinates) : null
        },
        enabled: !!coordinates, //if coordinate is null, it will be false
    })
}

export function useForecastQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.forecast(coordinates ?? {latitude: 0, longitude: 0} as Coordinates),
        queryFn: function (): Promise<ForecastResponse> | null {
            return coordinates ? weatherApi.getCurrentForecast(coordinates) : null
        },
        enabled: !!coordinates,
    })
}

export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates ?? {latitude: 0, longitude: 0} as Coordinates),
        queryFn: function (): Promise<GeocodingResponse[]> | null {
            return coordinates ? weatherApi.reverseGeocode(coordinates) : null
        },
        enabled: !!coordinates,
    })
}