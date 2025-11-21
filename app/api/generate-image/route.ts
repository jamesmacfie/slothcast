import { NextResponse } from "next/server";
import Replicate from "replicate";
import { getWeatherData } from "@/app/lib/weather";
import { buildWeatherPrompt } from "@/app/lib/prompt";

export async function POST() {
  const apiToken = process.env.REPLICATE_API_TOKEN;

  if (!apiToken) {
    return NextResponse.json(
      { error: "REPLICATE_API_TOKEN environment variable is not set" },
      { status: 500 }
    );
  }

  try {
    const replicate = new Replicate({
      auth: apiToken,
    });

    // Get weather data
    const weatherData = await getWeatherData();

    // Build the prompt
    const prompt = buildWeatherPrompt(weatherData);

    // Call Replicate API with google/nano-banana-pro
    const output = await replicate.run("google/nano-banana-pro", {
      input: {
        prompt,
        aspect_ratio: "4:3",
        output_format: "png",
      },
    });

    // Get the image URL from the output
    const imageUrl =
      output && typeof output === "object" && "url" in output
        ? (output as { url: () => string }).url()
        : null;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image URL in Replicate response" },
        { status: 500 }
      );
    }

    // Return the image URL and weather data
    return NextResponse.json({
      imageUrl,
      weatherData,
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
