import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  checkLogin() {
    this.route.navigate(['scheduler']);
  }
}
