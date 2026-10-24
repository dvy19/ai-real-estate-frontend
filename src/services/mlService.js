
import api from '../api/axios'
import endpoints from '../api/endpoints'

const mlService={

    sendRag:async(question)=>{

        const data=await api.post(endpoints.RAG_SEND , {question})

        return data.data

    },


    getRagHistory:async()=>{

        const data=await api.get(endpoints.RAG_HISTORY)

        return data.data
    }
}

export default mlService