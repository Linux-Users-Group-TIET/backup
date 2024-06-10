import { useState } from "react"
import { Link ,useNavigate} from "react-router-dom"
function SignUp() {
  const [formdata, setformdata] = useState({})
  const [error , setError]= useState(null);
  const [loading,setLoading]= useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
   setformdata(
    {
      ...formdata,
      [e.target.id] :
       e.target.value,
    }
  )
  }
  const handleSubmit = async (e)=> {
    e.preventDefault();
    try{
    setLoading(true);
   const res = await fetch('/api/auth/signup',{
   method: 'POST',
   headers:{
    'Content-Type':'application/json',
   },
   body:JSON.stringify(formdata),
  }
   );
   const data = await res.json();
   
    if(data.sucess === false)
      {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/signin');
   }
   catch(error)
   {
    setLoading(false);
    setError(error.message);
   }

  };
  
  console.log(formdata);
  return (
   <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
     <input type="text" placeholder='username' className='border p-3 rounded-lg' id = 'username' onChange={handleChange}/>
     <input type="text" placeholder='email' className='border p-3 rounded-lg' id = 'email'onChange={handleChange}/>
     <input type="text" placeholder='password' className='border p-3 rounded-lg' id = 'password'onChange={handleChange}></input>
     <button disabled={loading} className='bg-slate-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading..' : 'SIGN UP'}</button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Have an account?</p>
      <Link to={"/signin"}>
        <span className="text-blue-700">Sign in</span>
      </Link>
    </div>
   </div>
  )
}

export default SignUp;