$(function(){

    $('#info').on('click', function(e){

        console.log("Info clicked");
        e.preventDefault();
        alert("Name: Syed Fahad Nadeem\nClass ID: CPS 5745\nProject Due Date: October 20, 2019");

    });

    $('#userInfo').on('click', function(e){

        if(Cookies.get('uid') == null){

            alert("uid: \nlogin: \nname: \ngender: ");

        }else{

            alert("uid: "+Cookies.get('uid')+"\nlogin: "+Cookies.get('username')+"\nname: "+Cookies.get('name')+"\ngender: "+Cookies.get('gender'));

        }

    });

    $('#client').on('click', function(e){

        var cookiesIs;
        var javaIs
        e.preventDefault();

        
        if(navigator.cookieEnabled){
            cookiesIs = "Cookies are enabled";
        }else{
            cookiesIs = "Cookies are not enabled"
        }

        if(navigator.javaEnabled()){
            javaIs = "Java is enabled";
        }else{
            javaIs = "Java is not enabled"
        }
        
        alert("Client Information: "+ navigator.userAgent + "\n" + cookiesIs + "\n" + javaIs);
    })

    // Event for when logout is pressed
    $("#logout").on('click', function(e){

        e.preventDefault();
        if(Cookies.get('uid') == !null){
            if(confirm("Are you sure you would like to log out?")){

                Cookies.remove('uid');
                Cookies.remove('username');
                Cookies.remove('name');
                Cookies.remove('gender');
                document.getElementById('messageArea').innerHTML = "You have successfuly logged out";

            }else{//Do Nothing
            }

        }else{
            document.getElementById('messageArea').innerHTML = "You are already logged out";
        }
    });

    $('#exit').on('click', function(e){

        e.preventDefault();
        if(confirm("Are you sure you would like to exit the program?")){

            // Removes Cookies
            Cookies.remove('uid');
            Cookies.remove('username');
            Cookies.remove('name');
            Cookies.remove('gender');

            document.getElementById('graph_div').innerHTML = "";
            document.getElementById('table_div').innerHTML = "";
            lines = null;
            document.getElementById('csvFileButton').files[0] = null;
            document.getElementById('messageArea').innerHTML = "You can now close the window";
            alert("You can now safely close the tab");
            
            

            
        }else{ }

    })

})