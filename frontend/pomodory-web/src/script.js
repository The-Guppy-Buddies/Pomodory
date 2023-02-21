//connected to App.js, this is where we handle the search functionality
//and communicate with python->mongodbcloud
function searchMembers(){
    console.log("Is this working?");
    var member = $('#name_inp').val();
    console.log("ID: " + member);
}