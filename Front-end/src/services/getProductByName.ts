import axios from "axios"

const getProductsByName = async (name: string, color: boolean) => {
    try {
        let response
        if (color) {
             response = await axios.get(`http://localhost:2000/api/product/getProductsByName?name=${name}&color=${color}`)
        }else{
            response = await axios.get(`http://localhost:2000/api/product/getProductsByName?name=${name}`)
        }
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export default getProductsByName