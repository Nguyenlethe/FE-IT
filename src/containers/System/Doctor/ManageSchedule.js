

import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import  * as actions  from '../../../store/actions'
import { languages, formatDate} from '../../../utils/constant';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import moment from 'moment';
import {default as useServices} from '../../../services/useServices'


import classNames from 'classnames/bind';
import styles from './ManageSchedule.module.scss';
const cx = classNames.bind(styles);



class ManageSchedule extends Component {


     constructor(props) {
        super(props);
        this.state = {
            id: '',
            selectedDoctor: '',
            listDoctors: [],
            currentDate: new Date(),
            rangerTime: [],
            listTime: []
        }
    }


    // Hàm của thư viện react-select
    handleChange = async (selectedDoctor) => {
        this.setState({
            selectedDoctor: selectedDoctor,
            id: selectedDoctor.value,
        })
    };





    componentDidMount = () => {
        this.props.fetchAllDoctor()
        this.props.fetchAllCodeShedule('TIME')
        

    }
    



    handleEditBuildData = () => {
        let doctorsData = []
        let listDoctors = this.props.allDoctor
        listDoctors.forEach((item, index) => {
            let doctor = {}
            let fullNameVi = `${item.firstName} ${item.lastName}`
            let fullNameEn = `${item.lastName} ${item.firstName}`
            doctor.label = this.props.language === languages.EN ? fullNameEn : fullNameVi
            doctor.value = item.id
            doctorsData.push(doctor)
        })
        return doctorsData
    }




    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctor !== this.props.allDoctor){
            let dataSelect = this.handleEditBuildData()
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language){
            let dataSelect = this.handleEditBuildData()
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime){
            let data = this.props.allScheduleTime
            if(data && data.length > 0){
                data = data.map(item => ({...item, isSelected: false}))
            }
            this.setState({
                rangerTime: data
            })
        }
    }


    clearStateOnsubmit = () => {
        let resetBol = this.state.rangerTime
        resetBol = resetBol.map((item, index) => {
            item.isSelected = false
            return item
        })
       
        this.setState({
            selectedDoctor: '',
            currentDate: new Date(),
            rangerTime: resetBol,
            listTime: []
        })
    }


    saveContentMarkDown = async () => {
        let listTimeDoctor = []
        let {rangerTime} = this.state
        rangerTime.forEach((item, index) =>{
            if(item.isSelected === true) {
                listTimeDoctor.push(item)
            }
        })
        await this.setState({
            listTime: listTimeDoctor
        })
        

        let {listTime,currentDate ,selectedDoctor} = this.state

        let formatDat = formatDate(currentDate)

        let result = []
        listTime.forEach((item, index) => {
            let data = {}
            data.doctorId = selectedDoctor.value
            data.timeType = item.keyMap
            data.date = formatDat
            result.push(data)
        })
        let response = await useServices.saveBuilkScheduleDoctor({arrSchedule:result})
        if(response && response.data.errCode === 0){
            this.clearStateOnsubmit()
        }
    }


    handleClickTime = (time) => {
        let {rangerTime} = this.state
        if(rangerTime.length > 0){
            rangerTime.map((item, index) => {
                if(item.isSelected === true && time.id === item.id){
                    time.isSelected = false
                    this.setState({
                        rangerTime: [ ...this.state.rangerTime]
                    })
                }else if(item.isSelected === false && time.id === item.id){
                    time.isSelected = true
                    this.setState({
                        rangerTime: [ ...this.state.rangerTime]
                    })
                }
                
            })
        }
    }





    render() {
        let {selectedDoctor,listDoctors,currentDate,rangerTime ,listTime} = this.state
        let {language} = this.props

        
        
      
        // console.log(listTime)
        return (
               <>
                <h4 className={cx('title')}>Quản lý kế hoạch khám bệnh</h4>
                    <div className={cx('ManageSchedule')}>

                        <div className={cx('ManageSchedule-select')} style={{marginBottom: '12px'}}>
                            <p>Chọn Bác Sĩ</p>
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleChange}
                                options={listDoctors}
                            />
                        </div>
    
                        <div className={cx('ManageSchedule-select-date')} style={{marginBottom: '12px'}}>
                            <p>Chọn Ngày</p>
                            <DatePicker 
                                selected={currentDate} 
                                minDate={new Date()}
                                onChange={(date) => this.setState({currentDate: date})} 
                            />
                        </div >


                        <div className={cx('ManageSchedule-select-time')}>
                            {rangerTime && rangerTime.length > 0 && 
                                rangerTime.map((item, index) => {
                                    return (<button type="button"
                                        className={cx('ManageSchedule-select-time-btn')} 
                                        key={item.id} 
                                        onClick={() => this.handleClickTime(item)}
                                        style={{backgroundColor: item.isSelected === true ? 'rgb(4, 102, 167)' : 'rgba(90, 90, 90, 0.713)'}}
                                        >
                                        {language === languages.VI? item.valueVi : item.valueEn}
                                    </button>)
                                })
                            }
                        </div>

                   
                
                        <button  
                            type="submit" 
                            className="btn btn-primary"
                            onClick={(e) => this.saveContentMarkDown()}>Sign in
                        </button>

                    </div>
               </>
        );
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        allDoctor: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctorStart()),
        fetchAllCodeShedule: (type) => dispatch(actions.fetchAllCodeSheduleStart(type)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
