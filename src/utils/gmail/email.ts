import { UserInterface } from "../../users/model/users.interface";
import { sendMail } from "./emailService";
import UserService from "../../users/service/usersService";

export async function sendShareEmails(
  uid: string,
  users: string[],
  senderName: string
) {
  const usersData: UserInterface[] = await UserService.getSharedListDetails(
    users
  );

  const refreshToken = await UserService.getRefreshToken(uid);

  return usersData.map(async (user: UserInterface) => {
    await sendMail(refreshToken, user.email, user.name, senderName);
  });
}
