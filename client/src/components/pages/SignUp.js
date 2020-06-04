import React from 'react';
import image from '../images/login7.jpg';

const signUpStyles = {
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  height: '100vh',
  width: '100%',
  position: 'relative',
  display: 'table',
  backgroundRepeat: 'no-repeat',
}

const SignUp = () => {
	return (
		<div id="login">
			<div className="row"> 
				<div className="col-lg-6 col-md-6 image-grid" style={signUpStyles}></div>
				<div className="col-lg-6 col-md-6">
					<form>
						<h2 className="title text-center mb-5">Sign Up</h2>
            <div className="form-group">
							<input type="text" className="form-control form-control-lg" id="username" name="username" aria-describedby="emailHelp" placeholder="Your name"/>
						</div>
						<div className="form-group">
							<input type="email" className="form-control form-control-lg" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
						</div>
						<div className="form-group">
							<input type="password" className="form-control form-control-lg" id="password" name="password" placeholder="Password"/>
						</div>
            <div className="form-group">
							<input type="password" className="form-control form-control-lg" id="password2" name="password2" placeholder="Confirm Password"/>
						</div>
						<div className="text-center">
							<button type="button" className="btn btn-lg btn-primary login-btn mr-3">Sign Up</button>
							<button type="button" className="btn btn-lg btn-outline-primary demo-btn">Demo User</button>
						</div>
						<div className="text-center pt-5 pb-5">
							<p>Already have an account?</p>
							<a href="/">Log In</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignUp;