var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {

                    //go to the correct user document by referencing to the user uid
                    currentUser = db.collection("users").doc(user.uid)
                    //get the document for current user.
                    currentUser.get()
                        .then(userDoc => {
                            //get the data fields of the user
                            let userName = userDoc.data().name;
                            let userCity = userDoc.data().city;
                            //let userCities = userDoc.data().collection("favourites");
                            let userCountry = userDoc.data().country;
                            let pref1 = userDoc.data().p1;
                            let pref2 = userDoc.data().p2;
                            let pref3 = userDoc.data().p3;
                            let pref4 = userDoc.data().p4;
                            let pref5 = userDoc.data().p5;
                            let pref6 = userDoc.data().p6;
                            let gc = userDoc.data().general;
                            let pc = userDoc.data().pregnant;
                            let cc = userDoc.data().children;
                            let og = userDoc.data().elderly;
                            let hc = userDoc.data().heart;
                            let lc = userDoc.data().lung;
                            let ac = userDoc.data().athletes;
                            //let userConcerns = userDoc.data().collection("reccomendation");


                            //if the data fields are not empty, then write them in to the form.
                            if (userName != null) {
                                document.getElementById("name").value = userName;
                                console.log(userName)
                            }
                            if (userCity != null) {
                                document.getElementById("city").value = userCity;
                                console.log(userCity)
                            }
                            if (userCountry != null) {
                                 document.getElementById("country").value = userCountry;
                             }
                            if (pref1 != null) {
                                document.getElementById("pollutant1").value = pref1;
                            }
                            if (pref2 != null) {
                                document.getElementById("pollutant2").value = pref2;
                            }
                            if (pref3 != null) {
                                document.getElementById("pollutant3").value = pref3;
                            }
                            if (pref4 != null) {
                                document.getElementById("pollutant4").value = pref4;
                            }
                            if (pref5 != null) {
                                document.getElementById("pollutant5").value = pref5;
                            }
                            if (pref6 != null) {
                                document.getElementById("pollutant6").value = pref6;
                            }
                            if (gc == true) {
                                document.getElementById("general").checked = true;
                            }
                            if (pc == true) {
                                document.getElementById("pregnant").checked = true;
                            }
                            if (cc == true) {
                                document.getElementById("children").checked = true;
                            }
                            if (og == true) {
                                document.getElementById("elderly").checked = true;
                            }
                            if (hc == true) {
                                document.getElementById("heart").checked = true;
                            }
                            if (lc == true) {
                                document.getElementById("lung").checked = true;
                            }
                            if (ac == true) {
                                document.getElementById("athletes").checked = true;
                            }
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }

//call the function to run it 
populateUserInfo();

function saveUserInfo() {
    //enter code here

    //a) get user entered values
    userName = document.getElementById("name").value;
    userCity = document.getElementById("city").value;
    userCountry = document.getElementById("country").value;
    pref1 = document.getElementById("pollutant1").value;
    pref2 = document.getElementById("pollutant2").value;
    pref3 = document.getElementById("pollutant3").value;
    pref4 = document.getElementById("pollutant4").value;
    pref5 = document.getElementById("pollutant5").value;
    pref6 = document.getElementById("pollutant6").value;
    gc = document.getElementById("general").checked;
    pc = document.getElementById("pregnant").checked;
    cc = document.getElementById("children").checked;
    og = document.getElementById("elderly").checked;
    hc = document.getElementById("heart").checked;
    lc = document.getElementById("lung").checked;
    ac = document.getElementById("athletes").checked;

    //b) update user's document in Firestore
    currentUser.update({
        name: userName,
        city: userCity,
        country: userCountry,
        p1: pref1,
        p2: pref2,
        p3: pref3,
        p4: pref4,
        p5: pref5,
        p6: pref6,
        general: gc,
        pregnant: pc,
        children: cc,
        elderly: og,
        heart: hc,
        lung: lc,
        athletes: ac
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    //c) disable edit 
}