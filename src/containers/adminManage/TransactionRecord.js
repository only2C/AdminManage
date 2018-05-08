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
import ModalView from '../../components/adminManage/transaction/ModalView';
import Menu from '@/containers/adminManage/Menu';
import Top from '@/containers/adminManage/Top';
const store = new adminManageStore();
@observer
export default class TransactionRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowsName: [{code:'id',name:'id',hidden:true},{code:'userCode',name:'用户标识'},{code:'nickName',name:'昵称'}
                ,{code:'recordCode',name:'交易金额'},{code:'coinNum',name:'交易能源币'},{code:'buyUserCode',name:'购买人标识'}
                ,{code:'buyUserName',name:'购买人昵称'},{code:'userName',name:'转让人'},{code:'type',name:'交易类型'}
                ,{code:'payType',name:'支付方式'},{code:'isDeleted',name:'删除状态'},{code:'gmtCreate',name:'创建时间'}
                ,{code:'gmtModified',name:'修改时间'}
            ],
            show:false ,
            checkBuyCoinOptions:[{name:"未审核",code:0},{name:"审核通过",code:1},{name:"删除",code:2},{name:"审核不通过",code:3}],
            checkBuyInvitationOptions:[{name:"未审核",code:0},{name:"审核通过",code:1},{name:"删除",code:2},{name:"审核不通过",code:3}],
            checkWithdrawDepositOptions:[{name:"未审核",code:0},{name:"审核通过",code:1},{name:"删除",code:2},{name:"审核不通过",code:3}],
            options:[],
            operationData:{},
            item:1,
            operationType:0   ,  //0 checkBuyCoin   1 checkBuyInvitation   2 checkWithdrawDeposit
            currentPage:1,
            pageSize:10
        }
    }

    componentWillMount(){
        this.getDataList();
    }

    getDataList=()=>{
        let param ={
            currentPage	:this.state.currentPage ,
            pageSize:100,
            userName:'',
            type:'',
            isDeleted:''
        }
        store.getTransactionRecord(param,(data)=>{
        })


    }

    dataFormat = (type,rows,cell)=>{
        return (
            <span title={rows}>{rows}</span>
        )

    }
    checkBuyCoin = (rows)=>{
        let options = this.state.checkBuyCoinOptions
        this.setState({
            show:true ,
            operationType:0,
            operationData:rows,
            options
        })

    }
    checkBuyInvitation =(rows)=>{
        let options = this.state.checkBuyInvitationOptions
        this.setState({
            show:true ,
            operationData:rows,
            operationType:1,
            options
        })
    }
    checkWithdrawDeposit =(rows)=>{
        let options = this.state.checkWithdrawDepositOptions
        this.setState({
            show:true ,
            operationType:2,
            operationData:rows,
            options
        })
    }
    closeModal=()=>{
        this.setState({
            show:false
        })
    }
    saveModal =(data)=>{
        let  operationType = this.state.operationType , operationData = this.state.operationData ;
        let param ={
            id:operationData.id,
            isDeleted:data
        }
        store.checkTransaction(operationType,param,()=>{
            this.closeModal();
        })

    }

    onPageChange =()=>{

    }
    render(){
        const  options ={
            noDataText:"暂无数据",
            dataTotalSize:store.pageInfo.count,
            onPageChange:this.onPageChange
        }
        return(
            <div className="a-box">
                <Top />
                <Menu tag="transactionRecord"/>
                <div className="a-container">
                    <h3>交易记录列表</h3>
                    <BootstrapTable data={store.transactionRecordList} striped hover options={options} pagination >
                        <TableHeaderColumn isKey dataField='id' hidden>Product ID</TableHeaderColumn>
                        {this.state.rowsName.map((m,n)=>{
                            if(!m.hidden ){
                                return (
                                    <TableHeaderColumn dataField={m.code} dataFormat={this.dataFormat.bind(this,m.code)}>{m.name}</TableHeaderColumn>
                                )
                            }
                        })}
                        <TableHeaderColumn width='240px' dataFormat = {
                            (cell,row)=>{
                                return(
                                    <div>
                                        <span className="mr5" title="审核能源币" onClick={this.checkBuyCoin.bind(this,row)}>审核能源币</span>
                                        <span className="mr5" title="审核邀请码" onClick={this.checkBuyInvitation.bind(this,row)}>审核邀请码</span>
                                        <span title="审核提现" onClick={this.checkWithdrawDeposit.bind(this,row)}>审核提现</span>
                                    </div>
                                )
                            }
                        }>操作</TableHeaderColumn>

                    </BootstrapTable>
                </div>
                <ModalView show={this.state.show} options={this.state.options} closeModal={this.closeModal} saveModal={this.saveModal}/>
            </div>
        )
    }
}