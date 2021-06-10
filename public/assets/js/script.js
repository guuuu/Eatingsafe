$("#profile").click(() => { if(window.location.pathname != "/profile"){ window.location.href = "/profile" } });

$("#alergies").click(() => { if(window.location.pathname != "/alergies"){ window.location.href = "/alergies" } });

$("#stats").click(() => { if(window.location.pathname != "/stats"){ window.location.href = "/stats" } });

$("#leave").click(() => { window.location.href = "/login" });

function collapse_sidebar(flag){ //false para encolher | true para estender
    if(!flag){
        $($($("#menu").parent()).parent()[0]).addClass("collapse");

        $(".bt_bar").each(function() { $(this).addClass("hide") });

        $("#menu").removeClass("icon_wrap").addClass("wrap_icon_collapsed");

        $(".row").each(function() { $($(this).children()[0]).removeClass("wrap_icon").addClass("wrap_icon_collapsed"); });

        $(".pfcontent").css("width", "97%");
        $(".main").css("width","97%")

        flag = true;
    }
    else{
        $($($("#menu").parent()).parent()[0]).removeClass("collapse");
        $(".bt_bar").each(function() { $(this).removeClass("hide") })

        $("#menu").removeClass("wrap_icon_collapsed").addClass("icon_wrap");

        $(".row").each(function() { $($(this).children()[0]).removeClass("wrap_icon_collapsed").addClass("wrap_icon"); });

        $(".pfcontent").css("width", "80%");
        $(".main").css("width","80%")

        flag = false;
    }
}

