import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
        const [credentials, setCredentials] = useState({name:"",email: "", password: "",cpassword:""})
        let history = useHistory();
        const {name,email,password} = credentials;
    
        const handleSubmit = async (e) => {
            // console.log('handle')
            e.preventDefault();
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json()
            console.log(json.authtoken);
            
            if (json.success){
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken); 
                history.push('/login');
                props.showAlert("Account created succesfully","success")
            }
            else{
                props.showAlert(json.error,"danger")
            }
        }
        const onChange = (e)=>{
            setCredentials({...credentials, [e.target.name]: e.target.value})
        }

    return (
        <div className='container'>
            <h3>Create account to add notes</h3>
            <form onSubmit={handleSubmit} className='form-control my-3'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" >Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={onChange} minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" >Email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password"  onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword"  onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
