import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Instagram } from "ng2-cordova-oauth/core";  
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    private oauth: OauthCordova = new OauthCordova();

    private instagramProvider: Instagram = new Instagram({
        clientId: "c4ab26818cc64c0081fdc68f775c8b28",      // Register you client id from https://www.instagram.com/developer/
        redirectUri: 'http://localhost',  // Let is be localhost for Mobile Apps
        responseType: 'token',   // Use token only 
        appScope: ['basic','public_content'] 

        /*
        appScope options are 

        basic - to read a user’s profile info and media
        public_content - to read any public profile info and media on a user’s behalf
        follower_list - to read the list of followers and followed-by users
        comments - to post and delete comments on a user’s behalf
        relationships - to follow and unfollow accounts on a user’s behalf
        likes - to like and unlike media on a user’s behalf

        */ 
    });

  private apiResponse;

  constructor(public navCtrl: NavController, public UserService:UserService) {
      this.apiResponse = [];
  }

  ngOnInit(){
      this.oauth.logInVia(this.instagramProvider).then((success) => {

          console.log(JSON.stringify(success));

          /* Returns User uploaded Photos */
          this.UserService.getInstagramUserInfo(success).subscribe(response => this.apiResponse=response.data);

      }, (error) => {
          console.log(JSON.stringify(error));
      });
  }

}
