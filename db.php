<?php
require_once('lib/rb.php');
require_once('config.php');

class MyQueryWriter extends RedBean_QueryWriter_MySQL {
        public function getIDField($type) {
                $colName = explode("_",$type);
                $typename = substr($colName[1],0,strlen($colName[1])-1);
                return $typename."id";
        }

}

$toolbox = R::setup($dsn, $username, $password);
$myWriter = new MyQueryWriter( $toolbox->getDatabaseAdapter() );
$redbean = new RedBean_OODB( $myWriter );
?>