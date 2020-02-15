import { toast } from "react-toastify";

export const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };
  // Detects if device is in standalone mode
export const isInStandaloneMode = () =>
    "standalone" in window.navigator && window.navigator.standalone;

export const ENUMS = { 
  MEDIA_TYPE_YOUTUBE: "YOU_TUBE",
  MEDIA_TYPE_FILEUPLOAD: "FILE_UPLOAD"
};


const regexObj = {
  email:  /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
}

export const validateRegex = (id, value) => {
  return regexObj[id].test(value);
};