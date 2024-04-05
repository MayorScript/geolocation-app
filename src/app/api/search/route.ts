import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const query = searchParams.get("query");
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");

    // Check if required parameters are provided
    if (!query || !latitude || !longitude) {
      return NextResponse.json({
        error:
          "Missing required search parameters (query, latitude, longitude).",
      });
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
      throw new Error("API_URL environment variable is not defined.");
    }

    // Axios request with params object
    const response = await axios.get(`${API_URL}/search`, {
      params: {
        q: query,
        latitude,
        longitude,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(error); // Log the error for server-side debugging
    return NextResponse.json({
      error: `An error occurred: ${error}`,
    });
  }
}
