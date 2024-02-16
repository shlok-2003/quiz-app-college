// JavaScript source code

$(document).ready(function () {

    //
    var resources = [
            { username: "admin", password: "admin" },
            { username: "mariotti", password: "peperone1" },
            { username: "orpelli", password: "spazio" },
            { username: "castagnetti", password: "skype" },
            { username: "campagna", password: "blues" }
    ];

    //**button handlers**
    $("#container input[type=text], #container input[type=password], #container button").button();

    $("#btn_signin").on("click", goToLoginScreen);
    function goToLoginScreen() {
        console.log("login screen");

        $("#splashscreen").hide();
        $("#login").show("fade", "fast");
    };

    $("#btn_submit").on("click", onSubmit);
    function onSubmit() {
        document.getElementById("notify").textContent = "";

        //stop submit button behaviour
        $(this).off("click");
        //input handler
        let ans = validateInput();

        if(ans === true)
        {
            window.replace("") 
        }
    };

    $("#btn_cancel").on("click", onCancel);
    function onCancel() {
        document.getElementById("notify").textContent = "";
        resetLoginInput();

        console.log("splashscreen");

        $("#login").hide();
        $("#splashscreen").show("fade", "fast");
    };

    $("#btn_logout").on("click", onLogout);
    function onLogout() {
        document.getElementById("status").textContent = "Logging out";

        //stop logout button behaviour
        $(this).off("click");

        //server delay simulation
        var rand = Math.floor((Math.random() * 3000));
        setTimeout(function () {
            console.log("splashscreen");

            $("#loggedin").hide();
            $("#splashscreen").show("fade", "fast");

            document.getElementById("status").textContent = "Not logged in";

            document.getElementById("hellouser").textContent = "";
            //restore logout button behaviour
            $("#btn_logout").on("click", onLogout);
        }, rand);

        window.replace('index.html');
    };
    //

    function validateInput() {
        document.getElementById("status").textContent = "Logging in";

        var _user, _password;

        _user = document.getElementById("text_username").value;
        _password = document.getElementById("text_password").value;

        console.log("user " + _user + " password " + _password);

        var char = new RegExp(/^[a-zA-Z0-9- ]*$/);//("\\/,.^");

        if (char.test(_user) == false || char.test(_password) == false) {
            //unvalid input
            document.getElementById("notify").textContent = "Wrong username/password.";
            console.log("login error");

            document.getElementById("status").textContent = "Not logged in";
            return false;
        }
        else {
            //server delay simulation
            var rand = Math.floor((Math.random() * 2000)+1000);
            setTimeout(function () {
                var srv_answer = server(_user, _password);
                if (srv_answer.success) {
                    $("#login").hide();
                    $("#loggedin").show("fade", "fast");

                    document.getElementById("status").textContent = "Logged in";

                    resetLoginInput();
                }
                else {
                    document.getElementById("notify").textContent = srv_answer.errorMessage;
                    console.log("login error");

                    document.getElementById("status").textContent = "Not logged in";
                }

                document.getElementById("hellouser").textContent = "Hello, " + _user;

                //restore submit button behaviour
                $("#btn_submit").on("click", onSubmit);
            }, rand);
            
            return true;
        };
    };

    function server(_user, _password) {
        var _userInfo = false;

        for (var i = 0; i < resources.length; i++) {
            if (resources[i].username == _user && resources[i].password == _password) {
                //valid input
                console.log("user authenticated");

                _userInfo = true;

                break;
            }
        };

        switch (_userInfo) {
            case true:
                return { success: true, errorMessage: "" };
                break;
            case false:
                return { success: false, errorMessage: "Wrong username/password." };
                break;
        }
    };



    function resetLoginInput() {
        document.getElementById("text_username").value = "";
        document.getElementById("text_password").value = "";
    };
});