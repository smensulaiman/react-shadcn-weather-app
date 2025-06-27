import type {ForecastResponse} from "@/networking/types.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {format} from "date-fns";

interface HourlyTemperatureProps {
    data: ForecastResponse
}

const HourlyTemperature = ({data}: HourlyTemperatureProps) => {

    const chartData = data.list.slice(0,8).map((item)=> ({
        time: format(new Date(item.dt * 1000), "ha"),
        temp: Math.round(item.main.temp - 273.15),
        feels_like: Math.round(item.main.feels_like - 273.15),
    }))

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Today's Temperature</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="h-[200px] w-full">
                <ResponsiveContainer width={"100%"} height={"100%"}>
                    <LineChart data={chartData}>
                        <XAxis
                            dataKey="time"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            dataKey="temp"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}°`}
                        />

                        {/*tooltip*/}
                        <Tooltip
                            content={({active, payload}) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[0.7rem] uppercase text-muted-foreground">Temperature</span>
                                                    <span className="font-bold">{payload[0].value}°</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[0.7rem] uppercase text-muted-foreground">Feels Like</span>
                                                    <span className="font-bold">{payload[1].value}°</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                return (<div></div>);
                            }
                            }
                        />

                        <Line
                        type="monotone"
                        dataKey="temp"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="feels_like"
                            stroke="#64748b"
                            strokeWidth={2}
                            dot={false}
                            strokeDasharray="5 5"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            </CardContent>
        </Card>
    );
};

export default HourlyTemperature;