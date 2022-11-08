var currentUser; 


// I want to get the user information from the database and put them in the form
function populationInfo() {
    firebase.auth().onAuthStateChanged(user => { // this is to make sure who the user who signed it
        if (user) {
            // go and get the current user info from firestore
            currentUser = db.collection("users").doc(user.uid); // grab uid from firebase

            currentUser.get()
                .then(userDoc => {
                    let userName = userDoc.data().name;
                    let userSchool = userDoc.data().school;
                    let userCity = userDoc.data().data;

                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                     if (userSchool != null) {
                        document.getElementById("schoolInput").value = userSchool;
                     }
                     if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
            })

        } else {
            console.log("no user is logged in")
        }
    }

    ) 
}
populationInfo();


function editUserInfo() {
   //Enable the form fields
   document.getElementById('personalInfoFields').disabled = false;
}


function saveUserInfo() {
    userName = document.getElementById('nameInput').value; //get the value of the field with id="nameInput"
    userSchool = document.getElementById('schoolInput').value;
    userCity = document.getElementById('cityInput').value;

    currentUser.update({
        name: userName,
        school: userSchool,
        city: userCity
    })
    .then(() => {
        console.log("Document successfully updated!");
    })

    document.getElementById('personalInfoFields').disabled = true;
}