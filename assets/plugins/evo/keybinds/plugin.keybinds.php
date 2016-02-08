<?php
$e = &$modx->Event;
$output = '
<script type="text/javascript" src="/assets/plugins/evo/keybinds/keyboard.js"></script>
<script>

KeyboardJS.on("ctrl + alt + c", function ()
{
    var code;
    try{code = myCodeMirror.getSelection();}catch (e){}
    parent.EVO.modal.show(
    {
        title: "Новый чанк",
        url: "index.php?a=77",
        code: code,
        beforeLoad: function (modal, c)
        {
            parent.$j(modal).find("iframe").load(function (e)
                {
                    parent.$j(modal).find("iframe")[0].contentWindow.myCodeMirror.setValue(c)
                })
        }
    });
});


KeyboardJS.on("ctrl + alt + s", function ()
{
    var code;
    try{code = myCodeMirror.getSelection();}catch (e){}
    parent.EVO.modal.show(
    {
        title: "Новый сниппет",
        url: "index.php?a=23",
        code: code,
        beforeLoad: function (modal, c)
        {
            parent.$j(modal).find("iframe").load(function (e)
                {
                    parent.$j(modal).find("iframe")[0].contentWindow.myCodeMirror.setValue(c)
                })
        }
    });
});


KeyboardJS.on("ctrl + alt + t", function ()
{
    var code;
    try{code = myCodeMirror.getSelection();}catch (e){}
    parent.EVO.modal.show(
    {
        title: "Новый шаблон",
        url: "index.php?a=19",
        code: code,
        beforeLoad: function (modal, c)
        {
            parent.$j(modal).find("iframe").load(function (e)
                {
                    parent.$j(modal).find("iframe")[0].contentWindow.myCodeMirror.setValue(c)
                })
        }
    });
});

KeyboardJS.on("ctrl + alt + v", function ()
{
    parent.EVO.modal.show(
    {
        title: "Новый TV",
        url: "index.php?a=300",
    });
});

KeyboardJS.on("ctrl + alt + p", function ()
{
    parent.EVO.modal.show(
    {
        title: "Новый плагин",
        url: "index.php?a=101",
    });
});


KeyboardJS.on("ctrl + alt + h", function ()
{
    parent.EVO.modal.show(
    {
        width: 300,
        left: 400,
        title: "Hot keys",
        content: parent.$j(".ethelp").html()
    });
});


KeyboardJS.on("ctrl + alt + a", function ()
{
    parent.EVO.modal.show(
    {
		id:"api",
        width: 400,
        left: 500,
        title: "API",
        url: "http://cheats.evolution-cms.com/api.html"
    });
});

KeyboardJS.on("ctrl + alt + d", function ()
{
    parent.EVO.modal.show(
    {
        id:"api",
        width: 800,
        left: 500,
        title: "API",
        url: "http://docs.evolution-cms.com"
    });
});

KeyboardJS.on("ctrl + alt + f", function ()
{
    parent.EVO.modal.show(
    {
        title: "Управление файлами",
        url: "index.php?a=31",
    });
});

KeyboardJS.on("ctrl + alt + e", function ()
{
    parent.EVO.modal.show(
    {
        title: "Управление елементами",
        url: "index.php?a=76",
    });
});





</script>	
';
$e->output($output);