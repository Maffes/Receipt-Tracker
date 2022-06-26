<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../store/users';
const user = useUserStore()
const logInCredentials = ref({
    email: '',
    password: ''
})

  const logIn = async (email:String, password:String) => {
      return user.authenticateUser(email, password);
  }


</script>

<template>
  <div  class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
    </div>

    <form @submit.prevent="logIn(logInCredentials.email, logInCredentials.password)" class="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input v-model="logInCredentials.email" id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input v-model="logInCredentials.password" id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password">
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm">
          <p class="font-medium">Not a user? <router-link class="font-medium text-blue-600 hover:text-blue-500" to="/register">Sign Up Now</router-link></p>
        </div>

        <div class="text-sm">
          <!--<a href="#" class="font-medium text-blue-600 hover:text-blue-500"> Forgot your password? </a>-->
        </div>
      </div>

      <div>
        
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Sign in
        </button>
      </div>
    </form>
  </div>
</div>
</template>

<style>

</style>