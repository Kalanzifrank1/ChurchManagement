import { Test, TestingModule } from '@nestjs/testing';
import { MembersModuleController } from './members-module.controller';
import { MembersModuleService } from './members-module.service';

describe('MembersModuleController', () => {
  let controller: MembersModuleController;
  let service: MembersModuleService;

  const mockService = {
    findMember1: jest.fn(),
    getAllMembers: jest.fn(),
    createMember: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersModuleController],
      providers: [{ provide: MembersModuleService, useValue: mockService }],
    }).compile();

    controller = module.get<MembersModuleController>(MembersModuleController);
    service = module.get<MembersModuleService>(MembersModuleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllMembers endpoint', () => {
    it('should call service and return its result', async () => {
      const returnValue = { members: [], total: 0, page: 1, limit: 10 };
      mockService.getAllMembers.mockResolvedValue(returnValue);

      const response = await controller.getAllMembers('2', '5', 'foo');
      expect(response).toBe(returnValue);
      expect(service.getAllMembers).toHaveBeenCalledWith(2, 5, 'foo');
    });

    it('should default page/limit when none supplied', async () => {
      const returnValue = { members: [], total: 0, page: 1, limit: 10 };
      mockService.getAllMembers.mockResolvedValue(returnValue);

      const response = await controller.getAllMembers();
      expect(response).toBe(returnValue);
      expect(service.getAllMembers).toHaveBeenCalledWith(1, 10, undefined);
    });
  });
});