import axios from "axios"

export const fetchFileBuffer = async (url: string): Promise<Buffer> => {
    const { data }: { data: Buffer } = await axios.get(url, { responseType: "arraybuffer" })
    return data
}