
const endpoints={

    REGISTER:"user/register",
    LOGIN:"user/login",

    CREATE_PLOT:'plot/create-plot',

    GET_ALL_PLOTS:'plot/get-all-plots',
    
    GET_SINGLE_PLOTS:(id)=>`plot/get-single-plot/${id}`,

    CREATE_HOUSE:'house/create-house',
    GET_ALL_HOUSES:'house/get-all-houses',
    GET_SINGLE_HOUSE:(id)=>`house/get-single-house/${id}`,

    CREATE_BROKER:'broker/create-broker',
    GET_ALL_BROKERS:'broker/get-all-brokers',
    GET_SINGLE_BROKERS:(id)=>`broker/get-single-broker/${id}`,


    BROKER_CHAT_CREATE:'chat/create-chat',


    BROKER_AVAILABILITY:'broker/broker-availability',

    GET_BROKER_AVAILABLE:(id)=>`broker/get-broker-schedule/${id}`,


    RAG_SEND:"ml/rag-chat",
    RAG_HISTORY:'ml/rag-history',

    BROKER_APPOINTMENT:"broker/create-appointment",

    GET_MY_BROKER_PROF:"broker/get-my-broker-profile",

    GET_MY_BROKER_APPOINT:"broker/get-self-broker-appointment"

}

export default endpoints