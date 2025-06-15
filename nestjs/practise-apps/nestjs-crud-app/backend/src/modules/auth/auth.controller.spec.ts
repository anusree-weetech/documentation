import { Test, TestingModule } from '@nestjs/testing';
import { AuthCredentialDto } from 'src/common/dtos/auth-credential.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const fixtures = {
  mockAuthServiceResult: { id: 1, email: 'test@example.com' },
  dto: {
    email: 'test@example.com',
    password: 'password123',
  } as AuthCredentialDto,
};

const mocks = {
  mockAuthService: {
    signup: jest.fn((email, password) => {
      return Promise.resolve(fixtures.mockAuthServiceResult);
    }),
    signin: jest.fn((email, password) => {
      return Promise.resolve(fixtures.mockAuthServiceResult);
    }),
  },
  session: {} as any,
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mocks.mockAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should create a new user and store in session', async () => {
      const { dto, mockAuthServiceResult } = fixtures;
      const { session } = mocks;

      const result = await authController.signup(dto, session);

      expect(result).toEqual(mockAuthServiceResult);
      expect(session.user).toEqual(mockAuthServiceResult);
      expect(authService.signup).toHaveBeenCalledWith(dto.email, dto.password);
    });
  });

  describe('signin', () => {
    it('should log in a user and store in session', async () => {
      const { dto, mockAuthServiceResult } = fixtures;
      const { session } = mocks;

      const result = await authController.signin(dto, session);

      expect(result).toEqual(mockAuthServiceResult);
      expect(session.user).toEqual(mockAuthServiceResult);
      expect(authService.signin).toHaveBeenCalledWith(dto.email, dto.password);
    });
  });

  describe('logout', () => {
    it('should destroy session on logout', () => {
      let { session } = mocks;
      session.user = { id: 1, email: 'test@example.com' };
      session.destroy = jest.fn((cb) => cb(null));

      const result = authController.logout(session);

      expect(result).toEqual({ message: 'Logged out successfully' });
      expect(session.destroy).toHaveBeenCalled();
    });

    it('should return an error if no active session found', () => {
      const { session } = mocks;
      session.user = null;

      const result = authController.logout(session);

      expect(result).toEqual({ message: 'No active session found' });
    });
  });
});
