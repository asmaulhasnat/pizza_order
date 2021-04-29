<template>

 <section class="orders light-section">
    <div class="container mx-auto pt-12">
        <h1 class="font-bold text-lg mb-4">All orders</h1>
        <table class="w-full table-auto bg-white">
            <thead>
                <tr>
                    <th class="px-4 py-2 text-left">Orders Id </th>
                    <th class="px-4 py-2 text-left">Customer</th>
                    <th class="px-4 py-2 text-left">Address</th>
                    <th class="px-4 py-2 text-left">Phone</th>
                    <th class="px-4 py-2 text-left">Status</th>
                    <th class="px-4 py-2 text-left">Placed at</th>
                </tr>
            </thead>
            <tbody id="orderTableBody">
            	<tr  v-for="(item, index) in items" :key="index">
                    <td class="border px-4 py-2">
                        {{item.id}}
                    </td>
                    <td class="border px-4 py-2" v-if='item.user'>
                        {{item.user.name}}
                    </td>
                    <td class="border px-4 py-2" v-if='!item.user'>
                        {{item.user_id}}
                    </td>
                    <td class="border px-4 py-2">
                    	{{item.address}}
                        
                    </td>
                    <td class="border px-4 py-2">
                    	{{item.phone}}
                        
                    </td>
                    <td class="border px-4 py-2">
                    	<select class="from-conrol" v-model='item.order_status' @change="updateStatus(item)">
                    		<option value="Processing">Processing</option>
			             <option value="Shipped">Shipped</option>
			             <option value="Processing">Delivered</option> 
                    	</select>
			             
                    </td>
                    
                    <td class="border px-4 py-2">
                    	{{item.created_at}}
                       
                    </td>
                    </tr>
            </tbody>
        </table>
    </div>
</section>
</template>
<script>
import axios from "axios";
export default {
  name: "Adminorder",
  data() {
    return {
      items:[],
      totalPrice:0,
      error:null,
      showModal:false,
      user:[],
      phone:'',
      address:'',
      validation:'',
      order_status:'',
      order_id:'',
    };
  },
  async created() {
  	if (localStorage.getItem('user_info') !=null) {
  		this.user=JSON.parse(localStorage.getItem('user_info'));
  		if(localStorage.getItem('user_type')=='user'){
  			this.$router.push('/');
  		}
  	}else{
  	this.$router.push('/');	
  	}
  	if (localStorage.getItem('product_cart') !=null) {
  		let cart = JSON.parse(localStorage.getItem('product_cart'));
  		this.items = cart.items;
  		this.totalPrice=cart.totalPrice;
  	}

  	 let data={user_id:this.user.id,token:localStorage.getItem('user_token')};
  	 //const response = await axios.get('admin/order', { params: data });
  	 const response = await axios.post('admin/order',data);
  	  this.items=response.data.data;
  	  console.log(response.data);
  },
  methods: {
   async updateStatus(item){
    	let data={id:item.id,order_status:item.order_status,user_id:this.user.id,token:localStorage.getItem('user_token')};
  	 //const response = await axios.get('admin/order/update', { params: data });
  	 const response = await axios.post('admin/order/update',data);
  	 alert(response.data.message);		
  	 
	 

    }
  }
};
</script>