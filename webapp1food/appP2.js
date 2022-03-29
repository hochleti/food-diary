//?generate a new dynamic modal for recipe entered, ability to edit and contains info entered

//global variable
let recList = [];
let ingArr = [];
/*recArr data structure = [
    {
        name:cardName1,
        recipes: [{
            recName: string,
            recPS: number,
            ingredients: [{name:value, qty:value},{name:value, qty:value}],
            recTime: number,
            recDiff: value,
            recPrice: number,
            recMethod: string,
        },{
            recName: string,
            recPS: number,
            ingredients: [{name:value, qty:value},{name:value, qty:value}],
            recTime: number,
            recDiff: value,
            recPrice: number,
            recMethod: string
        }]
    },
    {
        name:cardName2,
        recipes:[{
        }
    ]}
]
*/

function updateRecList(){
    localStorage.setItem('recipes',JSON.stringify(recList))
}
function initRecList(){
    recList = JSON.parse(localStorage.getItem('recipes'))
    if(recList === null){
        recList = [];
    }
    for(let card of recList){
        saveNewCard(card.name)
        for(let recipe of card.recipes){
            newRecipe(recipe.recName,recipe.recPS,recipe.recTime,recipe.recDiff,recipe.recPrice,card.name)
        }
    }
}
//all declarations
//modals
const newCustomCardBtn = document.querySelector('#newCustomCardBtnP2')
const newRecipeBtn = document.querySelector('#newRecipeBtnP2')
const newCardModal = document.querySelector('#cardModal')
const newRecipeModal = document.querySelector('#recipeModal')
const cardModalCloser = document.querySelector('#cardModalCancel')
const recModalCloser = document.querySelector('#recModalCancel')
//card modal
const newCardNameIn = document.querySelector('#customCardIn');
const saveCardBtn = document.querySelector('#saveCardModalBtn');
const cardArea = document.querySelector('#cardArea');
//recipe modal
const ingList = document.querySelector('#ingredientCard')
const newIngInput = document.querySelector('#addIng')
const newIngQty = document.querySelector('#addIngQty')
const newIngBtn = document.querySelector('#addIngBtn')
const saveRecBtn = document.querySelector('#saveRecModalBtn')
const cardSelect = document.querySelector('#recipe-card');
const methodArea = document.querySelector('#textArea')
const editBtn = document.querySelector('#methodEditBtn')
const recNameIn = document.querySelector('#recNameIn');
const recPsIn = document.querySelector('#recPSIn');
const recTimeIn = document.querySelector('#recTimeIn');
const recDiffIn = document.querySelector('#recDiffIn');
const recPriceIn = document.querySelector('#recPriceIn');
const recSelCard = document.querySelector('#recipe-card');
initRecList()

//*modal functions and controls for P2
//opening and closing modals
newCustomCardBtn.addEventListener('click',()=>{
    newCardModal.classList.add('modal-active')
})
newRecipeBtn.addEventListener('click',()=>{
    //checks for card, if no card, error msg
    if(!cardArea.children.length){
        console.log('add a card first!');
        //needs better error message
    }else{
        newRecipeModal.classList.add('modal-active')
    }
})
cardModalCloser.addEventListener('click',()=>{
    newCardModal.classList.remove('modal-active')
    //clears fields
    newCardNameIn.value = '';
    newCardNameIn.setAttribute('placeholder','name of card')
})
recModalCloser.addEventListener('click',()=>{
    newRecipeModal.classList.remove('modal-active')
    //clears fields
    recNameIn.value = '';
    recPsIn.value = '';
    recTimeIn.value = '';
    recDiffIn.value = 'unsure'
    recPriceIn.value = '';
    recSelCard.value = 'no selection';
})

//*custom card modal contents
//save button functions
function saveNewCard(name){
    //replaces any spaces to dash in string
    const nameStr = name.replace(/\s+/g,'-');
    const newCard = document.createElement('div');
    newCard.classList.add('card')
    const newCardh3 = document.createElement('h3');
    newCardh3.textContent = name;
    const newList = document.createElement('div');
    newList.classList.add('recipelist')
    newList.classList.add(`${nameStr}`)
    const deletebtn = document.createElement('button');
    deletebtn.classList.add('deletebtn');
    deletebtn.classList.add('btn');
    deletebtn.textContent = 'delete'
    newCard.append(newCardh3);
    newCard.append(newList);
    newCard.append(deletebtn);
    cardArea.append(newCard);
    //adds option to recipe modal
    const newCardOpt = document.createElement('option');
    newCardOpt.textContent = name;
    newCardOpt.value = name;
    cardSelect.append(newCardOpt);
    //deleteBtn functions
    let deleteBtnClick = false;
    deletebtn.addEventListener('click',()=>{
        if(deleteBtnClick){
            deletebtn.textContent = 'delete';
            deleteBtnClick = false;
        }else{
            deletebtn.textContent = 'dbl click to delete';
            deleteBtnClick = true;
        }
    });
    deletebtn.addEventListener('dblclick',()=>{
        //removes card from HTML
        newCard.remove();
        newCardOpt.remove();
        //removes card from recList array
        const deleteCardArr = recList.findIndex((element)=>{
            return element.name === nameStr
        })
        console.log(deleteCardArr);
        if(deleteCardArr !== -1){
            recList.splice(deleteCardArr,1)
            console.log(recList);
            updateRecList()
        }
    });
}
//calls new card function
saveCardBtn.addEventListener('click',()=>{
    if(newCardNameIn.value == ''){
        newCardNameIn.setAttribute('placeholder','enter something!')
    }else{
        saveNewCard(newCardNameIn.value)
        //modal close, clear fields
        newCardModal.classList.remove('modal-active')
        newCardNameIn.setAttribute('placeholder','name of card')
        //add to localstorage recArr
        recList.push({
            name: newCardNameIn.value,
            recipes:[]
        })
        updateRecList();
        newCardNameIn.value = '';
    }
})

