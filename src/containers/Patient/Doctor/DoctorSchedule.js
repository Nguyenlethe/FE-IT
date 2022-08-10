
import React, { Component } from 'react';
import { connect } from "react-redux";
// import Select from 'react-select';
// import HomeHeader from '../../HomePage/HomeHeader';
// import { Redirect, Route, Switch } from 'react-router-dom';
// import UserManage from '../containers/System/UserManage';
// import UserRedux from '../containers/System/Admin/UserRedux';
// import Header from '../containers/Header/Header';
// import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import {default as useServices} from '../../../services/useServices';

import { languages, formatDate} from '../../../utils/constant';
import moment from 'moment';
import Localization from 'moment/locale/vi';


import classNames from 'classnames/bind';
import styles from './DoctorSchedule.module.scss';
import BookingModal from './Modal/BookingModal';
const cx = classNames.bind(styles);



class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
           allDays: [],
           allAvilabelTimes: [],
           isOpenModalBooking: false,
           dataScheduleModalTime: []
        }
    }


    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    setDays = async ()=> {
        // Xl lấy ra 7 ngày kế tiếp tính từ ngày hôm nay
        let arrDays = []
        for(var i = 0; i < 7; i++) {
            let Object = {}
            if(languages.EN === this.props.language){
                let day = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                Object.label = this.capitalizeFirstLetter(day)
            }else {
                let day = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                Object.label = this.capitalizeFirstLetter(day)
            }
            let date = new Date(); date.setDate(date.getDate() + i);
            Object.value = date;
            arrDays.push(Object)
        }

        let dayEn = this.capitalizeFirstLetter(moment(new Date()).add('days').locale('en').format('ddd - DD/MM'))

        let dayVi =  this.capitalizeFirstLetter(moment(new Date()).add('days').format('dddd - DD/MM'))
        
        let newArrDays = arrDays.map((item, index) => {
            if(item.label === dayVi){
                item.label = `Hôm Nay -  ${new Date().getDate()}${new Date().getMonth() <= 8 ? '/0' : '/'}${new Date().getMonth() + 1}`
            }
            if(item.label === dayEn){
                item.label = `Today -  ${new Date().getDate()}${new Date().getMonth() <= 8 ? '/0' : '/'}${new Date().getMonth() + 1}`
            }
            
            item.value = formatDate(item.value)
            return item
        })

        
        this.setState({
            allDays: newArrDays
        })
    }



    componentDidMount = async ()=>  {
        await this.setDays()
        if(this.props.idDoctor){
            let date = formatDate(new Date())
            await this.handleChangeSelect(date)
        }
    }
    
    
    componentDidUpdate = async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){
            await this.setDays()
        }

        if(prevProps.idDoctor !== this.props.idDoctor){
            let date = formatDate(new Date())
            await this.handleChangeSelect(date)
        }

    }

    handleChangeSelect = async (date) => {
        let { idDoctor } = this.props
        if(idDoctor && idDoctor !== -1){
           
            let response = await useServices.getSheduleDoctorByDate(idDoctor, date)

            if(response && response.data.errCode === 0){
                this.setState({
                    allAvilabelTimes: response.data.data ? response.data.data : []
                })
            }
            
        }
    }

    hidenModal = (time) => {
        this.setState({
            isOpenModalBooking: !this.state.isOpenModalBooking,
            dataScheduleModalTime: time
        })
    }

    handleClickScheduleTime = (time) => {
        this.hidenModal(time)
    
    }

      
    render() {

        let {allDays,allAvilabelTimes} = this.state
        let {language, idDoctor} = this.props

       

       
        
        return (
            <>
                <div className={cx('schedule')}>
                    <div className={cx('select')}>
                        <select className="form-select" onChange={(e) => this.handleChangeSelect(e.target.value)}>
                            {allDays && allDays.length > 0 && 
                                allDays.map((item, index) => {
                                    return(<option key={index} value={item.value}>{item.label}</option>)
                                })
                            }
                        </select>
                    </div>

                    <div className={cx('list-schedule')}>
                        <div className={cx('list-icon')}>
                            <i className="fas fa-calendar-alt" ></i>
                            <span>Lịch Khám Bệnh</span>
                        </div>

                        <div className={cx('list-content')}>
                            {allAvilabelTimes && allAvilabelTimes.length > 0 &&
                                allAvilabelTimes.map((item, index)=> {
                                let tomeDisplay = languages.EN === language ? item.timeTypeData.valueEn : item.timeTypeData.valueVi
                                    
                                    return (
                                        <button 
                                            onClick={() => this.handleClickScheduleTime(item)}
                                            key={item.timeType} 
                                            type="button" 
                                            className={cx('content-shecdule')}>
                                            {tomeDisplay}
                                        </button>
                                    )
                                })
                            }

                            {allAvilabelTimes && allAvilabelTimes.length === 0 && 
                                <span className={cx('content-shecdule-nodata')}>Bác sĩ hiện không có lịch hẹn ngày này. Vui lòng trọn ngày khác !!!</span>
                            } 
                        </div>

                            {allAvilabelTimes && allAvilabelTimes.length > 0 && 
                                <p className={cx('content-shecdule-said')}>
                                   Click để chọn <i className='far fa-hand-point-up'></i> và đặt lịch (miễn phí) 
                                </p>
                            }
                    </div>
                        
                </div>


                <BookingModal
                    isOpenModalBooking={this.state.isOpenModalBooking}
                    hidenModal={this.hidenModal}
                    dataScheduleModalTime={this.state.dataScheduleModalTime}
                />
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
