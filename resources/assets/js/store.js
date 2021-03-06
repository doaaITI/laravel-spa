 import  { getLocalUser } from './helpers/auth';
import Axios from 'axios';
 const user = getLocalUser();

export default {
    state: {
        currentUser: user,
        isLoggedIn :!!user ,
        loading:false,
        auth_error:null,
        customers:[]
     
    },
    getters: {
        isLoading(state){
             
             return state.loading;
        },
        isLoggedIn(state){
            return state.isLoggedIn;
        },
        currentUser(state){
            return state.currentUser;
        },
        auth_error(state){
            return state.auth_error;
        },
        customers(state){
            return state.customers;
        }
    },
    mutations: {
        login(state){
             state.loading =true;
             state.auth_error =null;
            
        },
        loginSuccess(state , payload){
             state.isLoading =false;
             state.isLoggedIn =true;
             state.auth_error =null;
         
             state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});
 
           localStorage.setItem("user",JSON.stringify(state.currentUser));

        },
        loginFailed(state ,payload){
          
            state.loading= false;

            state.auth_error= payload.error;
        },

        logout(state){
           localStorage.removeItem('user');
           state.isLoggedIn=false;
           state.currentUser=null;
        },
        updateCustomers(state ,payload){
            state.customers=payload;
        }
    },
    actions: {
     login(context){
         context.commit('login');
     },
     getCustomers(context){
        axios.get('/api/customers').then((response)=>{
            context.commit('updateCustomers', response.data.customers);
        });
     }

    }
}; 