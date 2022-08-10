import React, { Component } from 'react';
import './UserManage.scss'
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import  {default as userManage} from '../../services/useServices';
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser'


class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenEditModalUser: false,
            userEdit: {}
        }
    }

    // 
    componentDidMount() {
        this.getAllUsersFromReact()
    }
    
    // truyền user vào mảng user
    getAllUsersFromReact = async () => {
        let response = await userManage.getAllUsers('all')
        if(response && response.data.errCode === 0){
            this.setState({arrUsers: response.data.users})
        }
    }

    // Xl click nút create add user
    handleClickBtnAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    // bật taắt modal
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    // truyên fc này cho ModalUser nhận lại đc data, message
    createNewUser = async (data) => {
        try{
            let response = await  userManage.createNewUser(data);
            console.log(response);
            if(response && response.data.message.errCode === 0){
                this.toggleUserModal()
                this.getAllUsersFromReact()
            }else{
                if(response.data.message.message === undefined){
                    alert(response.data.message.check.errPassword);
                }else{
                    alert(response.data.message.message);
                }
            }
        }
        catch(e) {
            console.log(e)
        }
    }

    // XL khi click icon delete
    handleDleteUser = async (user) => {
        try{
            let response = await userManage.deleteUser(user)
            if(response.data.message.errCode === 0){
                this.getAllUsersFromReact()
            }else{
                alert(response.data.message.message)
            }
        }
        catch(e) {
            console.log(e)
        }
    }

    // Xl khi click icon edit
    handleEditUser = (user) => {
        this.setState({
            isOpenEditModalUser: true,
            userEdit: user
        })
    }

    //
    toggleEditUserModal = () => {
        this.setState({
            isOpenEditModalUser: !this.state.isOpenEditModalUser,
        })
    }

    // Án vào nút save change bên modalEditUser
    editUser = async (user) => {
        try{ 
            let response = await userManage.editUser(user)
            console.log(response)
  
            if(response && response.data.errCode === 0){
                this.toggleEditUserModal()
                this.getAllUsersFromReact()
            }else{
                if(response.data.message === undefined){
                    alert(response.data.check.errPassword);
                }else{
                    alert(response.data.message);
                }
            }
        }
        catch(e) {
            console.log(e)
        }
    }


    render() {

        let listUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <h3 className="heading-list-user">MANAGE USERS WIDTH THE</h3>

                <button className="btn-newUser" onClick={() => this.handleClickBtnAddNewUser()}>
                    + ADD NEW USER
                </button>

                <ModalUser 
                    isOpen={this.state.isOpenModalUser}
                    toggleUserModal={this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                />

                {this.state.isOpenEditModalUser && <ModalEditUser
                    isOpen={this.state.isOpenEditModalUser}
                    toggleUserModal={this.toggleEditUserModal}
                    curentUser={this.state.userEdit}
                    editUser={this.editUser}
                />}

                <div className="users-list">      
                    <table>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Frist Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {listUsers && listUsers.length > 0 && listUsers.map((user, index)=> {
                                return (
                                    <tr key={user.id} className="td-action">
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            <i className="fas fa-user-minus icon delete" onClick={() => this.handleDleteUser(user)}></i>
                                            <i className="fas fa-edit icon change" onClick={() => this.handleEditUser(user)}></i>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
