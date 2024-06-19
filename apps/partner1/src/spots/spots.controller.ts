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
import { CreateSpotRequest } from './dto/create-spot.request';
import { UpdateSpotRequest } from './dto/update-spot.request';

@Controller('events/:eventId/spots')
export class SpotsController {
  constructor(private readonly spotCoreService: SpotsCoreService) {}

  @Post()
  create(
    @Body() createSpotRequest: CreateSpotRequest,
    @Param('eventId') eventId: string,
  ) {
    return this.spotCoreService.create({
      ...createSpotRequest,
      eventId,
    });
  }

  @Get()
  findAll(@Param('eventId') eventId: string) {
    return this.spotCoreService.findAll(eventId);
  }

  @Get(':spotId')
  findOne(@Param('spotId') spotId: string, @Param('eventId') eventId: string) {
    return this.spotCoreService.findOne(eventId, spotId);
  }

  @Patch(':spotId')
  update(
    @Param('spotId') spotId: string,
    @Param('eventId') eventId: string,
    @Body() updateSpotRequest: UpdateSpotRequest,
  ) {
    return this.spotCoreService.update(eventId, spotId, updateSpotRequest);
  }

  @Delete(':spotId')
  remove(@Param('spotId') spotId: string, @Param('eventId') eventId: string) {
    return this.spotCoreService.remove(eventId, spotId);
  }
}
