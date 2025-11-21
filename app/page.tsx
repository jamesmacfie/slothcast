"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader } from "./components/Loader";
import { RefreshButton } from "./components/RefreshButton";
import { WeatherDay } from "./lib/weather";

interface ImageResponse {
  imageUrl?: string;
  weatherData?: WeatherDay[];
  error?: string;
}

interface CachedData {
  imageUrl: string;
  weatherData: WeatherDay[];
  date: string;
}

const CACHE_KEY = "slothcast-image-cache";

function getTodayKey(): string {
  return new Date().toISOString().split("T")[0];
}

function getCachedData(): CachedData | null {
  if (typeof window === "undefined") return null;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const data: CachedData = JSON.parse(cached);
    if (data.date === getTodayKey()) {
      return data;
    }
    // Cache is stale, remove it
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch {
    return null;
  }
}

function setCachedData(imageUrl: string, weatherData: WeatherDay[]): void {
  if (typeof window === "undefined") return;

  const cache: CachedData = {
    imageUrl,
    weatherData,
    date: getTodayKey(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherDay[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateImage = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    // Check cache first (unless forcing refresh)
    if (!forceRefresh) {
      const cached = getCachedData();
      if (cached) {
        setImageUrl(cached.imageUrl);
        setWeatherData(cached.weatherData);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
      });

      const data: ImageResponse = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || "Failed to generate image");
        return;
      }

      if (data.imageUrl && data.weatherData) {
        setImageUrl(data.imageUrl);
        setWeatherData(data.weatherData);
        setCachedData(data.imageUrl, data.weatherData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    generateImage();
  }, [generateImage]);

  const handleRefresh = useCallback(() => {
    generateImage(true);
  }, [generateImage]);

  return (
    <div className="min-h-screen w-full bg-black">
      {loading && (
        <div className="flex min-h-screen items-center justify-center">
          <Loader />
        </div>
      )}

      {error && (
        <div className="flex min-h-screen items-center justify-center">
          <div className="rounded-lg bg-red-900/20 p-4 text-red-400">
            <p className="font-medium">Error generating image</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {imageUrl && !loading && (
        <div className="h-screen w-screen flex items-center justify-center">
          <div className="relative group">
            <RefreshButton onClick={handleRefresh} disabled={loading} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Weather infographic"
              className="max-h-screen max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
