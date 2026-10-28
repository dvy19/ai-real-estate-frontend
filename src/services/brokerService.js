import api from "../api/axios"
import endpoints from "../api/endpoints"

const brokerService={

    createBroker:async(formData)=>{

        const data=new FormData()

        data.append("name",formData.name)
        data.append("phone",formData.phone)
        data.append("city",formData.city),
        data.append("office", formData.office)
        data.append("isVerified", formData.isVerified)
        data.append("rating" ,formData.rating)

        data.append("propertyTypes" , JSON.stringify(formData.propertyTypes))

        if(formData.image)(
            data.append("image", formData.image)
        )

        const broker=await api.post(endpoints.CREATE_BROKER,data,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return broker.data


    },

    getBrokers:async(pageNumber)=>{

        const data=await api.get(endpoints.GET_ALL_BROKERS , {

            params:{
                page: pageNumber,
                limit: 3
            }
        })

        return data.data
    },

    getSingleBroker:async(id)=>{

        const broker=await api.get(`${endpoints.GET_SINGLE_BROKERS(id)}`)

        return broker.data
    },

    brokerAvailable:async(schedule)=>{

        const data=await api.post(endpoints.BROKER_AVAILABILITY, {schedule})

        return data.data
    },

    getBrokerSchedule:async(id)=>{

        const data=await api.get(`${endpoints.GET_BROKER_AVAILABLE(id)}`)

        return data.data
    },

    brokerAppointment:async(req,res)=>{

        const data=await api.post(endpoints.BROKER_APPOINTMENT , req)

        return data.data
    },

    getSelfProfile:async()=>{
        const data=await api.get(endpoints.GET_MY_BROKER_PROF)
        return data.data
    },

    getSelfBrokerAppointment:async()=>{

        const data=await api.get(endpoints.GET_MY_BROKER_APPOINT)

        return data.data



    }
    
}

export default brokerService