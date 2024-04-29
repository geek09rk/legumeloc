<?php
// Start the session
session_start();
require("config.php");
set_include_path(get_include_path() . PATH_SEPARATOR . 'phplib');
include('Net/SSH2.php');

header("Access-Control-Allow-Origin: *");

ini_set('display_errors', 1);
error_reporting(0);

print_r($_FILES);
$targetdir = '/var/www/html/legumeloc/tmp/';
$namer=$_POST['namer'];
//$namer='1608122509871';
$out=$namer.".txt";
// Sequence
$sequenceTargetfile = $targetdir.$namer.".fasta";
$input="/tmp/".$namer.".fasta";
$typeSeq=$_POST['typeSeq'];
// $typeSeq='accnNo';

$algorithm= $_POST['algorithm'];
$db=$_POST['db'];


$level=$_POST['level'];
// $level='level2';

$emailAddress= $_POST['emailAddress'];

$_SESSION['namer']=$namer;
$_SESSION['typeSeq']=$typeSeq;

$_SESSION['algorithm']=$algorithm;
$_SESSION['db']=$db;
$_SESSION['level']=$level;
$_SESSION['emailAddress']=$emailAddress;


if($typeSeq == "Acc") {
    if ($db == 'ncbi'){
    $accnNo = $_POST["sequence"];
    // $accnNo='XP_009311342.1';
    exec('efetch -db protein -format fasta -id '.$accnNo.' > '.$sequenceTargetfile);
    }
    else if ($db == 'uniprot') {
        $accnNo = $_POST["sequence"];
        $f = file_get_contents('http://uniprot.org/uniprot/'.$accnNo.'.fasta');
        $fastafile = fopen($sequenceTargetfile, "w") or die("Unable to open file!");
    $fastaTxt = $f;
    fwrite($fastafile, $fastaTxt);
    fclose($fastafile);
    }
} else if($typeSeq == "File") {
    if (move_uploaded_file($_FILES['sequence']['tmp_name'], $sequenceTargetfile)) {
        // file uploaded succeeded
    } else {
        // file upload failed
    }
} else if ($typeSeq == "text") {
    $sequence = $_POST["sequence"];
    $fastafile = fopen($sequenceTargetfile, "w") or die("Unable to open file!");
    $fastaTxt = $sequence;
    fwrite($fastafile, $fastaTxt);
    fclose($fastafile);
}


$ssh = new Net_SSH2('biocluster.usu.edu', 22);
if (!$ssh->login(MY_USER, MY_PASSWORD)) {
    exit('Login Failed');
}

$ssh->setTimeout(false);

$job="sbatch /home/rkataria/LegumeLocWebpy/legumeLoc.sl /home/rkataria/LegumeLocWebpy".$input." ".$level." ".$algorithm." /home/rkataria/LegumeLocWebpy/tmp/".$namer ;
// print($job);
$ssh->exec($job);


$response= $namer."+".$level."+".$algorithm;
//Sending completion email to user\


// echo($response);

if($emailAddress != "noemail"){
    // $msgEmail =  $message = "Your LegumeLoc job is completed!\nPlease go to http://localhost/legumeloc/results.html?result=$response to see the results. Thank you for using LegumeLoc!";
    $msgEmail =  $message = "Your LegumeLoc job is completed!\nPlease go to https://kaabil.net/legumeloc/results.html?result=$response to see the results. Thank you for using LegumeLoc!";
    $msgEmail = wordwrap($msgEmail,70);
    $from = "noreply@legumeloc.kaabil.net";
    $headers = "From: $from"; 
    $mail= mail($emailAddress,"LegumeLoc results",$msgEmail,$headers,'-f '.$from);
    if($mail){
    //   echo "Email sent";
    }else{
    //   echo "Something went wrong with Mail."; 
    }
}

print($response);

?>