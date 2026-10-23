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

    getBrokers:async()=>{

        const data=await api.get(endpoints.GET_ALL_BROKERS)

        return data.data
    },

    getSingleBroker:async(id)=>{

        const broker=await api.get(`${endpoints.GET_SINGLE_BROKERS(id)}`)

        return broker.data
    }
}

export default brokerService