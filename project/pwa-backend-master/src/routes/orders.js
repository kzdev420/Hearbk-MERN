import Express from "express";
import multer from "multer";
import {
  postOrderForFeedbackService,
  uploadTrackForFeedbackService,
  getOrderHistoryService,
} from "../services/order.service";

const storage = multer.diskStorage({
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = Express.Router();

router.post("/feedback", async (req, res) => {
  try {
    const data = await postOrderForFeedbackService(
      req.body,
      req.headers["x-access-token"]
    );
    res.json(data);
  } catch (e) {
    res.status(e.status).json({
      message: e.message || "Something went wrong",
    });
  }
});

router.post(
  "/upload/track/:feedbackId",
  upload.single("trackUpload"),
  async (req, res) => {
    try {
      const post = await uploadTrackForFeedbackService(
        req.file,
        req.params.feedbackId
      );
      res.json({ ...post });
    } catch (e) {
      res.status(e.status).json({
        message: e.message || "Something went wrong",
      });
    }
  }
);

router.get("/history", async (req, res) => {
  try {
    const trackHistory = await getOrderHistoryService(
      req.headers["x-access-token"]
    );
    res.json({ ...trackHistory });
  } catch (e) {
    console.log(e);
    res.status(e.status || 500).json({
      message: e.message || "Something went wrong",
    });
  }
});

export default router;
