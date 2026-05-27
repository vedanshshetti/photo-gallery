import { NextRequest, NextResponse } from "next/server";
import { UnsplashPhoto } from "@/types/unsplash";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const perPage = searchParams.get("per_page") || "30";
    const orderBy = searchParams.get("order_by") || "latest";

    // Unsplash API endpoint for user photos
    const url = new URL(`https://api.unsplash.com/users/vedanshshetti/photos`);
    url.searchParams.append("page", page);
    url.searchParams.append("per_page", perPage);
    url.searchParams.append("order_by", orderBy);

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const data: UnsplashPhoto[] = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}