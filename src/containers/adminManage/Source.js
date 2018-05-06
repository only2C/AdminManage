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


    render(){
        console.log(store.ListMaterial)
        const  options ={
            noDataText:"暂无数据"
        }
        return(
            <div className="a-box">
                <Menu />

                <h3>交易凭证列表</h3>


                <BootstrapTable data={store.ListMaterial} striped hover options={options}>
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
        )
    }
}