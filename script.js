const allSelect = document.querySelectorAll("select");
const allOption = document.querySelectorAll("option");
const allTr = document.querySelectorAll("tr");
const totalAllCase = document.getElementById("toTotal");
var infoArticle = [
    [0, 1233, 3455, 5677, 7899, 1111, 6666],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 10, 20, 30, 2, 11, 15],
];

for (i=0; i<=allSelect.length; i++)
{
    allSelect[i].addEventListener("change", function() 
    {   
        var selectId = this.id;
        var elementSelect = document. getElementById(selectId);
        var trSelect = elementSelect.parentNode.parentNode; 
        var inputSelect = trSelect.getElementsByTagName("input");
        var index =  this.options.selectedIndex;

        for (j=0; j<3; j++)
        {
            inputSelect[j].value = infoArticle[j][index];
        }        
        inputSelect[1].addEventListener("change", function()   
        {          
            var total = inputSelect[1].value * inputSelect[2].value;
            inputSelect[3].value = total;
           
            if (totalAllCase.value == 0) 
            {                    
                totalAllCase.value = +inputSelect[2].value;            
            }
            else
            { 
                var nTotal = parseInt(totalAllCase.value, 10);
                nTotal += +inputSelect[2].value; 
                totalAllCase.value = nTotal;
            }
        })
    })
}




