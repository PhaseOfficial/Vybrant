import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "../lib/supabaseClient";

// Prefer Vite env var `VITE_GEMINI_API_KEY`. Avoid referencing `process` directly
// because `process` is not defined in the browser and causes runtime errors.
const API_KEY = import.meta?.env?.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn(
    "VITE_GEMINI_API_KEY not set. Gemini calls will fail — set VITE_GEMINI_API_KEY in your .env and restart the dev server."
  );
}

const ai = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

/* -------------------------------------------------------------------------- */
/*                          Generate Blog Content                             */
/* -------------------------------------------------------------------------- */
export const generateBlogContent = async (prompt) => {
  if (!ai) throw new Error("Gemini API key not configured (VITE_GEMINI_API_KEY).");
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const response = await model.generateContent({
      contents: [{ text: `Write a blog post about: ${prompt}. Make it engaging and well-structured.` }],
    });

    return await response.response.text();
  } catch (error) {
    console.error("Error generating blog content:", error);
    throw new Error("Failed to generate blog content.");
  }
};

/* -------------------------------------------------------------------------- */
/*                       Generate Trending Blog Titles                        */
/* -------------------------------------------------------------------------- */
export const generateTrendingTitles = async (topic) => {
  if (!ai) throw new Error("Gemini API key not configured (VITE_GEMINI_API_KEY).");
  try {
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      tools: [{ googleSearch: {} }],
    });

    const response = await model.generateContent({
      contents: [
        {
          text: `Find current trending topics and news regarding "${topic}". Based on these trends, generate 5 engaging and distinct blog post titles. Return only the titles, one per line, without numbering or bullets.`,
        },
      ],
    });

    const text = await response.response.text();

    const titles = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.replace(/^(\d+\.|-|\*)\s*/, "").replace(/^"|"$/g, ""));

    const metadata = response.response.candidates?.[0]?.groundingMetadata;

    const sources =
      metadata?.groundingChunks
        ?.map((c) => c?.web || null)
        ?.filter(Boolean) || [];

    return { titles, sources };
  } catch (error) {
    console.error("Error generating trending titles:", error);
    throw new Error("Failed to generate trending titles.");
  }
};

/* -------------------------------------------------------------------------- */
/*                              Generate Image                                */
/* -------------------------------------------------------------------------- */
export const generateImage = async (prompt) => {
  if (!ai) throw new Error("Gemini API key not configured (VITE_GEMINI_API_KEY).");
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash-image" });

    const response = await model.generateContent({
      contents: [{ text: prompt }],
      generationConfig: {
        responseModalities: ["IMAGE"],
      },
    });

    const parts = response.response.candidates?.[0]?.content?.parts || [];

    const imagePart = parts.find((p) => p.inlineData);

    if (imagePart) {
      return {
        base64: imagePart.inlineData.data,
        mimeType: imagePart.inlineData.mimeType,
      };
    }

    throw new Error("No image was generated.");
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image.");
  }
};

/* -------------------------------------------------------------------------- */
/*                                Edit Image                                  */
/* -------------------------------------------------------------------------- */
export const editImage = async (base64Image, mimeType, prompt) => {
  if (!ai) throw new Error("Gemini API key not configured (VITE_GEMINI_API_KEY).");
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash-image" });

    const response = await model.generateContent({
      contents: [
        {
          inlineData: {
            data: base64Image,
            mimeType,
          },
        },
        { text: prompt },
      ],
      generationConfig: {
        responseModalities: ["IMAGE"],
      },
    });

    const parts = response.response.candidates?.[0]?.content?.parts || [];

    const imagePart = parts.find((p) => p.inlineData);

    if (imagePart) {
      return {
        base64: imagePart.inlineData.data,
        mimeType: imagePart.inlineData.mimeType,
      };
    }

    throw new Error("Image editing did not return an image.");
  } catch (error) {
    console.error("Error editing image:", error);
    throw new Error("Failed to edit image.");
  }
};

/* -------------------------------------------------------------------------- */
/*                                SEO Analyzer                                */
/* -------------------------------------------------------------------------- */
export const analyzeSeo = async (blogTitle, blogContent) => {
  if (!blogContent.trim()) {
    return { keywords: [], metaTitle: "", metaDescription: "" };
  }

  try {
    if (!ai) throw new Error("Gemini API key not configured (VITE_GEMINI_API_KEY).");
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-pro",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const response = await model.generateContent({
      contents: [
        {
          text: `As an SEO expert, analyze the following blog post.

Title: ${blogTitle}

Content:
${blogContent}

Return valid JSON with:
- keywords (5–7 terms)
- metaTitle (< 60 chars)
- metaDescription (< 160 chars)`,
        },
      ],
    });

    return JSON.parse(await response.response.text());
  } catch (error) {
    console.error("Error analyzing SEO:", error);
    throw new Error("Failed to analyze SEO for the content.");
  }
};

/* -------------------------------------------------------------------------- */
/*                              Grammar Fixer                                 */
/* -------------------------------------------------------------------------- */
export const fixGrammar = async (text) => {
  if (!text.trim()) return text;

  try {
    if (!ai) throw new Error("Gemini API key not configured (VITE_GEMINI_API_KEY).");
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const response = await model.generateContent({
      contents: [
        {
          text: `You are a professional editor. Correct the grammar and spelling of the following text. Maintain tone and meaning. Return only the corrected text:\n\n${text}`,
        },
      ],
    });

    return await response.response.text();
  } catch (error) {
    console.error("Error fixing grammar:", error);
    throw new Error("Failed to fix grammar.");
  }
};

/* -------------------------------------------------------------------------- */
/*                         Suggest Image Prompts                              */
/* -------------------------------------------------------------------------- */
export const suggestImagePrompts = async (blogContent) => {
  if (!blogContent.trim()) return [];

  try {
    if (!ai) throw new Error("Gemini API key not configured (VITE_GEMINI_API_KEY).");
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const response = await model.generateContent({
      contents: [
        {
          text: `Analyze the following blog post and generate 3 descriptive image prompts for headers or illustrations. Return JSON array only.\n\n${blogContent.slice(
            0,
            15000
          )}`,
        },
      ],
    });

    return JSON.parse(await response.response.text());
  } catch (error) {
    console.error("Error suggesting image prompts:", error);
    return [];
  }
};

/* -------------------------------------------------------------------------- */
/*                           Save Blog Post (Supabase)                        */
/* -------------------------------------------------------------------------- */
export const saveBlogPost = async (blogData) => {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert([blogData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving blog post:", error);
    throw new Error("Failed to save blog post");
  }
};
