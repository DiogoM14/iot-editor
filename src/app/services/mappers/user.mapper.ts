import { UserModel } from '../../models';
import { UserDTO } from '../dtos';

export function mapUsersDTOToUsersModel(response: UserDTO[]): UserModel[] {
    return response.map(user => ({
        id: user.id,
        email: user.email,
        fullName: user.firstName + ' ' + user.lastName,
        isActive: true,
    }));
}
