

//模組顯示畫面
const Modal ={
	props : ['modaltype','item'],
	data(){
		return {
			title : '',
			disabled:false,
			inputList:{
				timestrip:undefined,
				dateInput:new Date().toISOString().substring(0, 10),
				moneyTypeInput:1,
				incomeType:'',
				exesType:'',
				amount:undefined,
				flag:0
			}
		}
	},
	template:
	`
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" >{{title}}</h5>
			</div>
			<form @submit.prevent="submitForm(modaltype)">
				<div class="modal-body">
					<div class="input-group mb-3 row">
						<label class="input-group-text col-6" for="dateInput">日期:</label>
						<input type="date" class="form-control col-6" id="dateInput" required v-model="inputList.dateInput" :disabled="disabled">
					</div>
					<div class="input-group mb-3 row">
						<label class="input-group-text col-2" for="options-outlined">種類:</label>
						<input type="radio" class="btn-check" name="options-outlined" id="success-outlined" value = 0 required @click="inputList.exesType = ''" v-model="inputList.moneyTypeInput" autocomplete="off" :disabled="disabled">
						<label class="btn btn-outline-success col-5" for="success-outlined">收入</label>
						<input type="radio" class="btn-check" name="options-outlined" id="danger-outlined" value = 1 @click="inputList.incomeType = ''" v-model="inputList.moneyTypeInput" autocomplete="off" :disabled="disabled">
						<label class="btn btn-outline-danger col-5" for="danger-outlined">支出</label>
					</div>
					<template v-if = 'inputList.moneyTypeInput == 0'>
						<div class="input-group mb-3 row ">
							<label class="input-group-text col-6" for="incomeType">收入類型:</label>
							<select class="form-select col-6" aria-label="incomeType" required v-model="inputList.incomeType" :disabled="disabled">
								<option selected value='' disabled>請選擇</option>
								<option value="0">薪水</option>
								<option value="1">投資</option>
								<option value="2">其他</option>
							</select>
						</div>
					</template>
					<template v-else>
						<div class="input-group mb-3 row ">
							<label class="input-group-text col-6" for="exesType">支出類型:</label>
							<select class="form-select col-6" aria-label="exesType" required v-model="inputList.exesType" :disabled="disabled">
								<option selected value='' disabled>請選擇</option>
								<option value="0">伙食費</option>
								<option value="1">交通費</option>
								<option value="2">治裝費</option>
								<option value="3">貸款</option>
								<option value="4">電話費</option>
								<option value="5">其他</option>
							</select>
						</div>
					</template>
					<div class="input-group mb-3 row">
						<label class="input-group-text col-6" for="amount">費用:</label>
						<input type="number" class="form-control col-6" id="amount" min = '1' required v-model="inputList.amount" :disabled="disabled">
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" id='close' class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
					<button type="submit" class="btn btn-primary" >確定</button>
				</div>
			</form>
		</div>
	</div>
	

`,
created(){
	
},
computed:{
	state:{
		get(){
			
		},
	}
},
watch:{
	item(){
		console.log(this.item)
		if(this.item === undefined){
			this.inputList.timestrip = undefined
			this.inputList.moneyTypeInput = 1
			this.inputList.dateInput = new Date().toISOString().substring(0, 10)
			this.inputList.incomeType = ''
			this.inputList.exesType = ''
			this.inputList.amount = undefined
			this.inputList.flag = 0
		}
		if(this.item !== undefined && this.modaltype !== 1){
			this.inputList.timestrip = this.item.timestrip
			this.inputList.dateInput = this.item.date
			this.inputList.moneyTypeInput = this.item.moneyType
			this.inputList.incomeType = this.item.incomeType
			this.inputList.exesType = this.item.exesType
			this.inputList.amount = this.item.amount
			this.inputList.flag = this.item.flag
		}
	},
	modaltype(){
		this.modaltype == 1 ? this.title = '新增紀錄' :  this.modaltype == 2 ? this.title = '編輯紀錄' : this.title = '刪除紀錄' 
		this.modaltype == 3 ? this.disabled = true : this.disabled = false
	}
},
methods:{
	//關閉視窗
	closeModal(){
		const modalDom = document.getElementById('close')
		modalDom.click()
	},
	clearInput(){
		
			this.inputList.timestrip = undefined
			this.inputList.moneyTypeInput = 1
			this.inputList.dateInput = new Date().toISOString().substring(0, 10)
			this.inputList.incomeType = ''
			this.inputList.exesType = ''
			this.inputList.amount = undefined
			this.inputList.flag = 0

		
		
	},
	submitForm(actionType) {
		if(actionType == 1){
			this.$emit('create',this.inputList)
			this.closeModal()
			this.clearInput()
		}else if(actionType == 2){
			this.$emit('edit',this.inputList)
			this.closeModal() 
			
		}else{
			this.$emit('del',this.inputList)
			this.closeModal()
		}
	
	},
},
	
}

