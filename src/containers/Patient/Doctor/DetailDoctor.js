import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import {default as useServices} from '../../../services/useServices';
import { languages} from '../../../utils/constant';


import classNames from 'classnames/bind';
import styles from './DetailDoctor.module.scss';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtralnfo from './DoctorExtralnfo';
const cx = classNames.bind(styles);



class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
           detailDoctor: {}
        }
    }



    componentDidMount = async ()=>  {
        if(this.props.match.params.id){
            let id = this.props.match.params.id
            let response = await useServices.getDetailInfoDoctor(id)
            if(response.data.errCode === 0){
                this.setState({
                    detailDoctor: response.data.data
                })
            }
        }
    }

      
    render() {

        let {detailDoctor} = this.state
        // console.log(detailDoctor)
        let nameVi, nameEn = 'Không Có Dữ Liệu !'
        if(detailDoctor.positionData){
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
        }
        
        return (
            <>
                <HomeHeader isShowBanner={false}/>

                <div className={cx('content-detail')}>

                    <div className={cx('introl-doctor')}>
                        <div className={cx('item-left')}>
                            <img src={detailDoctor.image ? detailDoctor.image : ''} alt="Avata"/>
                        </div>

                        <div className={cx('item-right')}>
                            <h5>{languages.EN === this.props.language ? nameEn : nameVi }</h5>
                            {detailDoctor.Markdown && detailDoctor.Markdown.description && 
                                <h6>{detailDoctor.Markdown.description}</h6>
                            }
                        </div>
                    </div>


                    <div className={cx('content-schedule')}>

                        <div className={cx('content-left')}>
                            <DoctorSchedule idDoctor={this.state.detailDoctor.id ? this.state.detailDoctor.id : -1}/>
                        </div>


                        <div className={cx('content-right')}>
                            <DoctorExtralnfo idDoctor={this.state.detailDoctor.id ? this.state.detailDoctor.id : -1}/>
                        </div>

                    </div>


                    <div className={cx('introl-doctor-detail')}>
                        {detailDoctor.Markdown && detailDoctor.Markdown.contentHtml && 
                            <div className={cx('introl-doctor-detail')} dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHtml}}>
                            </div>
                        }
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
