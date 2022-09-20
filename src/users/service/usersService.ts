import UsersRepository from "../repository/usersRepository";

const getAllUsers = async () => {
  try {
    return await UsersRepository.getAllUsers();
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const createUser = async (uid: string, name: string, email: string) => {
  try {
    return await UsersRepository.createUser(uid, name, email);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default {
  getAllUsers,
  createUser,
};
