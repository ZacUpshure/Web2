// types/AuthTypes.ts
export interface UserTokenPayload {
    userID: string;
    isAdministrator: boolean;
    // optional: firstName, lastName
}
