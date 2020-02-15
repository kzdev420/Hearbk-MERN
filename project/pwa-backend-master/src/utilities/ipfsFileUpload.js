import pinataSDK from "@pinata/sdk";
import fs from "fs";

const pinata = pinataSDK(
  "bd612027d8d27a9c0574",
  "1c06e67da4453b5b539ea75c02a339866d450da398e1f8cba8ab3e712ea80894"
);

const uploadFileToPinnata = async (fileToUpload) => {
  let testBuffer = fs.createReadStream(fileToUpload.path);
  console.log("Buffer", testBuffer);
  return pinata.pinFileToIPFS(testBuffer);
};

export default uploadFileToPinnata;
