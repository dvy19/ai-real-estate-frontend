
import api from '../api/axios'
import endpoints from '../api/endpoints'


const plotService={

    createPlot:async(formData)=>{

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("plotType", formData.plotType);
    data.append("status", formData.status);

    data.append("area", JSON.stringify(formData.area));
    data.append("price", formData.price);
    data.append("pricePerSqFt", formData.pricePerSqFt);

    data.append("location", JSON.stringify(formData.location));
    data.append("dimensions", JSON.stringify(formData.dimensions));

    data.append("facing", formData.facing);
    data.append("roadWidth", formData.roadWidth);
    data.append("amenities", JSON.stringify(formData.amenities || []));
    data.append("legalStatus", formData.legalStatus);
    data.append("ownershipType", formData.ownershipType);

    if (formData.image instanceof File) {
        data.append("image", formData.image);
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