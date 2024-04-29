var predStrategy = "fast";
var levelType = "level3";

function uncheckPhases() {
    document.querySelector("#phase1radio").checked = false;
    document.querySelector("#phase2radio").checked = false;
    document.querySelector("#phase3radio").checked = false;
  }
  function setPhase() {
    var phase1Check = document.querySelector("#phase1radio");
    var phase2Check = document.querySelector("#phase2radio");
    var phase3Check = document.querySelector("#phase3radio");
    phase1Check.checked = true;
    phase2Check.checked = true;
    phase3Check.checked = true;
  
    phase1Check.addEventListener("click", (e) => {
      uncheckPhases();
      phase1Check.checked = true;
      levelType = "level1";
      console.log(levelType);
    });
  
    phase2Check.addEventListener("click", (e) => {
      uncheckPhases();
      phase1Check.checked = true;
      phase2Check.checked = true;
      levelType = "level2";
      console.log(levelType);
    });
    phase3Check.addEventListener("click", (e) => {
      uncheckPhases();
      phase1Check.checked = true;
      phase2Check.checked = true;
      phase3Check.checked = true;
      levelType = "level3";
      console.log(levelType);
    });
  }

  function resetAll() {
    $("input#emailAddress").val("");
    $("input#ncbiAcc").val("");
    document.getElementById("textareaSeq").value = "";
    document.getElementById("emailAddress").disabled = null;
    document.getElementById("ncbiAccc").disabled = null;
    document.getElementById("uniprotAcc").disabled = null;
    document.getElementById("ncbiAccc").checked = true;
    document.getElementById("uniprotAcc").checked = false;
    document.getElementById("fileSeq").disabled = null;
    document.getElementById("loadDemoData").disabled = null;
    document.getElementById("fastRadio").disabled = null;
    document.getElementById("accurateRadio").disabled = null;
    document.getElementById("fastRadio").checked = true;
    document.getElementById("accurateRadio").checked = false;
    document.getElementById("phase1radio").disabled = null;
    document.getElementById("phase2radio").disabled = null;
    document.getElementById("phase3radio").disabled = null;
    document.getElementById("phase3radio").checked = true;
    document.getElementById("phase2radio").checked = true;
    document.getElementById("phase1radio").checked = true;
  }
  
  $("#resetPrediction").click(() => {
    resetAll();
  });
  $(document).ready(() => {
    resetAll();
    setPhase();
   
  });

  $("#runPrediction").click(function () {

    var validEmail = 0;
    var errorFasta = 0;
  
    var emailAddress = $("input#emailAddress").val();
    var regexEmail = /\S+@\S+\.\S+/;
  
    if (emailAddress.length > 0) {
      if (regexEmail.test(emailAddress.trim())) {
        validEmail = 1;
      } else {
        //console.log("Email testing failed, not using email");
        validEmail = 2;
        emailAddress = "noemail";
      }
    } else {
      emailAddress = "noemail";
      console.log("Not using email");
    }
  
   
    var fastaAcc = $("input#ncbiAcc").val();
    var fastaFile = document.getElementById("fileSeq").files[0];
    var fastaSequences = $("textarea#textareaSeq").val();
    var validFlag = false;
    if (!(fastaAcc || fastaFile || fastaSequences)) {
      console.log(
        "Please provide one of these: Accession Number, FASTA file OR FASTA sequence(s)"
      );
      document.getElementById(
        "AtSubP2error"
      ).innerHTML = `Please provide one of these: Accession Number, FASTA file or FASTA sequence(s)`;
      $("#errorModal").modal("show");
    } else if (
      (fastaAcc && fastaFile && fastaSequences) ||
      (fastaAcc && fastaFile) ||
      (fastaAcc && fastaSequences) ||
      (fastaSequences && fastaFile)
    ) {
      document.getElementById(
        "AtSubP2error"
      ).innerHTML = `Please provide one of these: Accession Number, FASTA file OR FASTA sequence(s)`;
      $("#errorModal").modal("show");
      console.log("provide one");
    } else {
      validFlag = true;
    }
    console.log(validFlag);
  
    var isDiamond = document.getElementById("fastRadio").checked;
    var isACC = document.getElementById("ncbiAccc").checked;
  
    
    var AtSubP2FormData = new FormData();
    if (validFlag) {
      if (fastaAcc) {
        AtSubP2FormData.append("typeSeq", "Acc");
        AtSubP2FormData.append("sequence", fastaAcc);
      } else if (fastaFile) {
        AtSubP2FormData.append("typeSeq", "File");
        AtSubP2FormData.append("sequence", fastaFile);
      } else {
        AtSubP2FormData.append("typeSeq", "text");
        AtSubP2FormData.append("sequence", fastaSequences);
      }
    }
  
    if (isDiamond) {
      AtSubP2FormData.append("algorithm", "fast");
      var algorithm = "fast";
    } else {
      AtSubP2FormData.append("algorithm", "sensitive");
      var algorithm = "sensitive";
    }
    if (isACC) {
      AtSubP2FormData.append("db", "ncbi");
    } else {
      AtSubP2FormData.append("db", "uniprot");
    }
  
    // AtSubP2FormData.append("method", predStrategy);
    AtSubP2FormData.append("level", levelType);

    if (validEmail === 2) {
        $("#noEmail").show();
      }
    else {
      AtSubP2FormData.append("emailAddress", emailAddress);
    }
  
    var namer = new Date().valueOf();
    AtSubP2FormData.append("namer", namer);
  
    for (let [key, value] of AtSubP2FormData) {
        console.log(`${key}: ${value}`)
      }
    var response = `${namer}+${levelType}+${algorithm}`;
    // console.log(response);
    var resultUrl = `<a href="https://kaabil.net/legumeloc/results.html?result=${response}" target="_blank">https://kaabil.net/legumeloc/results.html?result=${response}</a>`;
    // var resultUrl = `<a href="http://localhost/legumeloc/results.html?result=${response}" target="_blank">http://localhost/legumeloc/results.html?result=${response}</a>`;
    // var resultUrl = `<a href="http://localhost/legumeloc/results.html?result=${response}" target="_blank">LegumeLoc Subcellular Localization Prediction Results</a>`;
    console.log(resultUrl);
    var newResult = `https://kaabil.net/legumeloc/results.html?result=${response}`;
    // var newResult = `http://localhost/legumeloc/results.html?result=${response}`;
    var finishText = `${resultUrl}`;
  
    document.getElementById("AtSubP2SubmittionScreen").innerHTML = finishText;
      
    var validationRequest = new XMLHttpRequest();
    var proceed = false;
    validationRequest.open(
      "POST",
      // "http://localhost/legumeloc/backend/fasta_check.php",
      "https://kaabil.net/legumeloc/backend/fasta_check.php",
      true
    ); //TODO
    validationRequest.onload = function () {
      if (validationRequest.readyState === validationRequest.DONE) {
        if (validationRequest.status === 200) {
          resultTask = validationRequest.response;
          console.log(resultTask);
          if (resultTask.includes("fastaerror")) {
            var errorRaw = resultTask.split("-");
            errorFasta = errorRaw[1].trim();
  
            console.log(errorFasta);
            if (errorFasta === "1") {
              document.getElementById(
                "AtSubP2error"
              ).innerHTML = `Please provide one of these: Accession Number, a valid FASTA file OR valid FASTA sequence(s)`;
              $("#errorModal").modal("show");
            } else if (errorFasta === "6") {
              document.getElementById(
                "AtSubP2error"
              ).innerHTML = `LegumeLoc accepts only 10,000 sequences at a time. For analyzing a large number of sequences, contact us.`;
              $("#errorModal").modal("show");
            }
          } else if (resultTask.includes("proceed")) {
            // console.log("I am here");
            var request = new XMLHttpRequest();
            request.open(
              "POST",
              // "http://localhost/legumeloc/backend/run_task.php",
              "https://kaabil.net/legumeloc/backend/run_task.php",
              true
            );
  
            // $('#onPredictionTask').modal("show");
            document.querySelector("#intermediate").classList.remove("d-none");
            document.querySelector("#mainc").classList.add("d-none");
  
            request.onload = function () {
              if (request.readyState === request.DONE && request.status === 200) {
                resultTask = request.response;
                console.log(resultTask);
                window.location.replace(newResult);
              }
            };
            request.send(AtSubP2FormData);
          }
        }
      }
    };
    validationRequest.send(AtSubP2FormData);
  });
  
  $("#loadDemoData").click(function () {
  
    $.get('./assets/js/demo.fa', function(data) {
  
      data = data.replace(/^\s*$(?:\r\n?|\n)/gm, "");
      document.getElementById("textareaSeq").value = data;
      // console.log(data)
   }, 'text');
});