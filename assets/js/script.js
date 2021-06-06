//login
$(".field_input").focus(function() { $($(this).parent()[0]).css("border-bottom", "2px solid #f8c365"); });
$(".field_input").focusout(function() { $($(this).parent()[0]).css("border-bottom", "2px solid #C77136"); });

$("#bt").on("click", () => {
    $.ajax({
        url: "/do_login",
        method: "POST",
        data: { user: $($(".field_input")[0]).val(), pwd: $($(".field_input")[1]).val() }
    }).done((response) => {
        if(response["status"] === 0){
            window.location.href = "profile"
        }
        else{
            alert("Login mal")
        }
        // console.log(response);
        // $($(".field_input")[0]).val("");              
        // $($(".field_input")[1]).val("");
    });
});
//login

//registar
$(".check").click(function(){
    $(".check").each(function() { if(!$($(this).children()[0]).hasClass("hide")) { $($(this).children()[0]).addClass("hide"); } });
    $($(this).children()[0]).removeClass("hide");
});

$(".drop_arrow").click(function() {
    //$($($(this).parent()[0]).parent()).children()[0]
    console.log($($($(this).parent()[0]).parent()).children()[0]);
});

function add_options(){

}

$(".r").click(() => {
    let div = document.createElement("div");
    let select = document.createElement("select");
    let div2 = document.createElement("div");
    let img = document.createElement("img");

    $(select).attr("name", "alergies");
    $(select).attr("id", "3");
    $(select).attr("class", "drop");

    $(div).attr("class", "alergie");
    $(div2).attr("class", "wrap");

    $(img).attr("src", "assets/icons/chevron-pointing-to-the-left.png");
    $(img).attr("alt", "arrow");
    $(img).attr("class", "drop_arrow");

    div2.appendChild(img);
    div.appendChild(select);
    div.appendChild(div2);

    $(".alergies")[0].append(div);
})

$(".bt_register").click(() => {
    if($($(".field_input")[2]).val() == $($(".field_input")[3]).val()){
        //console.log($($(".field_input")[2]).val());
        let gender = "";
        let alergies = new Array();

        $(".check").each(function() {
            if(!$($(this).children()).hasClass("hide")){
                gender = String($($($(this).parent()).children()[0]).text()).substr(0, 1) 
            } 
        });

        $(".alergie").each(function() {
            let value = parseInt($($($(this).children()[0]).children("option:selected")).val());
            if(!alergies.includes(value) && value != -1 ){
                alergies.push(value)
            }
        });

        let data = {
            user: $($(".field_input")[0]).val(),
            email: $($(".field_input")[1]).val(),
            pwd: $($(".field_input")[2]).val(),
            age: $($(".field_input")[3]).val(),
            gender: gender,
            alergies: alergies
        }

        $.ajax({
            url: "/do_regist",
            method: "POST",
            dataType: "JSON",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done((response) => {
            console.log(response);
        })
    }
    else{
        console.log("Passwords diferentes");
    }
})

$("#profile").click(() => {
    if(window.location.pathname != "/profile"){
        window.location.href = "/profile"
    }
})

$("#alergies").click(() => {
    if(window.location.pathname != "/alergies"){
        window.location.href = "/alergies"
    }
})

$("#stats").click(() => {
    if(window.location.pathname != "/stats"){
        window.location.href = "/stats"
    }
})

$("#leave").click(() => {
    //do_logout()
    window.location.href = "/login"
})

function collapse_sidebar(flag){ //false para encolher | true para estender
    if(!flag){
        $($($("#menu").parent()).parent()[0]).addClass("collapse");

        $(".bt_bar").each(function() {
            $(this).addClass("hide")
        });

        $("#menu").removeClass("icon_wrap").addClass("wrap_icon_collapsed");

        $(".row").each(function() {
            $($(this).children()[0]).removeClass("wrap_icon").addClass("wrap_icon_collapsed");
        });

        $(".pfcontent").css("width", "97%");

        flag = true;
    }
    else{
        $($($("#menu").parent()).parent()[0]).removeClass("collapse");
        $(".bt_bar").each(function() {
            $(this).removeClass("hide")
        })

        $("#menu").removeClass("wrap_icon_collapsed").addClass("icon_wrap");

        $(".row").each(function() {
            $($(this).children()[0]).removeClass("wrap_icon_collapsed").addClass("wrap_icon");
        });

        $(".pfcontent").css("width", "80%");

        flag = false;
    }
}

let flag = false;
$("#menu").click(function() {
    collapse_sidebar(flag)
    flag = !flag;
})

$("#prompt").click(() => {
    var input = document.createElement('input');
    input.type = 'file';
    
    input.onchange = e => { 
       var file = e.target.files[0]; 
       console.log(file);
    //    $("#pfp").attr("src", )
    }
    
    input.click();
})

let changed = false;
$(window).resize(() => {
    if($(window).width() <= 1034 && !changed){
        collapse_sidebar(flag);
        flag = !flag;
        changed = true
    }
    else if($(window).width() >= 1034 && changed){
        collapse_sidebar(flag);
        flag = !flag;
        changed = false;
    }
});