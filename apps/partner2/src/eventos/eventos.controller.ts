import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { EventsCoreService } from '@app/core/events/events-core.service';
import { CriarEventoRequest } from './dto/criar-evento.request';
import { AtualizarEventoRequest } from './dto/atualizar-evento.request';
import { ReservarLugarRequest } from './dto/reservar-lugar.request';
import { TicketKind } from '@prisma/client';
import { AuthGuard } from '@app/core/auth/auth.guard';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventsCoreService: EventsCoreService) {}

  @Post()
  create(@Body() criarEventoRequest: CriarEventoRequest) {
    return this.eventsCoreService.create({
      name: criarEventoRequest.nome,
      description: criarEventoRequest.descricao,
      date: criarEventoRequest.data,
      price: criarEventoRequest.preco,
    });
  }

  @Get()
  findAll() {
    return this.eventsCoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsCoreService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() atualizarEventosRequest: AtualizarEventoRequest,
  ) {
    return this.eventsCoreService.update(id, {
      name: atualizarEventosRequest.nome,
      description: atualizarEventosRequest.descricao,
      date: atualizarEventosRequest.data,
      price: atualizarEventosRequest.preco,
    });
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsCoreService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/reservar')
  reserveSpots(
    @Body() reservarLugarRequest: ReservarLugarRequest,
    @Param('id') eventId: string,
  ) {
    return this.eventsCoreService.reserveSpot({
      eventId,
      spots: reservarLugarRequest.lugares,
      ticket_kind:
        reservarLugarRequest.tipo_igresso === 'inteira'
          ? TicketKind.full
          : TicketKind.half,
      email: reservarLugarRequest.email,
    });
  }
}
