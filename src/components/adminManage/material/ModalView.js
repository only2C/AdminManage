import React from 'react';
import {Modal, Button,Pagination} from 'react-bootstrap';
import _ from 'lodash';
import Config from '@/config';
import globalStore from '@/stores/GlobalStore';

// 订单信息模块

export default class ModalView extends React.Component {

    constructor(props) {
        super(props);
        this.state={}
    }


    componentWillReceiveProps(props){
        props
    }

    close =()=>{
        this.props.closeModal();
    }
    render(){
        return(
            <Modal show={this.props.show} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>操作</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.props.operationType == "preview"?(
                        <div className="row">
                            <div className="col-md-9"></div>
                            <div className="col-md-6">
                                <label></label>
                            </div>
                            <div className="col-md-6"></div>
                            <div className="col-md-6"></div>
                            <div className="col-md-6"></div>
                        </div>
                    ):""}

                    {this.props.operationType == "edit"?(<div></div>):""}
                    {this.props.operationType == "add"?(<div></div>):""}

                    主体内容...
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.close}>取消</Button>
                    <Button bsStyle="primary">保存</Button>
                </Modal.Footer>

            </Modal>
        )
    }
}