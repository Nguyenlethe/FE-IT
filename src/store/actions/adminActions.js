import actionTypes from './actionTypes';
import { default as useServices} from '../../services/useServices'
import { toast } from 'react-toastify';



export const fetchGenderStart = (inputGender) => {
    // console.log(inputGender)
    return async (dispatch, getState) => {
        try{
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let response = await useServices.getAllCode(inputGender)
            if(response && response.data.errCode === 0){
                dispatch(fetchGenderSuscess(response.data.data))
                // console.log('action',response.data.data)
            }else{
                dispatch(fetchGenderFailed())
            }
        }catch(err) {
            console.log("fetchGenderStart"+ err)
            dispatch(fetchGenderFailed())
        }
    }
}

export const fetchGenderSuscess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUSCESS,
    data: genderData
})

export const fetchGenderFailed= () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})











export const fetchPositionStart = (inputPosition) => {
    // console.log(inputPosition)
    return async (dispatch, getState) => {
        try{
            let response = await useServices.getAllCode(inputPosition)
            if(response && response.data.errCode === 0){
                dispatch(fetchPositionSuscess(response.data.data))
                // console.log('action2',response.data.data)
            }else{
                dispatch(fetchPositionFailed())
            }
        }catch(err) {
            console.log("fetchPositionStart"+ err)
            dispatch(fetchPositionFailed())
        }
    }
}

export const fetchPositionSuscess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUSCESS,
    data: positionData
})

export const fetchPositionFailed= () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})










export const fetchRoleStart = (inputRole) => {
    // console.log(inputRole)
    return async (dispatch, getState) => {
        try{
            let response = await useServices.getAllCode(inputRole)
            if(response && response.data.errCode === 0){
                dispatch(fetchRoleSuscess(response.data.data))
                // console.log('action3',response.data.data)
            }else{
                dispatch(fetchRoleFailed())
            }
        }catch(err) {
            console.log("fetchRoleStart"+ err)
            dispatch(fetchRoleFailed())
        }
    }
}

export const fetchRoleSuscess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUSCESS,
    data: roleData
})

export const fetchRoleFailed= () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})






export const createNewUser = (data) => {
    // console.log(data)
    return async (dispatch, getState) => {
        try{
            let response = await useServices.createNewUser(data)
            // console.log(response)
            if(response && response.data.errCode === 0){
                dispatch(createNewUserSuscess())
            }else{
                dispatch(createNewUserFailed())
            }
        }catch(err) {
            // console.log("createNewUser"+ err)
            dispatch(createNewUserFailed())
        }
    }
}

export const createNewUserSuscess = () => ({
    type: actionTypes.CREATE_USER_SUSCESS,
})

export const createNewUserFailed= () => ({
    type: actionTypes.CREATE_USER_FAILED
})











export const fetchAllUserStart = (data) => {
    // console.log(data)
    return async (dispatch, getState) => {
        try{
            let response = await useServices.getAllUsers(data)
            if(response && response.data.errCode === 0){
                dispatch(fetchAllUserSuscess(response.data.users))
                // console.log(response.data.users)
            }else{
                dispatch(fetchAllUserFailed())
            }
        }catch(err) {
            // console.log("fetchAllUserStart"+ err)
            dispatch(fetchAllUserFailed())
        }
    }
}

export const fetchAllUserSuscess = (users) => ({
    type: actionTypes.FETCH_ALL_USER_SUSCESS,
    data: users
})

export const fetchAllUserFailed= () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})









//    DELETE_USER_SUSCESS
//    DELETE_USER_FAILED


export const deleteUserStart = (data) => {
    console.log(data)
    return async (dispatch, getState) => {
        try{
            let response = await useServices.deleteUser(data);
            // console.log(response)
            if(response && response.data.errCode === 0){
                dispatch(deleteUserSuscess())

            }else{
                dispatch(fetchAllUserFailed())
            }
        }catch(err) {
            console.log("deleteUser"+ err)
            dispatch(deleteUserFailed())
        }
    }
}

export const deleteUserSuscess = () => ({
    type: actionTypes.DELETE_USER_SUSCESS,
})

export const deleteUserFailed= () => ({
    type: actionTypes.DELETE_USER_FAILED,
})





// EDIT_USER_SUSCESS: 'EDIT_USER_SUSCESS:',
// EDIT_USER_FAILED: 'EDIT_USER_FAILED',

export const editUserStart = (data) => {
    console.log(data)
    return async (dispatch, getState) => {
        try{
            let response = await useServices.editUser(data);
            // console.log(response)
            if(response && response.data.errCode === 0){
                dispatch(editUserSuscess())
            }else{
                dispatch(editUserFailed())
            }
        }catch(err) {
            console.log("editUser"+ err)
            dispatch(editUserFailed())
        }
    }
}

export const editUserSuscess = () => ({
    type: actionTypes.EDIT_USER_SUSCESS
})

export const editUserFailed= () => ({
    type: actionTypes.EDIT_USER_FAILED,
})












// GET_TOP_DOCTOR_SUSCESS: 'GET_TOP_DOCTOR_SUSCESS: ',
// GET_TOP_DOCTOR_FAILED: 'GET_TOP_DOCTOR_FAILED',


export const fetchTopDoctorStart = (limit) => {
    return async (dispatch, getState) => {
        try{
            let response = await useServices.getTopDocterHome(+limit);
            // console.log(response)
            if(response && response.data.errCode === 0){
                // console.log(response.data.data)
                dispatch(fetchTopDoctorSuscess(response.data.data))
            }else{
                dispatch(fetchTopDoctorFailed())
            }
        }catch(err) {
            console.log("fetchTopDoctor"+ err)
            dispatch(fetchTopDoctorFailed())
        }
    }
}

