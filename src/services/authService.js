import api from "../api/axios";
import endpoints from "../api/endpoints";

const authService={

    register:async(req,res)=>{

        const data= await api.post(endpoints.REGISTER,req)
        return data.data
    },

    login:async(req,res)=>{

        const data=await api.post(endpoints.LOGIN,req)
        return data.data
    },


    getMyAppointments:async(req,res)=>{

        const data=await api.get(endpoints.GET_MY_APPOINTMENTS)
        return data.data
    }
}

export default authService;