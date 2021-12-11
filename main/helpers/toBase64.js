const toBase64 = (buffer) => {
  //arr = new Uint8Array(arr) if it's an ArrayBuffer
  return Buffer.from(buffer).toString("base64");
};

export default toBase64;
