import React from 'react';
import {observer} from 'mobx-react';
@observer
export default class Menu extends React.Component {

    render(){
        return(
            <div className="row">

                <ul>
                    <li>菜单在此</li>
                    <li><a href="#/coinPrice">能源币</a></li>
                    <li><a href="#/material">素材</a></li>
                    <li><a href="#/source">交易凭证列表</a></li>
                    <li><a href="#/userList">用户列表</a></li>
                    <li><a href="#/transactionRecord">交易记录列表</a></li>
                </ul>
            </div>
        )
    }
}