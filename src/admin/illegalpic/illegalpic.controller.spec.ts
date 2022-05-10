import { Test, TestingModule } from '@nestjs/testing';
import { IllegalpicController } from './illegalpic.controller';

describe('IllegalpicController', () => {
  let controller: IllegalpicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IllegalpicController],
    }).compile();

    controller = module.get<IllegalpicController>(IllegalpicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
