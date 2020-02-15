import express from "express";
import {
  getDiscoverService,
  postDiscoverService,
} from "../services/discover.service";
const router = express.Router();

router.get("/tracks", async (req, res) => {
  try {
    const tracks = await getDiscoverService(req.headers["x-access-token"]);
    res.json(tracks);
  } catch (e) {
    console.log(e);
    res
      .status(e.status || 500)
      .json({ message: e.message || "something went wrong" });
  }
});

router.post("/:feedbackId", async (req, res) => {
  try {
    const response = await postDiscoverService(
      req.body,
      req.headers["x-access-token"],
      req.params.feedbackId
    );
    res.status(201).send();
  } catch (e) {
    console.log(e);
    res
      .status(e.status || 500)
      .json({ message: e.message || "something went wrong" });
  }
});

export default router;
