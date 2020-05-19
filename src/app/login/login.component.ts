import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../services/authentication.service';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase/app';
import 'firebase/auth';


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
    public authService: AuthenticationService,
    config: NgbTabsetConfig, 
    ) {
    config.justify = 'center';
    config.type = 'pills';
  }

  ngOnInit(): void {
  }

  doDogin(email:string, password:string) {

    this.angularFireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
        .then((result:any) => {
          this.router.navigate(['dashboard/home']);
        }).catch((error:any) => {
          this.notification = error.message;
        });  
  })
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });


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

            var actionCodeSettings = {
              // URL you want to redirect back to. The domain (www.example.com) for this
              // URL must be whitelisted in the Firebase Console.
              url: 'https://www.example.com/finishSignUp?cartId=1234',
              // This must be true.
              handleCodeInApp: true,
              dynamicLinkDomain: 'example.page.link'
            };

   
            this.angularFireAuth.sendSignInLinkToEmail(emailaddress, actionCodeSettings)
              .then(function() {

                window.localStorage.setItem('emailForSignIn', emailaddress);
              })
              .catch(function(error) {
                // Some error occurred, you can inspect the code: error.code
              });

        }, function(error) {
          console.log(error, 'error');
        });      
      })
      .catch(error => {
          this.notification = error.message;
      });
 
  }
}
