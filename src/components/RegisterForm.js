const RegisterForm = () => {
    const register = (event) => {
        event.preventDefault();

        // Placeholder code to be replaced with registration to Db
        window.location.pathname="/login";

        // TODO: Register citizen to Db
    }
    
    return (
        <div>
            <form onSubmit={register}>
                <label for="nationalID">National ID:</label>
                <input name="nationalID" type="number"></input><br/>

                <label for="password">Password:</label>
                <input name="password" type="password"></input><br/>

                <input type="submit" value="Register"></input>
            </form>
        </div>
    )
}

export default RegisterForm
