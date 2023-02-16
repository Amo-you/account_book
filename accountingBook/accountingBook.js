
//模組顯示畫面
const Modal ={
	props : ['mt','item','clear'],
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
			},
		}
	},
	template:
	`
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" >{{title}}</h5>
			</div>
			<form @submit.prevent="submitForm(mt)">
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
		if(this.item === undefined){
			this.inputList.timestrip = undefined
			this.inputList.moneyTypeInput = 1
			this.inputList.dateInput = new Date().toISOString().substring(0, 10)
			this.inputList.incomeType = ''
			this.inputList.exesType = ''
			this.inputList.amount = undefined
			this.inputList.flag = 0
		}
		if(this.item !== undefined){
			console.log(this.item)
			this.inputList.timestrip = this.item.timestrip
			this.inputList.dateInput = this.item.date
			this.inputList.moneyTypeInput = this.item.moneyType
			this.inputList.incomeType = this.item.incomeType
			this.inputList.exesType = this.item.exesType
			this.inputList.amount = this.item.amount
			this.inputList.flag = this.item.flag
		}
	},
	mt(){
		console.log(this.mt)
		this.mt == 1 ? this.title = '新增紀錄' :  this.mt == 2 ? this.title = '編輯紀錄' : this.title = '刪除紀錄' 
		this.mt == 3 ? this.disabled = true : this.disabled = false
	},
    clear(){
        if(this.clear)
			this.inputList.timestrip = undefined
			this.inputList.moneyTypeInput = 1
			this.inputList.dateInput = new Date().toISOString().substring(0, 10)
			this.inputList.incomeType = ''
			this.inputList.exesType = ''
			this.inputList.amount = undefined
			this.inputList.flag = 0
            console.log("清空")
        
    }
},
methods:{
	closeModal(){
		const modalDom = document.getElementById('close')
		modalDom.click()
	},
	
	submitForm() {
		this.$emit('send-data',this.inputList)
		this.closeModal()
		
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
				<i class="bi bi-star-fill"></i>
				<span class="navbar-brand">記帳本</span>
				<button id = "navbar" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" @click = "clickHandler()">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<router-link class="nav-link" to="/">記帳</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/chart">圖表</router-link>
					</li>
					</ul>
					
				</div>
			</div>
		</nav>
	</div>`,
	methods:{
        clickHandler(){
			const navLinks = document.querySelectorAll('.nav-item')
			const menuToggle = document.getElementById('navbar')
			/* const bsCollapse = new bootstrap.Collapse(menuToggle) */
			navLinks.forEach((event) => {
				event.addEventListener('click', () => { menuToggle.click() })
			})
            
        }
    }

}

const ErrorPage ={
    template :`<div>錯誤</div>`
}
const Login ={
    template:`<div class="page">LoginPage</div>`
}

const events = {
    data(){
        return{
            dataList : [],
            
        }
    },
    props : ['modaltype','items','events','clear'],
    name: "events",

    template: `
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <modal-component  
            :mt="modaltype" 
            :item="items"
            :event="events"
			:clear="clear"
            @send-data = 'sendHandler'
            >
            </modal-component>
        </div>
    `,
    methods:{
        sendHandler(inputList){
            if(this.modaltype == 1){
				this.$emit('create',inputList)
			}else if(this.modaltype == 2){
				this.$emit('edit',inputList)
			}else{
				this.$emit('del',inputList)
				console.log(inputList)
			}
			
            
        }
    }
};


