import type {WeatherResponse} from "@/networking/types.ts";
import {format} from "date-fns";
import {Compass, Gauge, Sunrise, Sunset} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";

interface WeatherDetailsProps {
    data: WeatherResponse
}

const WeatherDetails = ({data}: WeatherDetailsProps) => {

    const getWindDirection = (degree: number) => {
        return ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.round((((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8)];
    }

    const formatTime = (timestamp: number) => {
        return format(new Date(timestamp * 1000), "h:mm a");
    }

    const details = [
        {
            title: "Sunrise",
            value: formatTime(data.sys.sunrise),
            icon: Sunrise,
            color: "text-orange-500"
        },
        {
            title: "Sunset",
            value: formatTime(data.sys.sunrise),
            icon: Sunset,
            color: "text-blue-500"
        },
        {
            title: "Wind Direction",
            value: `${getWindDirection(data.wind.deg)} (${data.wind.deg}°)`,
            icon: Compass,
            color: "text-green-500"
        },
        {
            title: "Pressure",
            value: `${data.main.pressure} hPa`,
            icon: Gauge,
            color: "text-purple-500"
        },
    ]

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Weather Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {details.map((detail, index) => (
                        <div key={index} className="flex items-center gap-3 rounded-lg border p-4">
                            <detail.icon className={`h-5 w-5 ${detail.color}`} />
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium leading-none">{detail.title}</p>
                                <p className="text-sm text-muted-foreground">{detail.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default WeatherDetails;