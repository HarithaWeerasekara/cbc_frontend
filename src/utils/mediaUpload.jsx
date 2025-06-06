// mediaUpload.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qpazhreskxeldgzmmudy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwYXpocmVza3hlbGRnem1tdWR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MTA1ODEsImV4cCI6MjA2NDM4NjU4MX0.Jhfsp7Y5s4tL895AtI7vALgcdpUatESqWMP3cHrPVi0" // keep this safe in .env in real projects
);

export default function mediaUpload(file) {
  return new Promise(async (resolve, reject) => {
    if (!file) {
      return reject("File is null");
    }

    const newFileName = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(newFileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload failed:", error);
      return reject("File upload failed");
    }

    const { data: publicData } = supabase.storage
      .from("images")
      .getPublicUrl(newFileName);

    resolve(publicData.publicUrl);
  });
}
