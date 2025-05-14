import axios from "axios"

// export const  baseURLTest= 'https://road.medical-clinic.serv00.net'


// export const  baseURLTest= 'https://syrback.le.sy'
export const  baseURLTest= 'https://tech.medical-clinic.serv00.net'


// const baseURL = axios.create({baseURL:"http://192.168.1.33:8000"}) // local 
// const baseURL = axios.create({baseURL:"https://tech.medical-clinic.serv00.net"})  // jamal server

const baseURL = axios.create({baseURL:`${baseURLTest}`})  


export default baseURL
