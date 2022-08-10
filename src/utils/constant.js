export const path = {
    HOME: '/',
    HOMEPAGE: '/home',
    DETAIL_DOCTOR: '/detail-doctor/:id',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system',
    SCHEDULE_DOCTOR: '/doctor/',
    VERIFY_EMAIL_BOOKING: '/verify-booking',
    DETAIL_SPECIALTY:'/detail-specialty/:id',
    DETAIL_CLINIC:'/detail-clinic/:id',
};  


export const languages = {
    VI: 'vi',
    EN: 'en'
};
 
export const CRUD_ACTIONS = {
    CREATE: "CREATE",
    EDIT: "EDIT",
    DELETE: "DELETE",
    READ: "READ"
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
}

export const USER_ROLE = {
    ADMIN: "R1",
    DOCTOR: "R2",
    PATIENT: "R3"
};


export const formatDate = (date) => {  // Không dùng kiểu này 
    console.log(date)
    let formatDate = new Date(date)
    let year = formatDate.getFullYear()
    let month = formatDate.getMonth() + 1
    let day = formatDate.getDate()
    return `${day}/${month}/${year}`
}


// Truyền vào time = timeTeam được lưu ở ĐB và giải mã đó ra lấy thứ ngày tháng năm
// let date = moment.unix(new Date(+time / 1000).format('dddd - DD/MM/YYYY'))
// let date = moment.unix(new Date(+time / 1000).locale('en').format('dddd - DD/MM/YYYY'))