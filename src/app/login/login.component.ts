import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthService } from '../services/auth.service';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NgbTabsetConfig]
})
export class LoginComponent implements OnInit {

  constructor(
    config: NgbTabsetConfig, 
    private router: Router
    ) {
    config.justify = 'center';
    config.type = 'pills';
  }

  ngOnInit(): void {
  }

  

}
