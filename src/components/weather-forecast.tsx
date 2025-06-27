import type {ForecastResponse} from "@/networking/types.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {format} from "date-fns";
import {ArrowDown, ArrowUp, Droplets, Wind} from "lucide-react";

interface WeatherForecastProps {
    data: ForecastResponse
}

interface DailyForecast {
    date: number;
    temp_min: number,
    temp_max: number,
    humidity: number,
    wind: number,
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    },
}

const WeatherForecast = ({data}: WeatherForecastProps) => {

    const dailyForecasts = data.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), 'yyyy-MM-dd');

        if(!acc[date]){
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
                date: forecast.dt
            };
        } else {
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
        }

        return acc;

    }, {} as Record<string, DailyForecast>)

    const nextDays = Object.values(dailyForecasts).slice(0, Object.values(dailyForecasts).length);

    const formattedTemperature = (temp: number) => {
        return `${Math.round(temp) - 273.5}°`;
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{nextDays.length}-days Forecast</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    { nextDays.map((day) => (
                        <div key={day.date}
                        className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4">
                            <div>
                                <p className="font-medium">{format(new Date(day.date * 1000), "EEE, MMM d")}</p>
                                <p className="text-sm text-muted-foreground capitalize">{day.weather.description}</p>
                            </div>
                            <div>
                                <div className="flex gap-2 text-start font-medium">
                                    <span className="flex items-center gap-1 text-red-500">
                                        <ArrowDown className="h-4 w-4"/>
                                        {formattedTemperature(day.temp_min)}
                                    </span>
                                    <span className="flex items-center gap-1 text-green-500">
                                        <ArrowUp className="h-4 w-4"/>
                                        {formattedTemperature(day.temp_max)}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                        <Droplets className="h-4 w-4 text-blue-500"/>
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-medium">Humidity</p>
                                            <p className="text-sm text-muted-foreground">{day.humidity}%</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Wind className="h-4 w-4 text-blue-500"/>
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-medium">Wind</p>
                                            <p className="text-sm text-muted-foreground">{day.wind}m/s</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default WeatherForecast;