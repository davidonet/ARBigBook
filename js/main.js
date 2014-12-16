requirejs(["mustache", "jquery.min", "bootstrap.min"], function(Mustache) {
    var curFolio = 0;
    var nfolio = 0;




    var buildPage = function(data) {
        console.log(data);
        var sum = 0;
        var block = "";
        var ncol = 0;
        var foliotemplate = "<div class='folio row' id='folio{{nfolio}}'>" +
            "<div class ='col-md-6 page  vertical-center'><div class='col-md-3 leftpage'>" +
            "</div><div class='col-md-7 textblock' id='folio{{nfolio}}col0'>" +
            "</div><div class='col-md-2'></div></div><div class='col-md-6 page  vertical-center'><div class='col-md-2'>" +
            "</div><div class='col-md-7 textblock' id='folio{{nfolio}}col1'></div>" +
            "<div class='col-md-3 rightpage'></div></div></div>";
        $(Mustache.render(foliotemplate, {
            nfolio: nfolio
        })).appendTo("#book").hide();
        $(data).find("p").each(function() {
            var txt = $(this).text();
            if (-1 < txt.indexOf("[")) {
                console.log(txt);
                if (txt == "[break]") {
                    $(block).appendTo($("#folio" + nfolio + "col" + ncol));
                    sum = 0;
                    block = "";
                    if (ncol == 1) {
                        nfolio += 1;
                        $(Mustache.render(foliotemplate, {
                            nfolio: nfolio
                        })).appendTo("#book").hide();
                    }
                    ncol = (ncol + 1) % 2;
                } else {
                    var img = txt.match(/\[(.*)\]/)[1];
                    block += "<div class='photoaccess'><img src='img/pictures.svg' onclick='$(\"#img" + img + "\").fadeIn(1500)'/></div>";

                    var img = txt.match(/\[(.*)\]/)[1];
                    $("<div class='fullimg' id='img" + img + "' onclick='$(this).fadeOut(1000)' style='background-image:url(\"src/" + img + ".jpg\");'></div>").appendTo($("#folio" + nfolio + "col" + ncol).parent().parent());
                }

            } else {
                sum += txt.length;
                if (1200 < sum) {
                    $(block).prependTo($("#folio" + nfolio + "col" + ncol));

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
                        block += "<h2>" + txt + "</h2>";
                    else
                        block += "<p>" + txt + "</p>";
                }
            }

        });

        $(block).appendTo($("#folio" + nfolio + "col" + ncol));

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
        url: "src/auzoo_edited.xml",
        success: buildPage
    });

});
