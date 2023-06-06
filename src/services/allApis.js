import { BASE_URL } from "./base_url";
import { commonRequest } from "./commonRqst";

// register
export const empRegister = async (body,headers)=>{
    return  commonRequest("POST",`${BASE_URL}/employee/register`,body,headers)
}

// get all mployee
export const getuserapi = async(searchkey)=>{
  return  await commonRequest("GET",`${BASE_URL}/employee/get-all-employee-details?search=${searchkey}`,"")
}

// view profile
export const viewprofile = async(id)=>{
  return await commonRequest("GET",`${BASE_URL}/employee/view-profile/${id}`,"")
}

//  remove particular user
export const removeuser =  async(id)=>{
  return await commonRequest("DELETE",`${BASE_URL}/employee/delete-user/${id}`,{})
}

// edit user
export const UpdateUser = async(id,body,headers)=>{
  return  commonRequest("PUT",`${BASE_URL}/employee/update/${id}`,body,headers)
}