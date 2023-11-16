import { Kafka } from "kafkajs";

const { NODE_ENV, KAFKA_HOST, KAFKA_USERNAME, KAFKA_PASSWORD } = process.env


export const kafkaClient = NODE_ENV == "production" ?
  new Kafka({
    brokers: [KAFKA_HOST ?? ""],
    sasl: {
      mechanism: "scram-sha-256",
      username: KAFKA_USERNAME ?? "",
      password: KAFKA_PASSWORD ?? "",
    },
    ssl: true
  }) :
  new Kafka({ brokers: [KAFKA_HOST ?? ""] })