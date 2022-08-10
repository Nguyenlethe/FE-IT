/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Component } from 'react';
import { connect } from 'react-redux';




import classNames from 'classnames/bind';
import styles from './Specalty.module.scss';
const cx = classNames.bind(styles);

//         <div className={cx('')}></div>


class About extends Component {

    render() {
        return (
            <div className={cx('specalty')}>
                <div className={cx('content')}>

                    <div className={cx('heading')}>
                        <h4>Truyền Thông Nói Về BookingCare</h4>
                    </div>


                        <div className={cx('content-slide')}>

                            <div className={cx('content-half')}>                               
                                {/* <iframe width="100%" height="350" src="https://www.youtube.com/embed/r7GtxXYEvgU"></iframe>                                                                              */}
                            </div>

                            <div className={cx('content-half')}>
                                <p className={cx('content-half-text')}>
                                    BookingCare rất tốt, trong quá trình tôi đến
                                    khám bệnh rất thuận lợi, thoải mái, mong
                                    BookingCare ngày càng có nhiều dịch vụ tốt
                                    hơn nữa, đặc biệt hỗ trợ nhiều hơn cho các
                                    bệnh nhân ở vùng sâu, vùng xa, tiếp cận được các dịch vụ khám chữa bệnh có chất lượng
                                    và chi phí hợp lý. Xin cảm ơn BookingCare
                                </p>
                            </div>

                        </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
      
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
