import {Link} from 'react-router-dom'

const LoginForm = () => {
    const Login = (event) => {
        event.preventDefault();

        // Placeholder code to be removed
        window.location.pathname="/candidates";
        

        // TODO add Login logic by checking against Database

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
