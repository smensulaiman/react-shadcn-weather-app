export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

export interface List {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: {
        all: number;
    };
    wind: Wind;
    visibility: number;
    pop: number;
    rain: {
        "3h": number;
    };
    sys: {
        pod: string;
    };
    dt_txt: Date;
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

export interface LocalNames {
    en?: string
}

export interface WeatherResponse {
    coord: {
        lon: number;
        lat: number;
    };
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    rain: {
        "1h": number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface ForecastResponse {
    cod: string;
    message: number;
    cnt: number;
    list: List[];
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}

export interface GeocodingResponse {
    name: string;
    local_names: LocalNames;
    lat: number;
    lon: number;
    country: string;
}