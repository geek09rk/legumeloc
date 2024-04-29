function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var result = getUrlVars()
var data = result['result'].split("+")

// console.log(data)

function jq(myid) {
    return "#" + myid.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1");
}

$(document).ready(function () {

    var phase = data[1];
    var filer = data[0];
    var clicks = 0;

    $("#download1").click(function () {
        exportData("p1Table", "LegumeLoc_single_vs_dual_localizations.txt")
    });

    $("#download2").click(function () {
        exportData("p2Table", "LegumeLoc_single_class_localizations.txt")
    });

    $("#download3").click(function () {
        exportData("p3Table", "LegumeLoc_dual_class_localizations.txt")
    });

    if (phase === 'level1') {
        document.querySelector("#phase1").innerHTML = "Level 1 Results";
        document.querySelector("#phase1").classList.remove("AtSubP2-btn-1");
        document.querySelector("#phase1").classList.add("AtSubP2-btn-3");
        populateTable("./tmp/" + filer + "/LegumeLoc_single_vs_dual_localizations.txt", "#p1Table", 'Phase1');
        document.querySelector("#download1").classList.remove("d-none");
        document.querySelector("#sl1").classList.remove("d-none");
    }

    if (phase === 'level2') {
        document.querySelector("#phase2").classList.remove("d-none");
        document.querySelector("#phase2").classList.remove("AtSubP2-btn-1");
        document.querySelector("#phase2").classList.add("AtSubP2-btn-3");
        document.querySelector("#p1Table").classList.add("d-none");
        document.querySelector("#p3Table").classList.add("d-none");
        document.querySelector("#phase2").innerHTML = "Level 2 Results";
        populateTable("./tmp/" + filer + "/LegumeLoc_single_class_localizations.txt", "#p2Table", 'Phase2')
        document.querySelector("#download2").classList.remove("d-none");
        document.querySelector("#sl3").classList.remove("d-none");
    }

    if (phase === 'level3') {
        document.querySelector("#p1Table").classList.add("d-none");
        document.querySelector("#p2Table").classList.add("d-none");
        document.querySelector("#phase2").classList.remove("d-none");
        document.querySelector("#phase3").classList.remove("d-none");
        document.querySelector("#phase3").innerHTML = "Level 3 Results";
        document.querySelector("#phase3").classList.remove("AtSubP2-btn-1");
        document.querySelector("#phase3").classList.add("AtSubP2-btn-3");
        populateTable("./tmp/" + filer + "/LegumeLoc_dual_class_localizations.txt", "#p3Table", 'Phase3');
        document.querySelector("#download3").classList.remove("d-none");
        document.querySelector("#sl3").classList.remove("d-none");
    }


    $("#phase1").click(function () {
        document.querySelector("#phase1").innerHTML = "Level 1 Results";
        document.querySelector("#phase2").innerHTML = "View Level 2 Results";
        document.querySelector("#phase3").innerHTML = "View Level 3 Results";
        document.querySelector("#phase1").classList.remove("AtSubP2-btn-1");
        document.querySelector("#phase1").classList.add("AtSubP2-btn-3");
        document.querySelector("#p1Table").classList.remove("d-none");
        document.querySelector("#p2Table").classList.add("d-none");
        document.querySelector("#p3Table").classList.add("d-none");
        document.querySelector("#phase2").classList.remove("AtSubP2-btn-3");
        document.querySelector("#phase2").classList.add("AtSubP2-btn-1");
        document.querySelector("#phase3").classList.remove("AtSubP2-btn-3");
        document.querySelector("#phase3").classList.add("AtSubP2-btn-1");
        populateTable("./tmp/" + filer + "/LegumeLoc_single_vs_dual_localizations.txt", "#p1Table", 'Phase1');
        document.querySelector("#download1").classList.remove("d-none");
        document.querySelector("#download2").classList.add("d-none");
        document.querySelector("#download3").classList.add("d-none");
        document.querySelector("#sl1").classList.remove("d-none");
        document.querySelector("#sl3").classList.add("d-none");
    });

    $("#phase2").click(function () {
        document.querySelector("#phase1").innerHTML = "View Level 1 Results";
        document.querySelector("#phase2").innerHTML = "Level 2 Results";
        document.querySelector("#phase3").innerHTML = "View Level 3 Results";
        document.querySelector("#phase2").classList.remove("AtSubP2-btn-1");
        document.querySelector("#phase2").classList.add("AtSubP2-btn-3");
        document.querySelector("#p2Table").classList.remove("d-none");
        document.querySelector("#p1Table").classList.add("d-none");
        document.querySelector("#p3Table").classList.add("d-none");
        document.querySelector("#phase1").classList.remove("AtSubP2-btn-3");
        document.querySelector("#phase1").classList.add("AtSubP2-btn-1");
        document.querySelector("#phase3").classList.remove("AtSubP2-btn-3");
        document.querySelector("#phase3").classList.add("AtSubP2-btn-1");
        populateTable("./tmp/" + filer + "/LegumeLoc_single_class_localizations.txt", "#p2Table", 'Phase2');
        document.querySelector("#download2").classList.remove("d-none");
        document.querySelector("#download1").classList.add("d-none");
        document.querySelector("#download3").classList.add("d-none");
        document.querySelector("#sl1").classList.add("d-none");
        document.querySelector("#sl3").classList.remove("d-none");
    });

    $("#phase3").click(function () {
        document.querySelector("#phase1").innerHTML = "View Level 1 Results";
        document.querySelector("#phase2").innerHTML = "View Level 2 Results";
        document.querySelector("#phase3").innerHTML = "Level 3 Results";
        document.querySelector("#phase3").classList.remove("AtSubP2-btn-1");
        document.querySelector("#phase3").classList.add("AtSubP2-btn-3");
        document.querySelector("#p3Table").classList.remove("d-none");
        document.querySelector("#p1Table").classList.add("d-none");
        document.querySelector("#p2Table").classList.add("d-none");
        document.querySelector("#phase1").classList.remove("AtSubP2-btn-3");
        document.querySelector("#phase1").classList.add("AtSubP2-btn-1");
        document.querySelector("#phase2").classList.remove("AtSubP2-btn-3");
        document.querySelector("#phase2").classList.add("AtSubP2-btn-1");
        populateTable("./tmp/" + filer + "/LegumeLoc_dual_class_localizations.txt", "#p3Table", 'Phase3');
        document.querySelector("#download3").classList.remove("d-none");
        document.querySelector("#download2").classList.add("d-none");
        document.querySelector("#download1").classList.add("d-none");
        document.querySelector("#sl1").classList.add("d-none");
        document.querySelector("#sl3").classList.remove("d-none");
    });

    $('#phase2predict').click(function() {
        var pFormData = new FormData();
        var namer = data[0].split("_")[0];
        var level2 = "level2";
        var algorithm = data[2];
     
        pFormData.append('namer', namer);
        pFormData.append('level2', level2);
        pFormData.append('algorithm',algorithm );
       
        var dd = namer + "_" + level2;
        console.log(dd)
        var response = `${dd}+${level2}+${algorithm}`
        
        var resultUrl = `https://kaabil.net/legumeloc/results.html?result=${response}`;
        // var resultUrl = `http://localhost/legumeloc/results.html?result=${response}`;
    
        var finishText =
            `You have successfully submitted a query at LegumeLoc. Your results will be available at ${resultUrl}`
    
        document.getElementById("deepNECSubmittionScreen").innerHTML = finishText;
    
        $.ajax({
            type: "POST",
            url: "https://kaabil.net/legumeloc/backend/hi.php",
            // url: "http://localhost/legumeloc/backend/hi.php",
            data: pFormData,
            cache: false,
            processData: false,
            contentType: false,
           
            success: function(response) {
                console.log(response);
                $('#onPredictionTask').modal("show");
                var runUrl = "https://kaabil.net/legumeloc/backend/run_task_2.php";
                // var runUrl = "http://localhost/legumeloc/backend/run_task_2.php";
                $.get(runUrl, function(data) {
                    window.open(resultUrl);
                    $('#onPredictionTask').modal("hide");
                });
            }
        });
    });  
    

    $('#phase3predict').click(function() {
        var pFormData = new FormData();
        var namer = data[0].split("_")[0];
        var level2 = "level3";
        var algorithm = data[2];
        
        pFormData.append('namer', namer);
        pFormData.append('level2', level2);
        pFormData.append('algorithm',algorithm );
       
        var dd = namer + "_" + level2;
        console.log(dd)
       
        var response = `${dd}+${level2}+${algorithm}`
        
        var resultUrl = `https://kaabil.net/legumeloc/results.html?result=${response}`;
        // var resultUrl = `http://localhost/legumeloc/results.html?result=${response}`;
    
        var finishText =
            `You have successfully submitted a query at LegumeLoc. Your results will be available at ${resultUrl}`
    
        document.getElementById("deepNECSubmittionScreen").innerHTML = finishText;
    
        $.ajax({
            type: "POST",
            url: "https://kaabil.net/legumeloc/backend/hi.php",
            // url: "http://localhost/legumeloc/backend/hi.php",
            data: pFormData,
            cache: false,
            processData: false,
            contentType: false,
           
            success: function(response) {
                console.log(response);
                $('#onPredictionTask').modal("show");
                var runUrl = "https://kaabil.net/legumeloc/backend/run_task_2.php";
                // var runUrl = "http://localhost/legumeloc/backend/run_task_2.php";
                $.get(runUrl, function(data) {
                    window.open(resultUrl);
                    $('#onPredictionTask').modal("hide");
                });
            }
        });
    });
});


