import {Link} from 'react-router-dom'
const axios = require('axios');

const LoginForm = (onTokenChange) => {
    //onTokenChange.bind(this);
    const Login = (event) => {
        event.preventDefault();

        // Placeholder code to be removed
        

        // TODO add Login logic by checking against Database
        const param = {
            nationalID: event.target.nationalID.value,
            password: event.target.password.value
        }
        var token;
        axios.post('http://localhost:5000/api/auth', param)
        .then((res) => {
            if(res.status === 200)
            {
                //onTokenChange(res.data);
                token = res.data;
                alert(token);
                window.location.pathname="/candidates";
            }
        })
        .catch((e) => alert(e.message));
    }
    
    return (
        <div>
            <form onSubmit={Login}>
                <label for="nationalID">National ID:</label>
                <input name="nationalID" type="number"></input><br/>

                <label for="password">Password:</label>
                <input name="password" type="password"></input><br/>

                <input type="submit"></input>
            </form>

            <p>New here? <Link to="/register">Register now!</Link></p>
        </div>
    )
}

export default LoginForm