import React, { Component } from 'react';
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {default as useServices} from '../../../services/useServices'
import {formatDate} from '../../../utils'
import RemedyModule from './RemedyModule';




import classNames from 'classnames/bind';
import styles from './ManagePatient.module.scss';
const cx = classNames.bind(styles);



class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
           currentDate: new Date(),
           dataPatient: [],
           isOpenModalRemedy: false,
           dataModal :{}
        }
    }



    componentDidMount = async ()=>  {
        let {user} = this.props
        let {currentDate} = this.state
        let res = await useServices.getAllPatientForDoctor({
            doctorId: user.id,
            date: formatDate(currentDate)
        })

        if(res && res.data.errCode === 0){
            this.setState({
                dataPatient: res.data.data
            })
        }
    }
    
    
    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }
    }


    handleChangeDatePicker = async (date) => {
        this.setState({
            currentDate: date
        }, async() => {
            let {user} = this.props
            let {currentDate} = this.state
            let res = await useServices.getAllPatientForDoctor({
                doctorId: user.id,
                date: formatDate(currentDate)
            })
            if(res && res.data.errCode === 0){
                this.setState({
                    dataPatient: res.data.data
                })
            }
        })
    }

    handleBtnConfrim = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType
        }
        this.setState({
            isOpenModalRemedy: true,
            dataModal: data
        })
    }

    senRemedy = async(data) => {
        let res = await useServices.sendReamedy({language: 'vi',...this.state.dataModal,...data})
        if(res && res.data.errCode === 0){
            let {user} = this.props
            let {currentDate} = this.state
            let res = await useServices.getAllPatientForDoctor({
                doctorId: user.id,
                date: formatDate(currentDate)
            })
    
            if(res && res.data.errCode === 0){
                this.setState({
                    dataPatient: res.data.data
                })
            }
        }
    }
   
      
    render() {
        let {currentDate,dataPatient,isOpenModalRemedy,dataModal} = this.state

        return (
            <>
                <RemedyModule 
                    truisOpenModal={isOpenModalRemedy}
                    dataModal={dataModal}
                    senRemedy={this.senRemedy}
                />

                <div className={cx('container')}>
                    <h5 className={cx('heading')}>Quan ly benh nhan khám bệnh</h5>
                    <div className={cx('content')}>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label> Chon Ngày/Tháng/Năm</label>
                                <DatePicker 
                                    className="form-control input"
                                    value={currentDate}
                                    selected={currentDate}
                                    onChange={(date) => this.handleChangeDatePicker(date)} 
                                />
                            </div>
                        </div>

                        <br/>
                        <br/>


                        <table className="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Time</th>
                                <th scope="col">Name</th>
                                <th scope="col">Gioi Tinh</th>
                                <th scope="col">Dia Chi</th>
                                <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {dataPatient && dataPatient.length > 0 && 
                                        dataPatient.map((item, index) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{index+1}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.patientData.firstName} {item.patientData.lastName}</td>
                                                    <td>{item.patientData.genderData.valueVi}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>
                                                        <button onClick={() => this.handleBtnConfrim(item)}>Xac Nhan</button>
                                                    
                                                    </td>
                                                </tr>
                                            )
                                        })

                                    }

                            </tbody>
                        </table>




                    </div>

                </div>
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
