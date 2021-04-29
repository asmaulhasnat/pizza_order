<template>
<section class="status">
    <div class="container mx-auto">
        <div class="status-box w-full lg:w-2/3 mx-auto">
            <div class="flex items-center justify-between mb-12">
                <h1 class="text-xl font-bold">Track delivery status</h1>
                <h6 class="bg-white py-1 rounded-full px-4 text-green-600 text-xs" v-if='order'>Order ID : {{order.id}}</h6>
                <input id="hiddenInput" type="hidden" value="order_placed">
            </div>
            <div v-if='order'>
            <ul v-if="order.order_status=='Processing'">
                <li class="status_line text-sm md:text-xl pb-16 text-orange"   data-status="order_placed"><span>Processing</span>
                </li>
                <li class="status_line text-sm md:text-xl pb-16"  data-status="confirmed"><span>Confirm</span>
                </li>
                <li class="status_line text-sm md:text-xl pb-16"><span>Shipped</span></li>
                <li class="status_line text-sm md:text-xl pb-16" ><span>Delivered </span>
                </li>
                <li class="status_line text-sm md:text-xl"><span>Complete</span></li>
            </ul>
            <ul v-if="order.order_status=='Shipped'">
                <li class="status_line text-sm md:text-xl pb-16 "   data-status="order_placed"><span>Processing</span>
                </li>
                <li class="status_line text-sm md:text-xl pb-16"  data-status="confirmed"><span>Confirm</span>
                </li>
                <li class="status_line text-sm md:text-xl pb-16 text-orange"><span>Shipped</span></li>
                <li class="status_line text-sm md:text-xl pb-16" ><span>Delivered </span>
                </li>
                <li class="status_line text-sm md:text-xl"><span>Complete</span></li>
            </ul>
            <ul v-if="order.order_status=='Delivered'">
                <li class="status_line text-sm md:text-xl pb-16 "   data-status="order_placed"><span>Processing</span>
                </li>
                <li class="status_line text-sm md:text-xl pb-16"  data-status="confirmed"><span>Confirm</span>
                </li>
                <li class="status_line text-sm md:text-xl pb-16"><span>Shipped</span></li>
                <li class="status_line text-sm md:text-xl pb-16 text-orange" ><span>Delivered </span>
                </li>
                <li class="status_line text-sm md:text-xl"><span>Complete</span></li>
            </ul>
        	</div>
        </div>
    </div>
</section>
</template>
<script>
import axios from "axios";
export default {
  name: "Singleorder",
  data() {
    return {
      order:'',
      user:null,
    };
  },
  async created() {
  	if (localStorage.getItem('user_info') !=null) {
      this.user=JSON.parse(localStorage.getItem('user_info'));
      if(localStorage.getItem('user_type')=='admin'){
        this.$router.push('/');
      }
    }else{
    this.$router.push('/'); 
    }
   	 let data={user_id:this.user.id,id:this.$route.params.id,token:localStorage.getItem('user_token')};
   	//const res = await axios.get('order/check', { params: data });
   	const res = await axios.post('order/check',data);
   	if (res.data.status==200) {
   		this.order=res.data.data;
   	}
   	//const res = await axios.post('order/check', data);
   	 console.log(res);
  
  },
  methods: {
    orderNow() {

	 

    }
  }
};
</script>