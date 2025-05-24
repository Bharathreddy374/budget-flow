import { API_PATHS } from '../../utils/apiPath';
import React,{useState,useContext} from 'react'
import { validateEmail } from '../../utils/helper';
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';
import axiosInstance from '../../utils/axiosInstance';
import ProfilePicSelector from '../../components/inputs/ProfilePicSelector';
const SignUp = () => {
  const [profilepic,setprofilepic]=useState(null);
  const [fullname,setfullname]=useState("");
  const [email,setemail]= useState("");
  const [pass,setpass]=useState("");
  const [cpass,setcpass]=useState("");
  const [err,seterr]=useState(null);
  const {updateUser} = useContext(UserContext);
 
  const navigate = useNavigate();
  const handleSignUp = async(e)=>{
    e.preventDefault();
    let profileImageUrl="";
    if (!validateEmail(email)){
      seterr("Please enter a valid email address.");
      return;
    }
    if(!pass){
      seterr("Please enter the password");
      return;
    }
    if(!fullname){
      seterr("please enter your good name");
      return;
    }
    if(pass!==cpass){
      seterr("Confirm password doesn't match");
      return;
    }
    seterr("");

    //Singup API Call
     try{

      if(profilepic){
        const imgUploadRes = await uploadImage(profilepic);
        profileImageUrl=imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullname,
        email,
        pass,
        profileImageUrl,
      });
      const {token,user}=response.data;
      if(token){
        localStorage.setItem("token",token);
        updateUser(user);
        navigate("/dashboard");
      }
    }catch(error){
      if(error.response && error.response.data.message){
        seterr(error.response.data.message);
      }else{
        seterr("Something went wrong. Please try again.");
      }
    }

  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome To ExpenseTracker</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to SignUp
        </p>

      <form onSubmit={handleSignUp}>
        <ProfilePicSelector image={profilepic} setimage={setprofilepic}/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">

          <Input value={fullname}
          onChange={({target})=>setfullname(target.value)}
          label="FullName"
          placeholder="Jhon Ronnie"
          type="text"
          />
          </div>
                  <div className="col-span-2">

        <Input value={email} 
        onChange={({target})=>setemail(target.value)}
        label="Email Address"
        placeholder='jhon@example.com'
        type="text"
        />
        </div>
        <div className="col-span-2">
         <Input value={pass} 
        onChange={({target})=>setpass(target.value)}
        label="Password"
        placeholder='Min 8 Characters'
        type="password"
        />
        </div>
        <div className="col-span-2">
         <Input value={cpass} 
        onChange={({target})=>setcpass(target.value)}
        label="Confirm Password"
        placeholder='Repeat password'
        type="password"
        />
        </div>
        </div>

        {err && <p className='text-red-500 text-xs pb-2.5'>{err}</p>}
        <button type='submit' className='btn-primary'>
          SIGNUP
        </button>
        <p className="text-[13px] text-slate-800 mt-3">
          Already have an account?{" "}
          <Link className='font-medium text-primary underlined' to='/login'>
          Login
          </Link>
        </p>
      </form>

      </div>
      </AuthLayout>
  )
}

export default SignUp