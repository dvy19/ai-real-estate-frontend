import endpoints from "../api/endpoints"
import api from "../api/axios"

const houseService={


    createHouse:async(formData)=>{

        const data=new FormData()

        data.append("title",title)
        data.append("description", description)

        data.append("listingType", listingType)

        data.append("propertyType" , propertyType)

        data.append("price", price)

        data.append("city", city)
        data.append("locality", locality)
        data.append("address", address)
        data.append("pincode", pincode)

        data.append("bedrooms", bedrooms)
        data.append("bathrooms", bathrooms)
        data.append("balconies", balconies)
        data.append("floors", floors)

        data.append("builtUpArea",builtUpArea)
        data.append("carpetArea",carpetArea)
        data.append("plotArea",plotArea)

        data.append("furnishing",furnishing)


        data.append("constructionYear",constructionYear)
        data.append("facing",facing)

        data.append("amenities",JSON.stringify(amenities))
        

        if(formData.image){
            console.log(image)
            data.append("image" , image)

        }

        const house=await api.post(endpoints.CREATE_HOUSE,data,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return house.data
    },

    getAllHouses:async()=>{

        const data=await api.get(endpoints.GET_ALL_HOUSES)

        return data.data

    },

    getSingleHouse:async(id)=>{

        const house=await api.get(`${endpoints.GET_SINGLE_HOUSE(id)}`)

        return house.data
    }
}

export default houseService