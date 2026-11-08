/** Resize and compress an uploaded image in the browser before it is committed. */
export interface ProcessedImage {
  base64: string;
  previewUrl: string;
  ext: "webp" | "jpg";
  width: number;
  height: number;
  bytes: number;
}

const loadImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("This file couldn't be read as an image."));
    img.src = url;
  });

const blobToBase64 = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] ?? "");
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });

export const processImage = async (file: File, maxWidth = 1800, quality = 0.84): Promise<ProcessedImage> => {
  const img = await loadImage(file);
  const scale = Math.min(1, maxWidth / img.naturalWidth);
  const width = Math.round(img.naturalWidth * scale);
  const height = Math.round(img.naturalHeight * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Image processing isn't available in this browser.");
  ctx.drawImage(img, 0, 0, width, height);

  const toBlob = (type: string) => new Promise<Blob | null>((res) => canvas.toBlob(res, type, quality));
  let blob = await toBlob("image/webp");
  let ext: ProcessedImage["ext"] = "webp";
  if (!blob || blob.type !== "image/webp") {
    blob = await toBlob("image/jpeg");
    ext = "jpg";
  }
  if (!blob) throw new Error("Couldn't compress this image.");
  return { base64: await blobToBase64(blob), previewUrl: URL.createObjectURL(blob), ext, width, height, bytes: blob.size };
};

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
