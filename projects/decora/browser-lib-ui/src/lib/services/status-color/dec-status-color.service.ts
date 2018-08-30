import { Injectable } from '@angular/core';
import { StatusColors } from './status-colors.enum';

@Injectable()
export class DecStatusColorService {

  constructor() { }

  getStatusColor(status: string) {
    return StatusColors[status];
  }

}
