const express = require("express");
const router = express.Router();
const ControllerUsers = require("../controller/users");
const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");
// const { validateRegister,
//     validateLogin,
//     validateUpdateProfile,
//     validateChangeEmail,
//     validateChangePassword } = require('../middlewares/common')

// const { authenticateGoogle, uploadToGoogleDrive } = require("../middlewares/googledriveservice")

router
  .post("/register", ControllerUsers.registerAccount)
  .post("/login", ControllerUsers.loginAccount)
  .post("/refresh-token", ControllerUsers.refreshToken)
  .get("/profile", protect, ControllerUsers.profileAccount)
  .put("/profile", protect, upload.single("picture"), ControllerUsers.profileAccount)
  .delete("/profile", protect, ControllerUsers.profileAccount)
  .put("/profile/changeEmail", protect, ControllerUsers.changeEmail)
  .put("/profile/changePassword", protect, ControllerUsers.changePassword)



// .post("/uploadfiledrive", upload.single("picture"), async (req, res) => {
//   try {
//     if (!req.file) {
//       res.status(400).send("No file uploaded.");
//       return;
//     }
//     const auth = authenticateGoogle();
//     const response = await uploadToGoogleDrive(req.file, auth);
//     const picture = (`https://drive.google.com/thumbnail?id=${response.data.id}`)

//     console.log(picture)

//     res.status(200).json(response.data.id);
//   } catch (err) {
//     console.log(err);
//   }
// }
// );



module.exports = router;
