import {auth, googleProvider} from "../config/firebase"; //i did this 
import {GoogleAuthProvider, createUserWithEmailAndPassword,signInWithPopup, signOut} from "firebase/auth" //this is to bring the email from firebase done by me
import {useState} from "react";

export const Auth=()=>{
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    console.log(auth?.currentUser?.email);

//f blo s to enable sigin onclick
    const signIn=async()=>{
        try{         //this is for error
        await createUserWithEmailAndPassword(auth, email, password);

        
        }
        catch(err){
             console.error(err);
    } 

    };
    
//f blo s to enable siginwithgmail onclick
const signInWithGoogle=async()=>{
    try{         //this is for error
    await signInWithPopup(auth, googleProvider);    
    }
    catch(err){
         console.error(err);
} 
}
    
//f blo s to enable logout onclick
const signOut=async()=>{
    try{         //this is for error
    await signOut(auth); //no need tp pass anything thts how to signout    
    }
    catch(err){
         console.error(err);
} 

};

    return(
           <section>
        <div class="form">
            <h2>log in</h2>
            <form>
                <label for="login">Email</label><input type="text" id="login" placeholder="Email.." 
                onChange={(e)=>setEmail(e.target.value)}/>
                <label class="password" for="password"> Password</label><input type="password" id="Password" placeholder="Password.." 
                onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={signIn}><a href="#" class="login-btn">sign in</a></button>

                <button onClick={signInWithGoogle}><a href="#" class="login-btn">sign in with Google</a></button>

                <button onClick={signOut}><a href="#" class="login-btn">Log out</a></button>



                <p class="forget"> forget password?<a href="#" class="click">click here</a></p>
            </form> 
            <a href="#" class="facebook"><span class="icon"><i class="fa fa-facebook-f"></i></span>sign in with facebook</a>
              <a href="#" class="twitter"><span class="icon"><i class="fa fa-twitter-f"></i></span>sign in with twitter</a>
              </div>
            </section>
    );
};