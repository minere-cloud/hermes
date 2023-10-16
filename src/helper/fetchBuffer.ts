import axios, { AxiosProgressEvent } from "axios"



export const fetchBuffer = async (url: string): Promise<Buffer> => {
    const GetBuffer = await axios.get(url, { responseType: "arraybuffer" })
    return GetBuffer.data as Buffer
}