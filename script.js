var allSelect = document.getElementsByClassName("first");
var allQut = document.getElementsByClassName("quantite");
var allTLine = document.getElementsByClassName("totLine");
var toTotalCase = document.getElementById("toTotal");
var inputSelect;
var index = 0;
var elementTotal = 0;
var elementQuantite = 0;
var elementPrixUnitaire = 0;
var total = 0;
var selectId;
var sum = 0;
var pTotalId = ""; 
var infoArticle = [
    [0, 1233, 3455, 5677, 7899, 1111, 6666],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 10, 20, 30, 2, 11, 15],
    [0, 0, 0, 0, 0, 0, 0],
];


for (i=0; i<allSelect.length; i++)
{         
    allSelect[i].addEventListener("change", function() 
    {   
        selectId = this.id;  
        index =  this.options.selectedIndex;

        var elementSelect = document. getElementById(selectId);
        var trSelect = elementSelect.parentNode.parentNode;  
        inputSelect = trSelect.getElementsByTagName("input");
        

        remplirForm();                    
    }) 
}

for (i=0; i<allQut.length; i++)
{
    allQut[i].addEventListener("change", function()   
    {   
        var qutId = "";   
        var pUnitId = "";
        var pTotalId = "";
        switch(this.id)
        {
            case "qut1":
                pUnitId = "pu1";
                qutId = "qut1";
                pTotalId ="p1";
            break;

            case "qut2":
                pUnitId = "pu2";
                qutId = "qut2";
                pTotalId ="p2";
            break;

            case "qut3":
                pUnitId = "pu3";
                qutId = "qut3";
                pTotalId ="p3";
            break;

            case "qut4":
                pUnitId = "pu4";
                qutId = "qut4";
                pTotalId ="p4";
            break;

            case "qut5":
                pUnitId = "pu5";
                qutId ="qut5";
                pTotalId = "p5";
            break;

            case "qut6":
                pUnitId = "pu6";
                qutId = "qut6";
                pTotalId = "p6";
            break;

            default:
                pTotalId = "";
            break;
        }
        elementTotal = document.getElementById(pTotalId);
        elementQuantite = document.getElementById(qutId).value;
        elementPrixUnitaire = document.getElementById(pUnitId).value;
        
        calcTotalLigne();            
    });     
}

for (i=0; i<allTLine.length; i++)
{
    allQut[i].addEventListener("focusout", function(){
        calcToTotal();
    });
}


function remplirForm()
{
    for (j=0; j<3; j++)
        {
            inputSelect[j].value = infoArticle[j][index];
        }
}

function calcTotalLigne()
{
    total = elementQuantite * elementPrixUnitaire;
    elementTotal.value = total; 

    return total;
}

function calcToTotal()
{
    for (k=0; k<allTLine.length; k++)
    {
        if (allTLine[k].value != "")
        {
            sum = parseInt(sum) + parseInt(allTLine[k].value);
            console.log(sum);
            toTotalCase.value = sum;           
        }      
    }
    sum = 0;  
}
