import { createRouter, createWebHistory } from "vue-router";
import Home from "/src/views/Home.vue"
import Register from "/src/views/Register.vue"
import Login from "/src/views/Login.vue"
import EditReceipt from "/src/views/EditReceipt.vue"
import ViewReceipt from "/src/views/ViewReceipt.vue"
import NewReceipt from "/src/views/NewReceipt.vue"


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/edit/:id', name: 'EditReceipt', component: EditReceipt },
  { path: '/view/:id', name: 'ViewReceipt', component: ViewReceipt },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/create', name: 'NewReceipt', component: NewReceipt }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router