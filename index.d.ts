declare module 'readable-stream-node-to-web' {
  export const WEBSTREAM_SUPPORT: boolean

  export default function nodeToWeb(
    readableStream: NodeJS.ReadableStream
  ): ReadableStream
}
