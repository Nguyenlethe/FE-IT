import React, { Component } from 'react';
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import getBase64  from '../../../utils/CommonUtils';


import classNames from 'classnames/bind';
import styles from './RemedyModal.module.scss';
const cx = classNames.bind(styles);



class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email:'',
          imgaeBase64:''
        }
    }



    componentDidMount = async ()=>  {
        if(this.props.dataModal){
            this.setState({
                email:  this.props.dataModal.email
            })
        }
    }


    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.dataModal !== this.props.dataModal){
            this.setState({
                email:  this.props.dataModal.email
            })
        }
    }


    send = () => {
        this.props.senRemedy(this.state)
    }


    handleOnchaneImage = async (e) => {
        let file = e.target.files[0]
        if(file){
            let base64 = await getBase64(file)
            this.setState({
                imgaeBase64: base64
            })
        }
    }



    render() {
        let {truisOpenModal,dataModal, language} = this.props
        let {email} = this.state

        // console.log(this.state)

        return (
            <>  
                <Modal isOpen={truisOpenModal} className='abcClassName'size='lg'centered>
                    <ModalHeader>Gui hoa don kham benh</ModalHeader>
                        <ModalBody>
                            
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Email BN</label>
                                    <input type="email" name="email" className="form-control input"  
                                    value={email}
                                    onChange={(e) => this.setState({email: e.target.value})} placeholder="..."/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>file don thuoc</label>
                                    <input type="file" name="file" className="form-control input" 
                                    onChange={(e) => this.handleOnchaneImage(e)} placeholder="..."/>
                                </div>
                            </div>


                        </ModalBody>


                   <div style={{display: 'flex'}}>
                        <button onClick={() => this.send()} style={{maxWidth: '200px', minWidth: '140px', marginRight:'20px'}} type="submit" className="btn btn-primary" >Xác Nhận</button>
                        <button style={{maxWidth: '200px', minWidth: '140px', marginRight:'20px'}} type="button" className="btn btn-warning" >Hủy</button>
                   </div>
               </Modal>
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux:  state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
