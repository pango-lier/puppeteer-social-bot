import { BaseCommand } from "@adonisjs/core/build/standalone";
import BullMQ from "@ioc:Queue/BullMQ";
import { QueueNamesEnum, TestProps } from "Contracts/queue/QueueInterfaces";

export default class QueueListener extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = "queue:listener";

  /**
   * Command description is displayed in the "help" output
   */
  public static description = "";

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: true,
  };

  public async run() {
    BullMQ.worker<TestProps, TestProps>(QueueNamesEnum.TestJob, async (job) => {
      console.log(job.data);
      // handle your job
      return job;
    });
  }
}
