import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const page = searchParams.get("page") || "1";
    const perPage = searchParams.get("per_page") || "50";
    const orderBy = searchParams.get("order_by") || "relevant";
    const orientation = searchParams.get("orientation");
    const color = searchParams.get("color");

    const url = new URL(`https://api.unsplash.com/search/photos`);
    url.searchParams.append("query", query);
    url.searchParams.append("page", page);
    url.searchParams.append("per_page", perPage);
    url.searchParams.append("order_by", orderBy);
    
    if (orientation) {
      url.searchParams.append("orientation", orientation);
    }
    if (color) {
      url.searchParams.append("color", color);
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}