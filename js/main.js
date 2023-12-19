var bookNameID= document.getElementById("bookNameID");
var siteUrl= document.getElementById("siteUrl");
var nameErorr=document.getElementById("nameErorr")
var searchInput=document.getElementById("searchInput");
var siteUrlErorr=document.getElementById("siteUrlErorr")
var myBtn=document.getElementById("myBtn");
var myBody=document.getElementById("myBody");
var bookmarkList;
var updatedIndex;
// var inter=document.getElementById("password")
// var inter2=document.getElementById("name")


// function login(){
//    var password="shoaib@route";
//    var name="Shoaib";
//    if (inter.value==password && inter2===name) {
//       alert ("Logged in Successfully!");

//       }else{
//          alert('Wrong ! try again')}
//       }


if(localStorage.getItem("bookmarkList")){
   bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
   displayBookMarks(bookmarkList);
}else{
   bookmarkList=[];
}
function addSubmit(){
   if(myBtn.innerHTML ==="Submit"){
      if(bookmarkName() &&  urlSiteValidation()){
         var box={
            name:bookNameID.value,
            uSite:siteUrl.value,
         }
        bookmarkList.push(box);
      }else{
         console.log("validation error");
      }
   }else if(myBtn.innerHTML ==="Update bookmark"){
      bookmarkList[updatedIndex].name=bookNameID.value;
      bookmarkList[updatedIndex].uSite=siteUrl.value;
      
   }
   saveToLocalStorage();
   displayBookMarks(bookmarkList);
   clearInputs();

}
function displayBookMarks(pList, searchTerm){
   if(pList.length === 0){
      myBody.innerHTML =`<tr>
      <td colspan="7">
      <div class="alert alert-danger">No Match Founde</div></td>
      </tr>` ;

   }else{
 var cartoona="";
 for(var i=0; i < pList.length ;i++){
    cartoona += `
    <tr >
    <td >${i+1}</td>
    <td>${searchTerm? pList[i].name.toUpperCase().replace(searchTerm.toUpperCase(), `<span class="text-warning fw-bold" style="font-size:25px">${searchTerm}</span>`):pList[i].name}</td>
    <td><button onclick="visitWeb(${i})" class="btn visitBtn btn-success"><i class="icon-eye" ></i>Visit</button></td>
    <td><button onclick="updatBookMark(${i})" class="btn btn-warning" >Update</button></td>
    <td><button  onclick="deleteBookMark(${i})" class="btn btn-danger"><i class="icon-trash"></i>Delete</button></td>
  </tr> `
 }
 myBody.innerHTML = cartoona;
   }
}
function visitWeb(i) {
   const httpRegEx = /^https?:\/\//;
   if (httpRegEx.test(bookmarkList[i].uSite)) {
     window.open(bookmarkList[i].uSite);
   } else {
     window.open(`https://${bookmarkList[i].uSite}`);
   }
 }
function clearInputs(){
   bookNameID.value="";
   siteUrl.value="";
}
function deleteBookMark(index){
bookmarkList.splice(index ,1);
saveToLocalStorage();
displayBookMarks(bookmarkList);
}
function saveToLocalStorage(){
   localStorage.setItem("bookmarkList" ,JSON.stringify(bookmarkList));
}
function updatBookMark(index){
   updatedIndex=index;
   bookNameID.value=bookmarkList[index].name;
   siteUrl.value=bookmarkList[index].uSite;
   myBtn.innerHTML="Update bookmark";
}
function searchMarks(){
   var term =searchInput.value;
   var searchList=[];
   for(var i =0;i<bookmarkList.length;i++){
if(bookmarkList[i].name.toLowerCase().includes(term.toLowerCase())|| bookmarkList[i].uSite.toLowerCase().includes(term.toLowerCase())){
   searchList.push(bookmarkList[i]);
}
   }
   displayBookMarks(searchList,term)
}
function bookmarkName(){
   var regex=/^[A-za-z0-9]{3,}$/;
   if(regex.test(bookNameID.value)=== true){
      nameErorr.classList.replace("d-block", "d-none");
      bookNameID.classList.add("is-valid");
      bookNameID.classList.remove("is-invalid");
      return true;
   }else{
      nameErorr.classList.replace("d-none", "d-block");
      bookNameID.classList.add("is-invalid");
      bookNameID.classList.remove("is-valid");
      return false;
   }
}
function urlSiteValidation(){
   var uSiteRegex = /^(https?:\/\/){1}(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
      if(uSiteRegex.test(siteUrl.value)=== true){
         siteUrlErorr.classList.replace("d-block", "d-none");
         siteUrl.classList.add("is-valid");
         siteUrl.classList.remove("is-invalid");
         return true;
      }else{
         siteUrlErorr.classList.replace("d-none", "d-block");
         siteUrl.classList.add("is-invalid");
         siteUrl.classList.remove("is-valid");
         return false;
      }
   }