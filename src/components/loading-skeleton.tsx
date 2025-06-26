import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function WeatherSkeleton() {
    return (
        <div className="space-y-4">
            <div className="grid gap-4">
                <Skeleton className="h-[300px] w-full rounded-lg"/>
                <Skeleton className="h-[300px] w-full rounded-lg"/>
                <div className="grid gap-4 md:grid-cols-2">
                    <Skeleton className="h-[300px] w-full rounded-lg"/>
                    <Skeleton className="h-[300px] w-full rounded-lg"/>
                </div>
            </div>
        </div>
    )
}