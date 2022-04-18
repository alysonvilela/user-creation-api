import { AppErrors } from "./../../../../errors/AppErrors";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const isAdmin = this.usersRepository.findById(user_id)?.admin;
    if (!user_id) {
      throw new AppErrors("User id is required");
    }
    if (!isAdmin) {
      throw new AppErrors("User is not admin");
    }
    if (isAdmin) {
      return this.usersRepository.list();
    }
  }
}

export { ListAllUsersUseCase };
