
import api from '../api/axios'
import endpoints from '../api/endpoints'


const plotService={

    createPlot:async(formData)=>{

        const data=new FormData()

        formData.append("title", title);
        formData.append("description", description);
        formData.append("plotType", plotType);

        formData.append("area", JSON.stringify(area));
        formData.append("price", price);
        formData.append("location", JSON.stringify(location));
        formData.append("dimensions", JSON.stringify(dimensions));

        formData.append("facing", facing);
        formData.append("roadWidth", roadWidth);
        formData.append("amenities", JSON.stringify(amenities));

        formData.append("legalStatus", legalStatus);
        formData.append("ownershipType", ownershipType);

        
        if(formData.image){
            console.log(formData.image)
            data.append("image",formData.image)
        }


        const plot=await api.post(endpoints.CREATE_PLOT,data , {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        } )

        return plot.data
    },

    getAllPlots:async()=>{

        const data=await api.get(endpoints.GET_ALL_PLOTS)

        return data.data
    },

    getSinglePlot:async(id)=>{

        const data=await api.get(`${endpoints.GET_SINGLE_PLOTS(id)}`)

        return data.data
    }


}

/*
createCentre:async(formData)=>{

        const data=new FormData();


        data.append("city" , formData.city),
        data.append("contact" , formData.contact),
        data.append("owner", formData.owner),
        data.append("pinCode" , formData.pinCode),
        data.append("address" , formData.address);

        data.append("material" , formData.material);


        
        if(formData.profile){
            console.log(formData.profile)
            data.append("image",formData.profile)
        }

        data.append(
            'coordinates',
            JSON.stringify(formData.coordinates)
        );


        const centre=await api.post(endpoints.CREATE_CENTRE , data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return centre.data
    },
    */

    export default plotService