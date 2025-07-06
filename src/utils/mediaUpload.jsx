// mediaUpload.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qpazhreskxeldgzmmudy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwYXpocmVza3hlbGRnem1tdWR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MTA1ODEsImV4cCI6MjA2NDM4NjU4MX0.Jhfsp7Y5s4tL895AtI7vALgcdpUatESqWMP3cHrPVi0" // keep this safe in .env in real projects
);

export default async function mediaUpload(file) {
  if (!file) throw new Error("File is null");

  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload failed:", error);
    throw new Error("File upload failed");
  }

  const { data: publicData } = supabase.storage
    .from("images")
    .getPublicUrl(fileName);

  return publicData.publicUrl;
}
