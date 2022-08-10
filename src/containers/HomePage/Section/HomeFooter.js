import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {FormattedMessage} from 'react-intl'

import imgs from '../../../assets/logo.svg'

import classNames from 'classnames/bind';
import styles from './Specalty.module.scss';
const cx = classNames.bind(styles);

//         <div className={cx('')}></div>


class HomeFooter extends Component {
    render() {
        
        return (
            <div className={cx('specalty')}>
                <div className={cx('content-footer')}>

                    <div className={cx('item')}>
                        <img src={imgs} alt="/"/>
                        <ul className={cx('list-text')}>
                            <li>Công ty Cổ phần Công nghệ BookingCare</li>
                            <li>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</li>
                            <li>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</li>
                        </ul>
                    </div>

                    <div className={cx('tow')}>
                        <ul className={cx('list-text')}>
                            <li>Liên hệ hợp tác</li>
                            <li>Câu hỏi thường gặp</li>
                            <li>Điều khoản sử dụng</li>
                            <li>Chính sách Bảo mật</li>
                            <li>Quy trình hỗ trợ giải quyết khiếu nại</li>
                            <li>Quy chế hoạt động</li>
                        </ul>
                    </div>

                    <div className={cx('three')}>
                        <ul className={cx('list-text')}>
                            <li>Công ty Cổ phần Công nghệ BookingCare</li>
                            <li>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</li>
                            <li>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</li>
                        </ul>
                    </div>
                </div>
                <a className={cx('link-footer')}  href="/"> Mọi thông tin vui lòng liên hệ hotline: 0353233526</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
