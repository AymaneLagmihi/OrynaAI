import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const generationCost = 3;

    // Fetch the user's current coin balance
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('coins')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      console.error("Failed to retrieve user profile:", profileError);
      return NextResponse.json({ error: "Failed to retrieve user profile" }, { status: 500 });
    }

    const currentCoins = profile.coins;
    if (currentCoins < generationCost) {
      return NextResponse.json({ error: "Insufficient coins" }, { status: 403 });
    }

    // Deduct coins before proceeding with the image generation
    const { error: deductionError } = await supabase
      .from('profiles')
      .update({ coins: currentCoins - generationCost })
      .eq('id', user.id);
      
    if (deductionError) {
      console.error("Coin deduction failed:", deductionError);
      return NextResponse.json({ error: "Failed to deduct coins" }, { status: 500 });
    }

    const formData = await req.formData();
    const image1 = formData.get("image1") as File;
    const image2 = formData.get("image2") as File;
    const promptText = formData.get("promptText") || "Blend these two images together realistically.";

    if (!image1 || !image2) {
      // This is a redundant check after the formData parsing, but good practice
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