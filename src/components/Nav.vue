<template>
 <nav class="container mx-auto flex items-center justify-between py-4">
    <div>
        <a href="/"><img src="/img/logo.png" alt="logo"></a>
    </div>
    <div>
        <ul class="flex items-center">
            <li class="ml-6"><router-link to='/'>Menu</router-link></li>
            <li class="ml-6"><router-link to='orders'  v-if="user_type=='user'">Orders</router-link></li>
            <li class="ml-6"><router-link to='admin-orders' v-if="user_type=='admin'">Orders</router-link></li>
            <li class="ml-6"><router-link to='admin-categories'  v-if="user_type=='admin'">Categories</router-link></li>
            <li class="ml-6"><router-link to='admin-products'  v-if="user_type=='admin'">Products</router-link></li>
           
                <li class="ml-6" v-if='user'>
                  <a href='javascript:void(0)' @click='handleClick' >Logout</a>
                    
                </li>
            
                <li class="ml-6" v-if='!user'><router-link to='/register'>Register</router-link></li>
                <li class="ml-6" v-if='!user'><router-link to='/login'>Login</router-link></li>
           
            <li class="ml-6">
              <router-link to='/cart' class="inline-block px-4 py-2 rounded-full flex items-center"><span id="cartCounter"
                              class="text-white font-bold pr-2">{{totalQty}}</span><img src="/img/cart.png" alt="">
                </router-link>
            </li>
        </ul>
    </div>
</nav>
</template>
<script>
export default{
	name:'Nav',
  data() {
    return {
      items:null,
      user_type:'',
      totalPrice:0,
      error:null,
      showModal:false,
      user:null,
      phone:'',
      address:'',
      validation:'',
      totalQty:0,
    };
  },
  created() {
    if (localStorage.getItem('user_info') !=null) {
      this.user=JSON.parse(localStorage.getItem('user_info'));
      this.user_type=localStorage.getItem('user_type');
    }
      
    if (localStorage.getItem('product_cart') !=null) {
      let cart = JSON.parse(localStorage.getItem('product_cart'));
      this.totalQty = localStorage.getItem('totalQty');
      this.items = cart.items;
      this.totalPrice=cart.totalPrice;
    }
  
  },
	methods:{
    async handleClick(){
      //console.log(5);
    localStorage.removeItem('user_token');
    localStorage.removeItem('product_cart');
    localStorage.removeItem('totalQty');
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_info');
    location.href='/login';
    this.$router.push('/login');
    }
  }
}
</script>