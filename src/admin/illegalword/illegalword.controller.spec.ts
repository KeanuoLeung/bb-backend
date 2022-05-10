import { Test, TestingModule } from '@nestjs/testing';
import { IllegalwordController } from './illegalword.controller';

describe('IllegalwordController', () => {
  let controller: IllegalwordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IllegalwordController],
    }).compile();

    controller = module.get<IllegalwordController>(IllegalwordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
