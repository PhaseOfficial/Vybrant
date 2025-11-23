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

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

/* -------------------------------------------------------------------------- */
/*                          Generate Blog Content                             */
/* -------------------------------------------------------------------------- */
export const generateBlogContent = async (prompt) => {
  if (!genAI) throw new Error("Gemini API key not configured (VITE_GEMINI_API_KEY).");
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(
      `Write a blog post about: ${prompt}. Make it engaging and well-structured.`
    );
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating blog content:", error);
    throw new Error(`Failed to generate blog content: ${error.message}`);
  }
};

/* -------------------------------------------------------------------------- */
/*                       Generate Trending Blog Titles                        */
/* -------------------------------------------------------------------------- */
export const generateTrendingTitles = async (topic) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // 1) Prefer SDK client if available
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(
        `Generate 5 engaging and distinct blog post titles about "${topic}". Return only the titles, one per line, without numbering or bullets. Make them catchy and relevant to current trends.`
      );
      const response = await result.response;
      const text = response?.text() || "";

      const titles = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => line.replace(/^(\d+\.|-|\*)\s*/, "").replace(/^"|"$/g, ""))
        .slice(0, 5);

      return { titles, sources: [] };
    } catch (err) {
      console.error("Error generating trending titles with SDK:", err);
      // fall through to REST fallback
    }
  }

  // 2) REST fallback using the VITE API key, if present
  if (apiKey) {
    try {
      const prompt = `Find current trending topics and news regarding "${topic}". Based on these trends, generate 5 engaging and distinct blog post titles. Return only the titles, one per line, without numbering or bullets.`;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const payload = { contents: [{ text: prompt }] };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || data?.text || "";

      const titles = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => line.replace(/^(\d+\.|-|\*)\s*/, "").replace(/^"|"$/g, ""))
        .slice(0, 5);

      const sources =
        data?.candidates?.[0]?.groundingMetadata?.groundingChunks
          ?.map((c) => c?.web || null)
          ?.filter(Boolean) || [];

      return { titles, sources };
    } catch (err) {
      console.error("Error generating trending titles via REST:", err);
      // fall through
    }
  }

  // 3) No key available — return helpful stub titles so UI remains usable
  console.warn("generateTrendingTitles: Gemini API not available, returning stub titles.");
  return {
    titles: [
      `Example: ${topic} — Why it matters now`,
      `${topic}: Key trends to watch`,
      `How ${topic} is changing care work`,
      `Practical tips for ${topic}`,
      `Future of ${topic}: What to expect`,
    ],
    sources: [],
  };
};

/* -------------------------------------------------------------------------- */
/*                              Generate Image                                */
/* -------------------------------------------------------------------------- */
export const generateImage = async (prompt) => {
  // Try REST call to Gemini image model using VITE_GEMINI_API_KEY.
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("generateImage: VITE_GEMINI_API_KEY not set — cannot generate images.");
    return null;
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ text: prompt }],
      generationConfig: { responseModalities: ["IMAGE"] },
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    const parts = data?.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((p) => p.inlineData);

    if (imagePart) {
      return { base64: imagePart.inlineData.data, mimeType: imagePart.inlineData.mimeType };
    }

    // Some responses may return a textual description — return that as fallback
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || data?.text || null;
    if (text) return { text };

    throw new Error("No image data returned from Gemini image model");
  } catch (error) {
    console.error("Error generating image via Gemini REST:", error);
    return null;
  }
};

