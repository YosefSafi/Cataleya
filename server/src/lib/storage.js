import "dotenv/config";
import { randomUUID } from "crypto";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const LOCAL_UPLOAD_DIR = join(process.cwd(), "uploads");

async function uploadToBlob(file) {
  const { BlobServiceClient } = await import("@azure/storage-blob");
  const client = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
  const container = client.getContainerClient(process.env.AZURE_STORAGE_CONTAINER || "lab-results");
  await container.createIfNotExists({ access: "blob" });

  const blobName = `${randomUUID()}-${file.originalname}`;
  const blockBlobClient = container.getBlockBlobClient(blobName);
  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: { blobContentType: file.mimetype },
  });
  return blockBlobClient.url;
}

function uploadToLocal(file) {
  mkdirSync(LOCAL_UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}-${file.originalname}`;
  writeFileSync(join(LOCAL_UPLOAD_DIR, filename), file.buffer);
  const baseUrl = process.env.PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 8080}`;
  return `${baseUrl}/uploads/${filename}`;
}

export async function uploadFile(file) {
  if (process.env.STORAGE_PROVIDER === "azure") {
    return uploadToBlob(file);
  }
  return uploadToLocal(file);
}

export { LOCAL_UPLOAD_DIR };
