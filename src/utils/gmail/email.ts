import { UserInterface } from "../../users/model/users.model";
import { sendMail } from "./emailService";
import UserService from "../../users/service/usersService";

export async function sendShareEmails(users: string[], senderName: string) {
  const usersData: UserInterface[] = await UserService.getSharedListDetails(
    users
  );

  return usersData.map(async (user: UserInterface) => {
    await sendMail(user.email, user.name, senderName);
  });
}
