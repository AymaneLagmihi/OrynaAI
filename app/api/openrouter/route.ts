import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image1 = formData.get("image1") as File;
    const image2 = formData.get("image2") as File;
    const promptText =
      formData.get("promptText") || "Blend these two images together realistically.";

    if (!image1 || !image2) {
      return NextResponse.json({ error: "Missing images" }, { status: 400 });
    }

    // Convert to base64
    const arrayBuffer1 = await image1.arrayBuffer();
    const arrayBuffer2 = await image2.arrayBuffer();
    const base64Image1 = Buffer.from(arrayBuffer1).toString("base64");
    const base64Image2 = Buffer.from(arrayBuffer2).toString("base64");

    // Call OpenRouter
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: promptText },
              { type: "image_url", image_url: `data:${image1.type};base64,${base64Image1}` },
              { type: "image_url", image_url: `data:${image2.type};base64,${base64Image2}` },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("OpenRouter response:", JSON.stringify(data, null, 2));

    // ✅ Safe extraction
    const content = data?.choices?.[0]?.message?.content;
    let generatedImage: string | undefined;

    if (Array.isArray(content)) {
      generatedImage = content.find((c: any) => c.type === "image_url")?.image_url;
    } else if (typeof content === "object" && content?.type === "image_url") {
      generatedImage = content.image_url;
    } else if (typeof content === "string" && content.startsWith("http")) {
      generatedImage = content;
    }

    if (!generatedImage) {
      return NextResponse.json({ error: "No image generated", raw: data }, { status: 500 });
    }

    return NextResponse.json({ data: [{ url: generatedImage }] });

  } catch (error) {
    console.error("Error in /api/openrouter:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
