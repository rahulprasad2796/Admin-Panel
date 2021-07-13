
var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';


//added only class to some html elements

$(document).ready(function(){
    let tbody = $("tbody");
    let $input = $("input");
    let getTr = [];

    $.get(url, function(getdata){
        
        getdata.map(v => make(v)); //makes the table on load


        $("tr").click(function(){ //click function to highlight the row on click

            $("tr").removeClass("active");

            this.classList.add("active"); //got funny
        })
        
        $input.on({
            "input": function(e){
                //$input.input was not working

                e.preventDefault();
                let ned = getdata.filter(v => v.firstName.toLowerCase().includes(this.value) === true || 
                v.lastName.toLowerCase().includes(this.value) === true ||  
                v.email.toLowerCase().includes(this.value) === true);
                //works on lastName and email too

                $(".data-row").css("display", "none"); //on input change to "" everything goes back to normal
                ned.map(v => make(v));

                $("tr").click(function(){

                    $("tr").removeClass("active");
        
                    this.classList.add("active"); //got funny
                })
            }
        })
    })

   
    function make(data) {
        let tr = $("<tr>").addClass("data-row");
        tr.click(function(){
            
            $("#info-content").css("display", "block");
            $("textarea").html(data.description);
            $("#fullname").html(data.firstName + " " + data.lastName);
            $("#street").html(data.address.streetAddress);
            $("#city").html(data.address.city);
            $("#state").html(data.address.state);
            $("#zip").html(data.address.zip);
        })
        
        let td1 = $("<td>").html(data.id).addClass("column1");
        let td2 = $("<td>").html(data.firstName).addClass("column2");
        let td3 = $("<td>").html(data.lastName).addClass("column3");
        let td4 = $("<td>").html(data.email).addClass("column4");
        let td5 = $("<td>").html(data.phone).addClass("column5");
        tr.append(td1, td2, td3, td4, td5);
        getTr.push(tr);
        tbody.append(tr);
    }

})
