import { Test, TestingModule } from '@nestjs/testing';
import { DividentService } from './divident.service';

describe('DividentService', () => {
  let service: DividentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DividentService],
    }).compile();

    service = module.get<DividentService>(DividentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
