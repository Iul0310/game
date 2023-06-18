function addColumn() {
    var table = document.getElementById("listTable");
    let num = table.rows.length;
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    cell1.innerHTML = `<p id=rowId_${num + 1} style="font-weight: bold">${num + 1}</p>`;
    cell2.innerHTML = `<input id=cost_${num + 1} class="form-control" style="border-color: red" type="number" placeholder="刷豆量" aria-label="刷豆量" min="0">`;
    cell3.innerHTML = `<input id="rate_${num + 1}" class="form-control" style="background-color: #FFFFFF" type="number" step="0.001" placeholder="返豆比例" aria-label="返豆比例" min="0" value="0" readonly>`;
    cell4.innerHTML = `<input id="returnBeans_${num + 1}" class="form-control" style="background-color: #FFFFFF" placeholder="暫定須返" aria-label="暫定須返" min="0" value="0" readonly>`;
    cell5.innerHTML = `<input id=revision_${num + 1} class="form-control" style="border-color: red" type="number" placeholder="調整豆數" aria-label="調整豆數" min="0">`;
    cell6.innerHTML = `<input id="resultBeans_${num + 1}" class="form-control" style="background-color: #FFFFFF" placeholder="確定須返" aria-label="確定須返" min="0" value="0" readonly>`;
    cell7.innerHTML = `<input id=IDorName_${num + 1} class="form-control" type="text" placeholder="ID / Name" aria-label="ID / Name">`;
    cell8.innerHTML = `<button id=btn_${num + 1} type="button" class="btn btn-primary" onclick="calculateSingeRow(${num + 1})">OK</button>`;
}

function getReturnTotal() {
    let val = $("#total option:selected").val();
    let result = 0;
    switch (val) {
        case '100000':
            result = '15000';
            break;
        case '500000':
            result = '75000';
            break;
        case '1000000':
            result = '150000';
            break;
        case '3000000':
            result = '450000';
            break;
        case '5000000':
            result = '750000';
            break;
    }
    document.getElementById("returnTotal").value = changeNumber(result);
    console.log(result);
}

function calculateSingeRow(rowNum) {
    var t = Number(document.getElementById("total").value.replace(',',''));
    var rt = document.getElementById("returnTotal").value;

    var a = document.getElementById(`cost_${rowNum}`).value;
    var aa = document.getElementById(`rate_${rowNum}`);
    var bb = document.getElementById(`returnBeans_${rowNum}`);
    var cc = document.getElementById(`resultBeans_${rowNum}`);
    var b = document.getElementById(`revision_${rowNum}`).value;

    console.log('a ', a, ' t ', t, ' total ', a/t);
    let aa_value = Math.round((a/t) * 1000) / 1000;
    // Math.round((481415/1000000) * 1000) / 1000

    // console.log(aa_value);
    aa.value = aa_value;
    // console.log('rt: ' + rt + '\n' + 'aa_value: ' + aa_value)
    let bb_value = Number(rt.replace(',','')) * aa_value;
    bb.value = changeNumber(bb_value);

    let cc_value = Number(bb_value) + Number(b);
    cc.value = changeNumber(cc_value);

    document.getElementById('cost_0').value = totalCost();
    if (Number(document.getElementById('cost_0').value) === t) {
        // console.log('same');
        document.getElementById('cost_0').style.backgroundColor = "#B2FFBC";
    } else {
        // console.log('not same');
        document.getElementById('cost_0').style.backgroundColor = "#EAECEF";
    }

    document.getElementById('rate_0').value = totalRate();
    if (Number(document.getElementById('rate_0').value) === 1) {
        // console.log('same');
        document.getElementById('rate_0').style.backgroundColor = "#B2FFBC";
    } else {
        // console.log('not same');
        document.getElementById('rate_0').style.backgroundColor = "#EAECEF";
    }

    document.getElementById('returnBeans_0').value = totalReturnBeans();
    if (Number(document.getElementById('returnBeans_0').value) === Number(rt.replace(',',''))) {
        // console.log('same');
        document.getElementById('returnBeans_0').style.backgroundColor = "#B2FFBC";
    } else {
        // console.log('not same');
        document.getElementById('returnBeans_0').style.backgroundColor = "#EAECEF";
    }

    document.getElementById('resultBeans_0').value = totalReturnBeans();
    if (Number(document.getElementById('resultBeans_0').value) === Number(rt.replace(',',''))) {
        // console.log('same');
        document.getElementById('resultBeans_0').style.backgroundColor = "#B2FFBC";
    } else {
        // console.log('not same');
        document.getElementById('resultBeans_0').style.backgroundColor = "#EAECEF";
    }

    document.getElementById('revision_0').value = (Number(rt.replace(',','')) - document.getElementById('returnBeans_0').value) - totalRevision();
    if (Number(document.getElementById('revision_0').value) === 0) {
        document.getElementById('revision_0').style.backgroundColor = "#B2FFBC";
    } else {
        document.getElementById('revision_0').style.backgroundColor = "#FFB3B3";
    }

    document.getElementById('resultBeans_0').value = Number(totalReturnBeans()) + Number(b);

    document.getElementById('demo').innerHTML = document.getElementById('listTable').rows.length;
}

function totalCost() {
    let colCount = document.getElementById('listTable').rows.length;
    let _totalCost = 0;
    for (let i = 1; i <= colCount; i++) {
        _totalCost += Number(document.getElementById(`cost_${i}`).value);
    }
    return _totalCost;
}

function totalRate() {
    let colCount = document.getElementById('listTable').rows.length;
    let _totalRate = 0;
    for (let i = 1; i <= colCount; i++) {
        _totalRate += parseFloat(document.getElementById(`rate_${i}`).value);
    }
    return _totalRate;
}

function totalReturnBeans() {
    let colCount = document.getElementById('listTable').rows.length;
    let _totalRB = 0;
    for (let i = 1; i <= colCount; i++) {
        _totalRB += parseFloat(document.getElementById(`returnBeans_${i}`).value.replace(',',''));
    }
    return _totalRB;
}

function totalResultBeans() {
    let colCount = document.getElementById('listTable').rows.length;
    let _totalRB = 0;
    for (let i = 1; i <= colCount; i++) {
        _totalRB += parseFloat(document.getElementById(`resultBeans_${i}`).value.replace(',',''));
    }
    return _totalRB;
}

function totalRevision() {
    let colCount = document.getElementById('listTable').rows.length;
    let _totalRB = 0;
    for (let i = 1; i <= colCount; i++) {
        let tempRevision = (document.getElementById(`revision_${i}`).value == '' || document.getElementById(`revision_${i}`).value === '0') ? 0 : document.getElementById(`revision_${i}`).value;
        _totalRB += parseFloat(tempRevision);
    }
    return _totalRB;
}


function calculate() {
    var t = Number(document.getElementById("total").value.replace(',',''));
    var rt = document.getElementById("returnTotal").value;
    var a = document.getElementById("a").value;
    var aa = document.getElementById("aa");
    var bb = document.getElementById("bb");
    var cc = document.getElementById("cc");
    var b = document.getElementById("b").value;

    let aa_value = Math.round((a/t) * 1000) / 1000;
    console.log(aa_value);
    aa.innerHTML = aa_value;
    let bb_value = rt * aa_value;
    bb.innerHTML = changeNumber(bb_value);

    let cc_value = Number(bb_value) + Number(b);
    cc.innerHTML = changeNumber(cc_value);
}

function changeNumber(num) {
    let result = (Number(num).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    return result;
}