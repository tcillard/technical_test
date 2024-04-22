import { Injectable, Logger } from '@nestjs/common'
import 'dotenv/config'

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)

}
