
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import TabelManageUsers from './TabelManageUsers'

import  * as actions  from '../../../store/actions'
import { languages,CRUD_ACTIONS} from '../../../utils/constant';
import getBase64  from '../../../utils/CommonUtils';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; 
 
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './UserRedux.module.scss';
const cx = classNames.bind(styles);


// this file no validate
class UserRedux extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImage: '',
            isOpen: false,
            action: '',
            allInfoUser: {
                id: '',
                password: '',
                email: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: '',
                positionId: '',
                roleId: '',
                image: '',
            }
           

        
        }
    }

    async componentDidMount(){
        this.props.getGenderStart('gender')
        this.props.getPositionStart('position')
        this.props.getRoleStart('role')
        
    }


    // Hàm này sẽ check hiện tại và quá khứ mỗi lần componet đc render hàm này đc gọi
    componentDidUpdate(prevProps, prevState, snapshot){
        //console.log(prevProps.genderRedux)  // Quá khứ của genderRedux
        //console.log(this.props.genderRedux) // Hiệjn tại của genderRedux
        
        if(prevProps.genderRedux !== this.props.genderRedux){
            this.setState({
                genderArr: this.props.genderRedux
            })
            console.log('1')
        }

        if(prevProps.positionRedux !== this.props.positionRedux){
            this.setState({
                positionArr: this.props.positionRedux
            })
            console.log('2')
        }

        if(prevProps.roleRedux !== this.props.roleRedux){
            this.setState({
                roleArr: this.props.roleRedux
            })
            console.log('3')
        }

        if(prevProps.users !== this.props.users){
            this.setState({
                previewImage: '',
                action: CRUD_ACTIONS.CREATE,
                allInfoUser: {
                    id: '',
                    password: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    phoneNumber: '',
                    gender: '',
                    positionId: '',
                    roleId: '',
                    image: ''
                },
            })

            // console.log(this.state)
        }
    }

    handleOnchaneImage = async (e) => {
        let file = e.target.files[0]
        if(file){
            let base64 = await getBase64(file)
            file.src = URL.createObjectURL(file) 
            this.setState({
                previewImage: file.src,
                allInfoUser: {
                    ...this.state.allInfoUser,
                    image: base64
                }
            })
        }
    }

    handleClickShowImg = (e) =>  {
        e.preventDefault()
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = async (e) =>{
        e.preventDefault()
        // Không check dl

        let {action} = this.state
        if(action === CRUD_ACTIONS.CREATE){
            await this.props.createNewUser(this.state.allInfoUser)
            this.props.fetchUserRedux('all')
            toast.success(`Thêm thành công !!!`); 
        }
        if(action === CRUD_ACTIONS.EDIT){
            
            // console.log(this.state.allInfoUser)
            // console.log(this.state)

            await this.props.editUserStartRedux(this.state.allInfoUser)
            this.props.fetchUserRedux('all')
            toast.success(`Sửa thành công !!!`); 
        }
    }

    handleOnchaneInput = (e, name) =>{
        let copyState = {...this.state.allInfoUser}
        for(let key in this.state.allInfoUser ){
            if(key === name){
                copyState[name] = e.target.value
            }
        }
        this.setState({
            allInfoUser: copyState
        })
    }


    editUser = (userEdit) =>{ 

      

        // console.log(userEdit)
        let copyState = {}
        for(let key in userEdit){
            for(let value in this.state.allInfoUser){
                if(value === key){
                    copyState[value] = userEdit[key]
                }
            }
        }

        // console.log(copyState)
        let imageBase64 = ''
        if(copyState.image){ // Giai ma code anh de hien thi
            imageBase64 = new Buffer(copyState.image,'base64').toString('binary');
        }
        // console.log(copyState)


        this.setState({
            // ...this.state,
            action: CRUD_ACTIONS.EDIT,
            previewImage: imageBase64,
            allInfoUser: copyState
        })
    
        // console.log(this.state)
    }
  
    render() {
        let genders = this.state.genderArr
        let language = this.props.language
        let isLoadingGender = this.props.isLoadingGender
        let roles =  this.state.roleArr
        let positions = this.state.positionArr
        let isOpen = this.state.isOpen
        let {password,email,firstName,lastName,address,phoneNumber,gender,positionId,roleId} = this.state.allInfoUser

        console.log(this.state)

        return (
            <>
                <div className={cx('container')}>
                    <div className={cx('title')}>
                        <FormattedMessage id="manage-user.manage-redux"/>
                    </div>

                    <h3>{isLoadingGender === true ? 'Loading Gender' : ''}</h3>
                    <div className={cx('body')}>
                        <h5><FormattedMessage id="manage-user.add"/></h5>
                            <div className={cx('row')}>
                                <div className={cx('col-12')}>
                                    <form  className={cx('form')} action="/post-crud" method="post">

                                        <div className={cx('item-input')}>
                                            <div className={cx('form-group col-md-5')}>
                                                <label> <FormattedMessage id="manage-user.email"/></label>
                                                <input type="email" name="email" className={cx("form-control")} placeholder="Email"
                                                    disabled={this.state.action === CRUD_ACTIONS.EDIT  ? true : false}
                                                    value={email}  onChange={(e) => this.handleOnchaneInput(e, e.target.name)}
                                                />
                                            </div>

                                            <div className={cx("form-group col-md-6")}>
                                                <label> <FormattedMessage id="manage-user.password"/></label>
                                                <input disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}  type="password" name="password" className={cx('form-control')} placeholder="Password"
                                                    value={this.state.action === CRUD_ACTIONS.EDIT ? "123456789" : password}  
                                                    onChange={(e) => this.handleOnchaneInput(e, e.target.name)}
                                                />
                                            </div>
                                        </div>

                                        <div className={cx("item-input")}>
                                            <div className={cx("form-group col-md-5")}>
                                                <label> <FormattedMessage id="manage-user.fristName"/></label>
                                                <input type="text" name="firstName" className={cx('form-control')} placeholder="First Name"
                                                    value={firstName}  onChange={(e) => this.handleOnchaneInput(e, e.target.name)}
                                                />
                                            </div>

                                            <div className={cx("form-group col-md-6")}>
                                                <label> <FormattedMessage id="manage-user.lastName"/></label>
                                                <input type="text" name="lastName" className={cx('form-control')} placeholder="Last Name"
                                                    value={lastName}  onChange={(e) => this.handleOnchaneInput(e, e.target.name)}
                                                />
                                            </div>
                                        </div>

                                        <div className={cx('item-input')}>
                                            <div className={cx('form-group col-md-5')}>
                                                <label> <FormattedMessage id="manage-user.address"/></label>
                                                <input type="address" name="address"className={cx('form-control')} placeholder="Address"
                                                    value={address}  onChange={(e) => this.handleOnchaneInput(e, e.target.name)}
                                                />
                                            </div>

                                            <div className={cx('form-group col-md-6')}>
                                                <label> <FormattedMessage id="manage-user.positionld"/></label>
                                                <select name="positionId" className={cx('form-control')}
                                                    value={positionId}  onChange={(e) => this.handleOnchaneInput(e, e.target.name)}
                                                >
                                                    <option>...</option>
                                                    {positions && positions.length > 0 &&
                                                        positions.map((item, index)=> {
                                                            return (<option key={index} value={item.keyMap}>
                                                                        {language === languages.VI ? item.valueVi : item.valueEn}
                                                                    </option>                                                               
                                                            )
                                                        })
                                                    }   
                                                </select>
                                            </div>
                                        </div>

                                        <div className={cx('item-input')}>
                                            <div className={cx("form-group col-md-5")}>
                                                <label> <FormattedMessage id="manage-user.role"/></label>
                                                <select name="roleId" className={cx('form-control')}
                                                    value={roleId}  onChange={(e) => this.handleOnchaneInput(e, e.target.name)}
                                                >
                                                    <option>...</option>
                                                    {roles && roles.length > 0 &&
                                                        roles.map((item, index)=> {
                                                            return (<option key={index} value={item.keyMap}>
                                                                        {language === languages.VI ? item.valueVi : item.valueEn}
                                                                    </option>                                                               
                                                            )
                                                        })
                                                    }   
                                                </select>
                                            </div>

                                            <div className={cx('form-group col-md-6')}>
                                                <label> <FormattedMessage id="manage-user.phone"/></label>
                                                <input type="text" name="phoneNumber"className={cx('form-control')} placeholder="Phone Number"
                                                    value={phoneNumber}  onChange={(e) => this.handleOnchaneInput(e, e.target.name)}
                                                />
                                            </div>
                                        </div>

                                        <div className={cx("item-input")}>
                                            <div className={cx("form-group col-md-5")}>
                                                <label> <FormattedMessage id="manage-user.gender"/></label>
                                                <select name="gender" className={cx('form-control')}
                                                    value={gender}  onChange={(e) => this.handleOnchaneInput(e, e.target.name)}
                                                >
                                                    <option>...</option>
                                                    {genders && genders.length > 0 &&
                                                        genders.map((item, index)=> {
                                                            return (<option key={index} value={item.keyMap}>
                                                                        {language === languages.VI ? item.valueVi : item.valueEn}
                                                                    </option>                                                               
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div className={cx("form-group col-md-6")}>
                                                <label> <FormattedMessage id="manage-user.avata"/></label>
                                                <input type="file" name="file"className={cx('form-control')} placeholder="Avata"
                                                    onChange={(e) => this.handleOnchaneImage(e)}
                                                    
                                                />
                                                <div className={cx("preview-image")} >
                                                    {this.state.previewImage ? <img  onClick={(e) => this.handleClickShowImg(e)} src={this.state.previewImage} alt="Preview"/> : ''}
                                                </div>
                                            </div>

                                        </div>

                                        <br></br>

                                        <button type="submit" 
                                            onClick={(e) =>  this.handleSaveUser(e)} 
                                            className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary '}>
                                            {this.state.action === CRUD_ACTIONS.EDIT ?  <FormattedMessage id="manage-user.change"/>  : <FormattedMessage id="manage-user.save"/>}
                                        </button>

                                    </form>
                                </div>
                            </div>
                        <br></br><br></br>
                    </div>

                    {isOpen === true && (
                        <Lightbox
                            mainSrc={this.state.previewImage}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    )}

                    <TabelManageUsers action={this.state.action} editUser={this.editUser}/>
                </div>
            </>
        )
    }
}


// Nhận dl trả về từ redux
const mapStateToProps = state => {
    return {
        language:         state.app.language,
        genderRedux:      state.admin.genders,
        positionRedux:    state.admin.position,
        roleRedux:        state.admin.roleId,
        isLoadingGender:  state.admin.isLoadingGender,
        users:            state.admin.users
    };
};


// Gửi action đi
const mapDispatchToProps = dispatch => {
    return {
        // Tạo 1 hàm gọi đến actions có tên là fetchGenderStart ta đã định nghĩa
        getGenderStart: (inputGender) =>  dispatch(actions.fetchGenderStart(inputGender)),
        getPositionStart: (inputPosition) =>  dispatch(actions.fetchPositionStart(inputPosition)),
        getRoleStart: (inputRole) =>  dispatch(actions.fetchRoleStart(inputRole)),
        createNewUser: (data) =>  dispatch(actions.createNewUser(data)),
        fetchUserRedux: (data) => dispatch(actions.fetchAllUserStart(data)),
        editUserStartRedux: (data) => dispatch(actions.editUserStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
