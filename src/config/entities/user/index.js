import { createUserTable } from "./user.js";


export const initUserEntities = async () => {
  await createUserTable();
};