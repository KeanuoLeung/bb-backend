import { Test, TestingModule } from '@nestjs/testing';
import { VerifiersController } from './verifiers.controller';

describe('VerifiersController', () => {
  let controller: VerifiersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerifiersController],
    }).compile();

    controller = module.get<VerifiersController>(VerifiersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
