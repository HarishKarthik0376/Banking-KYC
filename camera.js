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
  var imageurl;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userID = user.uid;  
      console.log(userID)
      const refthis = ref(database, 'bankkycsignup/' + userID);
      onValue(refthis, (snapshot) => {
        const profdata = snapshot.val();
  
        if (profdata) {
          const client = profdata; 
          const name = client.name;
  
         profilename.innerHTML = name;
        }
    }
      )
   let imagecaptured;
    const webcamel = document.getElementById("webcam");
    const canvasel = document.getElementById("canvas");
    const openweb = new Webcam(webcamel,"user",canvasel);
    openweb.start();
    function snaptheimage()
    {
        imagecaptured = openweb.snap();


    }
    document.getElementById("captureimage").addEventListener("click",function()
    {   snaptheimage();
        openweb.stop();
        webcamel.setAttribute("poster",imagecaptured);
        webcamel.style.display = "none";
        canvasel.style.display = "block";
        document.getElementById("captureimage1").style.display = "block";
        document.getElementById("contninuetonextbtn").style.display = "block";
        set(ref(database, 'profilepic/'+user.uid),
      {
         capturedimage:imagecaptured
      })
  
  
      .then( () =>{
          console.log("done");
          alert("Image Uploaded Successfully!!")

  
  })
      .catch( () =>{
          
      alert(error);
  });
    })
    document.getElementById("captureimage1").addEventListener("click",function()
    {
        document.getElementById("captureimage1").style.display = "none";
        openweb.start();
        webcamel.style.display = "block";
        canvasel.style.display = "none";
        document.getElementById("contninuetonextbtn").style.display = "none";
    })
      
}
     })