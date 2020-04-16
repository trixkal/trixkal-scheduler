import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SchedulerService } from '../services/scheduler.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  items: Observable<any[]>;
  userItem = '';
  constructor(private schedulerService: SchedulerService, private route: Router, private firestore: AngularFirestore) {

console.log('hey');
    this.items = firestore.collection('img').valueChanges();
    console.log(this.items);

   }

  ngOnInit() {
  }

  doLogin(user: string) {
    this.schedulerService.login();
 //   this.route.navigate(['tabs', 'tab1']);
    //console.log('hey2');
    //this.route.navigateByUrl(`tabs/tab1`);
  }

}
