import toast from "react-hot-toast"


const Notify=(type,message)=>{
    toast[type](message,{
        position:'bottom-center',
        duration:4000
    })
}
export default Notify
