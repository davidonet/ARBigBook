requirejs(["mustache", "jquery.min", "bootstrap.min"], function(Mustache) {
    var curFolio = 0;
    var nfolio = 0;
    var buildPage = function(data) {
        var sum = 0;
        var block = "";
        var ncol = 0;
        var foliotemplate = "<div class='folio row' id='folio{{nfolio}}'>" +
            "<div class ='col-md-6 page leftpage vertical-center'><div class='col-md-3'>" +
            "</div><div class='col-md-7 textblock' id='folio{{nfolio}}col0'>" +
            "</div><div class='col-md-2'></div></div><div class='col-md-6 page rightpage vertical-center'><div class='col-md-2'>" +
            "</div><div class='col-md-7 textblock' id='folio{{nfolio}}col1'></div>" +
            "<div class='col-md-3'></div></div></div>";
        $(Mustache.render(foliotemplate, {
            nfolio: nfolio
        })).appendTo("#book").hide();

        $(data).find("t").each(function() {
            var txt = $(this).text();
            if (-1 < txt.indexOf("[")) {
                /*
                            var img = txt.match(/\[(.*)\]/)[1];
                var $elt = $("<p><b>" + img + "</b></p>").appendTo($main);
                var top = $elt.offset().top;
                console.log($elt.height());
                $images.append("<img style='top:" + top + "px' src=src/" + img + ".jpg></img>");
                $("<hr/>").appendTo($main);
                */
            } else {
                sum += txt.length;
                if (1000 < sum) {
                    $(block).appendTo($("#folio" + nfolio + "col" + ncol));
                    sum = txt.length;
                    block = "<p>" + txt + "</p>";
                    if (ncol == 1) {
                        nfolio += 1;
                        $(Mustache.render(foliotemplate, {
                            nfolio: nfolio
                        })).appendTo("#book").hide();
                    }
                    ncol = (ncol + 1) % 2;
                } else {
                    if (txt.length < 20)
                        block += "<p class='big'>" + txt + "</p>";
                    else
                        block += "<p>" + txt + "</p>";
                }
            }

        });
        $("#folio0").fadeIn();
        $(".rightpage").click(function() {
            $("#folio" + curFolio).fadeOut(function() {
                curFolio++;
                if (nfolio < curFolio)
                    curFolio = nfolio;
                $("#folio" + curFolio).fadeIn();
            });
        });
        $(".leftpage").click(function() {
            $("#folio" + curFolio).fadeOut(function() {
                curFolio--;
                if (curFolio < 0)
                    curFolio = 0;
                $("#folio" + curFolio).fadeIn();
            });
        });
    };
    $.ajax({
        url: "src/auzoo.xml",
        success: buildPage
    });

});
