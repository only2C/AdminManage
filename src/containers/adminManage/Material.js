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
const store = new adminManageStore();
@observer
export default class Material extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowsName: [{code:'id',name:'id',hidden:true},{code:'img',name:'路径'},{code:'type',name:'类型'},{code:'remarks',name:'备注'},
                {code:'sortNo',name:'排序'},{code:'isDeleted',name:'删除状态'},{code:'gmtCreate',name:'创建时间',type:"date"},{code:'gmtModified',name:'修改时间',type:"date"},
            ],
            show:false ,
            operationData:{},
            operationType:'preview'   ,  // preview 预览  edit 编辑  add 新增

        }
    }

    componentWillMount(){
        this.getMaterialList();
    }

    getMaterialList=()=>{

        store.getListMaterial({},(data)=>{
            this.setState({
                materialList:data
            })
        })


    }

    dataFormat = (rows,cell)=>{
        return (
            <span>{rows}</span>
        )
    }

    addRows =()=>{
        this.setState({
            show:true,
            operationType:'add'
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

    }
    deleteRows =()=>{

    }
    closeModal = ()=>{
        this.setState({
            show:false
        })
    }

    render(){
        console.log(store.ListMaterial)
        const  options ={
            noDataText:"暂无数据"
        }
        return(
            <div className="a-box">
                <div className="fr mb10">
                    <Button bsStyle="info" onClick={this.addRows}>新增</Button>
                </div>

                <BootstrapTable data={store.ListMaterial} striped hover options={options}>
                    <TableHeaderColumn isKey dataField='id' hidden>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='img' dataFormat={this.dataFormat}>路径</TableHeaderColumn>
                    <TableHeaderColumn dataField='type' dataFormat={this.dataFormat}>类型</TableHeaderColumn>
                    <TableHeaderColumn dataField='remarks' dataFormat={this.dataFormat}>备注</TableHeaderColumn>
                    <TableHeaderColumn dataField='sortNo' dataFormat={this.dataFormat}>排序</TableHeaderColumn>
                    <TableHeaderColumn dataField='isDeleted' dataFormat={this.dataFormat}>删除状态</TableHeaderColumn>
                    <TableHeaderColumn dataField='gmtCreate' dataFormat={this.dataFormat}>创建时间</TableHeaderColumn>
                    <TableHeaderColumn dataField='gmtModified' dataFormat={this.dataFormat}>修改时间</TableHeaderColumn>
                    <TableHeaderColumn dataFormat = {
                        (cell,row,row2,row3)=>{
                            return(
                                <div>
                                    <span className="mr5" onClick={this.previewRows.bind(this,row)}>查看</span>
                                    <span className="mr5" onClick={this.editRows.bind(this,row)}>编辑</span>
                                    <span onClick={this.deleteRows.bind(this,row)}>删除</span>
                                </div>
                            )
                        }
                    }>操作</TableHeaderColumn>
                </BootstrapTable>

                <ModalView show= {this.state.show} closeModal={this.closeModal} rowsName ={this.state.rowsName} data={this.state.operationData} type={this.state.operationType}/>

            </div>
        )
    }
}