function populateTable(filename, tablename, level, term, callback) {

    var tableContent = '';

    $.get(filename, function (data) {

        var lineByline = data.split('\n');
        lineByline = lineByline.filter(line => {
            return line != '';
        })

        if (level === "Phase1") {
            // lineByline.shift();
            let firstLine = lineByline.shift().split("\t");
            tableContent += `
                    <thead class="AtSubP2-head">
                    <tr>
                        <th class="px-3" >${firstLine[0]}</th>
                        <th class="px-3" >${firstLine[1]}</th>
                        <th class="px-3" >${firstLine[2]}</th>                
                        <th class="px-3" >${firstLine[3]}</th>
                    </tr>
                </thead>
                    `;

            // tableContent += '<tbody>';
            var loc= [];

            $.each(lineByline, function (key, value) {

                var vd = value.split('\t');

                    loc.push(vd[1])

                // console.log(vd);
                tableContent += '<tr class="d-tr">';
                
                if (vd[1] == "Single") {
                    tableContent += '<td class="px-3">' + vd[0] + '</td>';
                }
                else { tableContent += '<td class="px-3" >' + vd[0] + '</td>'; }
                tableContent += '<td class="px-3"><b>' + vd[1] + '</b></td>';
                
                if (vd[2] > vd[3]) {
                    tableContent += '<td class="px-3" ><b>' + vd[2] + '</b></td>';
                    tableContent += '<td class="px-3" >' + vd[3] + '</td>';
                }
                else {
                    tableContent += '<td class="px-3" >' + vd[2] + '</td>';
                    tableContent += '<td class="px-3" ><b>' + vd[3] + '</b></td>';
                }

                // tableContent += '<td><button type="button" id=ss-' + vd[0] + ' class="btn btn-sm AtSubP2-btn-1 sec-struct">Predict</button> </td>';
                // tableContent += '<td class="px-3" ><input type="button" value = "Predict"  id = ss-' + vd[0] + ' class="AtSubP2-btn-1 btn btn-sm sec-struct"/> </td>';
                tableContent += '</tr>';
            });

            var uniqs = loc.reduce((acc, val) =>{
                acc[val]= acc[val] ==undefined ? 1: acc[val] +=1;
                return acc
            }, {})
            console.log(uniqs['Single'])

            document.getElementById("total").innerHTML=`Total number of input sequences: ${loc.length}`;
            document.getElementById("single").innerHTML=`'Single' localization proteins predicted: ${uniqs['Single']}`;
            document.getElementById("dual").innerHTML=`'Dual' localization proteins predicted: ${uniqs['Dual']}`;
        }


        if (level === "Phase2") {
            let firstLine = lineByline.shift().split("\t");
            // console.log(firstLine);
            tableContent += `
                    <thead class="AtSubP2-head">
                    <tr>
                        <th class="px-3" >${firstLine[0]}</th>
                        <th class="px-3" >${firstLine[1]}</th>
                        <th class="px-3" >${firstLine[2]}</th>                
                        <th class="px-3" >${firstLine[3]}</th>
                        <th class="px-3" >${firstLine[4]}</th>
                        <th class="px-3" >${firstLine[5]}</th>
                        <th class="px-3" >${firstLine[6]}</th>
                        <th class="px-3" >${firstLine[7]}</th>
                        <th class="px-3" >${firstLine[8]}</th>
                        <th class="px-3" >${firstLine[9]}</th>
                        <th class="px-3" >${firstLine[10]}</th>
                        <th class="px-3" >${firstLine[11]}</th>
                        <th class="px-3" >${firstLine[12]}</th>
                    </tr>
                </thead>
                `;

                var loc=[];
                $.each(lineByline, function (key, value) {
                let vd = value.split('\t');
                    loc.push(vd[1])

                vdd = vd.slice(2, 13).map(Number)

                let tableData = [];
                let max = 0;
                let smax = secondValue(vdd);
                let tmax = thirdValue(vdd);
                // console.log(`${smax} - ${tmax}`);
                let index = 0;
                let inds = 0;
                let indt = 0;

                for (let i = 2; i < 13; i++) {
                    if (i > max) {
                        max = vd[i];
                        index = i;
                    }

                    if (vd[i] == smax) {
                        inds = i;
                    }

                    if (vd[i] == tmax) {
                        indt = i;
                    }
                }
                // console.log(inds);

                tableContent += '<tr class="d-tr">';
                tableContent += '<td class="pl-2">' + vd[0] + '</td>';
                tableContent += '<td class="px-3"><b>' + vd[1] + '</b></td>';

                for (let i = 2; i < 13; i++) {
                    if (i == index) {
                        tableData.push(`<td class="f-td px-3"><b>${vd[i]}</b></td>`);
                        continue;
                    }

                    if (i == inds) {
                        tableData.push(`<td class="s-td px-3">${vd[i]}</td>`);
                        continue;
                    }

                    if (i == indt) {
                        tableData.push(`<td class="t-td px-3">${vd[i]}</td>`);
                        continue;
                    }

                    tableData.push(`<td class="px-3">${vd[i]}</td>`);
                }

                for (let data of tableData) {
                    tableContent += data;
                }

                // tableContent += '<td class="px-3"><button type="button" id=ss-' + vd[0] + ' class="btn btn-sm AtSubP2-btn-1 sec-struct">Predict</button> </td>';
                tableContent += '</tr>';
            });
            var uniqs = loc.reduce((acc, val) =>{
                acc[val]= acc[val] ==undefined ? 1: acc[val] +=1;
                return acc
            }, {})
            // console.log(uniqs)
                
            summary ='| '
            for (k in uniqs){
                summary += k+": "+uniqs[k]+" | "
            }
            
            document.getElementById("total1").innerHTML=`Total number of predicted single localization proteins: ${loc.length}`;
            document.getElementById("dual-loc").innerText=summary
        }


        if (level === "Phase3") {
            // let firstLine = lineByline.shift().split("\t");
            // console.log(firstLine);
            if (lineByline.length<=1){
                tableContent +=`No proteins are predicted as dual localization in this level.`
            }
            else{

            firstLine = lineByline.shift()
            tableContent += `
                    <thead class="AtSubP2-head">
                    <tr>
                        <th class="px-3" >SampleID</th>
                        <th class="px-3" >Predicted</th>
                        <th class="px-2" >CellMemb & Membrane</th>
                        <th class="px-2" >Cyto & Membrane</th>                
                        <th class="px-2" >Cyto & Mito</th>
                        <th class="px-2" >Cyto & Nucleus</th>
                        <th class="px-2" >Cyto & Vesicle</th>
                        <th class="px-3" >ER & Membrane</th>
                        <th class="px-3" >Golgi & Membrane</th>
                        <th class="px-3" >Membrane & Mito</th>
                        <th class="px-3" >Membrane & Nucleus</th>
                        <th class="px-3" >Membrane & Plastid</th>
                        <th class="px-3" >Membrane & Secreted</th>
                        <th class="px-3" >Membrane & Vacuole</th>
                        <th class="px-3" >Nucleus & Chromosome</th>
                        <th class="px-3" >Plastid & Mito</th>
                    </tr>
                </thead>
                `;

            var loc=[];
            $.each(lineByline, function (key, value) {
                
                let vd = value.split('\t');
                    loc.push(vd[1])

                vdd = vd.slice(2, 16).map(Number)

                let tableData = [];

                let max = 0;
                let smax = secondValue(vdd);
                let tmax = thirdValue(vdd);
                // console.log(`${smax} - ${tmax}`);
                let index = 0;
                let inds = 0;
                let indt = 0;

                for (let i = 2; i < 16; i++) {
                    if (i > max) {
                        max = vd[i];
                        index = i;
                    }
                    if (vd[i] == smax) {
                        inds = i;

                    }
                    if (vd[i] == tmax) {
                        indt = i;
                    }
                }
                // console.log(inds);

                tableContent += '<tr class="d-tr">';
                tableContent += '<td class="px-3">' + vd[0] + '</td>';
                tableContent += '<td class="px-3"><b>' + vd[1] + '</b></td>';

                for (let i = 2; i < 16; i++) {
                    if (i == index) {
                        tableData.push(`<td class="f-td px-3"><b>${vd[i]}</b></td>`);
                        continue;
                    }

                    if (i == inds) {
                        tableData.push(`<td class="s-td px-3">${vd[i]}</td>`);
                        continue;
                    }

                    if (i == indt) {
                        tableData.push(`<td class="t-td px-3">${vd[i]}</td>`);
                        continue;
                    }
                    
                    tableData.push(`<td class="px-3">${vd[i]}</td>`);
                }

                for (let data of tableData) {
                    tableContent += data;
                }

                // tableContent += '<td class="px-3"><button type="button" id=ss-' + vd[0] + ' class="btn btn-sm AtSubP2-btn-1 sec-struct">Predict</button> </td>';
                tableContent += '</tr>';
            });

            var uniqs = loc.reduce((acc, val) =>{
                acc[val]= acc[val] ==undefined ? 1: acc[val] +=1;
                return acc
            }, {})
            // console.log(uniqs)

                summary ='| '
            for (k in uniqs){
                summary += k+": "+uniqs[k]+" | "
            }
            
            document.getElementById("total1").innerHTML=`Total number of predicted dual localization proteins: ${loc.length}`;
            document.getElementById("dual-loc").innerText=summary
        }
        }

        // tableContent += '</tbody>';

        $(tablename).html(tableContent);
        // $(tablename).DataTable();

        if (callback) {
            callback();
        }
    });
};


