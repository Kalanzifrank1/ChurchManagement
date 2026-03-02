import { Test, TestingModule } from '@nestjs/testing';
import { GroupsModuleController } from './groups-module.controller';

describe('GroupsModuleController', () => {
  let controller: GroupsModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsModuleController],
    }).compile();

    controller = module.get<GroupsModuleController>(GroupsModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
