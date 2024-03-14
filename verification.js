import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref,onValue,set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
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
  var profilename = document.getElementById("profilename");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userID = user.uid;  
      console.log(userID);
      const refthis = ref(database, 'bankkycsignup/' + userID);
        onValue(refthis, (snapshot) => {
    const profdata = snapshot.val();

        if (profdata) {
        const client = profdata; 
        const name = client.name;

        profilename.innerHTML = name;
}
})
  document.getElementById("next").addEventListener('click',function()
        {   
           var name = document.getElementById("verficationname").value;    
           var dob = document.getElementById("verificationdate").value;    
           var address = document.getElementById("verificationaddress").value;    
           var pancardnumber = document.getElementById("varificationpan").value;    
           var aadharcardnumber = document.getElementById("verificationaadhar").value;   
           var income = document.getElementById("incomeRange").value;
           var typeofemployment = document.getElementById("verificationemployment").value;
            
                 set(ref(database, 'userfirststep/'+user.uid),
             {
                 name: name,
                 dob: dob,
                 address: address,
                 pancardnumber:pancardnumber,
                 aadharcardnumber: aadharcardnumber,
                 income:income,
                 typeofemployment:typeofemployment
             })
         
         
             .then( () =>{
                 console.log("done");
                 alert("Details Stored Successfully!!")
                 {
                 window.open("documentsupload.html","_parent");
                 }
         
         })
             .catch( () =>{
                 
             alert(error);
         })
         
             .catch((error) => {
                 alert(error)
             const errorCode = error.code;
             const errorMessage = error.message;
             console.log(errorMessage);
           }); 
       
        })
    }
})