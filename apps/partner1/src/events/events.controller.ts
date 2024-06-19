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
import { CreateEventRequest } from './dto/create-event.request';
import { UpdateEventRequest } from './dto/update-event.request';
import { ReserveSpotRequest } from './dto/reserve-spot.request';
import { AuthGuard } from '@app/core/auth/auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsCoreService: EventsCoreService) {}

  @Post()
  create(@Body() createEventRequest: CreateEventRequest) {
    return this.eventsCoreService.create(createEventRequest);
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
    @Body() updateEventRequest: UpdateEventRequest,
  ) {
    return this.eventsCoreService.update(id, updateEventRequest);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsCoreService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/reserve')
  reserveSpots(
    @Body() reserveRequest: ReserveSpotRequest,
    @Param('id') eventId: string,
  ) {
    return this.eventsCoreService.reserveSpot({ ...reserveRequest, eventId });
  }
}
