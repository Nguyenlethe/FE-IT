


import React, { Component } from 'react';
import { connect } from 'react-redux';
import  * as actions  from '../../../store/actions'
import { languages} from '../../../utils/constant';
import {CRUD_ACTIONS} from '../../../utils/constant'
// import { toast } from 'react-toastify';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'; 
import 'react-markdown-editor-lite/lib/index.css';
// import {getDetailInfoDoctor} from '../../../services/useServices'
import {default as useServices} from '../../../services/useServices'


import Select from 'react-select';
 

import classNames from 'classnames/bind';
import styles from './TabelManageUsers.module.scss';
const cx = classNames.bind(styles);



// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

  


class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            contentMarkdown: '',
            contentHtml: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,



            listPrice: [], 
            listPayment: [], 
            listProvince: [], 
            listClinic: [], 
            listSpecialty: [], 
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecalty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specaltyId: ''
        }
    }


    // Hàm của thư viện markdown
    handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        this.setState({ 
            contentMarkdown:text,
            contentHtml: html
        })
    }

    // Hàm của thư viện react-select
    handleChange = async (selectedDoctor) => {

        let res = await useServices.getDetailInfoDoctor(selectedDoctor.value)

        let {listPrice,listPayment,listProvince,listSpecialty,listClinic} = this.state  // Dl danh Sach

        // console.log(listPrice,listPayment,listProvince)

  
        if(res.data.errCode === 0 && res.data.data.Markdown && res.data.data.Markdown.contentHtml !== null){
            let {provinceId,priceId,paymentId,specialtyId, clinicId} = res.data.data.Doctor_info



            listPrice = listPrice.find(item => {
                return item.value === priceId
            })
            listPayment = listPayment.find(item => {
                return item.value === paymentId
            })
            listProvince = listProvince.find(item => {
                return item.value === provinceId
            })
            listSpecialty = listSpecialty.find(item => {
                return item.value === specialtyId
            })
            listClinic = listClinic.find(item => {
                return item.value === clinicId
            })

            
            let markdown = res.data.data.Markdown
            let
                nameClinics = res.data.data.Doctor_info.nameClinic,
                addressClinics = res.data.data.Doctor_info.addressClinic,
                notes = res.data.data.Doctor_info.note 
              
            
            this.setState({
                selectedDoctor: selectedDoctor,
                id: selectedDoctor.value,
                contentHtml: markdown.contentHtml,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description === null ? '' : markdown.description,
                hasOldData: true,
                nameClinic: nameClinics ? nameClinics : '',
                addressClinic: addressClinics ? addressClinics : '',
                note: notes ? notes : '',
                selectedPrice : listPrice ? listPrice : '',
                selectedPayment: listPayment ? listPayment : '',
                selectedProvince:  listProvince ? listProvince : '',
                selectedSpecalty: listSpecialty ?listSpecialty : '',
                selectedClinic: listClinic ? listClinic : ''
            })
        }else{
            this.setState({
                selectedDoctor: selectedDoctor,
                id: selectedDoctor.value,
                contentHtml: '',
                contentMarkdown:'',
                description: '',
                hasOldData: false
            })
        }
    };

    handleChangeSelectDoctorInfo = async (selectedOptions, name)=> {
        let stateName = name.name
        console.log(selectedOptions, stateName)
        let stateCopy = {...this.state}

        stateCopy[stateName] = selectedOptions

        this.setState({
            ...stateCopy
        })
    }

    saveContentMarkDown = () => {

        let {
            id,
            hasOldData,
            contentMarkdown,
            contentHtml,
            selectedDoctor,
            description,
            listDoctors,
            listPrice, 
            listPayment, 
            listProvince, 
            selectedPrice,
            selectedPayment,
            selectedProvince,
            nameClinic,
            addressClinic,
            note,
            selectedClinic,
            selectedSpecalty
        } = this.state

        this.props.createDetailDoctor({
            id: id,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            contentMarkdown: contentMarkdown,
            description: description,
            contentHtml: contentHtml,

            nameClinic: nameClinic,
            addressClinic: addressClinic,
            note: note,
            selectedPayment: selectedPayment.value,
            selectedProvince: selectedProvince.value,
            selectedPrice: selectedPrice.value,
            clinicId: selectedClinic ? selectedClinic.value : '',
            specaltyId: selectedSpecalty ? selectedSpecalty.value : '',
        })

        console.log( {action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            id: id,
            contentMarkdown: contentMarkdown,
            description: description,
            contentHtml: contentHtml,

            nameClinic: nameClinic,
            addressClinic: addressClinic,
            note: note,
            selectedPayment: selectedPayment.value,
            selectedProvince: selectedProvince.value,
            selectedPrice: selectedPrice.value,
            clinicId: selectedClinic ? selectedClinic.value : '',
            specaltyId: selectedSpecalty ? selectedSpecalty.value : '',})

        this.setState({
            id: '',
            contentMarkdown: '',
            contentHtml: '',
            selectedDoctor: '',
            description: '',
            hasOldData: false,

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecalty:'',
            selectedClinic: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        })
    }

    handleOnchaneText = (value, name) => {
        let copyState = {...this.state}
        copyState[name] = value
        this.setState({
            ...copyState
        })
    }

    componentDidMount() {
        this.props.fetchAllDoctor()
        this.props.getRequiredDoctorInfo()
    }

    handleEditBuildData = (inputData) => {
            let {allDoctor} = this.props;
            if(!inputData) inputData = allDoctor

            let doctorsData = []

            // console.log(inputData)

            inputData.map((item, index) => {
                let data = {}
                if(item.name){
                    data.label = item.name
                    data.value = item.id
                    doctorsData.push(data)
                }else{
                    let valueVi = item.type ? item.type === 'PRICE' ? item.valueVi + " " + 'VNĐ' : item.valueVi : `${item.firstName} ${item.lastName}` 
                    let valueEn = item.type ? item.type === 'PRICE' ? item.valueEn + " " + 'USD' : item.valueEn : `${item.lastName} ${item.firstName}`
                    data.label = this.props.language === languages.EN ? valueEn : valueVi
                    data.value =  item.type ? item.keyMap  : item.id
                    doctorsData.push(data)
                }
            })
            return doctorsData
    }   

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctor !== this.props.allDoctor){
            let {allDoctor} = this.props;
            let dataSelect = this.handleEditBuildData(allDoctor)
            console.log()
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.language !== this.props.language){
            let {allDoctor} = this.props;
            let {resPayment,resPrice, resProvince} = this.props.allRequiredData
            let dataPayment = this.handleEditBuildData(resPayment)
            let dataPrice = this.handleEditBuildData(resPrice)
            let dataProvince = this.handleEditBuildData(resProvince)
            let dataSelect = this.handleEditBuildData(allDoctor)

            this.setState({
                listDoctors: dataSelect,
                listPrice:dataPrice,
                listPayment:dataPayment,
                listProvince:dataProvince
            })
        }

        if (prevProps.allRequiredData !== this.props.allRequiredData){
            let {resPayment,resPrice, resProvince, resSpecialty, resClinic} = this.props.allRequiredData
            
            let dataPayment = this.handleEditBuildData(resPayment)
            let dataPrice = this.handleEditBuildData(resPrice)
            let dataProvince = this.handleEditBuildData(resProvince)
            let dataSpecialty = this.handleEditBuildData(resSpecialty)
            let dataClinic = this.handleEditBuildData(resClinic)

        // console.log(dataSpecialty, resSpecialty)

            this.setState({
                listPrice:dataPrice,
                listPayment:dataPayment,
                listProvince:dataProvince,
                listSpecialty:dataSpecialty,
                listClinic: dataClinic

            })

            console.log(dataPayment,dataPrice,dataProvince)

        }
    }
   

    render() {
        const { 
            selectedDoctor, 
            hasOldData, 
            listDoctors ,
            listPrice,
            listPayment, 
            listProvince,
            selectedPrice,
            selectedPayment,
            selectedProvince,
            nameClinic,
            addressClinic,
            note,
            listSpecialty,
            selectedSpecalty,
            listClinic,
            selectedClinic
        } = this.state;

        // console.log(this.state)
       

           
    
        return (
            <div className={cx('markdown')}>
                <br></br>
                <h2>Tạo Thêm Thông Tin Doctor</h2>
                <br></br>
                <div className={cx('markdown-from')}>
                    <div>
                        <p>Thông Tin Giới Thiệu</p>
                        <textarea className={cx('markdown-from-textarea')} 
                            onChange={(e) => this.handleOnchaneText(e.target.value, 'description')}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>

                    <div style={{marginBottom: '12px'}}>
                        <p>Chọn Bác Sĩ</p>
                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChange}
                            options={listDoctors}
                            placeholder="Chọn bác sĩ..."
                        />
                    </div>
                </div> <br></br>

                <div className={cx('list-options')}>

                    <div className={cx('options')}>
                        <label className={cx('label')}>Chọn Giá</label>
                        <Select
                            value={selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={listPrice}
                            placeholder="Chọn giá..."
                            name='selectedPrice'
                        />
                    </div>


                    <div className={cx('options')}>
                        <label className={cx('label')}>Chọn Phương Thức Thanh Toán</label>
                        <Select
                            value={selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={listPayment}
                            placeholder="Chọn phương thức thanh toán..."
                            name='selectedPayment'
                        />
                    </div>


                    <div className={cx('options')}>
                        <label className={cx('label')}>Chọn Chuyên Khoa</label>
                        <Select
                            value={selectedSpecalty}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={listSpecialty}
                            placeholder="Chọn chuyên khoa..."
                            name='selectedSpecalty'
                        />
                    </div>


                    <div className={cx('options')}>
                        <label className={cx('label')}>Chọn Phòng Khám</label>
                        <Select
                            value={selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={listClinic}
                            placeholder="Chọn Phòng Khám..."
                            name='selectedClinic'
                        />
                    </div>


                    <div className={cx('options')}>
                        <label className={cx('label')}>Chọn Tỉnh Thành</label>
                        <Select
                            value={selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={listProvince}
                            placeholder="Chọn tỉnh thành..."
                            name='selectedProvince'
                        />
                    </div>
     
                    <div className={cx('options')}>
                        <label className={cx('label')}>Tên Phòng Khám</label>
                        <input type="text" className="form-control" 
                            value={nameClinic}
                            onChange={(e) => this.handleOnchaneText(e.target.value, 'nameClinic')}
                        />
                        
                         
                    </div>

                    <div className={cx('options')}>
                        <label className={cx('label')}>Địa Chỉ Phòng Khám</label>
                        <input type="text" className="form-control"
                            value={addressClinic}
                            onChange={(e) => this.handleOnchaneText(e.target.value, 'addressClinic')}
                        />
                        
                    </div>

                    <div className={cx('options')}>
                        <label className={cx('label')}>Lưu ý</label>
                        <input type="text" className="form-control"
                            value={note}
                            onChange={(e) => this.handleOnchaneText(e.target.value, 'note')}
                        />
                        
                    </div>



                </div>

                <br></br>

                <MdEditor
                    style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={this.handleEditorChange} 
                    value={this.state.contentMarkdown}
                />

















                <br></br>
                <button 
                    type="button" 
                    className={hasOldData === true ? 'btn btn-warning' : 'btn btn-primary'}
                    onClick={(e) => this.saveContentMarkDown()}>
                    {hasOldData === true ? 'Cập Nhật Thông Tin' : 'Thêm Thông Tin'}
              
                </button>

                <br></br>
                <br></br>
           
            </div>
        )
    }
}
           

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctor: state.admin.allDoctors,
        allRequiredData:  state.admin.allRequiredData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctorStart()),
        getRequiredDoctorInfo: () =>  dispatch(actions.getRequiredDoctorInfoStart()),
        createDetailDoctor: (data) =>  dispatch(actions.createDetailDoctorStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor)