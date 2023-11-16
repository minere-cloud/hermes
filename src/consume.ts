import { fetchConsumer } from "./message/fetchConsumer.js"

export const initConsumers = async () => {
  const consumers = ['paper', 'pufferfish']
  for (const consumer of consumers) fetchConsumer(consumer)
}

