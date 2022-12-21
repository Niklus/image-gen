import { Router } from "../deps.ts";
import { homePage, generateImage } from "../controllers/home.controller.tsx";

const router = new Router();

router.get("/", homePage);
router.post("/prompt", generateImage);

export default router;