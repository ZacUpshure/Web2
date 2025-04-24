// types/UserDTO.ts
// DTO: Data Transfer Objekt: ist eine strukturierte Beschreibung von Daten.
export interface CreateUserBody {
    userID: number;
    firstName?: string;
    lastName?: string;
    isAdministrator?: boolean;
    password: string;
}

export interface UpdateUserBody {
    firstName?: string;
    lastName?: string;
    isAdministrator?: boolean;
    password?: string;
}

export interface UserResponseDto {
    userID: number;
    firstName?: string;
    lastName?: string;
    isAdministrator?: boolean;
}

export interface CreateUserDto {
    userID: number;
    firstName?: string;
    lastName?: string;
    isAdministrator?: boolean;
    password: string;
}


export interface ErrorResponse {
    message: string;
}

export interface UserResponse {
    user: UserResponseDto;
}

export interface UserListResponse {
    users: UserResponseDto[];
}
