<?php
//if(!$_SESSION['mgrRole']=='1')  return;
$e = &$modx->Event;

switch($e->name){
    case 'OnManagerFrameLoader':?>

        <script type="text/javascript" src="/assets/js/jquery.min.js"></script>
        <link type="text/css" rel="stylesheet" media="all" href="/assets/plugins/evo/modal/modal.css" />
        <script type="text/javascript" src="/assets/plugins/evo/modal/modal.js"></script>
        <script>
            var $j = jQuery.noConflict();
            <?php
			if (!strpos($_SERVER['HTTP_USER_AGENT'], 'windows')){
			?>
			$j('html').addClass('mac');	
			<?php
			}
			?>
            EVO = {modal:ET_modal}

                <!-- <span class="jqmClose"><img src="media/style/<?=$modx->config['manager_theme']?>/images/icons/stop.png"> </span> -->
        </script>
        <div class="ethelp" style="display:none">
            <div style="padding:5px" class="inlinecontent">
                <b>CTR + ALT + C</b>
                <p>Создание нового чанка</p>
                <hr/>
                <b>CTR + ALT + T</b>
                <p>Создание нового шаблона</p>
                <hr/>
                <b>CTR + ALT + V</b>
                <p>Создание нового TV</p>
                <hr/>
                <b>CTR + ALT + s</b>
                <p>Создание нового сниппета</p>
                <hr/>
                <b>CTR + ALT + p</b>
                <p>Создание нового плагина</p>
                <hr/>
				<b>CTR + ALT + f</b>
                <p>Управление файлами</p>
				<hr/>
				<b>CTR + ALT + e</b>
                <p>Управление елементами</p>
                <hr/>
                <b>CTR + ALT + a</b>
                <p>API help</p>
                <hr/>
                <b>CTR + ALT + d</b>
                <p>MODX Docs</p>
            </div>

        </div>

        <?php

        break;


    case 'OnManagerTreePrerender':
        $output = '<a style="position: absolute;top: 8.5px;left: 251.5px; color: #3d5764 !important; font-size:10.5px" href="" onclick="top.EVO.modal.show({title:\'Елементы\',id:\'treebutton\',url:\'index.php?a=76\'});return false;">
		  <i class="fa fa-th fa-lg"></i></a>';
        $e->output($output);
        break;
}
