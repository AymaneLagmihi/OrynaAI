import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image1 = formData.get("image1") as File;
    const image2 = formData.get("image2") as File;
    const promptText = formData.get("promptText") as string;

    if (!image1 || !image2) {
      return NextResponse.json({ error: "Missing images" }, { status: 400 });
    }

    // Convert images to Base64
    const arrayBuffer1 = await image1.arrayBuffer();
    const arrayBuffer2 = await image2.arrayBuffer();
    const base64Image1 = Buffer.from(arrayBuffer1).toString("base64");
    const base64Image2 = Buffer.from(arrayBuffer2).toString("base64");

    // OpenRouter API call for image generation/blending
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        prompt: `${promptText}. Blend the following two images together:`,
        images: [
          `data:${image1.type || "image/png"};base64,${base64Image1}`,
          `data:${image2.type || "image/png"};base64,${base64Image2}`
        ],
        size: "1024x1024"
      }),
    });

    const data = await response.json();

    if (!data?.data?.[0]?.url) {
      return NextResponse.json({ error: "No image generated" }, { status: 500 });
    }

    const imageUrl = data.data[0].url;

    return NextResponse.json({ data: [{ url: imageUrl }] });
  } catch (err: any) {
    console.error("OpenRouter Blend Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
