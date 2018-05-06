import React from 'react';
import {observer} from 'mobx-react';
@observer
export default class Menu extends React.Component {

    render(){
        return(
            <div className="top">
                <span className="fl top-title">管理平台</span>
                <div className="fr top-user">
                    <span>欢迎您！Admin</span>
                    <span><a>退出</a></span>
                </div>
            </div>
        )
    }
}