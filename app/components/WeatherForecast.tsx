import { WeatherDay } from "@/app/lib/weather";

interface WeatherForecastProps {
  days: WeatherDay[];
}

function getWeatherIcon(forecast: string): string {
  const lower = forecast.toLowerCase();
  if (lower.includes("rain") || lower.includes("shower")) return "🌧️";
  if (lower.includes("cloud")) return "☁️";
  if (lower.includes("sun") || lower.includes("fine")) return "☀️";
  if (lower.includes("wind")) return "💨";
  if (lower.includes("storm") || lower.includes("thunder")) return "⛈️";
  return "🌤️";
}

function getDayName(dateStr: string): string {
  // dateStr format: "Fri 22 Nov 2025" - extract the day abbreviation
  return dateStr.split(" ")[0];
}

function getDateNumber(dateStr: string): string {
  // dateStr format: "Fri 22 Nov 2025" - extract the date number
  return dateStr.split(" ")[1];
}

export function WeatherForecast({ days }: WeatherForecastProps) {
  // Skip the first day (today) and show next 6 days
  const futureDays = days.slice(1, 7);

  return (
    <div className="flex flex-col h-full bg-gray-900/50 backdrop-blur-sm">
      <h2 className="text-white/80 text-sm font-medium px-4 py-3 border-b border-white/10">
        Next 6 Days
      </h2>
      <div className="flex-1 flex flex-col">
        {futureDays.map((day) => (
          <div
            key={day.dateISO}
            className="flex-1 flex items-center px-4 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors"
          >
            <div className="w-12 text-center">
              <div className="text-white/60 text-xs uppercase">
                {getDayName(day.date)}
              </div>
              <div className="text-white font-medium">
                {getDateNumber(day.date)}
              </div>
            </div>

            <div className="text-2xl mx-3">{getWeatherIcon(day.forecast)}</div>

            <div className="flex-1 min-w-0">
              <div className="text-white/90 text-sm truncate">{day.forecast}</div>
              <div className="flex items-center gap-3 text-xs text-white/50 mt-0.5">
                {parseFloat(day.rainFall) > 0 && (
                  <span>💧 {day.rainFall}mm</span>
                )}
                <span>
                  {day.windDir} {day.windSpeed}km/h
                </span>
              </div>
            </div>

            <div className="text-right ml-2">
              <div className="text-white font-semibold text-lg">
                {day.temperature}°
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
