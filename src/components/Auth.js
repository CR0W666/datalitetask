import React from 'react'
import './Auth.css';
import GoogleIcon from '../icons/Google-ico.svg';
import {firebase, auth} from '../Firebase';

function AuthBttn(props) {
    const {provider, providerFn} = props;
    if (provider === 'Anonymous') 
        return <button className="guest" onClick={providerFn}>Continue as a Guest</button>
 
    return (
        <>
            <button className="sign-in" onClick={providerFn}>
                <div className="provider-bttn">
                    <img className="provider-icon" src={GoogleIcon} alt={`${provider} login icon`} />
                    Sign in with {provider}
                </div>
            </button>
        </>
    )


}

function GoogleAuth() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    
    return <AuthBttn provider={'Google'} providerFn={signInWithGoogle}/>
        
}

function AnonymousAuth() {
    const signInAnonymously = () => {
        auth.signInAnonymously();
    }

    return <AuthBttn provider={'Anonymous'} providerFn={signInAnonymously}/>
}

export function SignIn() {
    return (<>
        <div className="sign-in-box">
            <div className="sign-in-options">

                <GoogleAuth />
                <AnonymousAuth />

            </div>
            <p>Do not violate the community guidelines or you will be banned for life!</p>
        </div>
    </>)
    
}

  
export function SignOut() {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}

//TODO troubleshoot, same email is not allowed to sign in twice.

// function GithubAuth() {
//     const signInWithGithub = () => {
//         const provider = new firebase.auth.GithubAuthProvider();
//         auth.signInWithPopup(provider);
//     }
    
//     return <AuthBttn provider={'Github'} providerFn={signInWithGithub}/>

// }

// function TwitterAuth() {
//     const signInWithTwitter = () => {
//         const provider = new firebase.auth.TwitterAuthProvider();
//         auth.signInWithPopup(provider);
//     }
    
//     return <AuthBttn provider={'Twitter'} providerFn={signInWithTwitter}/>

// }

// function FacebookAuth() {
//     const signInWithFacebook = () => {
//         const provider = new firebase.auth.FacebookAuthProvider();
//         auth.signInWithPopup(provider);
//     }

//     return <AuthBttn provider={'Facebook'} providerFn={signInWithFacebook}/>
// }

//TODO: implement
// eslint-disable-next-line no-unused-vars
// function EmailAndPasswordAuth() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const signInWithEmailAndPassword = () => {
//         auth.signInWithEmailAndPassword(email, password);
//     }

//     return (
//         <>
//             <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
//             <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            
//             <AuthBttn provider={'Email and Password'} providerFn={signInWithEmailAndPassword}/>
//         </>
//     )
// }