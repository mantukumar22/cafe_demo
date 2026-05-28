import { Router } from "express";
import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";
import {
  RegisterImageBody,
  DeleteImageParams,
} from "@workspace/api-zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "../../db/images.json");

const VALID_CATEGORIES = [
  "hero",
  "home",
  "inner-view",
  "menu-items",
  "events",
  "team",
  "gallery",
];

interface CafeImage {
  id: string;
  category: string;
  objectPath: string;
  label: string;
  uploadedAt: string;
}

async function readDb(): Promise<CafeImage[]> {
  try {
    const raw = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(raw) as CafeImage[];
  } catch {
    return [];
  }
}

async function writeDb(images: CafeImage[]): Promise<void> {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(images, null, 2), "utf-8");
}

function checkAdminKey(req: { headers: Record<string, string | string[] | undefined> }): boolean {
  const key = req.headers["x-admin-key"];
  const envKey = process.env["ADMIN_SECRET_KEY"] ?? "cafesecret123";
  return key === envKey;
}

const router = Router();

router.get("/images", async (req, res) => {
  const images = await readDb();
  const { category } = req.query as { category?: string };
  if (category) {
    res.json(images.filter((img) => img.category === category));
  } else {
    res.json(images);
  }
});

router.post("/images/register", async (req, res) => {
  if (!checkAdminKey(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const parse = RegisterImageBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { category, objectPath, label } = parse.data;

  if (!VALID_CATEGORIES.includes(category)) {
    res.status(400).json({ error: `Invalid category. Valid categories: ${VALID_CATEGORIES.join(", ")}` });
    return;
  }

  const images = await readDb();
  const newImage: CafeImage = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    category,
    objectPath,
    label: label || category,
    uploadedAt: new Date().toISOString(),
  };

  images.push(newImage);
  await writeDb(images);

  req.log.info({ id: newImage.id, category }, "Image registered");
  res.json(newImage);
});

router.delete("/images/:id", async (req, res) => {
  if (!checkAdminKey(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { id } = DeleteImageParams.parse(req.params);
  const images = await readDb();
  const idx = images.findIndex((img) => img.id === id);

  if (idx === -1) {
    res.status(404).json({ error: "Image not found" });
    return;
  }

  images.splice(idx, 1);
  await writeDb(images);

  req.log.info({ id }, "Image deleted");
  res.json({ success: true });
});

export default router;
