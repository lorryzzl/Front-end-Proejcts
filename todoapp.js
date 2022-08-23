function add(){
    let list1=document.getElementsByClassName("todolist")[0];
    let list2=document.getElementsByClassName("deletelist")[0];
    let list3=document.getElementsByClassName("editlist")[0];
    let text=document.getElementsByClassName("todo")[0].value;
    let listhtml=`
        <li class="todoitem">
            ${text}
        </li>
    `
    if (text!=""){
        list1.innerHTML+=listhtml;
        document.getElementsByClassName("todo")[0].value="";

        let deltbutnhtml=`
        <div class="deletediv" onclick="deleteitem()">Delete</div>
        `
        list2.innerHTML+=deltbutnhtml;

        let editbutnhtml=`
        <div class="editdiv" onclick="edititem()">Edit</div>
        `
        list3.innerHTML+=editbutnhtml;

        let list4=document.getElementsByClassName("marklist")[0];
        let markbutnhtml = `
            <div class="markbutn" onclick="mark()">Done</div>
        `
        list4.innerHTML+=markbutnhtml;
    }
}

function deleteitem(){
    var removebutn = event.target;
    var list1 = Array.prototype.slice.call(document.getElementsByClassName("todolist")[0].children);
    var list2 = Array.prototype.slice.call(document.getElementsByClassName("deletelist")[0].children);
    var list3 = Array.prototype.slice.call(document.getElementsByClassName("editlist")[0].children);
    var list4 = Array.prototype.slice.call(document.getElementsByClassName("marklist")[0].children);
    var index = list2.indexOf(removebutn);
    console.log(index);
    removebutn.remove();
    var removetodo = list1[index];
    removetodo.remove();
    var removeedit = list3[index];
    removeedit.remove();
    var removemark = list4[index];
    removemark.remove();
}

function deleteall(){
    var list1 = document.getElementsByClassName("todolist")[0];
    var list2 = document.getElementsByClassName("deletelist")[0];
    var list3 = document.getElementsByClassName("editlist")[0];
    var list4 = document.getElementsByClassName("marklist")[0];
    list1.innerHTML="";
    list2.innerHTML="";
    list3.innerHTML="";
    list4.innerHTML="";
}

function edititem(){
    var editbutn = event.target;
    var list3 = Array.prototype.slice.call(document.getElementsByClassName("editlist")[0].children);
    var index = list3.indexOf(editbutn);
    console.log(index);
    var list1 = Array.prototype.slice.call(document.getElementsByClassName("todolist")[0].children);
    var todoitem = list1[index];
    var text = todoitem.textContent;
    let edithtml = `
        <input type="text" class="editinput" value=${text}>
        &nbsp;&nbsp;
        <div class="notice">Press "Enter" to save changes</div>
    `
    todoitem.innerHTML=edithtml;
    todoitem.addEventListener("keydown", event => {
        if(event.key == "Enter") {
            event.preventDefault();
            mykeydown(event);
        } 
    });
    editbox = document.getElementsByClassName("editinput")[0];
    newtodobox = document.getElementsByClassName("todo")[0];
    if (editbox!=null){
        newtodobox.style.pointerEvents = "none";
    }
}

function mykeydown(event){
    var code = event.keyCode;
    console.log(code);
    if (code==13){
        var myedititem = event.target;
        var myeditinput = myedititem.value;
        let changehtml=`
            ${myeditinput}
        `
        console.log(changehtml);
        let parent = myedititem.parentElement.closest('li');
        parent.innerHTML=changehtml;
        newtodobox = document.getElementsByClassName("todo")[0];
        newtodobox.style.pointerEvents = "auto";
    }
}

function openNav(){
    let nav = document.getElementsByClassName("done")[0];
    nav.style.visibility = "visible";
    nav.style.width = "280px";
    nav.style.display = "block";
    let openbutn = document.getElementById("opennavbutn");
    openbutn.style.transitionDelay= "0s";
    openbutn.style.visibility="hidden";
    let finishtitle = document.getElementById("finishtitle");
    finishtitle.style.visibility = "visible";
    let donelist = document.getElementsByClassName("donelist")[0];
    donelist.style.visibility = "visible";
    let closebutn = document.getElementsByClassName("closebutn")[0];
    closebutn.style.visibility = "visible";
}

function closeNav(){
    let nav = document.getElementsByClassName("done")[0];
    nav.style.visibility = "hidden";
    nav.style.width = "0px";
    let openbutn = document.getElementById("opennavbutn");
    openbutn.style.transitionDelay= "0.5s";
    openbutn.style.visibility="visible";
    let finishtitle = document.getElementById("finishtitle");
    finishtitle.style.transitionDelay = "0.2s";
    finishtitle.style.visibility = "hidden";
    let donelist = document.getElementsByClassName("donelist")[0];
    donelist.style.transitionDelay = "0.2s";
    donelist.style.visibility = "hidden";
    let closebutn = document.getElementsByClassName("closebutn")[0];
    closebutn.style.transitionDelay = "0.2s";
    closebutn.style.visibility = "hidden";
}

function mark(){
    let butns = document.getElementsByTagName("button");
    for (let i = 0; i < butns.length; i++) {
        butns[i].style.pointerEvents="none";
    }
    let target = event.target;
    var mydonelist = document.getElementsByClassName("donelist")[0];
    var list4 = Array.prototype.slice.call(document.getElementsByClassName("marklist")[0].children);
    var index = list4.indexOf(target);
    var list1 = Array.prototype.slice.call(document.getElementsByClassName("todolist")[0].children);
    let todoitem = list1[index].textContent;
    todo = list1[index];
    let confirmitem = `
        <div class="confirm">
            <span class="confirmtext">Mark this to-do as "done"?</span>
            <span class="confirmbutn">Yes</span>
            <span class="cancelbutn">No</span>
        </div>
    `
    todo.innerHTML = confirmitem;
    let confirmbutn = document.getElementsByClassName("confirmbutn")[0];
    confirmbutn.addEventListener("click", function(){
        let doneitem = `
        <li>
            ${todoitem}
        </li>
        `;
        mydonelist.innerHTML+=doneitem;
        target.remove();
        todo.remove();
        Array.prototype.slice.call(document.getElementsByClassName("editlist")[0].children)[index].remove();
        Array.prototype.slice.call(document.getElementsByClassName("deletelist")[0].children)[index].remove();
        let butns = document.getElementsByTagName("button");
        for (let i = 0; i < butns.length; i++) {
            butns[i].style.pointerEvents="auto";
        }
    });
    let cancelbutn = document.getElementsByClassName("cancelbutn")[0];
    cancelbutn.addEventListener("click", function(){
        todo.innerHTML = todoitem;
        let butns = document.getElementsByTagName("button");
        for (let i = 0; i < butns.length; i++) {
            butns[i].style.pointerEvents="auto";
        }
    });
}