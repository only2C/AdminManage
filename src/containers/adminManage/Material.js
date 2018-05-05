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
const store = new adminManageStore();
@observer
export default class Material extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            materialList:[],

        }
    }

    componentWillMount(){
        this.getMaterialList();
    }

    componentDidMount(){
        this.getMaterialList();
    }
    getMaterialList=()=>{

        store.getListMaterial({},(data)=>{
            this.setState({
                materialList:data
            })
        })


    }

    render(){
        console.log(store.ListMaterial)
        const  options ={
            noDataText:"暂无数据"
        }
        return(
            <div className="a-box">
                <BootstrapTable data={store.ListMaterial} striped hover options={options}>
                    <TableHeaderColumn isKey dataField='id' hidden>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='img'>路径</TableHeaderColumn>
                    <TableHeaderColumn dataField='type'>类型</TableHeaderColumn>
                    <TableHeaderColumn dataField='remarks'>备注</TableHeaderColumn>
                    <TableHeaderColumn dataField='sortNo'>排序</TableHeaderColumn>
                    <TableHeaderColumn dataField='isDeleted'>删除状态</TableHeaderColumn>
                    <TableHeaderColumn dataField='gmtCreate'>创建时间</TableHeaderColumn>
                    <TableHeaderColumn dataField='gmtModified'>修改时间</TableHeaderColumn>
                </BootstrapTable>

            </div>
        )
    }
}