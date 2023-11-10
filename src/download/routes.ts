import { Hono } from "hono";
import DownloadController from "./download.controller";

export const DownloadRouter = new Hono()

DownloadRouter.get('/plugin', DownloadController.gePlugin)
DownloadRouter.get("/serverjar/:type/:version", DownloadController.getServerJar)