Vue.component('modal-component',Modal)

//navigation bar
const Nav ={
	template:`
	<div class="mb-5">
		<nav class="pe-3 navbar fixed-top navbar-expand-lg navbar-light bg-light">
			<div class="container-fluid">
				<i class="bi bi-star-fill"></i><a class="navbar-brand" href="#">Navbar</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<router-link class="nav-link" to="/chart">報表</router-link>
					</li>
					<li class="nav-item">
						<a class="nav-link disabled">Disabled</a>
					</li>
					</ul>
					<form class="d-flex">
						<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
						<button class="btn btn-outline-success" type="submit">Search</button>
					</form>
				</div>
			</div>
		</nav>
	</div>`,
}
const ErrorPage ={
    template :`<div>錯誤</div>`
}
const Login ={
    template:`<div class="page">LoginPage</div>`
}
/* const ModalView = {
	template:`<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <modal-component  
    :modalType="modalType" 
    :item="editObject"
    @create = 'createHandler'
    @edit = 'editHandler'
    @del = 'delHandler'
    >
    {{modalData}}</modal-component>
  </div> 
`
} */
const events ={
	
}
Vue.component('events-component',events)
const router = new VueRouter({
    routes: [
        {
            path: '/', 
            components: {
               
                nav : Nav,
			 
            },
			props: { nav: true},
		
        },
		{
            path: '/chart', 
            components: {
                
                nav : Nav,
                
            },
        },
        {
            path: '/404', 
            component: ErrorPage 
        },
        {
            path: '*', 
            redirect: '/404'
        },
        {
            path :'/Login',
            name: 'Login',
            component: Login
        }
    ]
});
new Vue({
	el: '#app',
	router,
	data: {
		events: [],
		modalType : undefined, 
		editObject:{},
	},
	mounted(){
		axios
		.get('data.js')
		.then(
			
			response => (
			console.log(response.data)
		/* 	response.data.forEach(element => {
				this.events.push(element)
			}) */
		))
		.catch(function (error) { // 请求失败处理
			console.log(error);
		});
	},
	computed:{
		filterList(){
			//日期排序 (大到小)
			this.events = this.events.sort(function(thisVal,nextVal){
				if (thisVal.date > nextVal.date) {
					return -1;
				}
				if (thisVal.date < nextVal.date) {
					return 1;
				}
				return 0;
			})
			//過濾已刪除的紀錄
			return this.events.filter(function(value){
				return value.flag === 0 
			})
		}
	},
	methods: {
		modalTypeHandler(Type,item){
			this.modalType = Type
			this.editObject = item
		},
		createHandler(createObject){
			this.events.push(
				{
					timestrip:new Date().getTime(),
					date:createObject.dateInput,
					moneyType:createObject.moneyTypeInput,
					incomeType:createObject.incomeType,
					exesType:createObject.exesType,
					amount:createObject.amount,
					flag:createObject.flag
				}
			)
			console.log(this.events)
		},
		editHandler(editObject){
			console.log(editObject)
			this.events = this.events.filter(function(value){
				if(value.timestrip == editObject.timestrip){
					return value.flag = 1
				}
			})
			this.events.push(
				{
					timestrip:new Date().getTime(),
					date:editObject.dateInput,
					moneyType:editObject.moneyTypeInput,
					incomeType:editObject.incomeType,
					exesType:editObject.exesType,
					amount:editObject.amount,
					flag:editObject.flag
				}
			)
		},
		delHandler(delObject){
			this.events = this.events.filter(function(value){
				if(value.timestrip == delObject.timestrip){
					return value.flag = 1
				}
			})
		}
		
	}
})