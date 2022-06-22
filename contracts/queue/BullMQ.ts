declare module "@ioc:Queue/BullMQ" {
  import BullMQClass from "providers/QueueBullMqProvider/QueueBullMq";

  const BullMQ: BullMQClass;

  export default BullMQ;
}
