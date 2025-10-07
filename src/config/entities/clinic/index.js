import { createClinicTable } from "./clinic.js";
import { createTenderTable } from "./tender.js";

export const initClinicEntities = async () => {
  await createClinicTable();
  await createTenderTable();
};
