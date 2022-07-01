import{useState} from'react';
import './styles.css';
import axios from'axios';
import{useNavigate} from 'react-router-dom';

function Signup() {
    const[data,setData]=useState({
        UserName:"",
        email:"",
        password:"",
    });
    const[error,setError]=useState=("")
    const navigate=useNavigate();


    const handleChange = ({currentTarget:input})=>{
        setData({...data,[input.name]:input.value});
    };

    const handleSubmit =async(e)=>{
        e.preventDefault();
        try{
            const url="http://localhost:8000/api/users";
            const{data:res}=await axios.post(url,data);
            navigate("/login")
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
    <body className="test">
        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />
    
                <div className="signup">
                    
                    <form onSubmit={handleSubmit}>
                        <label for="chk" aria-hidden="true">Sign up</label>
                        <input type="text"placeholder='User Name' name='UserName' value={data.UserName} required="" onChange={handleChange}/>
                        <input type="email" name="email" placeholder="Email" required=""value={data.email} onChange={handleChange} />
                        <input type="password" name="pswd" placeholder="Password"  required=""value={data.password} onChange={handleChange} />
                        {error&& <div className='error-message'>{error}</div>}
                        <button type="submit">Sign up</button>
                    </form>
                </div>
    
               
        </div>
    </body>
    );
  }
  
  export default Signup;