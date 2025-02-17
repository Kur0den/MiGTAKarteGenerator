function locationUpdateSelectOptions() {
    const searchBox = document.getElementById('locationSearchBox');
    const resultSelect = document.getElementById('locationResultSelect');
    const dataSource = document.getElementById('locationDataSource');
    const lines = dataSource.value.split('\n');
    resultSelect.innerHTML = ''; // select要素をクリア
    lines.forEach(function (line) {
        if (line.includes(searchBox.value)) {
            const option = document.createElement('option');
            option.text = line.trim().split(';')[0]; // トリムしてからセミコロン前を追加
            resultSelect.add(option);
        }
    });
}

function billingUpdateSelectOptions() {
    const isDowned = document.getElementById('symptomE').checked;
    const billing = document.getElementById('billing');

    billing.innerHTML = ''; // select要素をクリア

    if (isDowned) {
        billing.innerHTML = `
        <option value="院内蘇生">院内蘇生</option>
        <option value="現場蘇生">現場蘇生</option>
        <option value="事件対応蘇生">事件対応蘇生</option>
        <option value="院内蘇生(初心者割)">院内蘇生(初心者割)</option>
        <option value="現場蘇生(初心者割)">現場蘇生(初心者割)</option>
        <option value="ゆがみ対応">ゆがみ対応</option>
        <option value="C対応・その他補填">C対応・その他補填</option>`;
    } else {
        billing.innerHTML = `
        <option value="院内治療">院内治療</option>
        <option value="現場治療">院外治療</option>
        <option value="院内治療(初心者割)">院内治療(初心者割)</option>
        <option value="現場治療(初心者割)">院外治療(初心者割)</option>
        <option value="ゆがみ対応">ゆがみ対応</option>
        <option value="C対応・その他補填">C対応・その他補填</option>`;
    }
}

function setDateTime() {
    const currentDate = new Date();
    const dateString = `${currentDate.getFullYear()}/${String(
        currentDate.getMonth() + 1
    ).padStart(2, '0')}/${String(currentDate.getDate()).padStart(
        2,
        '0'
    )} ${String(currentDate.getHours()).padStart(2, '0')}:${String(
        currentDate.getMinutes()
    ).padStart(2, '0')}`;

    document.getElementById('dateTime').value = dateString;
}

function patientNames() {
    const isDisableNameSearch =
        document.getElementById('disableNameSearch').checked;
    const isMultipleNameSelectEnable = document.getElementById(
        'multipleNameSelectEnable'
    ).checked;
    let name = '';
    if (isMultipleNameSelectEnable) {
        const multipleNameSelect =
            document.getElementById('multipleNameSelect');
        let values = [];
        // 右のセレクト要素内の全てのオプションをループ処理
        for (let i = 0; i < multipleNameSelect.options.length; i++) {
            let option = multipleNameSelect.options[i];
            // オプションのvalueを配列に追加
            values.push(option.value);
        }
        name = values.join('　様\nName：');
    } else {
        const name_search_word = document.getElementById('nameSearchBox').value;
        const name_search_result =
            document.getElementById('nameResultSelect').value;
        if (isDisableNameSearch) {
            name = name_search_word.replace(/[;；]\s?/g, '　様\nName：');
        } else {
            name = name_search_result.trim();
        }
    }

    return `${name}　様`;
}

// 文書を生成する関数
function generateText() {
    const dateTime = document.getElementById('dateTime').value;
    const currentDate = new Date();
    const dateString =
        dateTime != ''
            ? dateTime
            : `${currentDate.getFullYear()}/${String(
                  currentDate.getMonth() + 1
              ).padStart(2, '0')}/${String(currentDate.getDate()).padStart(
                  2,
                  '0'
              )} ${String(currentDate.getHours()).padStart(2, '0')}:${String(
                  currentDate.getMinutes()
              ).padStart(2, '0')}`;

    const name = patientNames();

    const isDisableLocationSearch = document.getElementById(
        'disableLocationSearch'
    ).checked;
    let location = '';
    const location_kana = document.getElementById('locationResultSelect').value;
    const location_search_word =
        document.getElementById('locationSearchBox').value;
    if (isDisableLocationSearch) {
        location = location_search_word;
    } else {
        location = location_kana.trim();
    }

    const symptoms = document.querySelectorAll('input[name="symptom"]:checked');
    const doctor = document.getElementById('doctor').value;
    const billing = document.getElementById('billing').value;
    const remarks = document.getElementById('remarks').value;
    const feedback = document.getElementById('feedback').value;
    const isSymptomA = document.getElementById('symptomA').checked; //打撲
    const isSymptomB = document.getElementById('symptomB').checked; //出血
    const isSymptomC = document.getElementById('symptomC').checked; //銃創
    const isSymptomD = document.getElementById('symptomD').checked; //火傷
    const isSymptomE = document.getElementById('symptomE').checked; //気絶

    const isTransportA = document.getElementById('transportA').checked; //本病院
    const isTransportB = document.getElementById('transportB').checked; //北病院

    let symptomsText = Array.from(symptoms)
        .map((symptom) => symptom.value)
        .join('・');
    let actionText = '';

    if (isTransportA) actionText = actionText + '本病院に搬送し、';
    if (isTransportB) actionText = actionText + '北病院に搬送し、';

    if (isSymptomA) actionText = actionText + 'アイスパックで患部を冷やし、';
    if (isSymptomB) actionText = actionText + '縫合キットで患部を縫合し、';
    if (isSymptomC) actionText = actionText + 'ピンセットで弾丸を摘出し、';
    if (isSymptomD) actionText = actionText + '火傷クリームを患部に塗布し、';
    if (isSymptomE) {
        actionText = actionText + '除細動器による蘇生を実施';
    } else {
        actionText = actionText + '医療キットによる治療を実施';
    }

    const generatedText = `Date：${dateString}\nName：${name}\n場所：${location}\n症状：${symptomsText}\n治療者：${doctor}\n対処：${actionText}\n請求：${billing}\n備考：${remarks}\n感想「${feedback}」`;

    document.getElementById('outputText').textContent = generatedText;
    document.getElementById('nameDataSourceDiv').hidden = true;
    document.getElementById('locationDataSourceDiv').hidden = true;
    if (document.getElementById('enableClipboard').checked) {
        copyTextToClipboard(generatedText);
    }
}

