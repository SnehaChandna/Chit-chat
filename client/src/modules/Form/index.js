import { useState } from "react"
import Button from "../../components/Buttons"
import Input from "../../components/input"
import { useNavigate } from "react-router-dom"

const Form=(
    {isSignInPage}
)=>{
    const [data,setData] = useState({
            ...(!isSignInPage && 
                {
                    fullName:'',
                }
            ),
            email:'',
            password:''
    });
    const navigate=useNavigate()
<<<<<<< HEAD
=======
    const handleSubmit = async(e)=>{
        // console.log(`data :>>>`,data);
        e.preventDefault();
        const res= await fetch(`http://localhost:8000/api/${isSignInPage? 'login':'register'}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        if(res.status===400){
            alert('Invalid Credentials')
        }else{
            const resData= await res.json();
            if(resData.token){
                localStorage.setItem('user:token',resData.token)
                localStorage.setItem('user:detail',JSON.stringify(resData.user))
                navigate('/')
            }
        }
    }
>>>>>>> e6032e2f (backend integrated)
    return(
        <div className=" h-screen flex items-center justify-center">
        <div className="bg-[#a6d3f7] w-[500px] sm:w-[450px] h-[500px] shadow-lg rounded-lg flex flex-col justify-center items-center p-10">
            <div className=" text-4xl font-extrabold">Welcome {isSignInPage && 'Back'}</div>
            <div className=" text-xl font-light mb-14">{isSignInPage? 'Sign In':'Sign Up!'}</div>
<<<<<<< HEAD
            <form className=" flex flex-col items-center w-full" onSubmit={()=> console.log("Submitted")}>
=======
            <form className=" flex flex-col items-center w-full" onSubmit={(e)=> handleSubmit(e)}>
>>>>>>> e6032e2f (backend integrated)
            {!isSignInPage && < Input label="Full name" name="name" placeholder="Enter your full name" className="mb-6 w-[70%]" value={data.fullName} onChange={(e)=> setData({...data, fullName:e.target.value})} />}
            < Input label="Email-id" name="email" type="email" placeholder="Enter your email-id" className="mb-6 w-[70%]" value={data.email} onChange={(e)=> setData({...data, email:e.target.value})}/>
            < Input label="Password" type="password" name="password" placeholder="Enter your password" className="mb-10 w-[70%]" value={data.password} onChange={(e)=> setData({...data, password:e.target.value})}/>

            <Button label={isSignInPage? 'Sign In':'Sign Up!'} type='submit' className="w-1/2 mb-4"/>
            </form>

            <div >{isSignInPage? 'Create an account':'Already have an account?'} <span className="cursor-pointer underline" onClick={()=>navigate(`/users/${isSignInPage? 'sign_up':'sign_in'}`)}>{isSignInPage? 'Sign Up!':'Sign In'}</span></div>
        </div>
        </div>
    )
}
export default Form