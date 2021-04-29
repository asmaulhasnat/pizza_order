<template>
 <section class="login flex justify-center pt-24">
    <div class="w-full max-w-xs">
        <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <span class="text-red-500 text-sm" v-if='error'>
                  <ul v-if='error' class="text-danger">
                  <li>{{validation}} </li>
                  <li v-for='(er,errorind) in error' v-bind:key='errorind'>{{errorind}} : {{er[0]}}</li>
                </ul>
                </span>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Name
                </label>
                <input name="name" v-model="name"
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="username" type="text" placeholder="Enter your name">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Email
                </label>
                <input name="email"  v-model='email'
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       id="email" type="email" placeholder="Enter your email">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password" >
                    Password
                </label>
                <input name="password" v-model='password'
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                       id="password" type="password" placeholder="******************">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password2" >
                    Confirm Password
                </label>
                <input name="password_confirmation" v-model='password_confirmation'
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                       id="password2" type="password" placeholder="******************">
            </div>
            <div class="flex items-center justify-between">
                <button
                        class="btn-primary rounded-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                    Register
                </button>
                <router-link to='/login' class="inline-block align-baseline font-bold text-sm" href="/login">
                    Already have account?
                </router-link>
            </div>
        </form>
        <p class="text-center text-gray-500 text-xs">
            &copy;2021 ahsweet. All rights reserved.
        </p>
    </div>
</section>
</template>
<script>
import axios from  'axios'
export default{
	name:'Register',
	data(){
		return {
			name:'',
			email:'',
			password:'',
			password_confirmation:'',
      error:null,
      validation:null,
		}
	},
	methods:{
		async handleSubmit(){
		let data={email:this.email,password:this.password,name:this.name,password_confirmation:this.password_confirmation};
    //const response = await axios.get('signup',{ params: data });
    const response = await axios.post('signup',data);

     if (response.data.status==422) {
        this.validation =response.data.message;
        this.error=response.data.data;
       }else{
        this.error='';
        this.$router.push('/login');
       }
		
		}
	}
}
</script>

