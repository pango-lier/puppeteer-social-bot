import request from "request";

export const delay = (s): Promise<void> =>
  new Promise((rs) => setTimeout(rs, s * 1000));

export const downloadFile = (url): Promise<string> => {
  const fileName = url
    .split("/")
    .slice(-1)[0]
    .replace(/\?(.*)/, "");
  const fs = require("fs");
  const path = require("path");
  const tempDir = path.join(__dirname, "temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
  const filePath = path.join(tempDir, fileName);
  return new Promise((resolve, reject) => {
    request.head(url, (err, res) => {
      if (err) {
        return reject(err);
      }
      if (res.statusCode !== 200) {
        return reject({
          message: res?.message || `Http code ${res.statusCode}`,
          statusCode: res.statusCode,
        });
      }
      request
        .get(url)
        .pipe(fs.createWriteStream(filePath))
        .on("close", (data) => resolve(filePath));
    });
  });
};

export const random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const delayRandom = async (min, max) => {
  return await delay(random(min, max));
};
export interface MouseWheelRandomInterface {
  page: any;
  positionMin: number;
  positionMax: number;
  delayMin: number;
  delayMax: number;
}
export const mouseWheel = async (page) => {
  for (let i = 0; i < random(2, 8); i++) {
    await delay(random(1, 12));
    await page.mouse.wheel({ deltaY: random(0, 20) * 300 });
  }
};
