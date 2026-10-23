import api from "../api/axios"
import endpoints from "../api/endpoints"
const chatService = {

  createChat: async (id) => {
    const response = await api.post(
      endpoints.BROKER_CHAT_CREATE,
      { brokerId :id }
    );

    return response.data;
  },
};

export default chatService;