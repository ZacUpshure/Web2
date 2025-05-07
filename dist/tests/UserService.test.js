// tests/userService.test.ts
import { createUserService } from './../endpoints/user/UserService.js';
describe('UserService', () => {
    it('should create a new user', async () => {
        const mockUser = {
            userID: 'test123',
            firstName: 'Test',
            lastName: 'User',
            password: '123456',
            isAdministrator: false
        };
        const createdUser = await createUserService(mockUser);
        expect(createdUser).toHaveProperty('userID', 'test123');
    });
});
//# sourceMappingURL=UserService.test.js.map