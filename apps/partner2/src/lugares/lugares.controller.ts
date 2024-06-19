import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpotsCoreService } from '@app/core/spots/spots-core.service';
import { CriarLugarRequest } from './dto/criar-lugar.request';
import { AtualizarLugarRequest } from './dto/atualizar-lugar.request';

@Controller('eventos/:eventoId/lugares')
export class LugaresController {
  constructor(private readonly spotCoreService: SpotsCoreService) {}

  @Post()
  create(
    @Body() criarLugaresRequest: CriarLugarRequest,
    @Param('eventoId') eventId: string,
  ) {
    return this.spotCoreService.create({
      name: criarLugaresRequest.nome,
      eventId,
    });
  }

  @Get()
  findAll(@Param('eventoId') eventoId: string) {
    return this.spotCoreService.findAll(eventoId);
  }

  @Get(':lugarId')
  findOne(
    @Param('lugarId') lugarId: string,
    @Param('eventoId') eventoId: string,
  ) {
    return this.spotCoreService.findOne(eventoId, lugarId);
  }

  @Patch(':lugarId')
  update(
    @Param('lugarId') lugarId: string,
    @Param('eventoId') eventoId: string,
    @Body() atualizarLugarRequest: AtualizarLugarRequest,
  ) {
    return this.spotCoreService.update(eventoId, lugarId, {
      name: atualizarLugarRequest.nome,
    });
  }

  @Delete(':lugarId')
  remove(
    @Param('lugarId') lugarId: string,
    @Param('eventoId') eventoId: string,
  ) {
    return this.spotCoreService.remove(eventoId, lugarId);
  }
}
