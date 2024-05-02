import axios from 'axios'

const BASE_URL ="https://127.0.0.1:3000"

const Api=axios.create({baseURL:BASE_URL,withCredentials:true})

Api.interceptors.response.use((response)=>{
    return response
},(error) =>{
    if(error.response){
        const {data}=error.response
        console.log('axios',data.message)
    }else{
        console.log(error)
    }

    return Promise.reject(error)
})