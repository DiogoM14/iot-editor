import { inject, Injectable } from '@angular/core';
import { UserDTO } from '../dtos';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../models';
import { UsersStateService } from '../state';
import { mapUsersDtoToUsersModel, mapUsersModelToUsersDto} from '../mappers';

@Injectable()
export class UserHttpService {
    private httpClient = inject(HttpClient);
    private userStateService = inject(UsersStateService);

    public getUsers$() {
      this.userStateService.updateState({ loading: true, error: null });

      this.httpClient.get<UserDTO[]>(`/users`).subscribe({
        next: users =>
          this.userStateService.updateState({ data: mapUsersDtoToUsersModel(users), loading: false }),
        error: error => this.userStateService.updateState({ error, loading: false }),
      });

      // const usersMock: UserDTO[] = [
      //   {
      //     id: 1,
      //     firstName: "Diogo",
      //     lastName: "Martins",
      //     email: "diogo@gmail.com",
      //   }
      // ]

      // return of(usersMock)
    }

    public updateUserName(user: UserModel) {
      const userDto = mapUsersModelToUsersDto([user])[0];
      this.httpClient.put<UserDTO>(`/users/${userDto.id}`, {
        data: userDto
      }).subscribe(userDto => this.userStateService.updateById(mapUsersDtoToUsersModel([userDto])[0]));
    }
}
