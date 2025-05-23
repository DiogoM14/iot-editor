import { HttpErrorResponse } from '@angular/common/http';
import { Signal, signal } from '@angular/core';

export interface GenericState<T> {
  data: T | null,
  error: HttpErrorResponse | null;
  loading: boolean,
}

export class SignalStateManager<T> {
  public initialState: GenericState<T> = {
    data: null,
    error: null,
    loading: false,
  };

  public readonly state = signal<GenericState<T>>(this.initialState);

  public getState(): Signal<GenericState<T>> {
    return this.state.asReadonly();
  }

  public updateState(newState: Partial<GenericState<T>>){
    this.state.update(oldState => {
      return { ...oldState, ...newState }
    });
  }
}
