// mediaUpload.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default async function mediaUpload(file) {
  if (!file) throw new Error("File is null");

  // ✅ FORCE JPG (policy requirement)
  const fileName = `public/${Date.now()}-${crypto.randomUUID()}.jpg`;

  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: "image/jpeg",
    });

  if (error) {
    console.error("Upload failed:", error);
    throw error;
  }

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
