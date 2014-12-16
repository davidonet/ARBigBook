requirejs(["jquery.min"], function() {
    requirejs(["mustache", "bootstrap.min"], function(Mustache) {
        var curFolio = 0;
        var nfolio = 0;

        var pictIcon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjkwcHgiIGhlaWdodD0iOTBweCIgdmlld0JveD0iMCAwIDkwIDkwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA5MCA5MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxwYXRoIGQ9Ik0yNDguNS0xOTAuNSIvPgo8cGF0aCBkPSJNODIuMDg5LDI5LjcwOWMwLTAuMDM3LTAuMDAzLTAuMDc0LTAuMDA2LTAuMTExYy0wLjAwMS0wLjAzMy0wLjAwMy0wLjA2Ni0wLjAwNi0wLjA5OSAgYy0wLjAwMS0wLjAwNS0wLjAwMS0wLjAxMS0wLjAwMS0wLjAxN2MtMC4wMDUtMC4wMjktMC4wMTQtMC4wNTctMC4wMTktMC4wODVjLTAuMDA3LTAuMDM0LTAuMDEzLTAuMDY4LTAuMDIyLTAuMTAyICBjLTAuMDA5LTAuMDM0LTAuMDIxLTAuMDY2LTAuMDM0LTAuMDk5Yy0wLjAxLTAuMDMxLTAuMDIxLTAuMDYzLTAuMDM0LTAuMDk1Yy0wLjAxMy0wLjAzMi0wLjAyOS0wLjA2Mi0wLjA0Ni0wLjA5MiAgYy0wLjAxNS0wLjAzLTAuMDI5LTAuMDYxLTAuMDQ4LTAuMDg5Yy0wLjAxOC0wLjAyOS0wLjAzNy0wLjA1Ni0wLjA1Ni0wLjA4M2MtMC4wMi0wLjAyOS0wLjAzOS0wLjA1Ny0wLjA2Mi0wLjA4NCAgYy0wLjAyMS0wLjAyNi0wLjA0My0wLjA0OS0wLjA2NS0wLjA3M2MtMC4wMjMtMC4wMjUtMC4wNDgtMC4wNTItMC4wNzItMC4wNzZjLTAuMDI1LTAuMDIyLTAuMDUxLTAuMDQzLTAuMDc2LTAuMDY0ICBjLTAuMDI4LTAuMDIyLTAuMDU1LTAuMDQ1LTAuMDgzLTAuMDY1Yy0wLjAyOC0wLjAyLTAuMDU5LTAuMDM3LTAuMDg3LTAuMDU1Yy0wLjAyMy0wLjAxNC0wLjA0NC0wLjAzLTAuMDY4LTAuMDQzICBjLTAuMDA3LTAuMDAzLTAuMDE1LTAuMDA2LTAuMDIyLTAuMDFjLTAuMDI5LTAuMDE2LTAuMDU5LTAuMDI4LTAuMDktMC4wNDFjLTAuMDM0LTAuMDE1LTAuMDY3LTAuMDMtMC4xMDMtMC4wNDIgIGMtMC4wMDgtMC4wMDItMC4wMTYtMC4wMDctMC4wMjItMC4wMDlMNDMuODM0LDE1LjkxN2wtMC4wOTItMy4zMzRjMC0wLjAwMiwwLTAuMDA0LDAuMDAxLTAuMDA3ICBjMC4wMzMtMC4yNTIsMC4wNTItMC41MDcsMC4wNDQtMC43NjVjLTAuMTA0LTMuMjg1LTMuNjY4LTUuODU4LTguMTEzLTUuODU4bC0wLjE4OCwwLjAwMWMtMi41OTIsMC4wNDItNS4wMTcsMC45ODktNi40ODgsMi41MzEgIGMtMC43MTMsMC43NDgtMS4xNzEsMS41OTYtMS4zNjksMi40OTVjLTAuMDA3LDAuMDI2LTAuMDEyLDAuMDUzLTAuMDE5LDAuMDgxYy0wLjAxMSwwLjA1OC0wLjAyMSwwLjExNi0wLjAzMSwwLjE3NSAgYy0wLjAwMiwwLjAxOS0wLjAwOCwwLjAzNi0wLjAxLDAuMDU1bC0wLjAwNSwwLjA2MmMtMC4wMjIsMC4xNjEtMC4wMzUsMC4zMjMtMC4wNCwwLjQ4NmwtMC4wMTMsMC4xNjEgIGMtMC4wMDUsMC4wNTYtMC4wMDYsMC4xMTItMC4wMDUsMC4xNjhjMC4wMDgsMC4yMzQsMC4wMzMsMC40NjksMC4wNzYsMC43MDFsMC4wNDMsMy4yNjZsLTExLjIyMiw1LjczOCAgYy0wLjAzOSwwLjAyLTAuMDc0LDAuMDQzLTAuMTEsMC4wNjZjLTAuMDIsMC4wMTItMC4wNCwwLjAyMy0wLjA2LDAuMDM2Yy0wLjA3MSwwLjA0OS0wLjEzNywwLjEwNC0wLjE5OCwwLjE2NCAgYy0wLjAxMywwLjAxMi0wLjAyMywwLjAyNi0wLjAzNSwwLjAzOWMtMC4wNDksMC4wNS0wLjA5MiwwLjEwMy0wLjEzMiwwLjE2Yy0wLjAxNywwLjAyMi0wLjAzMSwwLjA0NC0wLjA0NiwwLjA2NyAgYy0wLjAzNCwwLjA1Ni0wLjA2NSwwLjExMy0wLjA5NCwwLjE3MmMtMC4wMDksMC4wMjEtMC4wMiwwLjA0LTAuMDI4LDAuMDYxYy0wLjAzMywwLjA4LTAuMDU4LDAuMTYyLTAuMDc3LDAuMjQ2ICBjLTAuMDA1LDAuMDIxLTAuMDA2LDAuMDQyLTAuMDEsMC4wNjNjLTAuMDEyLDAuMDctMC4wMTksMC4xNC0wLjAyMSwwLjIxMmMwLDAuMDE1LTAuMDA1LDAuMDI5LTAuMDA1LDAuMDQzVjQzLjA4bC0xLjc0NCwxLjA0ICBjLTAuNjM2LDAuMjUyLTEuMjU0LDAuNTUzLTEuODQ4LDAuOTEyYy0zLjQ3LDIuMTAzLTUuNjk2LDUuNzQ4LTYuMjY3LDEwLjI2NmMtMC41NTUsNC4zODksMC41MjksOS4wOTgsMy4wNSwxMy4yNTggIGMzLjY4LDYuMDc0LDkuNzA4LDkuODQ4LDE1LjcyOSw5Ljg0OGMxLjU2NiwwLDMuMDUyLTAuMjYyLDQuNDQ1LTAuNzcxYzAuMDg5LTAuMDIzLDAuMTc4LTAuMDUxLDAuMjY0LTAuMDkybDAuMTE2LTAuMDU1ICBjMC40ODgtMC4xOTgsMC45NjQtMC40MjgsMS40MjgtMC42ODhsMC4zNjctMC4xNzdjMC4wNDMtMC4wMjEsMC4wODQtMC4wNDMsMC4xMjYtMC4wNjhjMC40ODctMC4yOTUsMC45NTctMC42MjcsMS4zOTgtMC45ODYgIGwzLjU0MS0yLjA0MWMwLjEwNy0wLjAzNSwwLjIxMy0wLjA3OSwwLjMxNC0wLjE0MWMwLjE5MS0wLjExNSwwLjM3Ny0wLjIzOCwwLjU2MS0wLjM2M2w0LjY2My0yLjY4N2wyMi41NDQsOS42NDggIGMwLjA1NiwwLjAyMywwLjExMSwwLjAzNiwwLjE2NywwLjA1MmMwLjAzNSwwLjAxMSwwLjA2OSwwLjAyNSwwLjEwNCwwLjAzM2MwLjEwNiwwLjAyMiwwLjIxMiwwLjAzNiwwLjMxNywwLjAzNiAgYzAuMDc3LDAsMC4xNTQtMC4wMDcsMC4yMy0wLjAyYzAuMDIzLTAuMDAzLDAuMDQ0LTAuMDEsMC4wNjYtMC4wMTVjMC4wNTMtMC4wMSwwLjEwNC0wLjAyMSwwLjE1Ni0wLjAzOCAgYzAuMDI4LTAuMDA5LDAuMDU1LTAuMDIxLDAuMDgzLTAuMDMyYzAuMDQ0LTAuMDE2LDAuMDg4LTAuMDM0LDAuMTMtMC4wNTVjMC4wMjgtMC4wMTUsMC4wNTUtMC4wMywwLjA4My0wLjA0NiAgYzAuMDQtMC4wMjQsMC4wOC0wLjA1LDAuMTItMC4wNzdjMC4wMTQtMC4wMTEsMC4wMjgtMC4wMTgsMC4wNDQtMC4wMjhMODAuNzksNjguMjM1YzAuMzU5LTAuMjc2LDAuNTczLTAuNzAyLDAuNTgyLTEuMTU1ICBsMC43MTctMzcuMzU4QzgyLjA4OSwyOS43MTgsODIuMDg5LDI5LjcxMyw4Mi4wODksMjkuNzA5eiBNMzEuMTYyLDEwLjU0OWMwLjkxNy0wLjk2MSwyLjU5My0xLjU3Nyw0LjM3NS0xLjYwNWwwLjEzOS0wLjAwMSAgYzIuOTUzLDAsNC45OTcsMS40NzUsNS4xMTYsMi44ODJsLTAuMDMyLDAuNDkyYy0wLjA4MSwwLjM2Ni0wLjI4NSwwLjcyNC0wLjYxMywxLjA2OWMtMC45MTYsMC45NjEtMi41OTEsMS41NzctNC4zNzQsMS42MDYgIGwtMC4xMzgsMC4wMDFjLTIuNzU0LDAtNC43MTctMS4yODMtNS4wNjctMi41OTdsLTAuMDEtMC44QzMwLjY0MiwxMS4yMzcsMzAuODQxLDEwLjg4NiwzMS4xNjIsMTAuNTQ5eiBNMTguNTA4LDYwLjIyNSAgYy0yLjMxNi00LjgwNy0yLjQ4LTEwLjA5LTAuMzY5LTEzLjk5N2MwLjE1Ni0wLjAwNywwLjMxMi0wLjAxNSwwLjQ3LTAuMDE1YzIuODUyLDAsNS43OSwxLjEyLDguMzYsMy4wNTUgIEMyNS40NDgsNTQuOTQxLDIzLjE4OCw1OC4wNjcsMTguNTA4LDYwLjIyNXogTTI3Ljk3OSw2MC45NjFjLTEuMzksMC0yLjUxNS0xLjEyNi0yLjUxNS0yLjUxNXMxLjEyNS0yLjUxNSwyLjUxNS0yLjUxNSAgYzEuMzg5LDAsMi41MTQsMS4xMjYsMi41MTQsMi41MTVTMjkuMzY3LDYwLjk2MSwyNy45NzksNjAuOTYxeiBNMzYuODI3LDY5LjMzOWMxLjYwNy00Ljg5NCwwLjg3Ny0xMC45NzktMi4zNTQtMTYuMzEyICBjLTMuMjI0LTUuMzIxLTguMjUxLTguODc3LTEzLjQ5OC05LjY3NWw4Ljg5Ny01LjNsMS4wNTMtMC4zNDJjMC45MjItMC4yNzcsMS45LTAuNDE4LDIuOTEtMC40MThjNC45MDgsMCwxMC4wNzksMy4zLDEzLjE3Myw4LjQwNiAgYzMuODA2LDYuMjc3LDMuNjM5LDEzLjcxNy0wLjI1LDE3LjgzYzAuMzY2LTEuMDQ1LDAuNjI4LTIuMTU4LDAuNzc2LTMuMzMzYzAuNTU1LTQuMzg5LTAuNTI3LTkuMDk3LTMuMDUtMTMuMjU5ICBjLTAuNDI3LTAuNzA1LTEuMzQ2LTAuOTMyLTIuMDUyLTAuNTA0cy0wLjkzMiwxLjM0Ny0wLjUwNCwyLjA1M2MyLjE3NCwzLjU4OCwzLjExMiw3LjYxMywyLjY0MSwxMS4zMzYgIGMtMC4yODksMi4yNzctMS4wODcsNC4yNjItMi4zMTIsNS44MjRjMC4yMzMtMC44MDcsMC40MDctMS42NSwwLjUxOS0yLjUyN2MwLjU1NC00LjM4OS0wLjUyOC05LjA5OC0zLjA0OS0xMy4yNiAgYy0wLjQyOC0wLjcwNS0xLjM0Ny0wLjkzMS0yLjA1My0wLjUwM2MtMC43MDYsMC40MjctMC45MzIsMS4zNDctMC41MDQsMi4wNTJjMi4xNzMsMy41ODgsMy4xMTEsNy42MTMsMi42NDIsMTEuMzM2ICBDMzkuNDc1LDY1LjQxMywzOC40MzYsNjcuNjg0LDM2LjgyNyw2OS4zMzl6IE02My4zNzEsNzYuMzQzTDQ0Ljk3LDY4LjQ2OGwxLjM1LTAuNzc4YzAuMDQzLTAuMDI1LDAuMDg2LTAuMDUzLDAuMTI4LTAuMDgyICBsMS4zOTItMS4wMDJjMC4wMzEtMC4wMjMsMC4wNjItMC4wNDksMC4wOTItMC4wNzNjNS43MjQtNC44NTMsNi40MjYtMTQuNDc2LDEuNjMzLTIyLjM4NGMtMy42OC02LjA3My05LjcwNy05Ljg0Ni0xNS43MjktOS44NDYgIGMtMS4zMDEsMC0yLjU2OSwwLjE4NC0zLjgwMiwwLjU1NEwyOC43OSwzNS4yNmMtMC4xMDYsMC4wMzUtMC4yMDgsMC4wODEtMC4zMDMsMC4xMzhsLTkuOTA2LDUuOTAxVjI1LjMzNWw0NC43OTEsMTYuMjIxVjc2LjM0M3ogICBNNjQuNjUyLDM4Ljg0MUwyMC44MjYsMjIuOTdsNi44NTYtMy41MDZsMC4wNjgsMC41NWMwLjAwNSwwLjA0NSwwLjAxMywwLjA5MSwwLjAyMiwwLjEzNWMwLjYzNSwyLjkwNCw0LjAwMyw1LjAxMiw4LjAwOCw1LjAxMiAgbDAuMTg3LTAuMDAxYzMuODU1LTAuMDYyLDcuMDY3LTIuMDQ0LDcuODIxLTQuODU3bDAuMTAzLTAuNDNjMC4wMzEtMC4xMjgsMC4wNDUtMC4yNiwwLjA0Mi0wLjM5MmwtMC4wMTEtMC4zODVsMzMuMzQ4LDExLjA2OSAgTDY0LjY1MiwzOC44NDF6IE02Ni4zNTksNzUuNTcydi00Ljc3N2wyLjcsMi42OTlMNjYuMzU5LDc1LjU3MnogTTcxLjQ0Nyw3MS42NTVsLTUuMDg4LTUuMDg3VjYyLjRsNy40NDMsNy40NDFMNzEuNDQ3LDcxLjY1NXogICBNNzguMzk3LDY2LjMwNWwtMi4yMDcsMS42OTlsLTkuODMxLTkuODN2LTQuMTY4bDEyLjA0NCwxMi4wNDFMNzguMzk3LDY2LjMwNXogTTc4LjQ4Miw2MS45TDY2LjM1OSw0OS43Nzl2LTQuMTY4bDEyLjIwMSwxMi4yMDEgIEw3OC40ODIsNjEuOXogTTc4LjY0MSw1My42NjVMNjYuMzU5LDQxLjM4NHYtMC4wOWwyLjQxOC0xLjY2Mmw5Ljk0MSw5Ljk0M0w3OC42NDEsNTMuNjY1eiBNNzguNzk5LDQ1LjQyOWwtNy41MTgtNy41MTlsMi40Ny0xLjY5OCAgbDUuMTI2LDUuMTI3TDc4Ljc5OSw0NS40Mjl6IE03OC45NTgsMzcuMTkybC0yLjcwMi0yLjcwMmwyLjc5LTEuOTE4TDc4Ljk1OCwzNy4xOTJ6Ii8+Cjwvc3ZnPg==";

        var buildPage = function(data) {
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
                        block += "<div class='photoaccess' onclick='$(\"#img" + img + "\").fadeIn(1500)'><img src=" + pictIcon + " /></div>";

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
});
