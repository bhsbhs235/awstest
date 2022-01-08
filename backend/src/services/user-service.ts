import { User, UserModel } from '../model/user';

export class UserService {
    public async create(user: User): Promise<User> {
        let u = new UserModel(user);
        return await u.save();
    }

    public async read(email: any): Promise<User | null> {
        const userData = await UserModel.findOne({email: email});
        return userData;
    }
}