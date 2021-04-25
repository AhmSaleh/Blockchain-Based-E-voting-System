import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import { isNamedExportBindings } from 'typescript';

const axios = require('axios');

const RegisterForm = () => {
    const register = (event) => {
        event.preventDefault();

        // Creating a new user
        const param = {
            nationalID: event.target.nationalID.value,
            password: event.target.password.value,
            isRegistered: true,
            isNamedExportBinding: false
        };

        // Calling our API to register the user
        axios.post('http://localhost:5000/api/users', param)
        .then((res) => {
            if(res.status === 200)
            {
                swal("Success!", "You've been registered successfully!", "success");
                window.location.pathname="/login";
            }
        })
        .catch(() => swal("Error!", "Registration failed!", "error"));
    }
    
    return (
        <div>
            <head>
                <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"/>
                <link rel="stylesheet" type="text/css" href="../static/styles.css"/>
            </head>

            <body>
                <div className="container" style={{margin: "auto", width:"auto"}}>
                    {/* Card Container */}
                    <div className="d-flex justify-content-center h-100">
		                <div className="card">
                            {/* Card Header */}
                            <div class="card-header">
                                <h3>Sign Up</h3>
                            </div>

                            {/* Card */}
                            <div className="card-body">

                                {/* Registration Form */}
                                <form onSubmit={register}>
                                    {/* National ID Input Group */}
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" name="nationalID" class="form-control" placeholder="National ID" required></input>
                                    </div>

                                    {/* Password Input Group */}
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                                        </div>
                                        <input type="password" name="password" class="form-control" placeholder="Password" required></input>
                                    </div>

                                    {/* Register Button */}
                                    <div className="form-group">
                                        <input type="submit" value="Register" class="btn float-right login_btn"/>
                                    </div>

                                </form>
                            </div>

                            {/* Card Footer */}
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                    Already have an account?<Link to="/login"> Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    )
}

export default RegisterForm
