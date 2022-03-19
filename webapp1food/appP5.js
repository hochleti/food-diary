//?build the search bar and make it work
//?make strikethrough class work so that when page is refreshed, items that are striked will still have class of strikethrough

//gloabl variable
let shoppingListArr = [];
/*
shoppingListArr = [
    {
        "items":[
            name : value,
            qty : value
        ]
        "name": "value"
    }
]
*/

function updateShoppingLiStor(){
    localStorage.setItem('shoppingList',JSON.stringify(shoppingListArr))
}
function initShoppingLi(){
    shoppingListArr = JSON.parse(localStorage.getItem('shoppingList'))
    if(shoppingListArr === null){
        shoppingListArr = [];
    }
    for(let category of shoppingListArr){
        newCategoryP5(category.name)
        console.log(category);
        for(let item of category.items){
            newItem(item.name,item.qty,category.name)
        }
    }
}
//elements declaration
const catArea = document.querySelector('#dynamicContainer')
const newCatBtn = document.querySelector('#addCatBtnP5')
const newCatIn = document.querySelector('#addCatInP5')
const catOpt = document.querySelector('#categoryP5')
const h3txt = document.querySelector('#h3')
const newItemIn = document.querySelector('#newItemInP5')
const newItemCatSel = document.querySelector('#categoryP5')
const newItemQty = document.querySelector('#qtyInP5')
const newItemBtn = document.querySelector('#addItemBtnP5')
initShoppingLi()

//creation of new category func
function newCategoryP5(catName){
    h3txt.textContent = 'all categories'
    //newCatCard contents
    const newCatCard = document.createElement('div')
    newCatCard.classList.add('cat-card')
    const catCardHeader = document.createElement('h3')
    catCardHeader.textContent = catName
    const catCardList = document.createElement('div')
    catCardList.classList.add('items-area')
    //change any spaces in string to dash
    const catNameStr = catName.replace(/\s+/g,'-')
    catCardList.classList.add(`${catNameStr}`)
    const catCardDelete = document.createElement('button')
    catCardDelete.classList.add('deletebtn')
    catCardDelete.classList.add('btn')
    catCardDelete.textContent = 'delete'
    //adds newcategory to option list
    const newCatOpt = document.createElement('option')
    newCatOpt.textContent = catName
    newCatOpt.value = catName
    catOpt.append(newCatOpt)
    //appends items to HTML
    newCatCard.append(catCardHeader);
    newCatCard.append(catCardList);
    newCatCard.append(catCardDelete);
    catArea.append(newCatCard);
    //action for deletebutton
    catCardDelete.addEventListener('click',()=>{
        if(catCardDelete.textContent == 'dbl click to delete'){
            catCardDelete.textContent = 'delete'
        }else{catCardDelete.textContent = 'dbl click to delete'
        }})
    catCardDelete.addEventListener('dblclick',()=>{
        newCatCard.remove();
        newCatOpt.remove();
        //removes category from shoppingListArr
        const deleteCatStor = shoppingListArr.findIndex((element)=>{
            return element.name === catName
        })
        if(deleteCatStor !== -1){
            shoppingListArr.splice(deleteCatStor,1)
            console.log(shoppingListArr);
            updateShoppingLiStor();
        }
    })
}
//calls new category function
newCatBtn.addEventListener('click',()=>{
    if(newCatIn.value == ''){
        newCatIn.setAttribute('placeholder','enter something!')
    }else{
        newCategoryP5(newCatIn.value);
        shoppingListArr.push({
            name: newCatIn.value,
            items:[]
        })
        updateShoppingLiStor();
        newCatIn.value = '';
    }})
//creating new items func
function newItem(item,qty,cat){
    const newItem = document.createElement('span')
    const cross = document.createElement('span')
    cross.innerHTML = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L13.3137 13.3137" stroke="black" stroke-width="3"/><path d="M13.3137 2L2.00001 13.3137" stroke="black" stroke-width="3"/></svg>`
    newItem.textContent = ` ${item} x${qty}`
    newItem.prepend(cross);
    newItem.classList.add('strikethrough');
    newItem.classList.toggle('strikethrough');
    newItem.style.cursor = 'default'

    //appends new item to selected category,changes spaces to dashes in classList
    const itemSelCat = document.querySelector(`.${cat.replace(/\s+/g,'-')}`)
    itemSelCat.append(newItem)

    //actions for cross btn
    cross.style.cursor = 'pointer'
    cross.addEventListener('click',()=>{
        newItem.classList.toggle('strikethrough')
    })
    cross.addEventListener('dblclick',()=>{
        newItem.remove()
        //remove from localstorage array
        const x = shoppingListArr.findIndex((element)=>{
            return element.name === cat
        })
        const itemsArr = shoppingListArr[x].items
        const deleteItemStor = itemsArr.findIndex((ele)=>{
            return ele.name === item
        })
        if(deleteItemStor !== -1){
            itemsArr.splice(deleteItemStor,1)
            updateShoppingLiStor()
        }
    })
}
//action for calling new item func
newItemBtn.addEventListener('click',()=>{
    if(newItemIn == ''||newItemQty == ''||newItemCatSel == 'no selection'){
        newItemIn.setAttribute('placeholder','enter an item')
        newItemQty.setAttribute('placeholder','0')
    }else{
        newItem(newItemIn.value,newItemQty.value,newItemCatSel.value)
        //pushes item to card in shoppingListArr
        const category = shoppingListArr.find((element)=>{
            return element.name === newItemCatSel.value
        })
        if(category){
            category.items.push({
                name:newItemIn.value,
                qty:newItemQty.value
            })
            updateShoppingLiStor()
        }
        newItemIn.value = ''
        newItemQty.value = ''
    }})



