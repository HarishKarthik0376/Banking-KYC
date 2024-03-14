import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiB0CIJQ11qRk_QftVaWtIk-bH58K8o5M",
  authDomain: "kycverification-dbee2.firebaseapp.com",
  databaseURL: "https://kycverification-dbee2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kycverification-dbee2",
  storageBucket: "kycverification-dbee2.appspot.com",
  messagingSenderId: "298818644287",
  appId: "1:298818644287:web:60cabbb085e0e1d49f4b8a"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const database = getDatabase(app);

   document.getElementById("loginbtn").addEventListener("click",function()
   {
        var emailvalue  = document.getElementById("loginusername").value;
        var pwdvalue = document.getElementById("loginpwd").value;
        signInWithEmailAndPassword(auth, emailvalue, pwdvalue)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        alert("Welcome"+emailvalue)
        {
          window.open("homepage.html","_parent");
        }
      })
   
    .catch((error) => {
         alert(error)
        const errorMessage = error.message;
        console.log(errorMessage);
  
  
     })
        })
        document.getElementById("registerbtn").addEventListener('click',function()
        {
           var name = document.getElementById("registername").value;    
           var email = document.getElementById("registeremail").value;    
           var mobile = document.getElementById("registermobile").value;    
           var username = document.getElementById("registerusername").value;    
           var password = document.getElementById("registerpwd").value;   
           console.log(name);
            console.log(email);
            console.log(mobile);
            console.log(username);
            console.log(password);
           createUserWithEmailAndPassword(auth, email, password)
           .then((userCredential) => {
             // Signed in 
                 const user = userCredential.user;
                 console.log(user);
                 set(ref(database, 'bankkycsignup/'+user.uid),
             {
                 name: name,
                 email: email,
                 mobile: mobile,
                 username:username,
                 password: password
             })
         
         
             .then( () =>{
                 console.log("done");
                 alert("Signup Succesfull!!")
                 {
                 window.open("homepage.html","_parent");
                 }
         
         })
             .catch( () =>{
                 
             alert(error);
         });
         
             })
             .catch((error) => {
                 alert(error)
             const errorCode = error.code;
             const errorMessage = error.message;
             console.log(errorMessage);
           }); 
       
        })  