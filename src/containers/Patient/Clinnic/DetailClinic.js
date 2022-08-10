import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtralnfo from '../Doctor/DoctorExtralnfo';
import useServices from '../../../services/useServices';
import _ from 'lodash'
import classNames from 'classnames/bind';
import styles from './DetailClinic.module.scss';
import ProfileDoctor from '../Doctor/ProfileDoctor';
const cx = classNames.bind(styles);



class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
           allDoctorId: [],
           dataDetailClinic:  {},
           listProvince: []
        }
    }



    componentDidMount = async ()=>  {
        if(this.props.match.params.id){
            let id = this.props.match.params.id
            console.log(id)

            let response = await useServices.getAllDetailClinicById({id})

            console.log(response.data.data.doctorClinic)


            if(response && response.data.errCode === 0 ){
                let data = response.data.data.doctorClinic
                let arrDoctor = []
               
                if(data && !_.isEmpty(data)){
                    let arrrDoctor = response.data.data.doctorClinic
                    if(arrrDoctor && arrrDoctor.length > 0){
                        arrrDoctor.map(item => {
                            arrDoctor.push(item.doctorId)
                        })
                    }
                }

                console.log(arrDoctor)
                
                
                this.setState({
                    dataDetailClinic: response.data.data,
                    allDoctorId: arrDoctor
                })
            }
        }
    }


    getDataDetailClinic = async () => {

    }

    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }
    }




      
    render() {
        let {allDoctorId,dataDetailClinic} = this.state
        console.log(this.state)
       

        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div className={cx('content')}>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic) && 
                            <>
                                <h5>{dataDetailClinic.name}</h5>
                                <div dangerouslySetInnerHTML={{__html: dataDetailClinic.descriptionHtml}}>   
                                </div>
                            </>
                        }
                    <br/>
                    <br/>

                    
                   
                    {allDoctorId.length > 0 && 
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
