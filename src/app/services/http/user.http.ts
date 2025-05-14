import { inject, Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { UserDTO } from '../dtos';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../models';
import { UserStateService } from '../state';
import { mapUsersDtoToUsersModel, mapUsersModelToUsersDto } from '../mappers';

@Injectable()
export class UserHttpService {
    private httpClient = inject(HttpClient);
    private userStateService = inject(UserStateService);

    public getUsers$(): Observable<UserDTO[]> {
        return this.httpClient.get<UserDTO[]>(`/users`);

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
      const userDto = mapUsersModelToUsersDto(user);

      this.httpClient.put<UserDTO>(`/users/${userDto.id}`, {
        data: userDto
      }).subscribe(userDto => this.userStateService.updateState(mapUsersDtoToUsersModel(userDto)));
    }
}