let flag = false;
$("#menu").click(function() {
    collapse_sidebar(flag)
    flag = !flag;
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

$(window).ready(() => {
    if(window.location.pathname === "/alergies"){
        function create_alergies(d){
            d.forEach((alergie) => {
                let div = document.createElement("div");
                let label = document.createElement("label");
                let input = document.createElement("input");
                let span = document.createElement("span");
                let p = document.createElement("p");
                let button = document.createElement("button");
                let img = document.createElement("img");
        
                $(div).addClass("alergia");
                $(label).addClass("switch");
                $(input).attr("type", "checkbox");
                $(span).addClass("slider").addClass("round");
                $(p).text(alergie.alergia.name);
                $(button).attr("type", "button").attr("id", alergie.alergia.name).addClass("bt");
                $(img).attr("src", "assets/icons/information-button.png").attr("alt", "info button").addClass("logo_img");
                
                
                label.append(input);
                label.append(span);
                div.append(label);
                div.append(p);
                button.append(img);
                div.append(button);
        
                $(".opcoes").prepend(div);
            })
        }

        let data, last_id;
        $(".opcoes").on("click", ".bt", function(){
            let set_data = (action, n, p, d) =>{
                if(action === 0){
                    $("#alergie_title").text(n);
                    $("#alergie_img").attr("src", p).attr("alt", n);
                    $("#alergie_abt").text(d);
                }
                else{
                    $("#alergie_title").text("");
                    $("#alergie_img").attr("src", "");
                    $("#alergie_abt").text("");
                }
            }
            
            data.forEach((alergie) => {
                if(this.id === alergie.alergia.name){
                    if($("#info").hasClass("hide") || this.id !== last_id){
                        $("#info").removeClass("hide");
                        $("#info").addClass("hident");
                        set_data(0, alergie.alergia.name, alergie.alergia.path, alergie.alergia.desc);
                    }
                    else{
                        $("#info").removeClass("hident");
                        $("#info").addClass("hide");
                        set_data(1,"","","");
                    }
                }
            });
        
            last_id = this.id;
        });

        $("#btt").click(() => { alert("Alterações guardadas com sucesso!") });

        $.ajax({
            url: "/get_alergies",
            method: "GET"
        }).done((response) => {
            data = response;
            create_alergies(data);

            $("input[type=checkbox]").each(function() {
                if($($($($(this).parent()[0]).parent()[0]).children()[1]).html() === "Crustáceos"){
                    $(this).prop("checked", true)
                }
                else if($($($($(this).parent()[0]).parent()[0]).children()[1]).html() === "Peixes"){
                    $(this).prop("checked", true)
                }
            })
        });
    }

    if(window.location.pathname === "/login"){
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
                    alert("Dados incorretos!")
                }
            });
        });
    }

    if(window.location.pathname === "/register"){
        let counter = 2;
        $(".check").click(function(){
            $(".check").each(function() { if(!$($(this).children()[0]).hasClass("hide")) { $($(this).children()[0]).addClass("hide"); } });
            $($(this).children()[0]).removeClass("hide");
        });
        
        function add_options(element){
            let option = document.createElement("option");
            $(option).attr("value", "Selecione uma alergia").addClass("alergie_opt").text("Selecione uma alergia");
            $(element).append(option);

            $.ajax({
                "url": "/get_alergies",
                "method": "GET"
            }).done((response) => {
                response.forEach((alergie) => {
                    let option = document.createElement("option");
                    $(option).attr("value", alergie.alergia.name).addClass("alergie_opt").text(alergie.alergia.name);
                    $(element).append(option);
                })
            });
        }

        $(".drop").each(function(){ add_options(this); });
        
        $(".r").click(() => {
            if(counter < 13){
                counter++;
                let div = document.createElement("div");
                let select = document.createElement("select");
                let div2 = document.createElement("div");
                let img = document.createElement("img");
            
                $(select).attr("name", "alergies");
                $(select).attr("id", counter);
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
                add_options(select);
            }
            else{
                alert("Atingiu o limite máximo de alergias")
            }
        })
        
        $(".bt_register").click(() => {
            if($($(".field_input")[0]).val().trim() !== ""){
                if($($(".field_input")[1]).val().trim() !== "" && $($(".field_input")[1]).val().trim().includes("@") && $($(".field_input")[1]).val().trim().replace(/[^@]/g, "").length < 2){
                    if($($(".field_input")[2]).val() !== ""){
                        if($($(".field_input")[2]).val() === $($(".field_input")[3]).val()){
                            if(String($($(".field_input")[4]).val()).trim() !== ""){
                                let gender = "";
                                let alergies = new Array();
                        
                                $(".check").each(function() {
                                    if(!$($(this).children()).hasClass("hide")){
                                        gender = String($($($(this).parent()).children()[0]).text()).substr(0, 1) 
                                    } 
                                });
                                
                                if(gender !== ""){
                                    $(".alergie").each(function() {
                                        let value = $($($(this).children()[0]).children("option:selected")).val();
                                        if(!alergies.includes(value) && value != "Selecione uma alergia" ){
                                            alergies.push(value)
                                        }
                                    });
                                    let data = {
                                        user: $($(".field_input")[0]).val(),
                                        email: $($(".field_input")[1]).val(),
                                        pwd: $($(".field_input")[2]).val(),
                                        age: $($(".field_input")[4]).val(),
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
                                        alert("Conta criada com sucesso");
                                        window.location.href = "/login";
                                    })
                                } else{ alert("Indique o seu gênero") }
                            }
                            else{ alert("Idade incorreta"); }
                        } else{ alert("As passwords não coicidem"); }
                    } else { alert("As passwords não podem ser vazias") }
                } else{ alert("Email inválido"); }
            } else{ alert("Utilizador inválido"); }
        })
    }

    if(window.location.pathname === "/profile"){
        $("#prompt").click(() => {
            var input = document.createElement('input');
            input.type = 'file';
            
            input.onchange = e => { 
               var file = e.target.files[0];
            }
            
            input.click();
        });

        $("#bt_pf").click(() => { alert("Alterações guardadas com sucesso!") });
    }

    if(window.location.pathname === "/reset"){
        $("#bt_reset").click(() => { 
            if($($(".field_input")[0]).val().trim() !== "" && $($(".field_input")[0]).val().trim().includes("@") && $($(".field_input")[0]).val().trim().replace(/[^@]/g, "").length < 2){
                alert("Foi lhe enviado um email com o link de recuperação!") 
            }
            else{
                alert("Email inválido");
            }
        });
    }
})