import React, { Component } from 'react';
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import _ from 'lodash';
import * as actions from '../../../../store/actions'
import { languages,formatDate} from '../../../../utils/constant';
import {default as useServices} from '../../../../services/useServices'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';


import classNames from 'classnames/bind';
import styles from './BookingModal.module.scss';
import ProfileDoctor from '../ProfileDoctor';
const cx = classNames.bind(styles);



class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            address: '',
            reason: '',
            birthday: new Date(),
            gender: '',
            doctorId: '',
            listGender: [],
            timeType: '',
            email: '',
            timeString: '',
            language: '',
            doctorName: '',
            date: ''
        }
    }



    componentDidMount = async ()=>  {
        this.props.getGenderStart('gender')
       
    }


    componentDidUpdate= async(prevProps, prevState)=> {
        let {isOpenModalBooking,dataScheduleModalTime} = this.props
        if(prevProps.language !== this.props.language){

        }

        if(prevProps.genderRedux !== this.props.genderRedux){
            this.setState({
                listGender: this.props.genderRedux
            })
        }

        if(isOpenModalBooking && prevProps.dataScheduleModalTime !== this.props.dataScheduleModalTime){
            let {language} = this.props
            this.setState({
                date: dataScheduleModalTime.date,
                language: language,
                doctorId: dataScheduleModalTime.doctorId,
                timeType: dataScheduleModalTime.timeType,
                timeString: dataScheduleModalTime.timeTypeData ? languages.EN === language ? dataScheduleModalTime.timeTypeData.valueEn:dataScheduleModalTime.timeTypeData.valueVi : '',
                doctorName: languages.EN === language ? `${dataScheduleModalTime.doctorData.lastName} ${dataScheduleModalTime.doctorData.firstName}` : `${dataScheduleModalTime.doctorData.firstName} ${dataScheduleModalTime.doctorData.lastName}`
            })
        }

    }

    handleOnchaneInput = (event, name) => {
        let valueInput = event.target.value
        let stateCopy = {...this.state}
        stateCopy[name] = valueInput

        this.setState({
            ...stateCopy
        })
    }

    toggle = () => {
        this.props.hidenModal()
    }



    handleAddNewUser = async (e) => {
        let data = this.state
        e.preventDefault()

        
        // console.log(res)
        
        let res = await useServices.postBookAppointment(data)
        
        console.log(data)


        if(res && res.data.errCode === 0){
            toast.success('Dat lich thanh cong !!!')
            this.setState({
                email: '',
                fullName: '',
                phoneNumber: '',
                address: '',
                reason: '',
                birthday: new Date(),
                gender: '',
            })
        }
    }





      
    render() {

        let {isOpenModalBooking,dataScheduleModalTime, language} = this.props

        let idDoctor = ''
        if(dataScheduleModalTime && !_.isEmpty(dataScheduleModalTime)){
            idDoctor = dataScheduleModalTime.doctorId
        }



        let {email,
            fullName,
            phoneNumber,
            address,
            reason,
            birthday,
            listGender
        } = this.state

        // console.log(this.state)
       
        


        // console.log(dataScheduleModalTime)
        return (
            <>  
                <Modal 
                    isOpen={isOpenModalBooking} 
                    toggle={() => this.toggle()} 
                    className='abcClassName'
                    size='lg'
                    centered
                >
                <ModalHeader toggle={() => this.toggle()}>Thông Tin Đặt Lich Khám Bệnh</ModalHeader>
                <ModalBody>

                    <ProfileDoctor
                        doctorId={idDoctor}
                        isShowDescriptionDoctor={false}
                        dataTime={dataScheduleModalTime}
                    />

                    <div className="wraper-form" onLoad={() => this.handleLoadFrom()}>
                        <form action="" method="" >

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Họ Tên</label>
                                    <input type="text" name="fullName" className="form-control input"  
                                    value={fullName} 
                                    onChange={(e) => this.handleOnchaneInput(e, e.target.name)} placeholder="..."/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Số Điện Thoại</label>
                                    <input type="text" name="phoneNumber" className="form-control input" 
                                    value={phoneNumber} 
                                    onChange={(e) => this.handleOnchaneInput(e, e.target.name)} placeholder="..."/>
                                </div>
                            </div>




                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Địa Chỉ Email</label>
                                    <input type="email" name="email" className="form-control input" 
                                    value={email} 
                                    onChange={(e) => this.handleOnchaneInput(e, e.target.name)} placeholder="..."/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>Địa Chỉ Liên Hệ</label>
                                    <input type="text" name="address" className="form-control input" 
                                    value={address} 
                                    onChange={(e) => this.handleOnchaneInput(e, e.target.name)} placeholder="..."/>
                                </div>
                            </div>




                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Ngày/Tháng/Năm - Sinh</label>
                                    <DatePicker 
                                        className="form-control input"
                                        selected={birthday}
                                        onChange={(date) => this.setState({birthday: date})} 
                                    />

                                </div>

                                <div className="form-group col-md-6">
                                    <label>Lý Do Khám</label>
                                    <input type="text" name="reason" className="form-control input" 
                                    value={reason} 
                                    onChange={(e) => this.handleOnchaneInput(e, e.target.name)} placeholder="..."/>
                                </div>
                            </div>   





                            <div className="form-row">

                                <div className="form-group col-md-12">
                                    <label>Gender</label>
                                    <select name="gender" className={cx('form-control')}
                                        onChange={(e) => this.handleOnchaneInput(e, e.target.name)}
                                    >
                                        <option>...</option>
                                        {listGender && listGender.length > 0 &&
                                            listGender.map((item, index)=> {
                                                return (<option key={index} value={item.keyMap}>
                                                    {language === languages.VI ? item.valueVi : item.valueEn}
                                                        </option>                                                               
                                                    )
                                            })
                                        }
                                    </select>
                                </div>

                            </div>
                            <button type="submit" className="btn btn-primary" onClick={(e) => this.handleAddNewUser(e)}>Xác Nhận</button>
                            <button type="button" className="btn close" onClick={() => this.toggle()}>Hủy</button>
                        </form>
                    </div>
                </ModalBody>

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
        getGenderStart: (inputGender) =>  dispatch(actions.fetchGenderStart(inputGender)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
