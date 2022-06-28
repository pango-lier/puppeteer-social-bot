import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import user from "App/Models/user";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await user.updateOrCreate(
      {
        email: "trong@gmail.com",
      },
      {
        password: "123356",
      }
    );
  }
}
