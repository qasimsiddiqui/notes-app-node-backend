import { UserInterface } from "./users.interface";

export class UserClass implements UserInterface {
  id: string;
  name: string;
  email: string;
  profile_picture: string;
  created_at: number;
  updated_at: number;

  constructor(
    id: string,
    name: string,
    email: string,
    profile_picture: string,
    created_at: number,
    updated_at: number
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.profile_picture = profile_picture;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  public static fieldNameId(): string {
    return "id";
  }
  public static fieldNameName(): string {
    return "name";
  }
  public static fieldNameEmail(): string {
    return "email";
  }
  public static fieldNameProfilePicture(): string {
    return "profile_picture";
  }
  public static fieldNameCreatedAt(): string {
    return "created_at";
  }
  public static fieldNameUpdatedAt(): string {
    return "updated_at";
  }
}
