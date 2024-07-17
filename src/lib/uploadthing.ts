// lib/uploadthing.ts

export const uploadImages = async (files: File[]): Promise<string[]> => {
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("https://your-uploadthing-url/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: { url: string } = await response.json();
    return data.url; 
  });

  const urls = await Promise.all(uploadPromises);
  return urls;
};
