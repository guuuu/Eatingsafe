$(".field_input").focus(function() { $($(this).parent()[0]).css("border-bottom", "2px solid #f8c365"); });
$(".field_input").focusout(function() { $($(this).parent()[0]).css("border-bottom", "2px solid #C77136"); });

$("#bt").on("click", () => {
    $.ajax({
        url: "/do_login",
        method: "POST",
        data: {
            user: $($(".field_input")[0]).val(),
            pwd: $($(".field_input")[1]).val()
        }
    }).done((response) => {
        console.log(response);
        $($(".field_input")[0]).val("");              
        $($(".field_input")[1]).val("");
    });
});