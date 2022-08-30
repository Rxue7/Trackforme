import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const labels = document.querySelectorAll(".login-box label");
    labels.forEach((label) => {
        label.innerHTML = label.innerText
            .split("")
            .map(
                (letter, idx) =>
                    `<span style=" transition-delay:${idx * 50}ms"> ${letter}</span>`
            )
            .join("");
    });



    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Generate JSX code for error message
    const renderErrorMessage = (name) => name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
    )
    const database = [{
        username: "user1",
        password: "pass1"
    },
    {
        username: "user2",
        password: "pass2"
    }
    ];

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };
    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();
        // User Login info


        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.username === uname.value)

        // Compare user info 
        if (userData) {
            if (userData.password !== pass.value) {
                // invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);

            }
        } else {
            // Username not found 
            setErrorMessages({ name: "uname", message: errors.uname });
        }

    };

    let submit = useNavigate();
    function routeSubmit() {
        submit('/')
    }

    if (isSubmitted === true) {
        submit('/')
    }


    return (
        <div className="login-body">
            <div className="login-container">
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="login-box">
                        <input type="text" name="uname" required />
                        <label> Your Email</label>
                        {renderErrorMessage("uname")}
                    </div>
                    <div className="login-box">
                        <input type="password" name="pass" required />
                        <label>Your Password</label>
                        {renderErrorMessage("pass")}
                    </div>
                    <button className="button">Log In</button>
                    <p className="text"> Don't have an account?
                        <a href="">Create Account</a></p>
                </form>
            </div>
        </div>

    )
}

export default Login