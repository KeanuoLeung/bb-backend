import { Module } from '@nestjs/common';
import { MachineController } from './machine/machine.controller';
import { IllegalwordController } from './illegalword/illegalword.controller';
import { IllegalpicController } from './illegalpic/illegalpic.controller';
import { NoticeController } from './notice/notice.controller';
import { VerifierController } from './verifier/verifier.controller';
import { PasswordService } from 'src/auth/password.service';
import { VerifierGroupController } from './verifier-group/verifier-group.controller';

@Module({
  providers: [PasswordService],
  controllers: [
    MachineController,
    IllegalwordController,
    IllegalpicController,
    NoticeController,
    VerifierController,
    VerifierGroupController,
  ],
})
export class AdminModule {}
