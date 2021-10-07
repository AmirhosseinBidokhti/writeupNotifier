import { dirname } from "path";
import { fileURLToPath } from "url";

export const ecmaDirname = () => {
  return dirname(fileURLToPath(import.meta.url));
};
