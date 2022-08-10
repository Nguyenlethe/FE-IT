


import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import { connect } from 'react-redux';


class ModalUser extends Component {
    constructor(props) {
        // super(props); Có thể kế thừa các props từ cha xuống
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: ''
        }
    }

    
    // ẩn hiện modal
    toggle = () => {
        this.props.toggleUserModal()
        if(this.props.isOpen){
            this.handleRemoveState()
        }
    }
    

    // Onchage input set state
    handleOnchaneInput = (e, name) => {
        let copyState = {...this.state}
        copyState[name] = e.target.value
        this.setState({
            ...copyState
        })
    }

    // Khi ấn Add thoông tin thỏa mãn thì xóa state = ''
    handleRemoveState = () => {
        let copyState = {...this.state}
        for(let key in this.state){
            copyState[key] = ''
        }
        this.setState({
            ...copyState
        })
    }

    // Check phải là email or không brỏ trống
    handleValidateInput = () =>{
        let isCheck = false
        let arrInput = []
        let numberCheck = 0;
        const $$ = document.querySelectorAll.bind(document)
        const err = $$('.error')
        const regexEmail = /^[-!#$%&'*+0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        for(let key in this.state) {
            arrInput.push(key)
        }
        arrInput.forEach((item,index) => {
            const error = err[index]
            if(!this.state[item]){
                error.innerText = `${item} không được để trống !`
                return isCheck = false
            }else{
                numberCheck += 1
                error.innerText = ''
                if(this.state[item] && item === 'email'){
                    if(!regexEmail.test(this.state[item])){
                        error.innerText = `${item} không đúng định dạng !`
                    }else{
                        numberCheck += 1
                    }
                }
                if(numberCheck > arrInput.length){
                    return isCheck = true
                }

            }

        })
        return isCheck
    }
    
    // Xl onchan xoa message loi
    componentDidUpdate(){
        const $$ = document.querySelectorAll.bind(document)
        const err = $$('.error')
        const input = $$('.input')
        input.forEach((item, index)=> {
            const error = err[index]
            item.oninput = () => {
                error.innerText = ''
            }   
        })
    }

    // Khi lấy được dl từ form thì truyền về class cha daata
    handleAddNewUser = (e) => {
        e.preventDefault()
        let isValid =  this.handleValidateInput()
        if(isValid === true){
            console.log(this.state)
            this.props.createNewUser(this.state)  
            this.handleRemoveState()
        } 
    }


    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => this.toggle()} 
                className='abcClassName'
                size='lg'
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>Modal title</ModalHeader>
                <ModalBody>
                    <div className="wraper-form" onLoad={() => this.handleLoadFrom()}>
                        <form action="/post-crud" method="post" >
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Email</label>
                                    <input type="email" name="email" className="form-control input"  value={this.state.email} onChange={(e) => this.handleOnchaneInput(e, e.target.name)} placeholder="Email"/>
                                    <span className="error"></span>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Password</label>
                                    <input type="password" name="password" className="form-control input" value={this.state.password} onChange={(e) => this.handleOnchaneInput(e, e.target.name)} placeholder="Password"/>
                                    <span className="error"></span>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>First Name</label>
                                    <input type="text" name="firstName" className="form-control input" value={this.state.firstName} onChange={(e) => this.handleOnchaneInput(e, e.target.name)} placeholder="First Name"/>
                                <span className="error"></span>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Last Name</label>
                                    <input type="text" name="lastName" className="form-control input" value={this.state.lastName} onChange={(e) => this.handleOnchaneInput(e, e.target.name)} placeholder="Last Name"/>
                                <span className="error"></span>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Address</label>
                                    <input type="address" name="address"className="form-control input" value={this.state.address} onChange={(e) => this.handleOnchaneInput(e, e.target.name)} placeholder="Address"/>
                                    <span className="error"></span>
                                </div>
    
                                <div className="form-group col-md-6">
                                    <label>Phone Number</label>
                                    <input type="text" name="phoneNumber"className="form-control input" value={this.state.phoneNumber} onChange={(e) => this.handleOnchaneInput(e, e.target.name)} placeholder="Phone Number"/>
                                    <span className="error"></span>
                                </div>
   
                            </div>    


                            <div className="form-row">

                                <div className="form-group col-md-6">
                                    <label>Gender</label>
                                    <select name="gender" className="form-control input" value={this.state.gender} onChange={(e) => this.handleOnchaneInput(e, e.target.name)} >
                                        <option></option>
                                        <option value="0">Other</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                    <span className="error"></span>
                                </div>


                                <div className="form-group col-md-6">
                                    <label>Role</label>
                                    <select name="roleId" className="form-control input" value={this.state.roleId} onChange={(e) => this.handleOnchaneInput(e, e.target.name)}>
                                        <option></option>
                                        <option value="Admin">Admin</option>
                                        <option value="Doctor">Doctor</option>
                                        <option value="Patient">Patient</option>
                                    </select>
                                    <span className="error"></span>
                                </div>

                            </div>

                            <button type="submit" className="btn btn-primary" onClick={(e) => this.handleAddNewUser(e)}>+ Add new</button>
                            <button type="button" className="btn close" onClick={() => this.toggle()}>Close</button>

                        </form>
                    </div>
                </ModalBody>
            </Modal>   
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser)