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
            url: Config.adminManage.material.listMaterial+'?type=1',
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: data => {

                data
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

}