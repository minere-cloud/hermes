import { Kafka } from "kafkajs";

const { KAFKA_HOST, KAFKA_USERNAME, KAFKA_PASSWORD } = process.env

export const kafkaClient = new Kafka({
  brokers: [KAFKA_HOST ?? ""],
  sasl: {
    mechanism: "scram-sha-256",
    username: KAFKA_USERNAME ?? "",
    password: KAFKA_PASSWORD ?? "",
  },
  ssl: true
})