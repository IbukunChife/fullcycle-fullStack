import { Test, TestingModule } from '@nestjs/testing';
import { SplotsService } from './splots.service';

describe('SplotsService', () => {
  let service: SplotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SplotsService],
    }).compile();

    service = module.get<SplotsService>(SplotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
