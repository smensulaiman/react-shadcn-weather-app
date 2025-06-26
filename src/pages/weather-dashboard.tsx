import {Button} from "@/components/ui/button.tsx";
import {AlertCircleIcon, MapPin, RefreshCw} from "lucide-react";
import {useGeolocation} from "@/hooks/use-geolocation.ts";
import WeatherSkeleton from "@/components/loading-skeleton.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {useForecastQuery, useReverseGeocodeQuery, useWeatherQuery} from "@/hooks/use-weather.ts";
import CurrentWeather from "@/components/current-weather.tsx";

const WeatherDashboard = () => {

    const {coordinates, error, isLoading, getGeolocation} = useGeolocation();

    // if (coordinates) {
    //     console.log(JSON.stringify(["weather", coordinates]));
    // }

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery(coordinates)

    const handleRefresh = () => {
        if (coordinates) {
            weatherQuery.refetch();
            forecastQuery.refetch();
            locationQuery.refetch();
        } else {
            getGeolocation();
        }
    }

    if (isLoading) {
        return <WeatherSkeleton/>;
    }

    if (error) {
        return <Alert variant="destructive">
            <AlertCircleIcon/>
            <AlertTitle>{error}</AlertTitle>
            <AlertDescription>
                <Button className="w-fit" variant="outline" onClick={() => getGeolocation()}>Geolocation
                    <MapPin className="mr-2 h-4 w-4"/>
                    Enable Geolocation
                </Button>
            </AlertDescription>
        </Alert>
    }

    if (!coordinates) {
        return <Alert variant="destructive">
            <AlertCircleIcon/>
            <AlertTitle>Unable to find your location.</AlertTitle>
            <AlertDescription>
                <Button className="w-fit" variant="outline" onClick={getGeolocation}>
                    <MapPin className="mr-2 h-4 w-4"/>
                    Enable Geolocation
                </Button>
            </AlertDescription>
        </Alert>
    }

    if (!weatherQuery.data || !forecastQuery.data) {
        return <WeatherSkeleton/>;
    }

    const location = locationQuery.data?.at(0);

    return (
        <div className="space-y-4">
            {/*Favorite Cities*/}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">My Location</h1>
                <Button
                    variant="outline"
                    size={"icon"}
                    onClick={handleRefresh}
                    disabled={weatherQuery.isFetching || forecastQuery.isFetching}
                >
                    <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? 'animate-spin' : ''}`}/>
                </Button>
            </div>

            <div className="grid gap-4">
                <div>
                    {/*current weather*/}
                    <CurrentWeather data={weatherQuery.data} locationName={location} />
                    {/*hourly temperature*/}
                </div>
                <div>
                    {/*details*/}
                    {/*forecast*/}
                </div>
            </div>
        </div>
    );
};

export default WeatherDashboard;