//*recipe modal contents
//creation of new recipe block
function newRecipe(name,ps,time,diff,price,card){ 
    const newRecBlock = document.createElement('div');
    newRecBlock.classList.add('recipelistblock');
    const newRecName = document.createElement('span');
        newRecName.textContent = name;
    const newRecPs = document.createElement('span');
        newRecPs.textContent = ` for ${ps}` //*this has bugs when called from localstorage idky
    const newRecTime = document.createElement('p');
        if(time<60){
            newRecTime.textContent = `${time}min `;
        }else if((time%60)==0){
            newRecTime.textContent = `${time/60}hr `;
        }else{
            newRecTime.textContent = `${Math.floor(time/60)}hr${time%60}min `}
    const newRecDiff = document.createElement('span');
        newRecDiff.textContent = `${diff} `;
    const newRecPrice = document.createElement('span');
        newRecPrice.textContent = `$${price}, `;
    newRecBlock.append(newRecName);
    newRecName.append(newRecPs);
    newRecTime.append(newRecPrice);
    newRecTime.append(newRecDiff);
    newRecBlock.append(newRecTime);
    newRecBlock.style.cursor = 'pointer'
    //adds new recipe to selected card
    const cardStr = card.replace(/\s+/g,'-');
    const cardList = document.querySelector(`.${cardStr}`);
    cardList.append(newRecBlock)

    //deletes itself with dbl click
    newRecBlock.addEventListener('dblclick',()=>{
        newRecBlock.remove();
        //remove from localstorage array
        const cardSel = recList.findIndex((e)=>{
            return e.name === card
        })
        const recListArr = recList[cardSel].recipes
        const deleteRec = recListArr.findIndex((e)=>{
            return e.recName === name
        })
        if(deleteRec !== -1){
            recListArr.splice(deleteRec,1)
            updateRecList()
        }
    })
}
//calls create new recipe func
saveRecBtn.addEventListener('click',()=>{
    //if statement for if fields are empty
    if(recNameIn.value==''||recPsIn.value==''||recTimeIn.value==''||recPriceIn.value==''){
        //*make another error msg that looks better
        alert('please enter values')
    }else{
        newRecipe(recNameIn.value,recPsIn.value,recTimeIn.value,recDiffIn.value,recPriceIn.value,recSelCard.value);
        newRecipeModal.classList.remove('modal-active');
        
        //*adds data to localstorage array
        const cardSel = recList.findIndex((card)=>{
            return card.name === recSelCard.value
        })
        if(cardSel !== -1){
            recList[cardSel].recipes.push({
                recName: recNameIn.value,
                recTime: recTimeIn.value,
                recDiff: recDiffIn.value,
                recPrice: recPriceIn.value,
                recPs: recPsIn.value,
                recMethod: methodArea.textContent,
                ingredients: ingArr
            });
            updateRecList()
        }
        //clears fields to default
        recNameIn.value = '';
        recPsIn.value = '';
        recTimeIn.value = '';
        recDiffIn.value = 'unsure'
        recPriceIn.value = '';
        recSelCard.value = 'no selection';
        methodArea.innerHTML = "1. click the + button to edit<br>2. mix flour and eggs together";
        ingList.innerHTML = '';
    }
})

//*recipe modal contents
//adding ingredient and qty to ingredients card function
function addIng(ing,qty){
    //create item div
    const newIng = document.createElement('div')
    newIng.classList.add('strikethrough')
    newIng.classList.toggle('strikethrough')
    newIng.textContent = ` ${ing}`
    const newQty = document.createElement('span')
    newQty.textContent = `x${qty} `
    newIng.prepend(newQty)
    ingList.append(newIng)
    newIng.style.cursor = 'crosshair'
    
    //*pushes inputs to ingArr
    ingArr.push({
        name: ing,
        qty: qty
    })

    //new item deletion and strikethrough
    newIng.addEventListener('click',()=>{
        newIng.classList.toggle('strikethrough')
    })
    newIng.addEventListener('dblclick',()=>{
        newIng.remove();
        //removes from ingArr
        const ingSel = ingArr.findIndex((ing)=>{
            return ing.name === ing
        })
        ingArr.splice(ingSel,1)
    }) 
    
}
//*adds ingredient to card and ingArr
newIngBtn.addEventListener('click',()=>{
    if(newIngInput.value == ''||newIngQty.value == ''){
        newIngInput.setAttribute('placeholder','enter an ingredient!')
        newIngQty.setAttribute('placeholder','null')
    }else{
        addIng(newIngInput.value,newIngQty.value)
        newIngInput.value = '';
        newIngInput.setAttribute('placeholder','ingredient')
        newIngQty.value = ''
        newIngQty.setAttribute('placeholder','qty')
    }
})

//make method area contenteditable
editBtn.addEventListener('click',()=>{
    methodArea.setAttribute('contenteditable','true')
    //console.log(methodArea.textContent)
    //*output methodArea.textcontent to localstorage or JSON file??
})
methodArea.addEventListener('focusout',()=>{
    methodArea.setAttribute('contenteditable','false')
    console.log(methodArea.textContent);
})