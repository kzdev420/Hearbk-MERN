import express from "express";
const router = express.Router();
import { getListenerTagsService } from '../services/listenertags.service';

router.get("/", async (req, res) => {
  try {
    const genres = await getListenerTagsService();
    res.json(genres);
  } catch (e) {
    res.status(e).json({
      message: e.message,
    });
  }
});

export default router;
