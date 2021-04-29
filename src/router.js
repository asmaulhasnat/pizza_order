import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Cart from './components/Cart.vue'
import Orders from './components/Orders.vue'
import Singleorder from './components/Singleorder.vue'
import Adminorder from './components/Adminorder.vue'
import Category from './components/Category.vue'
import Adminproduct from './components/Adminproduct.vue'

Vue.use(Router)
export default new Router({
	mode:'history',
	routes:[
	{path: '/',component: Home},
	{path: '/login',component: Login},
	{path: '/register',component: Register},
	{path: '/cart',component: Cart},
	{path: '/orders',component: Orders},
	{path: '/view-status/:id',component: Singleorder},
	{path: '/admin-orders',component: Adminorder},
	{path: '/admin-categories',component: Category},
	{path: '/admin-products',component: Adminproduct},
	]
})