/* -------------------------------------------------------------------------- */
/*                                Edit Image                                  */
/* -------------------------------------------------------------------------- */
export const editImage = async (base64Image, mimeType, prompt) => {
  // Use REST endpoint for image editing to keep client-side usage simple.
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("editImage: VITE_GEMINI_API_KEY not set — cannot edit images.");
    return null;
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        { inlineData: { data: base64Image, mimeType } },
        { text: prompt },
      ],
      generationConfig: { responseModalities: ["IMAGE"] },
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    const parts = data?.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((p) => p.inlineData);

    if (imagePart) {
      return { base64: imagePart.inlineData.data, mimeType: imagePart.inlineData.mimeType };
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || data?.text || null;
    if (text) return { text };

    throw new Error("No image data returned from Gemini image edit model");
  } catch (error) {
    console.error("Error editing image via Gemini REST:", error);
    return null;
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
    if (!genAI) throw new Error("Gemini API key not configured (VITE_GEMINI_API_KEY).");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(
      `As an SEO expert, analyze the following blog post and return ONLY a JSON object without any markdown formatting.

Title: ${blogTitle}

Content:
${blogContent.substring(0, 10000)} // Limit content length

Return this exact JSON structure:
{
  "keywords": ["array", "of", "5-7", "relevant", "keywords"],
  "metaTitle": "SEO title under 60 characters",
  "metaDescription": "SEO description under 160 characters"
}`
    );

    const response = await result.response;
    const text = response.text();
    
    // Clean the response - remove any markdown code blocks
    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
    
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Error analyzing SEO:", error);
    // Return fallback SEO data instead of throwing
    return {
      keywords: blogContent.split(/\s+/).slice(0, 5),
      metaTitle: blogTitle.substring(0, 60),
      metaDescription: blogContent.substring(0, 160)
    };
  }
};

/* -------------------------------------------------------------------------- */
/*                              Grammar Fixer                                 */
/* -------------------------------------------------------------------------- */
export const fixGrammar = async (text) => {
  if (!text.trim()) return text;

  try {
    if (!genAI) throw new Error("Gemini API key not configured (VITE_GEMINI_API_KEY).");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(
      `You are a professional editor. Correct the grammar and spelling of the following text. Maintain tone and meaning. Return only the corrected text:\n\n${text}`
    );
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error fixing grammar:", error);
    throw new Error(`Failed to fix grammar: ${error.message}`);
  }
};

/* -------------------------------------------------------------------------- */
/*                         Suggest Image Prompts                              */
/* -------------------------------------------------------------------------- */
export const suggestImagePrompts = async (blogContent) => {
  if (!blogContent.trim()) return [];

  try {
    if (!genAI) throw new Error("Gemini API key not configured (VITE_GEMINI_API_KEY).");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(
      `Analyze the following blog content and generate 3 descriptive image prompts for headers or illustrations. Return ONLY a JSON array of strings without any additional text or markdown formatting.

Content:
${blogContent.substring(0, 8000)}

Return format: ["prompt 1", "prompt 2", "prompt 3"]`
    );

    const response = await result.response;
    const text = response.text();
    
    // Clean the response
    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
    
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Error suggesting image prompts:", error);
    // Return fallback prompts
    return [
      "A visually engaging header image related to the blog topic",
      "An illustrative graphic that represents the main concepts",
      "A background image that complements the content theme"
    ];
  }
};

/* -------------------------------------------------------------------------- */
/*                    Generate Content with Web Search                        */
/* -------------------------------------------------------------------------- */
export const generateContentWithSearch = async (prompt) => {
  if (!genAI) throw new Error("Gemini API key not configured (VITE_GEMINI_API_KEY).");
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      tools: [{
        googleSearchRetrieval: {},
      }]
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Note: The @google/generative-ai SDK handles grounding differently
    // You might need to adjust this based on the actual response structure
    return {
      text: response.text(),
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Error generating content with search:", error);
    throw new Error(`Failed to generate content with search: ${error.message}`);
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
    throw new Error(`Failed to save blog post: ${error.message}`);
  }
};

/* -------------------------------------------------------------------------- */
/*                          Get Blog Posts (Supabase)                         */
/* -------------------------------------------------------------------------- */
export const getBlogPosts = async () => {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error(`Failed to fetch blog posts: ${error.message}`);
  }
};