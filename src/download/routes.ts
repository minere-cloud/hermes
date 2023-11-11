import { Hono } from "hono";
import DownloadController from "./download.controller.js";

export const DownloadRouter = new Hono()

DownloadRouter.get('/plugin', DownloadController.gePlugin)
DownloadRouter.get("/serverjar/:type/:version", DownloadController.getServerJar)
DownloadRouter.get("/servertemplate/:type", DownloadController.getServerTemlate)
