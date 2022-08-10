



import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash'  // Thư viện giúp xl với mảng or obj dễ hơn, viết code js ngắn gọn hơn

class ModalEditUser extends Component {
    constructor(props) {
        // super(props); Có thể kế thừa các props từ cha xuống
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: ''
        }
    }


    componentDidMount() {
        let user = this.props.curentUser 
        if(user && !_.isEmpty(user)){
            let copyState = {...this.state}
            for(let key in copyState){
                copyState[key] = user[key]
            }
            this.setState({
                ...copyState
            })
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

        for(let key in this.state) {
            arrInput.push(key)
        }

        arrInput.forEach((item,index) => {
            const error = err[index]
            if(!this.state[item] && this.state[item] !== 0){
                console.log(this.state[item])
                error.innerText = `${item} không được để trống !`
                return isCheck = false
            }else{
                numberCheck += 1
                error.innerText = ''
                if(numberCheck >= arrInput.length){
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
    handleSaveUser = (e) => {
        e.preventDefault()
        let isValid =  this.handleValidateInput()
        if(isValid === true){
            this.props.editUser(this.state)  
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
                <ModalHeader toggle={() => this.toggle()}>Edit User</ModalHeader>
                <ModalBody>
                    <div className="wraper-form" onLoad={() => this.handleLoadFrom()}>
                        <form action="/post-crud" method="post" >
            
                            <div hidden>
                                <input type="text" name="id" className="form-control input" value={this.state.id} onChange={(e) => this.handleOnchaneInput(e, e.target.name)} placeholder="id"/>
                                <span className="error"></span>
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

                            <button type="submit" className="btn btn-primary" onClick={(e) => this.handleSaveUser(e)}>+ Change User</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser)