import { Test, TestingModule } from '@nestjs/testing';
import { VerifierGroupController } from './verifier-group.controller';

describe('VerifierGroupController', () => {
  let controller: VerifierGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerifierGroupController],
    }).compile();

    controller = module.get<VerifierGroupController>(VerifierGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
