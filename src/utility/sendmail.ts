import { User } from "../feature-modules/user/user.types";

export const sendmail = (body: User) => {
  console.log("==================== MAIL SENT ====================");
  console.dir(JSON.stringify(body));
  console.log("===================================================");
}