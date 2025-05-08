
import { UserTokenPayload } from './AuthTypes';

declare global {
    namespace Express {
        interface Request {
            user?: UserTokenPayload;
        }
    }
}

export {};