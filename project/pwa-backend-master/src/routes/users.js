import express from "express";
import {
  registerUserService,
  authoriseUserService,
  updateUserService,
  uploadUserProfileImageService,
  getUserPaymentMethodsService,
  getUserDetailsService,
  validateUserTokenService,
} from "../services/user.service";
import multer from "multer";
import { UserExistsError } from "../utilities/errorHandlers";
import { detachPaymentService } from "../services/order.service";
const router = express.Router();

const storage = multer.diskStorage({
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

/* GET users listing. */
router.post("/register", async (req, res, next) => {
  const { body } = req;
  registerUserService(body)
    .then((response) => {
      if (response.status === 401) {
        throw new UserExistsError();
      }
      res.status(200).json(response);
    })
    .catch((e) => {
      res
        .status(e.status || 500)
        .json({ message: e.message || "something went wrong" });
    });
});

router.post("/authenticate", async (req, res) => {
  const { body } = req;

  authoriseUserService(body)
    .then((user) => {
      res.json(user);
    })
    .catch((e) => {
      res
        .status(e.status || 500)
        .json({ message: e.message || "something went wrong" });
    });
});

router.post("/", async (req, res) => {
  const { body, headers } = req;
  const token = headers["x-access-token"];
  try {
    const data = await updateUserService(token, body);
    res.status(204).send();
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

router.post(
  "/upload/profile-image/:userId",
  upload.single("profileImage"),
  async (req, res) => {
    if (!req.file) {
      res.json({
        status: "false",
        message: "Please upload a file ! your file is empty",
      });
    } else {
      const response = await uploadUserProfileImageService(req.file, {
        userId: req.params.userId,
      });
      res.status(201).send();
    }
  }
);

router.get("/paymentMethods", async (req, res) => {
  try {
    const paymentMethods = await getUserPaymentMethodsService(
      req.headers["x-access-token"]
    );
    res.json(paymentMethods);
  } catch (e) {
    res
      .status(e.status || 500)
      .json({ message: e.message || "something went wrong" });
  }
});

router.get("/details", async (req, res) => {
  try {
    const userDetails = await getUserDetailsService(
      req.headers["x-access-token"]
    );
    res.json(userDetails);
  } catch (e) {
    res
      .status(e.status || 500)
      .json({ message: e.message || "something went wrong" });
  }
});
router.delete("/paymentMethods", async (req, res) => {
  try {
    const detachSuccess = await detachPaymentService(
      req.body,
      req.headers["x-access-token"]
    );
    res.status(204).send();
  } catch (e) {
    res.status(e.status || 500).json({
      message: e.message || "Payment deletion was not successful",
    });
  }
});

router.get("/token", async (req, res) => {
  try {
    const tokenDetails = await validateUserTokenService(
      req.headers["x-access-token"]
    );
    res.json(tokenDetails);
  } catch (e) {
    res.status(e.status || 500).json({
      message: e.message || "Something went wrong",
    });
  }
});
module.exports = router;
