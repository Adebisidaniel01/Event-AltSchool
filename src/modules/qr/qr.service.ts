import QRCode from "qrcode";
import { v4 as uuid } from "uuid";

export const generateQR = async () => {
  const token = uuid();
  const qr = await QRCode.toDataURL(token);
  return { token, qr };
};
