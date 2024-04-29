<?php
session_start();
header("Access-Control-Allow-Origin: *");

ini_set('display_errors', 1);
error_reporting(0);

$namer=$_POST['namer'];
$algorithm= $_POST['algorithm'];
$level=$_POST['level2'];

$_SESSION['namer']=$namer;
$_SESSION['algorithm']=$algorithm;
$_SESSION['level2']=$level;

print($namer);

?>