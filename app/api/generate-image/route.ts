import { NextResponse } from "next/server";

// POST /api/blend
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Expect images + prompt from client
    const image1 = formData.get("image1") as File | null;
    const image2 = formData.get("image2") as File | null;
    const prompt = formData.get("prompt") as string;

    if (!image1 || !image2 || !prompt) {
      return NextResponse.json(
        { error: "image1, image2, and prompt are required" },
        { status: 400 }
      );
    }

    // Prepare multipart/form-data to forward to OpenRouter
    const body = new FormData();
    body.append("images", image1);
    body.append("images", image2);
    body.append("prompt", prompt);

    const response = await fetch("https://openrouter.ai/api/v1/images", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY!}`,
      },
      body,
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error calling OpenRouter:", error);
    return NextResponse.json(
      { error: "Failed to blend images" },
      { status: 500 }
    );
  }
}
