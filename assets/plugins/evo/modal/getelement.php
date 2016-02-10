<?php 
require_once dirname(__FILE__).'/../../../../manager/includes/config.inc.php'; 
startCMSSession(); 
include_once(MODX_MANAGER_PATH.'/includes/document.parser.class.inc.php'); 
$modx = new DocumentParser; 
$modx ->getSettings(); 
$dbname = $modx->db->config['dbase']; 
$dbprefix = $modx->db->config['table_prefix']; 
$mod_table = $dbprefix.'excurs'; 
$theme = $modx->config['manager_theme']; 
$basePath = $modx->config['base_path']; 

define('ROOT', $modx->config['base_path']);
	 

	$txt = $_POST[txt];
	 // Приводим сниппеты к единному знаменателю
        $txt = str_replace('!]', ']]', $txt);	
        $txt = str_replace('[!', '[[', $txt);
        
        //Сниппеты
        if (strpos($txt, '[[') > -1) 
        {
            $matches= array ();
            preg_match_all('~\[\[(.*?)\]\]~s', $txt, $matches);
            $snippets=array();
            foreach ($matches[1] as $snip)
            {
                $snipName = explode('?',$snip);
                $snippets[] = '"'.$snipName[0].'"'; 
            }
            $snippets = array_unique($snippets);
            $tblSnip = $modx->getFullTableName('site_snippets');
            $sql = 'select `id`,`name` from '.$tblSnip.' where name in ('.implode(',',$snippets).') order by `name` asc';
            $res = $modx->db->query($sql);
            $out.='<optgroup label=\'Сниппеты\'>';
            while($row = $modx->db->getRow($res)) { 
                echo 'index.php?id='.$row[id].'&a=22';
            };
           	
        }
        // Чанки
        if (strpos($txt, '{{') > -1) 
        {
            $matches= array ();
            preg_match_all('~\{\{(.*?)\}\}~s', $txt, $matches);
            $chunks=array();
            foreach ($matches[1] as $chu) $chunks[]='"'.$chu.'"';
            $chunks = array_unique($chunks);
            $tblChu = $modx->getFullTableName('site_htmlsnippets');
            $sql = 'select `id`,`name` from '.$tblChu.' where name in ('.implode(',',$chunks).') order by `name` asc';
            $res = $modx->db->query($sql);
            $out.='<optgroup label=\'Чанки\'>';
            while($row = $modx->db->getRow($res)) { 
               echo  'index.php?id='.$row[id].'&a=78';
            };
    		
        }
	
        // Документы
        if (strpos($txt, '[~') > -1) 
        {
            $matches= array ();
            preg_match_all('~\[\~(.*?)\~\]~s', $txt, $matches);
            $docs=array();
            foreach ($matches[1] as $doc) if (is_numeric($doc)) $docs[]='"'.$doc.'"';
            $docs = array_unique($docs);
            $tblDoc = $modx->getFullTableName('site_content');
            $sql = 'select `id`,`pagetitle` from '.$tblDoc.' where id in ('.implode(',',$docs).') order by `pagetitle` asc';
            $res = $modx->db->query($sql);

            while($row = $modx->db->getRow($res)) { 
                echo 'index.php?id='.$row[id].'&a=27';
            };
          		
        }
