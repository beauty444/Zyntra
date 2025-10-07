import { createAdminTable } from "./admin.js";

export const initAdminEntities = async () => {
  await createAdminTable();
};
