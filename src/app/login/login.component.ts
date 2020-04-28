import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      
        this.router.navigate(['dashboard/home']);
        
      }).catch((error:any) => {
        this.notification = error.message;
      })   
    }

  createUser(email:string, password:string, displayName:string) {
    var emailaddress = email;
    var userpassword = password;
    var displayName = displayName;

      this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(object => {
        console.log(object, 'success');

        object.user.updateProfile({
          displayName: displayName
        }).then(user => {
            console.log(user, 'user');

            this.notification = "You have successfully signup in our system. Now, you are going to land in our system's dashboard page.";

            setTimeout(()=> {
              this.router.navigate(['dashboard/home']);
            }, 1500);

        }, function(error) {
          console.log(error, 'error');
        });      



      })
      .catch(error => {
          this.notification = error.message;
      });
 
  }
}
