import { HttpErrorResponse } from '@angular/common/http';

export interface UserState {
    data: UserModel[] | UserModel | null;
    loading: boolean;
    error: HttpErrorResponse | null;
}

export interface UserModel {
    id: number;
    fullName: string;
    email: string;
    isActive: boolean;
}
