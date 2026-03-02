import { Test, TestingModule } from '@nestjs/testing';
import { GroupsModuleService } from './groups-module.service';

describe('GroupsModuleService', () => {
  let service: GroupsModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsModuleService],
    }).compile();

    service = module.get<GroupsModuleService>(GroupsModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
