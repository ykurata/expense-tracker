import React from 'react';
import image from '../images/login7.jpg';

const loginStyles = {
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  height: '100vh',
  width: '100%',
  position: 'relative',
  display: 'table',
  backgroundRepeat: 'no-repeat',
}

const Login = () => {
	return (
		<div id="login">
			<div className="row"> 
				<div className="col-lg-6 col-md-6 image-grid" style={loginStyles}></div>
				<div className="col-lg-6 col-md-6">
					<form>
						<h2 className="title text-center mb-5">Log In</h2>
						<div className="form-group">
							<input type="email" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
						</div>
						<div className="form-group">
							<input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password"/>
						</div>
						<div className="text-center">
							<button type="button" className="btn btn-lg btn-primary login-btn mr-3">Log In</button>
							<button type="button" className="btn btn-lg btn-outline-primary demo-btn">Demo User</button>
						</div>
						<div className="text-center pt-5 pb-5">
							<p>Not a member?</p>
							<a href="/">Sign Up</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;