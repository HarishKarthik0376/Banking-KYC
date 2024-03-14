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
  var nametodis = document.getElementById("displayname");
  var DOB = document.getElementById("displaydob");
  var aadharcardnumber = document.getElementById("displayaadhar");
  var pancardnumber = document.getElementById("displaypan");
  var address = document.getElementById("displayaddress");
  var typeofdoc = document.getElementById("displayuploaded");
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
         nametodis.innerHTML = name;
        }
    })
      const anotheref = ref(database, 'userfirststep/' + userID);
      onValue(anotheref, (snapshot) => {
        const profdata = snapshot.val();
  
        if (profdata) {
          const client = profdata; 
          const dob = client.dob;
          const address1= client.address;
          const aadharcardnumber1 = client.aadharcardnumber;
          const pancardnumber1= client.pancardnumber;
          DOB.innerHTML = dob;
          aadharcardnumber.innerHTML = aadharcardnumber1;
          pancardnumber.innerHTML = pancardnumber1;
          address.innerHTML = address1;
        }
    })
    var imagetocheck;
    const onemoreref = ref(database, 'userdocumentsfront/' + userID);
    onValue(onemoreref, (snapshot) => {
        const profdata = snapshot.val();
      
        if (profdata) {
          const client = profdata; 
          const typeofdoc1 = client.typeofproof;
          const frontpic = client.frontimage;
          imagetocheck = frontpic;
          console.log(imagetocheck);
          typeofdoc.innerHTML = typeofdoc1;
          document.getElementById("imgtoshow").src = "data:image/png;base64"+imagetocheck;
        }
      });

  document.getElementById("startverification").addEventListener("click",function()
  {
    document.getElementById("startverification").style.display = "none";
    document.getElementById("imgtoshow").src = imagetocheck;
    const progress = document.getElementById("verificationstatus");
    progress.style.display = "block";
    const worker = new Tesseract.TesseractWorker();
    worker.recognize(imagetocheck)
    .progress(function(response)
    {
        progress.innerHTML = response.status;
    })
    .then(function(data)
    {
        console.log(data);
        progress.innerHTML = "Completed";
    })
  })
}
})