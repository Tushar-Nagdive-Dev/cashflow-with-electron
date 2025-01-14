import { UserService } from './user.service';
import { User } from './user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(data: Partial<User>): Promise<User>;
    login({ email, password }: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        user: User;
    }>;
}
