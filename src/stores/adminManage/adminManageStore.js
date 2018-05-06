import {observable, computed, action} from 'mobx';
import Config from '../../config';
import Utils from '../../common/utils'
import  GlobalStore from '../GlobalStore';
import $ from 'jquery';

export default class  adminManageStore{

    globalStore = GlobalStore;

    //用户注册
    @observable userRegResult = {};
    @action userReg (param , callback ){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.adminManage.userLogin,
            dataType: "json",
            data: JSON.stringify(param),
            contentType: "application/json",
            success: data => {
                if (data) {
                    this.userRegResult = Object.assign({},data)
                    if (typeof callback == "function") {
                        callback();
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //用户登录
    @action userLogin(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.adminManage.userLogin,
            // dataType: "json",
            data: param,
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded",


            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data)
                    }
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //获取素材
    @observable ListMaterial = [];
    @action getListMaterial(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url: Config.adminManage.material.listMaterial+'?type='+param,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }

                    this.ListMaterial = Object.assign([],data.data)
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })

    }

    //保存素材
    @action saveMaterial(param,callback){
        this.globalStore.hideAlert();
        let params = {
            img:param.img ,
            type:param.type ,
            remarks:param.remarks,
            sortNo:param.sortNo
        };
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.adminManage.material.insertMaterial,
            dataType: "json",
            data:params,
            contentType: "application/x-www-form-urlencoded",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                    that.globalStore.showInfo("保存成功！")
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })

    }
    //修改素材
    @action updateMaterial(param,callback){
        this.globalStore.hideAlert();
        let params = {
            id:param.id ,
            img:param.img ,
            type:param.type ,
            remarks:param.remarks,
            sortNo:param.sortNo
        };
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.adminManage.material.updateMaterial,
            dataType: "json",
            data:params,
            contentType: "application/x-www-form-urlencoded",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data)
                    }
                    that.globalStore.showInfo("保存成功！")
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })

    }

    deleteMaterial =(param,callback)=>{
        this.globalStore.hideAlert();
        let params = {
            id:param.id ,
        };
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.adminManage.material.deleteMaterial,
            dataType: "json",
            data:params,
            contentType: "application/x-www-form-urlencoded",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data)
                    }
                    that.globalStore.showInfo("删除成功！")
                } else {
                    that.globalStore.showError(data.error ? data.error : "删除失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //获取能源币
    @observable CoinPrice = [];
    @action getCoinPriceList(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url: Config.adminManage.coinPrice.getCoinPriceList,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }

                    this.CoinPrice = Object.assign([],data.data)
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })

    }


    @action saveCoinPriceList(param,callback){
        this.globalStore.hideAlert();
        let params = {
            price:param.price ,
            number:param.number ,
            remarks:param.remarks,
            sortNo:param.sortNo
        };
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.adminManage.coinPrice.insertCoinPrice,
            dataType: "json",
            data:params,
            contentType: "application/x-www-form-urlencoded",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                    that.globalStore.showInfo("保存成功！")
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //修改
    @action updateCoinPrice(param,callback){
        this.globalStore.hideAlert();
        let params = {
            id:param.id,
            price:param.price ,
            number:param.number ,
            remarks:param.remarks,
            sortNo:param.sortNo

        };
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.adminManage.coinPrice.updateCoinPrice,
            dataType: "json",
            data:params,
            contentType: "application/x-www-form-urlencoded",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data)
                    }
                    that.globalStore.showInfo("保存成功！")
                } else {
                    that.globalStore.showError(data.error ? data.error : "修改失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })

    }

    deleteCoinPrice =(param,callback)=>{
        this.globalStore.hideAlert();
        let params = {
            id:param.id ,
        };
        let that = this ;
        $.ajax({
            type: "POST",
            url: Config.adminManage.coinPrice.deleteCoinPrice,
            dataType: "json",
            data:params,
            contentType: "application/x-www-form-urlencoded",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data)
                    }
                    that.globalStore.showInfo("删除成功！")
                } else {
                    that.globalStore.showError(data.error ? data.error : "删除失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

    //获取凭证
    @observable sourceDocumentsList = [];
    @action getSourceDocumentsList(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        $.ajax({
            type: "GET",
            url: Config.adminManage.sourceDocumentsList + '?currentPage='+param.currentPage +"&pageSize="+param.pageSize + '&userName='+param.userName ,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: data => {
                if (data.code == -112) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }

                    this.sourceDocumentsList = Object.assign([],data.data)
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })

    }

   //用户列表
    @observable userList = [];
    @action getUserList(param,callback){
            this.globalStore.hideAlert();
            let that = this ;
            $.ajax({
                type: "GET",
                url: Config.adminManage.userList + '?currentPage='+param.currentPage +"&pageSize="+param.pageSize + '&userName='+param.userName ,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",
                success: data => {
                    if (data.code == -112 ) {
                        if(typeof callback == "function"){
                            callback(data.data)
                        }

                        this.userList = Object.assign([],data.data)
                    } else {
                        that.globalStore.showError(data.error ? data.error : "查询失败")
                    }
                },
                error: (xhr, status, err) => {
                    this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
                }
            })
        }


    //用户列表
    @observable transactionRecordList = [];
    @observable pageInfo ={};
    @action getTransactionRecord(param,callback){
        this.globalStore.hideAlert();
        let that = this ;
        let URL = Config.adminManage.record.listTransactionRecordByType + '?currentPage='+param.currentPage +"&pageSize="+param.pageSize + '&userName='+param.userName +
                '&type='+param.type + '&isDeleted='+param.isDeleted
        $.ajax({
            type: "GET",
            url: URL ,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: data => {
                if (data.code == -112 ) {
                    if(typeof callback == "function"){
                        callback(data.data)
                    }
                    this.pageInfo = Object.assign({},{ count:data.count })
                    this.transactionRecordList = Object.assign([],data.data)
                } else {
                    that.globalStore.showError(data.error ? data.error : "查询失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }


    checkTransaction=(type, param,callback)=>{
        this.globalStore.hideAlert();
        let that = this ;
        let url = Config.adminManage.record.checkBuyCoin ;
        if(url ==1 ){
            url = Config.adminManage.record.checkBuyInvitation
        }
        if(url ==2 ){
            url = Config.adminManage.record.checkWithdrawDeposit
        }

        $.ajax({
            type: "POST",
            url:url,
            dataType: "json",
            data:param,
            contentType: "application/x-www-form-urlencoded",
            success: data => {
                if (data.code == 0 ) {
                    if(typeof callback == "function"){
                        callback(data)
                    }
                    that.globalStore.showInfo("操作成功！")
                } else {
                    that.globalStore.showError(data.error ? data.error : "操作失败")
                }
            },
            error: (xhr, status, err) => {
                this.globalStore.showError('数据请求失败,错误信息:' + err.toString());
            }
        })
    }

}