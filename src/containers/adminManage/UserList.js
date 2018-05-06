/** 素材
 * */
import React from 'react';
import {observer} from 'mobx-react';
import globalStore from '../../stores/GlobalStore';
import _ from  'lodash';
import Util from '../../common/utils';
import {Button,Modal} from 'react-bootstrap';
import adminManageStore from '../../stores/adminManage/adminManageStore';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ModalView from '../../components/adminManage/material/ModalView';
import Menu from '@/containers/adminManage/Menu';
import Top from '@/containers/adminManage/Top';
const store = new adminManageStore();
@observer
export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowsName: [{code:'id',name:'id',hidden:true},{code:'userCode',name:'用户标识'},{code:'inviterUserName',name:'邀请人用户名'}
                ,{code:'inviterNickName',name:'邀请人昵称' },,{code:'invitationCode',name:'邀请码' },
                {code:'phone',name:'电话' },{code:'userName',name:'用户名'},{code:'password',name:'密码'},
                {code:'investment',name:'总投资'},{code:'remainingSum',name:'余额'},{code:'earnings',name:'收益'},
                {code:'coinNumber',name:'能源币个数'},{code:'deductCoinNumber',name:'扣除能源币个数'},{code:'invitationCodeNum',name:'邀请码个数'},
                {code:'realName',name:'真实姓名'},{code:'alipayNo',name:'支付宝账号'},{code:'transactionPassword',name:'交易密码'},
                {code:'bankCardNumber',name:'银行卡号'},{code:'bankOfDeposit',name:'开户行'},{code:'nickName',name:'昵称'},
                {code:'headPortrait',name:'头像'},{code:'score',name:'积分'},{code:'token',name:'token'},
                {code:'isDeleted',name:'删除状态'},{code:'gmtCreate',name:'创建时间'},{code:'gmtModified',name:'修改时间'},
            ],
            show:false ,
            operationData:{},
            item:1,
            operationType:'preview'   ,  // preview 预览  edit 编辑  add 新增

        }
    }

    componentWillMount(){
        this.getDataList();
    }

    getDataList=()=>{
        let param ={
            currentPage	:1 ,
            pageSize:100,
            userName:''
        }
        store.getUserList(param,(data)=>{
        })


    }

    dataFormat = (type,rows,cell)=>{
        return (
            <span title={rows}>{rows}</span>
        )

    }

    addRows =()=>{
        this.setState({
            show:true,
            operationType:'add',
            data:{}
        })

    }
    previewRows = (rows)=>{
        this.setState({
            show:true ,
            operationData:rows,
            operationType:'preview'
        })

    }
    editRows = (rows)=>{
        this.setState({
            show:true ,
            operationData:rows,
            operationType:'edit'
        })
    }
    deleteRows =(rows)=>{
        globalStore.showTipsModal("是否删除","small",()=>{},()=>{
            store.deleteMaterial(rows,()=>{
                this.getMaterialList()
            });
        })

    }
    closeModal = ()=>{
        this.setState({
            show:false
        })
    }

    changeItem =( item )=>{
        this.setState({
            item
        },()=>{
            this.getMaterialList()
        })

    }

    saveModal = (data)=>{
        if(this.state.operationType =="add"){
            store.saveMaterial(data,()=>{
                this.closeModal();
                this.getMaterialList();
            })
        }else{
            store.updateMaterial(data,()=>{
                this.closeModal();
                this.getMaterialList();
            })
        }
    }
    render(){
        console.log(store.ListMaterial)
        const  options ={
            noDataText:"暂无数据"
        }
        return(
            <div className="a-box">
                <Top />
                <Menu tag="userList"/>
                <div className="a-container">

                    <h3>交易凭证列表</h3>
                    <BootstrapTable data={store.userList} striped hover options={options}>
                        <TableHeaderColumn isKey dataField='id' hidden>Product ID</TableHeaderColumn>
                        {this.state.rowsName.map((m,n)=>{
                            if(!m.hidden ){
                                return (
                                    <TableHeaderColumn dataField={m.code} dataFormat={this.dataFormat.bind(this,m.code)}>{m.name}</TableHeaderColumn>
                                )
                            }
                        })}

                    </BootstrapTable>
                </div>

            </div>
        )
    }
}