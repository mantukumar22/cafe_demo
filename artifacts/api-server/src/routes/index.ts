import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import menuRouter from "./menu";
import imagesRouter from "./images";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(menuRouter);
router.use(imagesRouter);
router.use(storageRouter);

export default router;
