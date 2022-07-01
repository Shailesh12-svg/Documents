import{useState} from'react';
import './styles.css';
import axios from'axios';


function Login(){
    const[data,setData]=useState({
        email:"",
        password:"",
    });
    const[error,setError]=useState=("")



    const handleChange = ({currentTarget:input})=>{
        setData({...data,[input.name]:input.value});
    };

    const handleSubmit =async(e)=>{
        e.preventDefault();
        try{
            const url="http://localhost:8000/api/auth";
            const{data:res}=await axios.post(url,data);
            localStorage.setItem("token",res.data);
            window.location = "/"
            console.log(res.message);
        }catch(error){
            if(error.response&&
              error.response.status >=400 &&
              error.response.status <=500
            ){
                setError(error.response.data.message)
            }
        }
    }

  return (
    <div>
       <div className="login">
                    <form on onSubmit={handleSubmit}>
                        <label for="chk" aria-hidden="true">Login</label>
                        <input type="email" name="email" placeholder="Email" required=""value={data.email} onChange={handleChange} />
                        <input type="password" name="pswd" placeholder="Password" required=""value={data.password} onChange={handleChange} />
                        {error&& <div className='error-message'>{error}</div>}
                        <button>Login</button>
                    </form>
                </div> 
    </div>
  );
}

export default Login;
