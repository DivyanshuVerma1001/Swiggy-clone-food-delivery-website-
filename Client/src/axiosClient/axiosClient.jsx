import axios from 'axios'
const axiosClient= axios.create({
    baseURL:"https://food-del-backend-cgd5.onrender.com",
    withCredentials:true,
    headers:{
        'Content-Type':'application/json'
    }
})


export default axiosClient