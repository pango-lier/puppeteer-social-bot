import puppeteer, { Browser } from "puppeteer";
class BrowserProfile {
   async start(){
  return  await puppeteer.launch({ headless: false })
   }

   async stop(browser:Browser){
    return  await browser.close();
}
}

export default new BrowserProfile()