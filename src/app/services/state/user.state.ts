import { UserModel } from '../../models';
import { Injectable } from '@angular/core';
import { GenericStateManagerService } from './generic-state-manager';

@Injectable()
export class UsersStateService extends GenericStateManagerService<UserModel[]> {
  public updateById(updatedUser: UserModel){
    console.log("update this user locally", updatedUser)
  }
}
