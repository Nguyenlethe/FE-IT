/* eslint-disable import/no-anonymous-default-export */

import axios from "../axios";

function handleLogin(email, password) {
  return axios.post("/api/login", { email, password });
  // return axios({  // SD thư viện axios Giống cách trên
  //   method: 'post',
  //   url: 'http://localhost:8080/api/login',
  //   data: {email, password }
  // });
}

function getAllUsers(inputId) {
  return axios.get(`/api/get-all-users?id=${inputId}`, { id: inputId });
}
 
// truyền data them user
function createNewUser(data) {
  return axios.post(`/api/create-new-user`, data);
}

// Xóa user
function deleteUser(data) {
  return axios.delete("/api/delete-user", {
    data: {
      id: data.id,
    },
  });
}

// edit user
function editUser(data) {
  return axios.put("/api/edit-user",data);
}


// edit user
function getAllCode(inputType) {
  return axios.get(`/api/allcode?type=${inputType}`);
}
 
// Lấy ra all thông tin 10 bs
function getTopDocterHome(limit) {
  return axios.get(`/api/top-docter-home?limit=${limit}`);
}

function getAllDoctors() {
  return axios.get(`/api/get-all-doctors`);
}
 

function createDetailDoctor(data) {
  return axios.post(`/api/save-infor-doctors`,data);
}


function getDetailInfoDoctor(id) {
  return axios.get(`/api/detail-docter-by-id?id=${id}`);
}


function saveBuilkScheduleDoctor(data) {
  return axios.post(`/api/bulk-create-schedule`, data);
}

// /api/get-schedule-doctor-by-date
function getSheduleDoctorByDate(doctorId, date) {
  return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}



// /api/get-schedule-doctor-by-date
function getExtraInfoDoctorById(doctorId) {
  return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
}



// /api/get-schedule-doctor-by-date
function getProfileDoctorById(doctorId) {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}



// /api/get-schedule-doctor-by-date
function postBookAppointment(data) {
  return axios.post('/api/patient-book-appointment',data);
}



// /api/get-schedule-doctor-by-date
function postVerifyBookAppointment(data) {
  return axios.post('/api/verify-book-appointment',data);
}



// /api/get-schedule-doctor-by-date
function createSpecialty(data) {
  return axios.post('/api/create-new-specialty',data);
}




// /api/get-schedule-doctor-by-date
function getAllSpecialty(data) {
  return axios.get('api/get-specialty',data);
}

// /api/get-schedule-doctor-by-date
function getAllDetailSpecialtyById(data) {
  return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}




function createClinic(data) {
  return axios.post('/api/create-new-clinic',data);
}




// /api/get-schedule-doctor-by-date
function getAllClinic() {
  return axios.get('api/get-clinic');
}

// /api/get-schedule-doctor-by-date
function getAllDetailClinicById(data) {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
}


// /api/get-schedule-doctor-by-date
function getAllPatientForDoctor(data) {
  return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}


// /api/get-schedule-doctor-by-date
function sendReamedy(data) {
  return axios.post(`/api/send-remedy`,data);
}



export default {
  sendReamedy,
  getAllPatientForDoctor,
  getAllDetailClinicById,
  getAllClinic,
  createClinic,
  getAllDetailSpecialtyById,
  getAllSpecialty,
  createSpecialty,
  postVerifyBookAppointment,
  postBookAppointment,
  getExtraInfoDoctorById,
  getSheduleDoctorByDate,
  handleLogin, 
  getAllUsers, 
  createNewUser, 
  deleteUser ,
  editUser,
  getAllCode,
  getTopDocterHome,
  getAllDoctors,
  createDetailDoctor,
  getDetailInfoDoctor,
  saveBuilkScheduleDoctor,
  getProfileDoctorById
};
