import { dowload } from "../YoutubeDl";

class Short {
  async dowloadVideo() {
    const url = "https://www.youtube.com/shorts/gPz-eLT8RIw" + "'";
    await dowload(url);
  }
}
export default Short;
