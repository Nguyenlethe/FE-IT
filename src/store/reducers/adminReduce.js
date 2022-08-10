import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roleId: [],
    position: [],
    isLoadingGender: false,
    users: [],
    topDoctors: [],   
    allDoctors: [],
    allScheduleTime: [],
    allRequiredData: [],
   
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:  
            state.isLoadingGender = true;
            return {
                ...state
            }
  

        case actionTypes.FETCH_GENDER_SUSCESS:  
            // state là data của redux ,  action là dữ liệu trả về của Action
            state.genders = action.data
            // console.log("reduce",action.data)
            state.isLoadingGender = false;
            return {
                ...state
            }


        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = []
            state.isLoadingGender = false;
            return {
                ...state
            }


        case actionTypes.FETCH_POSITION_SUSCESS:  
            state.position = action.data
            state.isLoadingGender = false;
            // console.log("reduce2",action.data)
            return {
                ...state
            }


        case actionTypes.FETCH_POSITION_FAILED:
            state.position = []
            state.isLoadingGender = false;
            return {
                ...state
            }




        case actionTypes.FETCH_ROLE_SUSCESS:  
            //  console.log("reduce3",action.data)
            state.roleId = action.data
            state.isLoadingGender = false;
            return {
                ...state
            }


        case actionTypes.FETCH_ROLE_FAILED:
            state.roleId = []
            state.isLoadingGender = false;
            return {
                ...state
            }



            



        case actionTypes.FETCH_ALL_USER_SUSCESS:  
            state.users = action.data
            state.isLoadingGender = false;
            // console.log("Get All Users :",action.data)
            return {
                ...state
            }


        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = []
            state.isLoadingGender = false;
            return {
                ...state
            }




        case actionTypes.FETCH_TOP_DOCTOR_SUSCESS:  
            state.topDoctors = action.dataDoctor
            state.isLoadingGender = false;
            // console.log(action.dataDoctor)
            // console.log("Get All Users :",action.data)
            return {
                ...state
            }


        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctors = []
            state.isLoadingGender = false;
            return {
                ...state
            }


   
        case actionTypes.FETCH_All_DOCTOR_SUSCESS:  
            state.allDoctors = action.allDoctor
            state.isLoadingGender = false;
            // console.log(action.allDoctor)
            return {
                ...state
            }


        case actionTypes.FETCH_All_DOCTOR_FAILED:
            state.allDoctors = []
            state.isLoadingGender = false;
            return {  
                ...state
            }



            
    case actionTypes.FETCH_AllCODE_SCHEDULE_TIMES_SUSCESS:  
        state.allScheduleTime = action.allScheduleTime
        state.isLoadingGender = false;
        // console.log(action.allScheduleTime)
        return {
            ...state
        }


    case actionTypes.FETCH_AllCODE_SCHEDULE_TIMES_FAILED:
        state.allScheduleTime = []
        state.isLoadingGender = false;
        return {  
            ...state
        }





    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUSCESS:  
        state.allRequiredData = action.data
        state.isLoadingGender = false;
        // console.log(state.allRequiredData)
        return {
            ...state
        }


    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
        state.allScheduleTime = []
        state.isLoadingGender = false;
        return {  
            ...state
        }






        default:
            return state;
    }
}

export default adminReducer;