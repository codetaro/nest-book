// tslint:disable-next-line:max-line-length
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseFilters, UseGuards, UseInterceptors, UsePipes, } from '@nestjs/common';
import { UserService } from './user.service';
import { CheckLoggedInUserGuard } from '../../shared/guards/check-logged-in-user.guard';
import { Client, ClientProxy, MessagePattern } from '@nestjs/microservices';
import { RpcValidationPipe } from '../../shared/pipes/rpcValidation.pipe';
import { RpcValidationFilter } from '../../shared/filters/rpcValidation.filter';
import { CreateUserRequest } from './requests/create-user.request';
import { RpcCheckLoggedInUserGuard } from '../../shared/guards/rpcCheckLoggedInUser.guard';
import { CleanUserInterceptor } from '../../shared/interceptors/cleanUser.interceptor';
import { microserviceConfig } from '../../shared/config/microservice.config';

@Controller()
export class UserController {

  // @ts-ignore
  @Client(microserviceConfig)
  client: ClientProxy;

  constructor(private readonly userService: UserService) {
  }

  @Get('users')
  // @UseGuards(CheckLoggedInUserGuard)
  public async index(@Res() res) {
    this.client.send({ cmd: 'users.index' }, {})
      .subscribe({
        next: users => {
          res.status(HttpStatus.OK).json(users);
        },
        error: error => {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        },
      });
  }

  @MessagePattern({ cmd: 'users.index' })
  // @UseGuards(CheckLoggedInUserGuard)
  public async rpcIndex() {
    const users = await this.userService.findAll();
    return users;
  }

  @Post('users')
  public async create(@Body() body: any, @Res() res) {
    this.client.send({ cmd: 'users.create' }, body)
      .subscribe({
        next: () => {
          res.status(HttpStatus.CREATED).send();
        },
        error: error => {
          if (error.error_code === 'VALIDATION_FAILED') {
            res.status(HttpStatus.BAD_REQUEST).send(error);
          } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
          }
        },
      });
  }

  @MessagePattern({ cmd: 'users.create' })
  @UsePipes(new RpcValidationPipe())
  // @UseFilters(new RpcValidationFilter())
  public async rpcCreate(data: CreateUserRequest) {
    await this.userService.create(data);
  }

  @Get('users/:userId')
  @UseGuards(CheckLoggedInUserGuard)
  public async show(@Param('userId') userId: number, @Req() req, @Res() res) {
    this.client.send({cmd: 'users.show'}, {userId, user: req.user})
      .subscribe({
        next: user => {
          res.status(HttpStatus.OK).json(user);
        },
        error: err => {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        }
      });
  }

  @MessagePattern({cmd: 'users.show'})
  @UseGuards(RpcCheckLoggedInUserGuard)
  @UseInterceptors(CleanUserInterceptor)
  public async rpcShow(data: any) {
    return await this.userService.findById(data.userId);
  }

  @Put('users/:id')
  @UseGuards(CheckLoggedInUserGuard)
  public async update(@Param() id: number, @Body() body: any, @Res() res) {
    if (!id) {
      throw new Error('Missing id.');
    }

    await this.userService.update(id, body);
    return res.status(HttpStatus.OK).send();
  }

  @Delete('users/:id')
  @UseGuards(CheckLoggedInUserGuard)
  public async delete(@Param() id: number, @Res() res) {
    if (!id) {
      throw new Error('Missing id.');
    }

    await this.userService.delete(id);
    return res.status(HttpStatus.OK).send();
  }
}
