import { downloadFile, random } from "App/Controllers/Service/utils";
import youtubedl from "youtube-dl-exec";

class YoutubeDl {
  getLinks = async (options: { url: string }) => {
    let path: string | undefined = undefined;
    const output = await youtubedl(options.url, {
      dumpSingleJson: true,
      noWarnings: true,
      // noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
      referer: options.url,
    });
    for (const format of output.formats) {
      if (format.vcodec !== "none" && format.acodec !== "none") {
        path = format.url;
        break;
      }
    }
    return {
      url: options.url,
      tags: output.tags,
      description: output.description,
      ext: output.ext,
      path: path,
      bestUrl: path,
    };
  };
  dowload = async (url: string) => {
    let path: string | undefined = undefined;
    const output = await youtubedl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      // noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
      referer: url,
    });
    for (const format of output.formats) {
      if (format.vcodec !== "none" && format.acodec !== "none") {
        const d = new Date();
        path = await downloadFile(
          format.url,
          "vi" + d.getTime() + "_" + random(1000, 1000000000) + "." + format.ext
        );
        break;
      }
    }
    return {
      url: url,
      tags: output.tags,
      description: output.description,
      ext: output.ext,
      path: path,
    };
  };
}

export default new YoutubeDl();
