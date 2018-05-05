import React from 'react';
import {Modal, Button,Pagination} from 'react-bootstrap';
import _ from 'lodash';
import Config from '@/config';
import globalStore from '@/stores/GlobalStore';
import DatePicker from 'react-datepicker';
// 订单信息模块

export default class ModalView extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            modalObj:{}
        }
    }


    componentWillReceiveProps(props){
        props
    }

    setInput =(obj,e)=>{
        let modalObj = this.state.modalObj;
        modalObj[obj] = e.target.value ;
        this.setState({
            modalObj
        })

    }

    close =()=>{
        this.props.closeModal();
    }

    render(){
        const {data} = this.props ;
        return(
            <Modal show={this.props.show} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>操作</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.props.type == "preview"?(
                        <div className="row">
                            {this.props.rowsName.map((m,n)=>{
                                return(
                                    <div className="col-md-6" key={n}>
                                        <label>{m.name}:</label>
                                        {m.code =="img"?(<img src={data[m.code]} style={{width:"200px"}}/>):(<span>{data[m.code]}</span>)}
                                    </div>
                                )

                            })}
                        </div>
                    ):""}

                    {this.props.type == "edit"?(<div></div>):""}
                    {this.props.type == "add"?(
                        <div className="row">
                            {this.props.rowsName.map((m,n)=>{
                                return(
                                    <div className="col-md-6 form-group" key={n}>
                                        <label>{m.name}:</label>
                                        {m.type=="date"?(
                                            <DatePicker dateFormat="YYYY-MM-DD"/>
                                            ):(
                                            <input type="text" className={"form-control"} onChange={this.setInput.bind(this,m.code)} value={this.state.modalObj[m.code]}/>
                                        )}

                                    </div>
                                )

                            })}
                        </div>
                    ):""}

                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.close}>取消</Button>
                    <Button bsStyle="primary">保存</Button>
                </Modal.Footer>

            </Modal>
        )
    }
}