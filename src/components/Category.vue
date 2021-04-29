<template>
<div>
 <section class="orders light-section">
    <div class="container mx-auto pt-12">
        <h1 class="font-bold text-lg mb-4">All Category</h1>
        <button class="btn-primary rounded-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="showItem(item)" v-b-modal.modal-1> Add New</button>
        <table class="w-full table-auto bg-white">
            <thead>
                <tr>
                    <th class="px-4 py-2 text-left">Id </th>
                    <th class="px-4 py-2 text-left">Name</th>
                    <th class="px-4 py-2 text-left">Action</th>
                </tr>
            </thead>
            <tbody id="orderTableBody">
            	<tr  v-for="(item, index) in items" :key="index">
                    <td class="border px-4 py-2">
                        {{item.id}}
                    </td>
                    <td class="border px-4 py-2">
                        {{item.name}}
                    </td>
                    <td class="border px-4 py-2">
                        <b-button
		                style="width:100%;margin:2px"
		                type="button"
		                @click="showItem(item)"
		                class="btn-success"
		                v-b-modal.modal-1
		                >Edit</b-button
		              >
                    </td>
                    </tr>
            </tbody>
        </table>
    </div>
</section>
<div v-if="showModal==true">
      <b-modal id="modal-1" title="Category">
        <span class="text-red-500 text-sm" v-if='error'>
          <ul v-if='error' class="text-danger">
          <li>{{validation}} </li>
          <li v-for='(er,errorind) in error' v-bind:key='errorind'>{{errorind}} : {{er[0]}}</li>
        </ul>
        </span>
        <form>
          <div class="form-group">
            <label for="account_name">Name</label>
            <input
              type="text"
              class="form-control"
              id="account_name"
              v-model="name"
              placeholder="Enter Category Name"
            />
            <input type="hidden" name="id" v-model="id" />
          </div>
          <button 
            type="submit"
            @click.prevent="saveItem"
            class="btn btn-primary pull-right"
          >
            Save
          </button>
        </form>
      </b-modal>
    </div>
  </div>   
</template>
<script>
import axios from "axios";
export default {
  name: "Category",
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
      name:'',
      id:'',
      item:{},
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

  	 this.allInformation();
  },
  methods: {
    async showItem(item){
    	this.error=null;
    	this.showModal=true;
    	this.name=item.name;
    	this.id=item.id;
    }
    ,
    async saveItem(){
    	let data={id:this.id,name:this.name,user_id:this.user.id,token:localStorage.getItem('user_token')};
    	let response='';
    	if (this.id) {
    		//response = await axios.get('category/update', { params: data });
    		response = await axios.post('category/update',data);
    		console.log(response)	
	  	}else{
	  		//response = await axios.get('category/create', { params: data });
    		response = await axios.post('category/create',data);
    		console.log(response)
	  	}
	  	if (response.data.status == 200) {
        this.showModal=false;
        this.allInformation();
        alert(response.data.message);
       }
	  	if (response.data.status==422) {
        this.validation =response.data.message;
        this.error=response.data.data;
       }else{
        this.error='';
        }
    
  	   
  	 //alert(response.data.message);
    },
    async allInformation(){
    	let data={user_id:this.user.id,token:localStorage.getItem('user_token')};
  	 //const response = await axios.get('category', { params: data });
  	 const response = await axios.post('category',data);
  	  this.items=response.data.data;
  	  console.log(response.data);

    }
  }
};
</script>