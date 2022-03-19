//?image upload function
//?find out how to store data in another local file or server and how to not reset pages every time it is refreshed

//modal opening and closing
const newEntryModal = document.querySelector('#newEntryModal');
const newEntryBtn = document.querySelector('#newEntryBtn');
const newEntrySave = document.querySelector('#newEntrySave');
const newEntryCancel = document.querySelector('#newEntryCancel');
newEntryBtn.addEventListener('click',()=>{
    newEntryModal.classList.add('modal-active')
})
newEntryCancel.addEventListener('click',()=>{
    newEntryModal.classList.remove('modal-active')
})

//make textarea in modal editable
const entryLogText = document.querySelector('#entryLogTextArea');
entryLogText.addEventListener('dblclick',()=>{
    entryLogText.setAttribute('contenteditable','true')
})
entryLogText.addEventListener('focusout',()=>{
    entryLogText.setAttribute('contenteditable','false')
})

//info to be collected for each new entry:
const entryArr = [{
    entryName:"",
    imgsrc: "",
    rating: "selection",
    dateOfEntry: "",
    venue:"",
    chefName:"",
    mealType:"",
    worthIt: `${Boolean}`,
    foodContains:"selection",
    logText:""
}]

