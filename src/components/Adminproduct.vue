<template>
<div>
 <section class="orders light-section">
    <div class="container mx-auto pt-12">
        <h1 class="font-bold text-lg mb-4">All Product</h1>
        <button class="btn-primary rounded-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="showItem(item)" v-b-modal.modal-1> Add New</button>
        <table class="w-full table-auto bg-white">
            <thead>
                <tr>
                    <th class="px-4 py-2 text-left">Id </th>
                    <th class="px-4 py-2 text-left">Name</th>
                    <th class="px-4 py-2 text-left">SKU</th>
                    <th class="px-4 py-2 text-left">Category</th>
                    <th class="px-4 py-2 text-left">Image</th>
                    <th class="px-4 py-2 text-left">Price</th>
                    <th class="px-4 py-2 text-left">Description</th>
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
                        {{item.sku}}
                    </td>
                    <td class="border px-4 py-2" v-if='item.category'>
                        {{item.category.name}}
                    </td>
                    <td class="border px-4 py-2" v-if='!item.category'>
                        {{item.category_id}}
                    </td>
                     <td class="border px-4 py-2">
                        <img class="h-40 mb-4 mx-auto" :src="item.image" alt="" v-if='item.image'>
                        <img src="/img/pizza.png" alt="default-image" v-if='!item.image'>
                    </td>
                    <td class="border px-4 py-2" >
                        {{item.price}}
                    </td>
                    <td class="border px-4 py-2" >
                        {{item.description}}
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
      <b-modal id="modal-1" title="Product">
        <span class="text-red-500 text-sm" v-if='error'>
          <ul v-if='error' class="text-danger">
          <li>{{validation}} </li>
          <li v-for='(er,errorind) in error' v-bind:key='errorind'>{{errorind}} : {{er[0]}}</li>
        </ul>
        </span>
        <form id="product" @submit.prevent="saveItem" method="" enctype='multipart/form-data'>
        <img class="h-40 mb-4 mx-auto" :src="showimage" alt="" v-if='showimage'>
         <img src="/img/pizza.png" alt="default-image" v-if='!showimage'>
		
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="name" name='anme'
              placeholder="Enter Product Name"
            />
            <input type="hidden" name="id" v-model="id" />
          </div>
          <div class="form-group">
            <label for="name">Category</label>
            <select class="form-control" v-model='category_id'>
            	<option value="">Select Category</option>
        		<option  v-for="(item, index) in categories" :key="index"
                :value="item.id"
                :title="item.name">{{item.name}}</option> 
             </select>
          </div>

          <div class="form-group">
            <label for="sku">SKU</label>
            <input
              type="text"
              class="form-control"
              id="sku"
              v-model="sku" name='sku'
              placeholder="Enter SKU"
            />
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input
              type="text"
              class="form-control"
              id="price"
              v-model="price" name='price'
              placeholder="Enter price"
            />
          </div>
          <div class="form-group">
            <label for="description">description</label>
            <input
              type="text"
              class="form-control"
              id="description"
              v-model="description" name='description'
              placeholder="Enter description"
            />
          </div>
          <div class="form-group">
            <label for="image">Image</label>
            <input 
              type="file" accept="image/jpeg" 
              class="form-control"
              id="image"
               name='image'
            />
          </div>
          <button 
            type="submit"
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
  name: "Adminproduct",
  data() {
    return {
      items:[],
      categories:[],
      category_id:'',
      sku:'',
      price:'',
      description:'',
      totalPrice:0,
      error:null,
      showModal:false,
      user:[],
      validation:'',
      order_status:'',
      name:'',
      id:'',
      item:{
      	category_id:'',
      },
      showimage:'',
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
    	this.category_id=item.category_id;
    	this.sku=item.sku;
    	this.price=item.price;
    	this.description=item.description;
    	this.showimage=item.image;
    }
    ,
    async saveItem(){


    	 let data={id:this.id,name:this.name,user_id:this.user.id,category_id:this.category_id,sku:this.sku,price:this.price,description:this.description,token:localStorage.getItem('user_token')};
    	let response='';
    	if (this.id) {
    		//response = await axios.get('product/update',data);
    		response = await axios.post('product/update',data);
    		console.log(response)	
	  	}else{
	  		//response = await axios.get('product/create', { params: data });
    		response = await axios.post('product/create',data);
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
  	 //const response = await axios.get('product', { params: data });
  	 const response = await axios.post('product',data);
  	  this.items=response.data.data.product;
  	  this.categories=response.data.data.category;
  	  console.log(response.data.data);

    }
  }
};
</script>