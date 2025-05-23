import { UserModel } from '../../models';
import {computed, Injectable} from '@angular/core';
import { GenericStateManagerService } from './generic-state-manager';
import {SignalStateManager} from './signal-state-manager';

@Injectable()
export class UsersStateService extends GenericStateManagerService<UserModel[]> {
  public updateById(updatedUser: UserModel){
    console.log("update this user locally", updatedUser)
  }
}
export class UsersSignalStateService extends SignalStateManager<UserModel[]> {
  userCount = computed(() => {
    return this.getState().length || 0;
  });

  public updateById(updatedUser: UserModel){
    console.log("update this user locally", updatedUser)
  }
}
