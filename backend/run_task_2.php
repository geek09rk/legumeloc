<?php
// Start the session
session_start();
require("config.php");
set_include_path(get_include_path() . PATH_SEPARATOR . 'phplib');
include('Net/SSH2.php');

header("Access-Control-Allow-Origin: *");

ini_set('display_errors', 0);
error_reporting(0);
session_start();

$namer =$_SESSION['namer'];
$algorithm=$_SESSION['algorithm'];
$level=$_SESSION['level2'];

$targetdir = '/var/www/html/legumeloc/tmp/';

$sequenceTargetfile = $targetdir.$namer.".fasta";
$input="/tmp/".$namer.".fasta";

$dir=$namer."_".$level;
// $out=$dir.".txt";

$ssh = new Net_SSH2('biocluster.usu.edu', 22);
if (!$ssh->login(MY_USER, MY_PASSWORD)) {
    exit('Login Failed');
}

$ssh->setTimeout(false);

$job="sbatch /home/rkataria/LegumeLocWebpy/legumeLoc.sl /home/rkataria/LegumeLocWebpy".$input." ".$level." ".$algorithm." /home/rkataria/LegumeLocWebpy/tmp/".$dir ;
// echo($job);
$ssh->exec($job);

//Sending completion email to user\
$response= $namer."+".$level."+".$algorithm;
//echo($response);

print($response);

?>