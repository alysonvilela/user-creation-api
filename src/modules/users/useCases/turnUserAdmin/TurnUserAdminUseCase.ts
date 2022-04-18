import { AppErrors } from "./../../../../errors/AppErrors";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const hasUser = this.usersRepository.findById(user_id);
    if (!hasUser) {
      throw new AppErrors("User not found", 404);
    }
    return this.usersRepository.turnAdmin(hasUser);
  }
}

export { TurnUserAdminUseCase };
