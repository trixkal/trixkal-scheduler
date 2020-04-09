import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { SchedulerService } from '../services/scheduler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: SchedulerService) {}
  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }

}
