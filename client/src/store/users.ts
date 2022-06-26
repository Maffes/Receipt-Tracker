import { defineStore } from 'pinia';
import axios from 'axios'
import router from '../router/index.js'
const url = window.location.host
// const URI = `${url}`
const URI = `http://localhost:3001`

const localStorageString = localStorage.getItem('user') as string
const localData = JSON.parse(localStorageString)

export const useUserStore = defineStore("useUserStore", {
state: () => {
    return {
        user: {
            _id: '',
            token: '',
            firstName: '',
            lastName: '' ,
            email: '',
            loginStatus: false
        }
    }
},

getters: {
    getUser(state){
        return state.user
        }
    },

actions: {
    returningUser() {
        if (localStorage.user) {
            this.user._id = localData.data._id
            this.user.token = localData.data.token;
            this.user.firstName = localData.data.firstName;
            this.user.lastName = localData.data.lastName;
            this.user.email = localData.data.email;
            this.user.loginStatus = true;
        }
    },

    async authenticateUser(email:String, password:String) {
        //Authenticate and get user info
        // try {
            const user = await axios.post(`/api/users/login`,{email, password})
            if (user.data) {
            // Commits user details to store
            this.user._id = user.data._id;
            this.user.token = user.data.token;
            this.user.firstName = user.data.firstName;
            this.user.lastName = user.data.lastName;
            this.user.email = user.data.email;
            this.user.loginStatus = true;
            // Saves user details to local storeage
            localStorage.setItem('user', JSON.stringify(user));
            // Redirect after auth
            router.replace('/');
        } else {
            alert('Invalid email or password')
        }
        // } catch {
            
        // }
    },

    async registerUser(firstName:String, lastName:String, email:String, password:String) {
        try{
            const user = await axios.post(`/api/users/`,{ firstName, lastName, email, password})
            // Commits user details to store
            this.user._id = user.data._id;
            this.user.token = user.data.token;
            this.user.firstName = user.data.firstName;
            this.user.lastName = user.data.lastName;
            this.user.email = user.data.email;
            this.user.loginStatus = true;
            // Saves user details to local storeage
            localStorage.setItem('user', JSON.stringify(user));
            this.returningUser()
            console.log('tt')
            router.replace('/');
            console.log('tt2')
        } catch (err) {
            console.log(err)
            alert('Account already exists')
        }
    },


    logOut() {
    this.user = {
        _id: '',
        token: '',
        firstName: '',
        lastName: '',
        email: '',
        loginStatus: false
    };
    this.user.loginStatus = false
    localStorage.removeItem('user');
    router.push('/login');
    }
}})
