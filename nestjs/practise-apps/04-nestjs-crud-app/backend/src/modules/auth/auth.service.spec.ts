import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('service', () => {
  let authService: AuthService;
  let usersService: UsersService;

  let mockUsersService: Partial<UsersService> = {
    createUser: jest.fn((email, password) =>
      Promise.resolve({ id: 1, email, password, posts: [] }),
    ),
    findUser: jest.fn((email?, id?) => {
      if (email === 'test@example.com' || id === 1) {
        return Promise.resolve({
          id: 1,
          email: 'test@example.com',
          password: 'hashedpass',
          posts: [],
        });
      }
      throw new NotFoundException('User not found');
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signup', () => {
    it('should hash the password and call createUser', async () => {
      const bcryptHashSpy = jest
        .spyOn(bcrypt, 'hash')
        .mockResolvedValue('hashedPassword');
      const result = await authService.signup('test@example.com', 'password');

      expect(bcryptHashSpy).toHaveBeenCalledWith('password', 10);
      expect(usersService.createUser).toHaveBeenCalledWith(
        'test@example.com',
        'hashedPassword',
      );
      expect(result).toEqual({
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        posts: [],
      });
    });
  });

  describe('signin', () => {
    it('should return the user if credentials are valid', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      const result = await authService.signin('test@example.com', 'password');

      expect(usersService.findUser).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(result).toEqual({
        id: 1,
        email: 'test@example.com',
        password: 'hashedpass',
        posts: [],
      });
    });

    it('should throw an UnauthorizedException if credentials are invalid', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(
        authService.signin('test@example.com', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw an UnauthorizedException if user is not found', async () => {
      jest
        .spyOn(usersService, 'findUser')
        .mockRejectedValue(new NotFoundException());

      await expect(
        authService.signin('nonexistent@example.com', 'password'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
