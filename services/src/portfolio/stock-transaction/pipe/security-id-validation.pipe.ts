import {
  ArgumentMetadata,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import {
  EXTERNAL_DATA_SERVICE,
  ExternalDataService,
} from 'src/external-data-service/external-data.service';

@Injectable()
export class SecurityIdValidationPipe<T extends string>
  implements PipeTransform<T>
{
  constructor(
    @Inject(EXTERNAL_DATA_SERVICE)
    private readonly extDataService: ExternalDataService,
  ) {}
  async transform(value: T, metadata: ArgumentMetadata) {
    const result = await this.extDataService.findSecurityDataById(value);
    if (result === null) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Security id is not valid.',
      });
    }
    return value;
  }
}
