import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Calendar } from '../interfaces/calendar.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  public schedules: Calendar[] = [];
  public authenticationState = new BehaviorSubject(false);
  private isAdmin: boolean;
  private items: AngularFirestoreCollection<Calendar>;

  schedulerData: Calendar[] = [];
  constructor(private firestore: AngularFirestore, public http: HttpClient) {}

  private saveToken(isAdmin: boolean) {
    if (isAdmin) {
      localStorage.setItem('type', 'admin');
    } else {
      localStorage.setItem('type', 'user');
    }
  }

  loadSchedules() {
    const schedulerDataAux: Calendar[] = [];
    return this.http.get<Calendar[]>(`${environment.url}/schedulerData`)
    .pipe(tap(
      resp => {
        this.schedulerData = resp;
        for (const schedule of this.schedulerData) {

          const start = schedule.startTime;
          const end = schedule.startTime;
          schedule.startTime = new Date(start._seconds * 1000);
          schedule.endTime = new Date(end._seconds * 1000);
          schedulerDataAux.unshift(schedule);
        }
        return schedulerDataAux;
      }
    ));
  }

  login() {
    this.authenticationState.next(true);
    // this.items = this.firestore.collection<Calendar>('calendar', ref =>
    // ref.orderBy('date', 'desc').limit(5));


    this.items = this.firestore.collection<Calendar>('calendar');
    // // this.items = this.firestore.collection('chats');

    return this.items.valueChanges().pipe(
      map( (messages: Calendar[]) => {
        // console.log(messages);
        this.schedules = [];
        for (const message of messages) {
          // console.log(message);
          this.schedules.unshift(message);
          // console.log(this.chats);
        }

      })
    );
  }

  addCalendarEvent() {
    const calendar: Calendar = {
      desc: 'this.user.name',
      title: 'string',
      startTime: new Date(),
      endTime: new Date(),
      allDay: false
      // uid: 'string',
      // status: 'string'
    };

    this.items.add(calendar)
      .then( () => console.log(''))
      .catch((err) => console.error('Error al enviar', err));
  }

  logout() {
      this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
