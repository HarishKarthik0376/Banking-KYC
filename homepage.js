import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref,onValue,set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import {getStorage, ref as storageRef, uploadBytes} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js"
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
  const storage = getStorage(app);

  var profilename = document.getElementById("profilename");
  var imageurl;
  var file;
  var file1;
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
        const fileselector = document.querySelector('#frontchoosefile');
        fileselector.onchange =  () =>
        {
        file = fileselector.files[0];
        //storagebucketforfrontfile
        const mountainsRef = storageRef(storage, 'docs/'+user.uid+'/front');
        uploadBytes(mountainsRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        }).catch((error) => {
          console.error('Error uploading file:', error);
        });
        
        }
        })
        const fileselector1 = document.querySelector('#backchoosefile');
        //backfile
        fileselector1.onchange =  () =>
        {
        file1 = fileselector1.files[0];
        //storagebucketforbackfile
        const mountainsRef = storageRef(storage, 'docs/'+user.uid+"/back");
        uploadBytes(mountainsRef, file1).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        }).catch((error) => {
          console.error('Error uploading file:', error);
        });
        //database
        set(ref(database, 'userdocuments/'+user.uid),
        {   
            typeofproof:document.getElementById("confirm").value
        })
        .then( () =>{
            console.log("done");
            alert("Image Uploaded Successfully")
            {
                document.getElementById("contninuetonextbtn").style.display = "block";
            }
        })
    }
    }
    else {
      console.log("No data available");
    }
    })
    //other js:
    document.getElementById("confirm").addEventListener("click",function()
    {
        if(document.getElementById("documentsselect").value!="--Choose A Document--")
        {
            document.getElementById("sectiontoupload").style.display = "block";
            document.getElementById("fotnsidetext").innerHTML = "Upload Front Side Of " + document.getElementById("documentsselect").value;
            document.getElementById("backsidetext").innerHTML = "Upload Back Side Of " + document.getElementById("documentsselect").value;
            document.getElementById("frontchoosefile").value = null;
            document.getElementById("backchoosefile").value = null;
        }
        else
        {
            alert("Choose A Valid Document!!");
            document.getElementById("sectiontoupload").style.display = "none";
        }
    });

