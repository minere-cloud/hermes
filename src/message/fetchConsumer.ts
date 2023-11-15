import { kafkaClient } from "../lib/kafka.js"
import { consumeFetchRequest } from "./consumeFetchRequest.js"

export const fetchConsumer = (type: string) => {
  const consumer = kafkaClient.consumer({ groupId: `fetch-${type}` })
  consumer.connect()
  consumer.subscribe({ topic: `fetch-${type}`, fromBeginning: false })
  consumer.run({
    eachMessage: playload => consumeFetchRequest(type, playload)
  })
}