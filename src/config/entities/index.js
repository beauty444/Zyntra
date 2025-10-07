import { initClinicEntities } from "./clinic/index.js";
import { initSupplierEntities } from "./supplier/index.js";
import { initAdminEntities } from "./admin/index.js";
import { initUserEntities } from "./user/index.js";

export const initEntities = async () => {
  await initUserEntities();
  await initClinicEntities();
  await initSupplierEntities();
  await initAdminEntities();
};
