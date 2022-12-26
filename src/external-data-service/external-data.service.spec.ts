import { Test, TestingModule } from '@nestjs/testing';
import { CSEDataService } from './cse-data/cse-data.service';
import { ExternalDataService } from './external-data.service';

describe('DataService', () => {
  let service: ExternalDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CSEDataService],
    }).compile();

    service = module.get<ExternalDataService>(CSEDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
