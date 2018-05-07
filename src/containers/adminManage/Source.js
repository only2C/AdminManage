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
export default class Source extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowsName: [{code:'id',name:'id',hidden:true},{code:'userCode',name:'用户标识'},{code:'userName',name:'用户名',add:true },{code:'nickName',name:'昵称',add:true },
                {code:'phone',name:'电话',add:true },{code:'remarks',name:'备注'},{code:'isDeleted',name:'删除状态'},
                {code:'gmtCreate',name:'创建时间',type:"date"},{code:'gmtModified',name:'修改时间',type:"date"},{code:'img',name:'图片'},
            ],

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
        store.getSourceDocumentsList(param,(data)=>{
            this.setState({
                materialList:data
            })
        })


    }

    dataFormat = (type,rows,cell)=>{
        return (
            <span>{rows}</span>
        )

    }
    previewRows = (rows)=>{
        this.setState({
            show:true ,
            operationData:rows,
            operationType:'preview'
        })

    }

    closeModal = ()=>{
        this.setState({
            show:false
        })
    }

    render(){
        const  options ={
            noDataText:"暂无数据"
        }
        return(
            <div className="a-box">
                <Top/>
                <Menu tag="source"/>
                <div className="a-container">
                    <h3>交易凭证列表</h3>
                    <BootstrapTable data={store.sourceDocumentsList} striped hover options={options}>
                        <TableHeaderColumn isKey dataField='id' hidden>Product ID</TableHeaderColumn>
                        {this.state.rowsName.map((m,n)=>{
                            if(!m.hidden ){
                                return (
                                    <TableHeaderColumn dataField={m.code} dataFormat={this.dataFormat.bind(this,m.code)}>{m.name}</TableHeaderColumn>
                                )
                            }
                        })}
                        <TableHeaderColumn width="150px"  dataFormat = {
                            (cell,row)=>{
                                return(
                                    <div className="a-operation-box">
                                        <span className="mr10" onClick={this.previewRows.bind(this,row)} title="查看">查看</span>
                                    </div>
                                )
                            }
                        }>操作</TableHeaderColumn>

                    </BootstrapTable>
                </div>
                <ModalView show= {this.state.show} saveModal = {this.saveModal} closeModal={this.closeModal} rowsName ={this.state.rowsName} data={this.state.operationData} type={this.state.operationType}/>
            </div>
        )
    }
}