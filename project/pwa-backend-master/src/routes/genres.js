import express from "express";
const router = express.Router();
import { getGenresService } from '../services/genres.service';

router.get("/", async (req, res) => {
  try {
    const genres = await getGenresService();
    res.json(genres);
  } catch (e) {
    res.status(e).json({
      message: e.message,
    });
  }
});

export default router;