function clearInput() {
    document.getElementById('dateTime').value = '';
    // document.getElementById('nameSearchBox').value = '';
    document.getElementById('locationSearchBox').value = '';
    document.getElementById('billing').value = '院内治療';
    document.getElementById('remarks').value = '';
    document.getElementById('feedback').value = '';
    document.getElementById('symptomA').checked = false; //打撲
    document.getElementById('symptomB').checked = false; //出血
    document.getElementById('symptomC').checked = false; //銃創
    document.getElementById('symptomD').checked = false; //火傷
    document.getElementById('symptomE').checked = false; //気絶
    $('#transportTo').val('なし');
    document.getElementById('disableLocationSearch').checked = false;
    document.getElementById('outputText').textContent = '';
    document.getElementById('nameDataSourceDiv').hidden = true;
    document.getElementById('locationDataSourceDiv').hidden = true;
    document.getElementById('clipboardResult').innerText = '';
    locationUpdateSelectOptions();
    billingUpdateSelectOptions();
}

function exportData() {
    const doctor = document.getElementById('doctor').value;
    const nameDataSource = document.getElementById('nameDataSource').value;
    const locationDataSource =
        document.getElementById('locationDataSource').value;
    const data = { doctor, nameDataSource, locationDataSource };
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MiGTAKarteGeneratorBackup.json'; // ダウンロードするファイルの名前
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// ページ読み込み時のデータ読み込み処理など
$(function () {
    clearInput();

    // オートコンプリート用の関数
    // 医師
    $('#doctor').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: 'get',
                url: '/api/get_doctor/?name=' + request.term,
                dataType: 'json',
            })
                .done(function (res) {
                    response(res);
                })
                .fail(function (res) {
                    console.error(res.responseJSON);
                    response([]);
                });
        },
        delay: 500,
        minLength: 1,
    });

    // 患者
    $('#user').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: 'get',
                url: '/api/get_user/?name=' + request.term,
                dataType: 'json',
            })
                .done(function (res) {
                    response(res);
                })
                .fail(function (res) {
                    console.error(res.responseJSON);
                    response([]);
                });
        },
        delay: 500,
        minLength: 1,
    });

    // doctor
    // リスト追加用の関数
    $('#addDoctor').click(function () {
        var userInput = $('#doctor').val();
        $('#selectedDoctorList').append(new Option(userInput));
        $('#doctor').val('');
    });
    // リスト削除用の関数
    $('#removeDoctor').click(function () {
        $('#selectedDoctorList option:selected').remove();
    });

    // user
    // リスト追加用の関数
    $('#addUser').click(function () {
        var userInput = $('#user').val();
        $('#selectedUserList').append(new Option(userInput));
        $('#user').val('');
    });
    // リスト削除用の関数
    $('#removeUser').click(function () {
        $('#selectedUserList option:selected').remove();
    });
});

function addMultipleName() {
    var leftSelect = document.getElementById('nameResultSelect');
    var rightSelect = document.getElementById('multipleNameSelect');

    // 左のセレクト要素で選択されているオプションを取得
    var selectedOptions = leftSelect.selectedOptions;

    // 選択されている各オプションを右のセレクト要素に追加
    for (var i = 0; i < selectedOptions.length; i++) {
        var option = selectedOptions[i];
        // 新しいオプション要素を作成して右のセレクト要素に追加
        rightSelect.appendChild(option.cloneNode(true));
    }
}

// クリップボードにコピーする関数
function copyTextToClipboard(text) {
    navigator.clipboard
        .writeText(text)
        .then(function () {
            let clipboardResult = document.getElementById('clipboardResult');
            clipboardResult.innerText = 'クリップボードにコピーしました。';
            clipboardResult.classList.add('fade-out'); // テキストを可視状態にする

            setTimeout(function () {
                clipboardResult.innerText = '';
                clipboardResult.classList.remove('fade-out'); // 2秒後に透明度を0にして徐々に消す
            }, 1950); // 表示してから透明度を変更するまでの時間
        })
        .catch(function (err) {
            clipboardResult.innerText =
                'クリップボードのコピーに失敗しました。';
            clipboardResult.classList.add('fade-out'); // テキストを可視状態にする

            setTimeout(function () {
                clipboardResult.innerText = '';
                clipboardResult.classList.remove('fade-out'); // 2秒後に透明度を0にして徐々に消す
            }, 1950); // 表示してから透明度を変更するまでの時間
        });
}
