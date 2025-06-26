import {useEffect, useState} from "react";
import type {Coordinates} from "@/networking/types.ts";

interface GeolocationState {
    coordinates: Coordinates | null;
    error: string | null;
    isLoading: boolean;
}

export function useGeolocation() {
    const [locationData, setLocationData] = useState<GeolocationState>({
        coordinates: null,
        error: null,
        isLoading: true,
    })

    const getGeolocation = () => {

        setLocationData(function (prevState: GeolocationState): GeolocationState {
            return {
                ...prevState,
                isLoading: true,
                error: null,
            }
        });

        if (!navigator.geolocation) {
            setLocationData(function (prevState: GeolocationState): GeolocationState {
                return {
                    ...prevState,
                    error: "Geolocation is not supported",
                    isLoading: false,
                }
            })
        }

        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
                setLocationData({
                    coordinates: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    error: null,
                    isLoading: false
                });
            }, function (error: GeolocationPositionError) {
                setLocationData({
                    coordinates: null,
                    error: error.message,
                    isLoading: false
                });
            }, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );
    }

    useEffect(() => {
        setTimeout(() => getGeolocation(), 700)
    }, []);

    return {
        ...locationData,
        getGeolocation,
    }
}