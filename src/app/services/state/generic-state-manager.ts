import { BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface GenericState<T> {
  data: T | T[] | null,
  error: HttpErrorResponse | null;
  loading: boolean,
}

export class GenericStateManagerService<T> {
  public initialState: GenericState<T> = {
    data: null,
    error: null,
    loading: false,
  };

  public readonly state = new BehaviorSubject<GenericState<T>>(this.initialState);

  public getState(): Observable<GenericState<T>> {
    return this.state.asObservable();
  }

  public updateState(newState: Partial<GenericState<T>>){
    const currentState = this.state.getValue();
    this.state.next({ ...currentState, ...newState });
  }
}
