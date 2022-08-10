


import React, { Component } from 'react';
import { connect } from "react-redux";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'; 
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from 'react-toastify';

import getBase64 from '../../../utils/CommonUtils';
import {default as useServices} from '../../../services/useServices'

import classNames from 'classnames/bind';
import styles from './ManageSpecialty.module.scss';
const cx = classNames.bind(styles);


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
           name: '',
           imageBase64: '',
           descriptionHtml: '',
           descriptionMarkdown: ''
        }
    }

    // Hàm của thư viện markdown
    handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        this.setState({ 
            descriptionMarkdown:text,
            descriptionHtml: html
        })
    }



    componentDidMount = async ()=>  {
      
    }


    componentDidUpdate= async(prevProps, prevState)=> {
        if(prevProps.language !== this.props.language){

        }
    }



    handleOnchaneInput = (value, name) => {
        let copyState = {...this.state}
        copyState[name] = value.target.value
        this.setState({...copyState})
    }




    handleOnchaneImage = async (e) => {
        let file = e.target.files[0]
        if(file){
            let base64 = await getBase64(file)
            file.src = URL.createObjectURL(file) 
            this.setState({     
                imageBase64: base64
            })
        }
    }


    handleSevaSpecialty = async (e) => {
        e.preventDefault()
        let data = this.state
        let res = await useServices.createSpecialty(data)
        console.log(res)

        if(res && res.data.errCode === 0){
            toast.success('Add new Specialty successful !!!')
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHtml: '',
                descriptionMarkdown: ''
            })
        }else {
            toast.warning('Add new Specialty failed !!!')
        }
    }

      
    render() {

        let {name} = this.state
        
        return (
            <>
                <div className={cx('content')}>
                    <div className={cx('content-item')}>
                        <h3>Quan Ly Chuyen Khoa</h3>
                        <br/>
                        
                        <div className={cx('item')}>
                            <br />  
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <div>Ten chuyen khoa</div>
                                    <input type="text" value={name} name="name" className="form-control input"
                                        onChange={(e) => this.handleOnchaneInput(e, e.target.name)}
                                    />
                                </div>

                                <div className="form-group col-md-6">
                                    <div>Anh chuyen khoa</div>
                                    <input type="file" name="file"className={cx('form-control')}
                                        onChange={(e) => this.handleOnchaneImage(e)}
                                    />
                                </div>
                            </div>

                        <br />
                        </div>


                        <MdEditor
                            style={{ height: '500px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} 
                            value={this.state.descriptionMarkdown}
                        />
                        <br />

                        <button className="btn btn-primary" onClick={(e) => this.handleSevaSpecialty(e)}>Add New</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
