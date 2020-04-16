import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {NgCalendarModule} from 'ionic2-calendar';
import { SchedulerPage } from './scheduler.page';

@NgModule({
  imports: [
    NgCalendarModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: SchedulerPage
      }
    ])
  ],
  declarations: [SchedulerPage]
})
export class SchedulerPageModule {}
