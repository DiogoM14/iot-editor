import { UserModel } from '../../models';
import { UserDTO } from '../dtos';

export function mapUsersDtoToUsersModel(response: UserDTO[]): UserModel[] {
    return response.map(user => ({
        id: user.id,
        email: user.email,
        fullName: user.firstName + ' ' + user.lastName,
        isActive: true,
    }));
}

export function mapUsersModelToUsersDto(response: UserModel[]): UserDTO[] {
    return response.map(user => ({
        id: user.id,
        email: user.email,
        firstName: user.fullName.split(' ')[0],
        lastName: user.fullName.split(' ')[1],
        isActive: true,
    }));
}
