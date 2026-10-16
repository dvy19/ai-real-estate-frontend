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
    }
}

export default authService;