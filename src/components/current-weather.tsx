import type {GeocodingResponse, WeatherResponse} from "@/networking/types.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {ArrowDown, ArrowUp, Droplet, Droplets, Wind} from "lucide-react";

interface CurrentWeatherProps {
    data: WeatherResponse;
    locationName?: GeocodingResponse
}

const CurrentWeather = ({data, locationName}: CurrentWeatherProps) => {

    function formattedTemperature(temp: number) {
        return `${Math.round(temp - 273.15)}°`
    }

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-end gap-1">
                                <h2 className="text-2xl font-bold tracking-tighter">{locationName?.name}</h2>
                                { locationName?.country && ( <span className="text-muted-foreground">{locationName.country}</span> ) }
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-7xl font-bold tracking-tighter">{formattedTemperature(data.main.temp)}</p>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Feels like {formattedTemperature(data.main.feels_like)}</p>
                                </div>
                                <div className="flex gap-2 text-start font-medium">
                                    <span className="flex items-center gap-1 text-red-500">
                                        <ArrowDown className="h-4 w-4"/>
                                        {formattedTemperature(data.main.temp_min)}
                                    </span>
                                    <span className="flex items-center gap-1 text-green-500">
                                        <ArrowUp className="h-4 w-4"/>
                                        {formattedTemperature(data.main.temp_max)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <Droplets className="h-4 w-4 text-blue-500"/>
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Humidity</p>
                                    <p className="text-sm text-muted-foreground">{data.main.humidity}%</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Wind className="h-4 w-4 text-blue-500"/>
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Wind</p>
                                    <p className="text-sm text-muted-foreground">{data.wind.speed}m/s</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative flex aspect-square w-full max-w-[140px] items-center justify-center">
                            <img className="h-full w-full object-contain" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} alt="weather icon" />
                            <div className="absolute bottom-0 text-center">
                                <p className="text-sm font-medium capitalize">{ data.weather[0].description }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CurrentWeather;