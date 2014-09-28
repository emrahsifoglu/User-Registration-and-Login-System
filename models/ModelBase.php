<?php
header("Content-type: text/html; charset=utf-8");
function validate_item($table, $conditions, $values) {
	$item = R::findOne($table, $conditions, $values);
	if (!isset($item)) {
	  return FALSE;
	} else {
		return TRUE;
	}
}
?>












