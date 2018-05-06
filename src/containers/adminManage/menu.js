import React from 'react';
import {observer} from 'mobx-react';
@observer
export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu:[{name:"能源币",code:"coinPrice"},{name:"素材",code:"material"},{name:"交易凭证列表",code:"source"}
            ,{name:"用户列表",code:"userList"},{name:"交易记录列表",code:"transactionRecord"}]
        }
    }

    componentWillReceiveProps(props){

    }

    render(){
        const {tag }= this.props;
        return(
            <div className="menu">

                <ul>
                    {this.state.menu.map((m,n)=>{
                        return (
                            <li key={n} className={tag ? ( tag==m.code ?"active":"") : (n==0?"active":"")}><a href={ "#/"+m.code}>{m.name}</a></li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}