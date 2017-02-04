# Ionic 2 Instagram Authentication and Instagram API integration (Android and IOS)

This example is using ng2-cordova-oauth library to call the Instagram oauth API using InAppBrowser. The Access token in the response can be further used to query data from Instagram. 

##Working Code
To run the above tested and ready code please clone the repository and use the following commands in your project root folder.
```
npm install 
ionic platform add android (or ios)
ionic build android
ionic run android

```
## Step by Step Working Example 

### Requirements

For Cordova application:
* Ionic 2
* Apache Cordova 5+
* [Apache Cordova InAppBrowser Plugin](http://cordova.apache.org/docs/en/3.0.0/cordova_inappbrowser_inappbrowser.md.html)
* [Apache Cordova Whitelist Plugin](https://github.com/apache/cordova-plugin-whitelist)
* [Angular 2 Cordova Oauth Plugin](https://github.com/nraboy/ng2-cordova-oauth)

### Installing ng2-cordova-oauth cordova-plugin-inappbrowser Into Your Project

From the root of your, execute the following:

```
npm install ng2-cordova-oauth --save
ionic plugin add cordova-plugin-inappbrowser --save
```

This will install ng2-cordova-oauth and its dependencies along with In App browser.


###Home Component

```javascript
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

```

###UserService 

```javascript
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(public http: Http) {
  }    
  //Below Instagrm API is taken from  https://www.instagram.com/developer/endpoints/

  getInstagramUserInfo(response) {
    //GET USER PHOTOS
    return this.http.get('https://api.instagram.com/v1/users/self/media/recent?access_token=' + response.access_token + '&count=5')
    .map((res:Response) => res.json());
  }  

}
```
Add the UserService as provider in the app.module.ts

## Have a question?

Maintained by **Sudipta Sarkar**.

Tweet Sudipta Sarkar on Twitter - [@sudipta169](https://www.twitter.com/sudipta169)


## Resources

Ionic 2 - [http://www.ionicframework.com](http://www.ionicframework.com)

Angular 2 - [https://www.angular.io](https://www.angular.io)

Apache Cordova - [http://cordova.apache.org](http://cordova.apache.org)

Nic Raboy's Angular 2 oauth Plugin - [https://github.com/nraboy/ng2-cordova-oauth](https://github.com/nraboy/ng2-cordova-oauth)
