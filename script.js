
//check access token
function checkAccessToken(){
    return localStorage.getItem("accessToken")
}

// toggle sections
function toggleSections(){
    const signupPage = document.getElementsByClassName("container")[0];
    const profilePage = document.getElementById("profile-page");
    const isAccessTokenAvailable = checkAccessToken();

    signupPage.style.display = isAccessTokenAvailable?"none":"block";
    profilePage.style.display = isAccessTokenAvailable?"block":"none";

    if(isAccessTokenAvailable){
        displayProfileDetails();
    }
}

// saveuserState()
function saveuserState(user){
    const accessToken = generateAccessToken();
    user.accessToken = accessToken;
    localStorage.setItem("accessToken",accessToken);
    localStorage.setItem("user",JSON.stringify(user));
}


//generate access token
function generateAccessToken(){
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgjijklmnopqrstuvwxyz0123456789"; // this is for creating accessToken
    const tokenLength = 16; // 16 is given in the question
    let accessToken = "";

    for(let i = 0 ; i < tokenLength ; i++){
        accessToken+=characters.charAt(Math.floor(Math.random()*tokenLength));
    } 
    return accessToken;
}

// Clear user data from LS
function clearUserState(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
}

// getuserstate to get the data from the LS
function getUserState(){
    return JSON.parse(localStorage.getItem("user")) || null;
}

// Show data in profile section
function displayProfileDetails(){
     const user = getUserState();
     
     document.getElementById("profile-fullname").textContent = user.fullname;
     document.getElementById("profile-email").textContent = user.email;
     document.getElementById("profile-password").textContent = user.password;
}

// validate and parent function
document.getElementById("signup-button").addEventListener("click", function(){
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const errorElement = document.getElementById("signup-error");
    const successElement = document.getElementById("signup-success");
    
    if(fullname && email && password && confirmPassword){
        if(password===confirmPassword){
            const user = { fullname, email, password };
            saveuserState(user);
            errorElement.textContent = "";
            successElement.textContent = "Successfully Signed Up!";
            setTimeout(toggleSections, 2000);
        }
        else{
            errorElement.textContent = "Password mismatch";
            successElement.textContent = "";
        }

    }
    else{
        errorElement.textContent = "ERROR: All fields are mandatory.";
        successElement.textContent = "";
    }
})

// logout listener
document.getElementById("logout-button").addEventListener("click", function(){
    clearUserState();
    toggleSections();
})

window.addEventListener("load",toggleSections);