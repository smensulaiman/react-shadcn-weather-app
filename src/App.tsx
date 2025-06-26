import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "@/components/layout.tsx";
import {ThemeProvider} from "@/components/context/theme-provider.tsx";
import WeatherDashboard from "@/pages/weather-dashboard.tsx";
import CityPage from "@/pages/city-page.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            retry: false,
            refetchOnWindowFocus: false,
        }
    }
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider defaultTheme="dark">
                    <Layout>
                        <Routes>
                            <Route path="/" element={<WeatherDashboard/>}/>
                            <Route path="/city/:cityName" element={<CityPage/>}/>
                        </Routes>
                    </Layout>
                </ThemeProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
};

export default App;