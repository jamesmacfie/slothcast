export interface WeatherDay {
  date: string;
  dateISO: string;
  offset: number;
  rainFall: string;
  temperature: string;
  timeFrom: string;
  windDir: string;
  windSpeed: string;
  forecast: string;
}

export type WeatherData = WeatherDay[];

interface MetServiceHourlyData {
  date: string;
  dateISO: string;
  offset: number;
  rainFall: string;
  temperature: string;
  timeFrom: string;
  windDir: string;
  windSpeed: string;
}

interface MetServiceDailyData {
  date: string;
  dateISO: string;
  dow: string;
  dowTLA: string;
  forecast: string;
  max: string;
  min: string;
}

interface MetServiceResponse {
  result: {
    forecastData: {
      days: MetServiceDailyData[];
    };
    hourlyForecastData: {
      data: MetServiceHourlyData[];
    };
  };
}

const METSERVICE_API_URL = 'https://api.metservice.com/mobile/nz/weatherData/-41.1177/175.3273';

/**
 * Fetch raw weather data from MetService API
 */
async function fetchMetServiceData(): Promise<MetServiceResponse> {
  const apiKey = process.env.METSERVICE_API_KEY;

  if (!apiKey) {
    throw new Error('METSERVICE_API_KEY environment variable is not set');
  }

  const response = await fetch(METSERVICE_API_URL, {
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'User-Agent': 'MetServiceNZ/2.19.3 (com.metservice.iphoneapp; build:332; iOS 17.1.1) Alamofire/5.4.3',
      'Accept-Language': 'en-CA;q=1.0',
      'Accept-Encoding': 'gzip',
      'Connection': 'keep-alive',
      'apiKey': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`MetService API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get the most common wind direction from an array of directions
 */
function getMostCommonWindDir(directions: string[]): string {
  if (directions.length === 0) return 'N';

  const counts = directions.reduce((acc, dir) => {
    acc[dir] = (acc[dir] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];
}

/**
 * Extract date string (YYYY-MM-DD) from ISO date string
 */
function getDateKey(dateISO: string): string {
  return dateISO.split('T')[0];
}

/**
 * Aggregate hourly data by day
 * Returns: { [dateKey]: { totalRain, windSpeeds, windDirs } }
 */
function aggregateHourlyByDay(hourlyData: MetServiceHourlyData[]): Map<string, {
  totalRain: number;
  windSpeeds: number[];
  windDirs: string[];
}> {
  const byDay = new Map<string, {
    totalRain: number;
    windSpeeds: number[];
    windDirs: string[];
  }>();

  for (const hour of hourlyData) {
    const dateKey = getDateKey(hour.dateISO);

    if (!byDay.has(dateKey)) {
      byDay.set(dateKey, {
        totalRain: 0,
        windSpeeds: [],
        windDirs: [],
      });
    }

    const day = byDay.get(dateKey)!;
    day.totalRain += parseFloat(hour.rainFall) || 0;
    day.windSpeeds.push(parseFloat(hour.windSpeed) || 0);
    day.windDirs.push(hour.windDir);
  }

  return byDay;
}

/**
 * Get weather data for the upcoming week from MetService API.
 */
export async function getWeatherData(): Promise<WeatherData> {
  const data = await fetchMetServiceData();
  const dailyForecasts = data.result.forecastData.days;
  const hourlyData = data.result.hourlyForecastData.data;

  const hourlyByDay = aggregateHourlyByDay(hourlyData);

  // Filter to only include days within 7 days from today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDaysFromNow = new Date(today);
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  const limitedForecasts = dailyForecasts.filter((day) => {
    const dayDate = new Date(day.dateISO);
    return dayDate < sevenDaysFromNow;
  });

  const weatherData: WeatherData = limitedForecasts.map((day, index) => {
    const dateKey = getDateKey(day.dateISO);
    const hourlyAgg = hourlyByDay.get(dateKey);

    const avgWindSpeed = hourlyAgg && hourlyAgg.windSpeeds.length > 0
      ? Math.round(hourlyAgg.windSpeeds.reduce((a, b) => a + b, 0) / hourlyAgg.windSpeeds.length)
      : 0;

    const mostCommonWindDir = hourlyAgg && hourlyAgg.windDirs.length > 0
      ? getMostCommonWindDir(hourlyAgg.windDirs)
      : 'N';

    const totalRain = hourlyAgg ? Math.round(hourlyAgg.totalRain * 10) / 10 : 0;

    return {
      date: `${day.dowTLA} ${day.date}`,
      dateISO: day.dateISO,
      offset: index,
      rainFall: String(totalRain),
      temperature: day.max,
      timeFrom: '12:00',
      windDir: mostCommonWindDir,
      windSpeed: String(avgWindSpeed),
      forecast: day.forecast,
    };
  });

  return weatherData;
}
