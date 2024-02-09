const addBtn = document.getElementById("add");

const show = document.getElementById("show");
show.addEventListener("click", ()=> {
   
    const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
    notes.forEach(note=>{
        addNewNote(note);
    })
}
else{
    alert("No Note Right Now. Press Add Note")
};
});
const deleteBtn = document.getElementById("delete-all");
deleteBtn.addEventListener("click", ()=> {
    if(confirm("are you sure")) {
        localStorage.removeItem("notes");
    };
    
});

addBtn.addEventListener("click", ()=> {
    addNewNote();
});

function addNewNote(text="") {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = ` <div class="notes">
      <div class="tools">
      <button class="save" data-tip="save for later"> <i class="fa-solid fa-sd-card"></i></button>
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
       
      
      </div>
      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class=" ${text ? 'hidden' : ''}"></textarea>
    </div>
    `
   const saves = note.querySelectorAll(".save");
   saves.forEach(save=>{save.addEventListener("click", ()=> {
    const txtValue = save.parentElement.parentElement.children[2].value;
    console.log(txtValue);
    updateLS(txtValue);
   })});

    const noteEl= note.querySelector(".notes");
const mainEl = noteEl.querySelector(".main");
const textArea =noteEl.querySelector("textarea");
textArea.value = text;
mainEl.innerHTML = marked.parse(text)
const editBtn = note.querySelector(".edit");
const deleteBtn = note.querySelector(".delete");
editBtn.addEventListener("click", ()=> {
    mainEl.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
});
deleteBtn.addEventListener("click", ()=>{
    note.remove();
    // updateLS();
})
textArea.addEventListener("input", (e)=> {
    const { value } = e.target;
   
    mainEl.innerHTML = marked.parse(value);
    // updateLS() ;
});
 document.body.appendChild(note);
}
function updateLS(some) {
    
    const notes = [];
    // const notesText = document.querySelectorAll("textarea");
    // notesText.forEach(note=> {
    //     notes.push(note.value);
    // });


    const oldNotes = JSON.parse(localStorage.getItem("notes"));
    if (oldNotes) {
        oldNotes.forEach( oldnote => {
            notes.push(oldnote);
            return notes;
        })
    }
        notes.push(some);
        localStorage.setItem("notes", JSON.stringify(notes));
}

