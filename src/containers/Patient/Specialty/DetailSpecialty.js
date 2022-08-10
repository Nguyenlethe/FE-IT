import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtralnfo from '../Doctor/DoctorExtralnfo';
import useServices from '../../../services/useServices';
import _ from 'lodash'
import classNames from 'classnames/bind';
import styles from './DetailSpecialty.module.scss';
import ProfileDoctor from '../Doctor/ProfileDoctor';
const cx = classNames.bind(styles);



class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
           allDoctorId: [],
           dataDetailSpecialty:  {},
           listProvince: []
        }
    }



    componentDidMount = async ()=>  {
        if(this.props.match.params.id){
            let id = this.props.match.params.id
            let response = await useServices.getAllDetailSpecialtyById({id: id, location: 'All'})

            let resProvince = await useServices.getAllCode('PROVINCE')

            console.log(resProvince)


            if(response && response.data.errCode === 0 && resProvince && resProvince.data.errCode === 0 ){
                let data = response.data.data
                let arrDoctor = []
               
                if(data && !_.isEmpty(data)){
                    let arrrDoctor = data.doctorSpecialty
                    if(arrrDoctor && arrrDoctor.length > 0){
                        arrrDoctor.map(item => {
                            arrDoctor.push(item.doctorId)
                        })
                    }
                }

                let dataProvince = resProvince.data.data
                if(dataProvince && dataProvince.length > 0){
                    dataProvince.unshift({
                        id:0,
                        keyMap: "All",
                        type: "PROVINCE",
                        valueEn: "Ha Noi",
                        valueVi: "Tất Cả"
                    })
                }


                this.setState({
                    dataDetailSpecialty: response.data.data,
                    allDoctorId: arrDoctor,
                    listProvince: resProvince.data.data
                })
            }
        }
    }


    getDataDetailSpecialty = async () => {

    }

    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }
    }


    handleOnchaneSelect = async (e) => {
        //console.log(e.target.value)
        if(this.props.match.params.id){
            let id = this.props.match.params.id
            let location = e.target.value

            let response = await useServices.getAllDetailSpecialtyById({id, location})

            // console.log(resProvince)

            if(response && response.data.errCode === 0  ){
                let data = response.data.data
                let arrDoctor = []
               
                if(data && !_.isEmpty(data)){
                    let arrrDoctor = data.doctorSpecialty
                    if(arrrDoctor && arrrDoctor.length > 0){
                        arrrDoctor.map(item => {
                            arrDoctor.push(item.doctorId)
                        })
                    }
                }


                this.setState({
                    dataDetailSpecialty: response.data.data,
                    allDoctorId: arrDoctor,
                })
            }
        }


    }



      
    render() {
        let {allDoctorId,dataDetailSpecialty,listProvince} = this.state

        // console.log(this.state)

        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div className={cx('content')}>
                        <div className={cx('content-select')}>
                            <select className="form-control input" onChange={(e) => this.handleOnchaneSelect(e)}>
                                {listProvince && listProvince.length > 0 &&
                                    listProvince.map(item => {
                                        return <option key={item.id} value={item.keyMap}>{item.valueVi}</option>
                                    })
                                }
                               
                            </select>
                    <br/>

                        </div>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && 
                            <div dangerouslySetInnerHTML={{__html: dataDetailSpecialty.descriptionHtml}}>   
                            </div>
                        }
                    <br/>
                    <br/>

                    
                    {allDoctorId.length === 0 && <p style={{color: 'red', textAlign: 'center'}}>Không Có Dữ Liệu -  Vui Lòng Chọn Tỉnh Thành Phố Khác</p>}
                    {allDoctorId && allDoctorId.length > 0 && 
                        allDoctorId.map(item => {
                            return (
                                <div key={item} className={cx('item')}>
                                    {}
                                    <div className={cx('item-right')}>

                                    <ProfileDoctor
                                        doctorId={item}
                                        isShowDescriptionDoctor={true}
                                        isShowLinkDetail={true}
                                        isShowPrice={true}
                                        // dataTime={dataScheduleModalTime}
                                    />
                                    </div>

                                    <div className={cx('item-left')}>
                                        <DoctorSchedule 
                                            idDoctor={item}
                                        />
                                        <br/>
                                        <br/>
                                        
                                        <DoctorExtralnfo
                                            idDoctor={item}
                                        />
                                        <br/>

                                    </div>
                                </div>
                        
                            )
                        })
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