export const fetchTopDoctorSuscess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUSCESS,
    dataDoctor: data
})

export const fetchTopDoctorFailed= () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
})




















export const fetchAllDoctorStart = () => {
    return async (dispatch, getState) => {
        try{
            let response = await useServices.getAllDoctors();
            // console.log("Get All Doctor :",response)
            if(response && response.data.errCode === 0){
                dispatch(fetchAllDoctorSuscess(response.data.data))
            }else{
                dispatch(fetchAllDoctorFailed())
            }
        }catch(err) {
            console.log("fetchAllDoctor"+ err)
            dispatch(fetchAllDoctorFailed())
        }
    }
}

export const fetchAllDoctorSuscess = (data) => ({
    type: actionTypes.FETCH_All_DOCTOR_SUSCESS,
    allDoctor: data
})

export const fetchAllDoctorFailed = () => ({
    type: actionTypes.FETCH_All_DOCTOR_FAILED,
})







// CREATE_DETAIL_DOCTOR_SUSCESS
// CREATE_DETAIL_DOCTOR_FAILED



export const createDetailDoctorStart = (data) => {
    return async (dispatch, getState) => {
        try{
            let response = await useServices.createDetailDoctor(data);
            console.log("create Detail Doctor :",response)
            if(response && response.data.errCode === 0){
                toast.success("Success !!!")
                dispatch(createDetailDoctorSuscess())
            }else{
                toast.error("Failed !!!")
                dispatch(createDetailDoctorFailed())
            }
        }catch(err) {
            console.log("createDetailDoctor"+ err)
            dispatch(createDetailDoctorFailed())
        }
    }
}

export const createDetailDoctorSuscess = () => ({
    type: actionTypes.CREATE_DETAIL_DOCTOR_SUSCESS,
})

export const createDetailDoctorFailed = () => ({
    type: actionTypes.CREATE_DETAIL_DOCTOR_FAILED,
})









// FETCH_AllCODE_SCHEDULE_TIMES_SUSCESS
// FETCH_AllCODE_SCHEDULE_TIMES_FAILED


export const fetchAllCodeSheduleStart = (type) => {
    return async (dispatch, getState) => {
        try{
            let response = await useServices.getAllCode(type);
            // console.log("Get All Time :",response)
            if(response && response.data.errCode === 0){
                dispatch(fetchAllCodeSheduleSuscess(response.data.data))
            }else{
                dispatch(fetchAllCodeSheduleFailed())
            }
        }catch(err) {
            console.log("fetchAllCodeShedule"+ err)
            dispatch(fetchAllCodeSheduleFailed())
        }
    }
}

export const fetchAllCodeSheduleSuscess = (data) => ({
    type: actionTypes.FETCH_AllCODE_SCHEDULE_TIMES_SUSCESS,
    allScheduleTime: data
})

export const fetchAllCodeSheduleFailed = () => ({
    type: actionTypes.FETCH_AllCODE_SCHEDULE_TIMES_FAILED,
})
















// export const fetchDoctorPrince = (inputGender) => {
//     // console.log(inputGender)
//     return async (dispatch, getState) => {
//         try{
//             dispatch({
//                 type: actionTypes.FETCH_DOCTOR_PRICE_START
//             })
//             let response = await useServices.getAllCode(inputGender)
//             if(response && response.data.errCode === 0){
//                 dispatch(fetchGenderSuscess(response.data.data))
//                 // console.log('action',response.data.data)
//             }else{
//                 dispatch(fetchGenderFailed())
//             }
//         }catch(err) {
//             console.log("fetchDoctorPrince"+ err)
//             dispatch(fetchGenderFailed())
//         }
//     }
// }

// export const fetchDoctorSuscess = (genderData) => ({
//     type: actionTypes.FETCH_DOCTOR_PRICE_SUSCESS,
//     data: genderData
// })

// export const fetchDoctorFailed= () => ({
//     type: actionTypes.FETCH_DOCTOR_PRICE_FAILED
// })












export const getRequiredDoctorInfoStart = () => {
    return async (dispatch, getState) => {
        try{
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START
            })
            let resPrice = await useServices.getAllCode("PRICE")
            let resPayment = await useServices.getAllCode("PAYMENT")
            let resProvince = await useServices.getAllCode("PROVINCE")
            let resSpecialty = await useServices.getAllSpecialty()
            let resClinic = await useServices.getAllClinic()


            
            if(resPrice && resPrice.data.errCode === 0 &&
                resPayment && resPayment.data.errCode === 0 &&
                resProvince && resProvince.data.errCode === 0 &&
                resSpecialty && resSpecialty.data.errCode === 0 &&
                resClinic && resClinic.data.errCode === 0
                ){
                    let data =  {
                        resPrice: resPrice.data.data,
                        resPayment: resPayment.data.data,
                        resProvince: resProvince.data.data,
                        resSpecialty: resSpecialty.data.data,
                        resClinic: resClinic.data.data
                        
                    }
                   
                dispatch(getRequiredDoctorInfoSuscess(data))
            }else{
                dispatch(getRequiredDoctorInfoFailed())
            }
        }catch(err) {
            console.log("Get not Found :"+ err)
            dispatch(getRequiredDoctorInfoFailed())
        }
    }
}

export const getRequiredDoctorInfoSuscess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUSCESS,
    data: allRequiredData
})

export const getRequiredDoctorInfoFailed= () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
})

















