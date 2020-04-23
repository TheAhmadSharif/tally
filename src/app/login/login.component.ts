import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NgbTabsetConfig]
})
export class LoginComponent implements OnInit {
  notification: any;

  

  constructor(
    public angularFireAuth: AngularFireAuth, 
    private router: Router,
    public authService: AuthService,
    config: NgbTabsetConfig, 
    ) {
    config.justify = 'center';
    config.type = 'pills';
  }

  ngOnInit(): void {
  }

  doDogin(email:string, password:string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then((result:any) => {
        this.authService;

        this.router.navigate(['dashboard']);
        
      }).catch((error:any) => {
        this.notification = error.message;
      })
  }

  

}
