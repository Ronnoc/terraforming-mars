
import Vue from 'vue';
import {PreferencesManager} from './PreferencesManager';

export const Login = Vue.component('login', {
  data: function() {
    return {
      userName: '',
      password: '',
    };
  },
  methods: {
    login: function() {
      if (this.userName === undefined || this.userName.length === 0) {
        alert('Please enter userName');
        return;
      }
      if (this.password === undefined || this.password.length <=1) {
        alert('Please enter more than 1 characters for password');
        return;
      }
      const dataToSend = JSON.stringify({userName: this.userName, password: this.password});

      const onSucces = (response: any) => {
        if (!response.ok) {
          response.text().then((msg: string) =>{
            alert(msg);
          });
        } else {
          response.json().then((data: { id: string; name: string; }) => {
            PreferencesManager.saveValue('userId', data.id);
            PreferencesManager.saveValue('userName', data.name);
            window.location.href = '/mygames';
          });
        }
      };

      fetch('/api/login', {'method': 'POST', 'body': dataToSend, 'headers': {'Content-Type': 'application/json'}})
        .then(onSucces)
        .catch((_) => alert('Unexpected server response'));
    },
  },
  template: `
        <div id="create-game">
            <h1><span v-i18n>Terraforming Mars</span> — <span v-i18n>Login</span></h1>
           
            <div class="create-game-players-cont"  >
                <div class="container">
                    <div class="columns">
                        <div class="form-group col6 create-game-player create-game--block register-block" >
                            <div>
                                <input class="form-input form-inline create-game-player-name" :placeholder="'Your Name'" v-model="userName"  />
                            </div>
                            <div>
                                <input class="form-input form-inline create-game-player-name register-input" :placeholder="'Password'" v-model="password"   />
                            </div>
                            <div class="register-action"> 
                                <button class="btn btn-lg btn-success" v-on:click="login" style="min-width: 80px;" v-i18n>Login</button> 
                                <a class="register-a" href="/register"  v-i18n>Go To Register</a> 
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    `,
});

