import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(data: Partial<User>): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
}
