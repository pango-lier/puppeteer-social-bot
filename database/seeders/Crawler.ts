import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Crawler from "App/Models/Crawler";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run
    await Crawler.updateOrCreate(
      {
        account_id: 1,
      },
      {
        type: "youtube-short",
        links: "https://www.youtube.com/",
        description: "youtube-short",
      }
    );
  }
}
