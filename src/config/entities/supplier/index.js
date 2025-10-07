import { createSupplierTable } from "./supplier.js";
import { createBidTable } from "./bid.js";

export const initSupplierEntities = async () => {
  await createSupplierTable();
  await createBidTable();
};
