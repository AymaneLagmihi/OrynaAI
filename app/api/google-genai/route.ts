import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";


export const runtime = "nodejs"; // ensure fs and buffers work

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image1 = formData.get("image1") as File;
    const image2 = formData.get("image2") as File;
    const promptText = formData.get("promptText") as string;

    if (!image1 || !image2)
      return NextResponse.json({ error: "Missing images" }, { status: 400 });

    // Convert images to Base64
    const arrayBuffer1 = await image1.arrayBuffer();
    const arrayBuffer2 = await image2.arrayBuffer();
    const base64Image1 = Buffer.from(arrayBuffer1).toString("base64");
    const base64Image2 = Buffer.from(arrayBuffer2).toString("base64");

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY!,
    });

    const prompt = [
      {
        inlineData: { mimeType: image1.type || "image/png", data: base64Image1 },
      },
      {
        inlineData: { mimeType: image2.type || "image/png", data: base64Image2 },
      },
      { text: promptText },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: prompt,
    });

    const part = response.candidates?.[0]?.content?.parts?.find(
      (p: any) => p.inlineData
    );

    if (!part) {
      return NextResponse.json({ error: "No image generated" }, { status: 500 });
    }

    const base64Result = part.inlineData.data;
    const imageUrl = `data:image/png;base64,${base64Result}`;

    return NextResponse.json({ data: [{ url: imageUrl }] });
  } catch (err: any) {
    console.error("Blend API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
