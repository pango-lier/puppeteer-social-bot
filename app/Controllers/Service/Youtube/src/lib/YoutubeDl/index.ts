import {
  downloadFile,
  random,
} from "App/Controllers/Service/Facebook/src/utils";
import youtubedl from "youtube-dl-exec";

export const dowload = async (url: string) => {
  let path: string | undefined = undefined;
  const ouput = await youtubedl(url, {
    dumpSingleJson: true,
    noWarnings: true,
    // noCallHome: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
    referer: url,
  });
  for (const format of ouput.formats) {
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
    tags: ouput.tags,
    description: ouput.description,
    ext: ouput.ext,
    path: path,
  };
};