const Display={
	props : ['modaltype','items','originalarray'],
	data(){
		return{
			sendData :[]
		}
	},
    name: "display",
    template: `
	
    <div class="col-sm-12 mt-2">
        <div class="list-group pt-2">
			<button id = 'addbutton' type="button" class="btn btn-primary" @click="modalTypeHandler(1)" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
			<i class="bi bi-pencil"></i>
			</button>
			<a href="#" class="list-group-item" v-for="event in filterList " :key="event.timestrip" >
                <h3 class="list-group-item-heading" :style = "{'color': event.exesType !== '' ? '#C0392B': '#145A32'}">
                <i class="bi bi-currency-dollar"></i> 
                {{ event.amount }}
                </h3>
                <h5>
                <i class="bi bi-calendar-heart"></i> 
                {{ event.date }}
                </h5>
                <h5 v-show = "event.moneyType == '0'">
                <i class="bi bi-card-text"></i>
                <span v-show = "event.incomeType == '0'">薪水</span>
                <span v-show = "event.incomeType == '1'">投資</span>
                <span v-show = "event.incomeType == '2'">其他</span>
                </h5>
                <h5 v-show = "event.moneyType == '1'">
                <i class="bi bi-card-text"></i>
                <span v-show = "event.exesType == '0'">伙食費</span>
                <span v-show = "event.exesType == '1'">交通費</span>
                <span v-show = "event.exesType == '2'">治裝費</span>
                <span v-show = "event.exesType == '3'">貸款</span>
                <span v-show = "event.exesType == '4'">電話費</span>
                <span v-show = "event.exesType == '5'">其他</span>
                </h5>
                <button class="btn btn-xs btn-warning" @click="modalTypeHandler(2,event)"  data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Edit</button>
                <button class="btn btn-xs btn-danger" @click="modalTypeHandler(3,event)"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Delete</button>
                
            </a>
        </div>  
    </div>`,
	methods: {
		modalTypeHandler(Type,item){
			this.sendData = {'Type':Type,'Item':item}
			this.$emit('send-data',this.sendData)
			console.log(this.sendData)
		},
    },
	computed:{
		filterList(){
			//日期排序 (大到小)
			this.originalarray = this.originalarray.sort(function(thisVal,nextVal){
				if (thisVal.date > nextVal.date) {
					return -1;
				}
				if (thisVal.date < nextVal.date) {
					return 1;
				}
				return 0;
			})
			//過濾已刪除的紀錄
			return this.originalarray.filter(function(value){
				return value.flag === 0 
			})
		}
	},
}

//圖表 components
const Chart = {
	props : ['data'],
	data(){
		return {
			incomeTotal : 0,
			expenditureTotal :0,
			noData : true,
		}
	},
	template : `
	<div class="col-sm-12 mt-2">
		<pie-chart v-show = "!noData" :income="incomeTotal" :expenditure = 'expenditureTotal' :options="{responsive: true, maintainAspectRatio: false}"></pie-chart>
		<div v-show = "noData" class="text-center">沒有資料</div>
	</div>`,	
	mounted(){
		console.log(this.data.length)
		if(this.data.length != 0){
			this.data.filter((value)=>{
				//資料有效 類型為收入
				if(value.flag == 0 && value.moneyType == 0){ 
				this.incomeTotal += parseInt(value.amount) 
				//資料有效 類型為支出  
				}else if(value.flag == 0 && value.moneyType == 1){
				this.expenditureTotal += parseInt(value.amount) 
				}
	
			})
			this.noData = false
		}else{
			this.noData = true
		}
	},
}
//圖表component Pie for total
Vue.component("pie-chart", {
    extends: VueChartJs.Pie,
    props: ["income","expenditure", "options"],
    mounted() {
    	this.renderLineChart();
    },
    methods: {
		renderLineChart: function() {
		this.renderChart(
        {
			labels: ["收入","支出"],
			datasets: [
            {
				backgroundColor: [
				'rgb(255, 99, 132)',
				'rgb(54, 162, 235)',
				],
				data:[this.income,this.expenditure],
            },
        	]
        },
        { responsive: true, maintainAspectRatio: false }
		);      
		}
    },
	watch: {
		income: function() {
			this._chart.destroy();
			//this.renderChart(this.data, this.options);
			this.renderLineChart();
		},
		expenditure: function() {
			this._chart.destroy();
			//this.renderChart(this.data, this.options);
			this.renderLineChart();
		},
		
	}
});
const router = new VueRouter({
    routes: [
        {
            path: "/", 
			components:{
                nav:Nav,
                events:events,
                display:Display,
            }
        },
		{
            path: '/chart', 
            components: {
                nav : Nav,
				chart:Chart
                
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
		clear:false
	},
	mounted(){
		//請求Api後續為請求資料庫
		axios
		.get('data.js')
		.then(
			
			response => (
			console.log(response.data)
		/* 	response.data.forEach(element => {
				this.events.push(element)
			}) */
		))
		.catch(function (error) { // 請求失敗處理
			console.log(error);
		});
	},
	computed:{
		
	},
	methods: {
		//視窗按鈕確認後動作
		modalTypeHandler(Object){
			console.log(Object)
			this.modalType = Object.Type
			this.editObject = Object.Item
			
		},
		//新增紀錄
		createHandler(createObject){
			//後續為請求資料庫insert
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
			this.clear = true
			console.log(this.events)
		},
		editHandler(editObject){
			//後續為請求資料庫Update
			this.events.filter(function(value){
				if(value.timestrip === editObject.timestrip){
					return value.flag = 1
				}
			})
			//後續為請求資料庫insert
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
			console.log(this.events)
		},
		delHandler(delObject){
			//後續為請求資料庫Update
			this.events.filter(function(value){
				if(value.timestrip === delObject.timestrip){
					return value.flag = 1
				}
			})
		}
		
	}
})