import imagekit from "imagekit";
import credentials from "./credentials.json";

const imagekitAuth = new imagekit(credentials);

export default imagekitAuth;