function secondValue(value) {
    let max = Math.max.apply(null, value), // get the max of the array
        maxi = value.indexOf(max);
    value[maxi] = -Infinity; // replace max in the array with -infinity
    let secondMax = Math.max.apply(null, value); // get the new max
    value[maxi] = max;
    return secondMax;
}

function thirdValue(value) {
    let max = Math.max.apply(null, value), // get the max of the array
        maxi = value.indexOf(max);
    value[maxi] = -Infinity; // replace max in the array with -infinity
    let secondMax = Math.max.apply(null, value), // get the new max
        secondMaxi = value.indexOf(secondMax);
    value[secondMaxi] = -Infinity;
    let thirdMax = Math.max.apply(null, value); // get the new max
    value[maxi] = max;
    value[secondMaxi] = secondMax;
    return thirdMax;
}

function exportData(tablename, filename) {

    // console.log(`${tablename} -${filename}`);
    $("#" + tablename + ".noExport").remove();
    let table = document.getElementById(tablename);
    var rowCount = $("#" + tablename + " td").closest("tr").length + 1;
    // console.log(rowCount);
    let rows = [];
    let row = 0;
    let dd = table.rows[0].cells;
    let rld = []

    for (let i = 0; i < dd.length; i++) {
        if (dd[i].classList.contains('noExport')) {
            continue
        }
        else {
            rld.push(dd[i])
        }
    }

    for (let i = 0; i < rowCount; i++) {

        row = table.rows[i].cells;
        // console.log(row);

        let col = [];
        let rl = rld.length;
        // console.log(rl);

        for (let j = 0; j < rl; j++) {
            // console.log(row[j].innerText);

            col.push(row[j].innerText)
        }
        // console.log(col);
        rows.push([col]);
        // console.log(rows);
    }
    csvContent = "data:text;charset=utf-8,";

    rows.forEach(function (rowArray) {
        row = rowArray.join().replace(/,/g, "\t");;
        // console.log(row)
        csvContent += row + "\r\n";
    });
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
}