var addButton = document.getElementById("button-new");
var removeButton = document.getElementById("button-remove");
var allSelect = document.querySelectorAll("select");
var allInputs = document.querySelector("input.quantite");
var allSelOptions = document.querySelectorAll("option");
var allQut = document.getElementsByClassName("quantite");
var allTLine = document.getElementsByClassName("input-total-line");
var toTotalCase = document.getElementById("toTotal");
var UI = document.getElementById("u-interface");
var divInputs = document.getElementById(`all-inputs ${numLigne}`);
var inputsLine = document.getElementsByClassName(`order-form-field ligne ${numLigne}`);
var qutElement;
var refElement;
var puElement;
var pElement;
var numLigne = 0;
var index = 0;
var elementTotal = 0;
var elementQuantite = 0;
var elementPrixUnitaire = 0;
var total = 0;
var selectId;
var sum = 0;
var pTotalId = ""; 
var infoArticle = [
    [0, 0, 0, 0],
    [1233, 0, 10, 0],
    [3455, 0, 20, 0],
    [5677, 0, 30, 0],
    [7899, 0, 2, 0],
    [1111, 0, 11, 0],
    [6666, 0, 15, 0]
]
optionLibelles = [
    "Choisissez votre livre",
    "Le grand livre de Javascript",
    "HTML encore plus vite",
    "Windows NT4.0",
    "Le Kit de Ressource technique de NT",
    "Formation Java",
    "Comment créer son site Web"
]

//Création des élements du formulaire
function addElement()
{  
    numLigne++;

    //La div contenant le formulaire
    var inputs = document.createElement("div");
    inputs.id ="all-inputs" + numLigne;
    inputs.setAttribute("class", "inputs");

    //Le select ainsi que les options qui s'y rattachent
    var newSelect = document.createElement("select");
    newSelect.id ="select-item" + numLigne;
    newSelect.setAttribute("class", "select-element");
    for (i=0; i<optionLibelles.length; i++) 
    {
        var Option = document.createElement("option");
        Option.text = optionLibelles[i];
        newSelect.add(Option, null);
    }  
    
    //Les inputs relatifs à la réference
    var inputRef = document.createElement("input");
    inputRef.setAttribute("type", "text");
    inputRef.id = "input-ref" + numLigne;
    inputRef.setAttribute("disabled", "disabled");
    inputRef.classList.add("order-form-field", "ligne"+numLigne);
    //La quantité
    var inputQut = document.createElement("input");
    inputQut.setAttribute("type", "number");
    inputQut.id = "input-qut" + numLigne;
    inputQut.classList.add("order-form-field", "ligne"+numLigne);
    inputQut.classList.add("quantite");
    //Le prix unitaire
    var inputPu = document.createElement("input");
    inputPu.setAttribute("type", "number");
    inputPu.id = "input-pu" + numLigne;
    inputPu.classList.add("order-form-field", "ligne"+numLigne); 
    inputPu.setAttribute("disabled", "disabled");
    //Et le total par ligne
    var inputP = document.createElement("input");
    inputP.setAttribute("type", "number");
    inputP.id = "input-p" + numLigne;
    inputP.setAttribute("class", "input-total-line"+numLigne);
    inputP.setAttribute("disabled", "disabled");

    //Les différents élements crées sont insérés dans le DOM
    UI.insertAdjacentElement("beforebegin", inputs);
    inputs.insertAdjacentElement("afterbegin", newSelect); 
    inputs.insertAdjacentElement("beforeend", inputRef);
    inputs.insertAdjacentElement("beforeend", inputQut);
    inputs.insertAdjacentElement("beforeend", inputPu);
    inputs.insertAdjacentElement("beforeend", inputP);  
}


//Création des events placés sur des selecteurs puis ciblés par le biais de l'event.target 
function addEvent(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e)
    })
}

//La ligne est remplie en fonction du bouton select utilisé. 
//Si l'option par défaut est sélectionnée, la ligne est remise à zéro et le total recalculé. 
addEvent("change", "select", e => 
{
    selectId = e.target.id;
    numSelectId = selectId.substring(11, selectId.length); 
    index =  e.target.options.selectedIndex;
    
    var refElement = document.getElementById(`input-ref${numSelectId}`);
    var qutElement = document.getElementById(`input-qut${numSelectId}`);
    var puElement = document.getElementById(`input-pu${numSelectId}`);
    var pElement = document.getElementById(`input-p${numSelectId}`);

    switch(e.target.id)
    {
        case selectId:
            refElement.value = infoArticle[index][0];
            qutElement.value = infoArticle[index][1];
            puElement.value = infoArticle[index][2];
           
        break;  

        default:
            console.log("error");
        break;
    }
 
    //Reset ligne
    if (index == 0)
    {
        allTLine = document.querySelectorAll(`input.input-total-line${numSelectId}`);
        for (k=0; k<allTLine.length; k++)
        {
            if (allTLine[k].value !== "")
            {
                pElement = document.getElementById(`input-p${numSelectId}`);
                sum = parseInt(sum) - parseInt(pElement.value);
                toTotalCase.value = sum; 
            }      
        }  
        pElement = document.getElementById(`input-p${numSelectId}`);
        pElement.value = infoArticle[index][3];  

        divInputs = document.getElementById(`all-inputs${numSelectId}`);
        divInputs.remove();
    }
    else
    {
        e.target.options[e.target.selectedIndex].disabled = true;
        optionLibelles.splice(index, 1);  
        infoArticle.splice(index, 1);
    }
})


//Le total par ligne est calculé lorsque la quantité est modifiée
addEvent("change", "input.quantite", e =>
{
    var numQutId = e.target.id.substring(9, e.target.id.length); 
    puElement = document.getElementById(`input-pu${numQutId}`);
    pElement = document.getElementById(`input-p${numQutId}`);
    var nbArticle = e.target.value;
    var prixBase = puElement.value;

    total = nbArticle * prixBase;
    pElement.value = total; 
    
    return total;
}) 

//L'input quantité est clear lors de la 1ère saisie
addEvent("focusin", "input", e =>
{
    if (e.target.value == 0) 
    { 
        e.target.value = ''; 
    }

})

//Les totaux sont calculé lorsque la saisie de la quantité est terminée
addEvent("focusout", "input", e =>
{
    allTLine = document.querySelectorAll(`input.input-total-line${numLigne}`);
    console.log(allTLine);

    for (k=0; k<allTLine.length; k++)
    {
        if (allTLine[k].value !== "")
        {
            pElement = document.getElementById(`input-p${numLigne}`);
            sum = parseInt(sum) + parseInt(pElement.value);
            toTotalCase.value = sum; 
        }      
    }

})

addButton.addEventListener("click", addElement);

