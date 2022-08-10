

export const adminMenu = [
    { // quản lý người dùng
        name: 'menu.admin.manage-user',  
        menus: [
            {name: 'menu.admin.manage-doctor',       link: '/system/manage-doctor'},
            {  name: 'menu.admin.manage-admin',      link: '/system/user-admin'  },
            {  name: 'menu.admin.crud',              link: '/system/user-manage' },
            {  name: 'menu.admin.crud-redux',        link: '/system/user-redux' },
            // quản lý kế hoạch khám bệnh của Bác Sĩ Admin cung xem duoc 
            { name: 'menu.doctor.manage-schedule',   link:  '/doctor/manage-schedule'}
        ]
    },
    { // quản lý Phòng khám
        name: 'menu.admin.clinic',  
        menus: [
            {  name: 'menu.admin.manage-clinic',   link: '/system/manage-clinic'  }
        ]
    },
    { // quản lý Chuyên khoa
        name: 'menu.admin.specialty',  
        menus: [
            {  name: 'menu.admin.manage-specialty',   link: '/system/manage-specialty'  }
        ]
    },
    { // quản lý cẩm nang
        name: 'menu.admin.handbook',  
        menus: [
            {  name: 'menu.admin.manage-handbook',   link: '/system/manage-handbook'  }
        ]
    },
];



export const doctorMenu = [
    {   // Quan ly ke hoach kham benh cua bac si
        name: 'menu.admin.manage-user',
        menus: [
            {name: 'menu.doctor.manage-schedule',  link: '/doctor/manage-schedule'},
            {name: 'menu.doctor.manage-patient',  link: '/doctor/manage-patient'} 
        ]
    }
];