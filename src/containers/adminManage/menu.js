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
export default class Menu extends React.Component {

    render(){
        return(
            <div className="row">

                <ul>
                    <li>菜单在此</li>
                    <li><a href="#/coinPrice">1能源币</a></li>
                    <li><a href="#/material">2素材</a></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        )
    }
}