//?image upload function

//*info to be collected for each new entry:
const entryArr = [{
    title:"",
    imgsrc: "",
    rating: "selection",
    dateOfEntry: "",
    venue:"",
    chefName:"",
    mealType:"",
    worthIt: `${Boolean}`,
    foodContains:"selection",
    logText:""
}];

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
});
entryLogText.addEventListener('focusout',()=>{
    entryLogText.setAttribute('contenteditable','false')
});

//star rating bar 
//*change fill of stars with svg path property of stroke
const rating = document.querySelector("#star-rating");

//insert data collected to card appended





