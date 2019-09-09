import { ApiModelProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiModelProperty({ description: '用户名', type: String, required: true })
    readonly email: string;
    @ApiModelProperty({ description: '密码', type: String, required: true })
    readonly password: string;
}
