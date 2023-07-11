import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  } from '@nestjs/common';
import { CreateClientDto } from 'src/client/client.dto';
import { ClientService } from 'src/client/services/client/client.service';

@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService
  ) {}

  @Get()
  getClients() {
    return this.clientService.getClients();
  }
  
  @Get(':id')
  findClientsById(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.getClientById(id);
  }
  
  @Post()
  @UsePipes(ValidationPipe)
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createClient(createClientDto);
  }
}
