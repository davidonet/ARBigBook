requirejs(["jquery.min"], function() {
    requirejs(["mustache", "bootstrap.min"], function(Mustache) {
        var curFolio = 0;
        var nfolio = 0;


        var buildPage = function(data) {
            var sum = 0;
            var block = "";
            var ncol = 0;
            var foliotemplate = "<div class='folio row' id='folio{{nfolio}}'>" +
                "<div class ='col-md-6 page vertical-center'>" +
                "<div class='col-md-2 leftpage'/>" +
                "<div class='col-md-9 textblock' id='folio{{nfolio}}col0'/>" +
                "" +
                "</div>" +
                "<div class='col-md-6 page  vertical-center'>" +
                "<div class='col-md-10 textblock' id='folio{{nfolio}}col1'/>" +
                "<div class='col-md-2 rightpage'/>" +
                "</div>";
            $(Mustache.render(foliotemplate, {
                nfolio: nfolio
            })).appendTo("#book").hide();
            $(data).find("p").each(function() {
                var txt = $(this).text();
                if (-1 < txt.indexOf("[")) {
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
                        block += "<div class='photoaccess' onclick='$(\"#img" + img + "\").fadeIn(1500)'>◉</div>";
                        $("<div class='fullimg' id='img" + img + "' onclick='$(this).fadeOut(1000)' style='background-image:url(\"src/" + img + ".jpg\");'></div>").appendTo($("#folio" + nfolio + "col" + ncol).parent().parent());
                    }
                } else {
                    if (-1 < txt.indexOf("{")) {
                        var img = txt.match(/\{(.*)\}/)[1];

                        $.playVideo = function(id) {
                            $(id).fadeIn(1500);
                            $(id)[0].play();
                            $(id).bind("ended", function() {
                                $(this).fadeOut(1500);
                            });
                        };

                        $.stopVideo = function(id) {
                            $(id).fadeOut(1500, function() {
                                $(id)[0].pause();
                                $(id)[0].currentTime = 0;
                            });
                        };


                        block += "<div class='photoaccess' onclick='$.playVideo(\"#img" + img + "\")'>◉</div>";
                        $("<video class='fullvideo' id='img" + img + "' onclick='$.stopVideo(\"#img" + img + "\")'><source  src=\"src/" + img + ".mp4\");' type='video/mp4'></video>").appendTo($("#folio" + nfolio + "col" + ncol).parent().parent());

                    } else {
                        sum += txt.length;
                        if (2000 < sum) {
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
});
