import React from "react";


const Register = ({ onRouteChange }) => {
    return (
        <article class="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-1 center">
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" for="name">Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" for="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                    </div>
                    {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label> */}
                    </fieldset>
                    <div className="">
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign up" onClick={() => onRouteChange('signin')} />
                    </div>
                    {/* <div className="lh-copy mt3">
                    <a href="#0" className="f4 link dim black db">Register</a>
                    <a href="#0" className="f6 link dim black db">Forgot your password?</a>
                    </div> */}
                </div>
            </main>
        </article>
    )
}



export default Register;