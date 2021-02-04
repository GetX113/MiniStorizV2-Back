import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../user.entity';
import admin = require('firebase-admin');
import { UserInfo } from './userInfo.class';
import { userInfo } from 'os';
import firebase = require('firebase');
import * as moment from 'moment';
@Injectable()
export class FirebaseService {
  constructor(private userInfo: UserInfo) {}
  registerWithFirebase(user: User): Promise<UserInfo> {
    const _this = this;
    return admin
      .auth()
      .createUser({
        uid: user.id,
        email: user.email,
        emailVerified: false,
        password: user.motDePasse,
        displayName: user.pseudo,
        disabled: false,
      })
      .then( function(userRecord) {
        console.log(userRecord);
        return admin
          .auth()
          .createCustomToken(userRecord.uid, { role: user.role })
          .then(function(customToken) {
            _this.userInfo.id = userRecord.uid;
            _this.userInfo.token = customToken;
            _this.userInfo.email = user.email;
            _this.userInfo.role = user.role;
            _this.userInfo.lienPhoto = user.lienPhoto;
            _this.userInfo.pseudo = user.pseudo;
            _this.userInfo.message = 'utilisateur cree avec succes !';
            console.log(_this.userInfo);
            return _this.userInfo;
          })
          .catch(function(error) {
            throw new HttpException(
              error, HttpStatus.FORBIDDEN,
            );
          });

        console.log('Successfully created new user:', userRecord.uid);
      })
      .catch(function(error) {
        throw new HttpException(
          error, HttpStatus.FORBIDDEN,
        );
      });
    
  }
 loginWithFirebase(user: User): Promise<UserInfo> {
    const _this = this;
    return firebase
       .auth()
       .signInWithEmailAndPassword(
        user.email, user.motDePasse)
       .then( function(userRecord) {
           
           return admin
          .auth()
          .createCustomToken(userRecord.user.uid)
          .then(function(customToken) {
            _this.userInfo.token = customToken;
            _this.userInfo.email = user.email;
            _this.userInfo.id = user.id;
            _this.userInfo.role = user.role;
            _this.userInfo.lienPhoto = user.lienPhoto;
            _this.userInfo.pseudo = user.pseudo;
            _this.userInfo.message = 'utilisateur connectee avec succes !';
            console.log(_this.userInfo)
            return _this.userInfo;
          }).catch(function (error) {
            throw new HttpException(
              error, HttpStatus.FORBIDDEN,
            );
          });
       });
  }
  changePasswordWithFirebase(user: User, password: string): any {
    const _this = this;
    var users;
    return firebase
    .auth()
    .signInWithEmailAndPassword(
     user.email, user.motDePasse).then( function(userRecord) {
       users = userRecord.user;
       return users.updatePassword(password).then(function() {
      console.log("updated")
      return "updated";
    }).catch(function(error) {
      throw new HttpException(
        error, HttpStatus.FORBIDDEN,
      );
    });
     })
   
  }
}
