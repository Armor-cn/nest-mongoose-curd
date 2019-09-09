import { ApiModelProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiModelProperty({ description: '姓名', type: String, required: true })
  readonly name: string;
  @ApiModelProperty({ description: "描述", type: String, required: true })
  readonly description: string;
  @ApiModelProperty({ description: "版本描述", type: Number, required: true })
  readonly version: number;
}
