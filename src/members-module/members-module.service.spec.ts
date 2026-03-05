/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Test, TestingModule } from '@nestjs/testing';
import { MembersModuleService } from './members-module.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MemberEntity } from './memberEntity/member.entity';

// simple mock of the query builder used by getAllMembers
const mockQueryBuilder: any = {
  leftJoinAndSelect: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  take: jest.fn().mockReturnThis(),
  getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
};

const mockRepository = {
  createQueryBuilder: jest.fn(() => mockQueryBuilder),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('MembersModuleService', () => {
  let service: MembersModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersModuleService,
        {
          provide: getRepositoryToken(MemberEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MembersModuleService>(MembersModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllMembers', () => {
    it('should return a paginated result with default page/limit', async () => {
      const result = await service.getAllMembers();
      expect(result).toEqual({
        members: [],
        total: 0,
        page: 1,
        limit: 10,
      });
      expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(0);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(10);
      expect(mockQueryBuilder.getManyAndCount).toHaveBeenCalled();
    });

    it('should apply pagination and search parameters to the query builder', async () => {
      mockQueryBuilder.getManyAndCount.mockResolvedValue([[], 5]);
      const result = await service.getAllMembers(2, 5, 'john');
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'member.firstName LIKE :like OR member.lastName LIKE :like OR member.email LIKE :like',
        { like: '%john%' },
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(5);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(5);
      expect(result).toEqual({
        members: [],
        total: 5,
        page: 2,
        limit: 5,
      });
    });
  });
});
