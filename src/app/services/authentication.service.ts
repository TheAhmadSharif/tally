import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: any; 
  userStatus:any;

  constructor(
    public aufAuth: AngularFireAuth,
    private router: Router,
    
  ) {    
    
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  doLogout() {
    this.aufAuth.signOut().then(function() {
      console.log('Signout success');
      localStorage.removeItem("user");
    }).catch(function(error) {
      console.log('Signout Failure');
    });                       
  }            
 
   getUserStatus() {
         
  }
}