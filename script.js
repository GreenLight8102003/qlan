casi = [
    "Doãn Tần",
    "Lê Dung",
    "Trần Khánh",
    "Tân Nhàn",
    "Quốc Hương"
];

bannhac = [
    ["Du kích sông Thao", 0],
    ["Trường ca sông Lô", 1],
    ["Tình ca", 2],
    ["Xa Khơi", 3],
    ["Việt Nam quê hương tôi", 0],
    ["Tiến về Hà Nội", 1],
    ["Nhạc rừng", 2],
    ["Tiếng hát giữa rừng Pắc Bó", 3],
];

nhacsi = [
    "Đỗ Nhuận",
    "Văn Cao",
    "Hoàng Việt",
    "Nguyễn Tài Tuệ",
];

banthuam = [
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 0],
    [6, 4],
    [7, 1],
    [1, 2],
    [5, 4]
];

function populateSelect(array, selectElement) {
    selectElement.innerHTML = '<option value="-1" disabled selected hidden>Chọn</option>';
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = array[i];
        selectElement.add(option);
    }
}
var lastChecked;

function toggleRadio(radio) {
    if (radio === lastChecked) {
        radio.checked = false;
        lastChecked = null;
        selectBannhac.value = "-1";
        selectCasi.value = "-1";
    } else {
        lastChecked = radio;
        var index = parseInt(radio.id);
        selectBannhac.value = banthuam[index][0];
        selectCasi.value = banthuam[index][1];
    }
}

function isValueExists(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][0] == value[0] && array[i][1] == value[1]) {
            return true;
        }
    }
    return false;
}

var selectCasi = document.getElementById("casi");
var selectBannhac = document.getElementById("bannhac");
var tableBanthuam = document.getElementById("banthuam").getElementsByTagName('tbody')[0];

function insertRow(id) {
    // Tạo một hàng mới
    var newRow = tableBanthuam.insertRow();

    // Tạo ô và thêm nội dung vào mỗi ô
    var cellXoa = newRow.insertCell(0);
    cellXoa.classList.add("text-center");
    cellXoa.innerHTML = '<td><input type="checkbox" id =' +  id.toString() + '></td>';

    var cellSua = newRow.insertCell(1);
    cellSua.classList.add("text-center");
    cellSua.innerHTML = '<td><input type="radio" name="sua" onclick="toggleRadio(this)" id =' +  id.toString() + '></td>';

    var cellMa = newRow.insertCell(2);
    cellMa.classList.add("text-center", "text-warning", "fw-bolder");
    cellMa.textContent = (id + 1).toString();

    var cellBannhac = newRow.insertCell(3);
    cellBannhac.innerHTML = "<td>" + bannhac[banthuam[id][0]][0] + ", " + nhacsi[bannhac[banthuam[id][1]][1]] + "</td>";

    var cellCasi = newRow.insertCell(4);
    cellCasi.innerHTML = "<td>" + casi[banthuam[id][1]] + "</td>";
}

buttonNhap = document.getElementById("nhap");
buttonTim = document.getElementById("tim");
buttonXoa = document.getElementById("xoa");
buttonLammoi = document.getElementById("lammoi");

buttonNhap.onclick = function() {
    if (selectCasi.value !== "-1" && selectBannhac.value !== "-1") {
        if (!isValueExists(banthuam, [parseInt(selectBannhac.value), parseInt(selectCasi.value)])) {
            if (lastChecked == null) {
                banthuam.push([parseInt(selectBannhac.value), parseInt(selectCasi.value)]);
                insertRow(banthuam.length - 1);
            }
            else {
                banthuam[parseInt(lastChecked.id)][0] = selectBannhac.value;
                banthuam[parseInt(lastChecked.id)][1] = selectCasi.value;
            
                // Xóa tất cả các dòng từ bảng
                tableBanthuam.innerHTML = "";
    
                // Thêm lại các dòng từ mảng banthuam
                for (var i = 0; i < banthuam.length; i++) {
                    insertRow(i);
                }
    
                lastChecked = null;

                selectBannhac.value = "-1";
                selectCasi.value = "-1";
            }
        }
    }
};

buttonXoa.onclick = function() {
    // Lấy tất cả các checkbox
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Lặp qua tất cả các checkbox và kiểm tra xem chúng đã được chọn hay không
    for (var i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            // Xóa checkbox từ mảng
            banthuam.splice(checkboxes[i].id, 1);
        }
    }

    // Xóa tất cả các dòng từ bảng
    tableBanthuam.innerHTML = "";

    // Thêm lại các dòng từ mảng banthuam
    for (var i = 0; i < banthuam.length; i++) {
        insertRow(i);
    }
}

buttonTim.onclick = function() {
    if (selectBannhac.value != "-1" || selectCasi.value != "-1") {
        var index = [];
        for (var i = 0; i < banthuam.length; i++) {
            if (selectBannhac.value != "-1" && selectCasi.value != "-1") {
                if (selectBannhac.value == banthuam[i][0].toString() && selectCasi.value == banthuam[i][1].toString()) {
                    index.push(i);
                }
            } else if (selectBannhac.value != "-1") {
                if (selectBannhac.value == banthuam[i][0].toString()) {
                    index.push(i);
                }
            } else if (selectCasi.value != "-1") {
                if (selectCasi.value == banthuam[i][1].toString()) {
                    index.push(i);
                }
            }
        }
        
        // Xóa tất cả các dòng từ bảng
        tableBanthuam.innerHTML = "";
        
        // Thêm lại các dòng từ mảng banthuam
        for (var i = 0; i < index.length; i++) {
            insertRow(index[i]);
        }
    }
};

buttonLammoi.onclick = function() {
    // Xóa tất cả các dòng từ bảng
    tableBanthuam.innerHTML = "";
    
    // Thêm lại các dòng từ mảng banthuam
    for (var i = 0; i < banthuam.length; i++) {
        insertRow(i);
    }

    lastChecked = null;

    selectBannhac.value = "-1";
    selectCasi.value = "-1";
}

var hBanthuam = document.getElementById("hBanthuam");
var bBanthuam = document.getElementById("bBanthuam");

function show(object, str) {
    hBanthuam.classList.add("d-none");
    bBanthuam.classList.add("d-none");
    hNhacsi.classList.add("d-none");
    bNhacsi.classList.add("d-none");
    hCasi.classList.add("d-none");
    bCasi.classList.add("d-none");
    hBannhac.classList.add("d-none");
    bBannhac.classList.add("d-none");
    
    document.querySelector(".btn.active").classList.remove("active");
    object.classList.add("active");
    document.getElementById("h" + str).classList.remove("d-none");
    document.getElementById("b" + str).classList.remove("d-none");

    tableCasi.innerHTML = "";
    tableNhacsi.innerHTML = "";
    tableBanthuam.innerHTML = "";
    tableBannhac.innerHTML = "";

    if (str == "Banthuam") {
        selectCasi.innerHTML = "";
        selectBannhac.innerHTML = "";
        populateSelect(casi, selectCasi);
        populateSelect(bannhac.map(item => item[0] + ", " + nhacsi[item[1]]), selectBannhac);
        for (var i = 0; i < banthuam.length; i++) {
            insertRow(i);
        }
    }
    else if (str == "Nhacsi") {
        for (var i = 0; i < nhacsi.length; i++) {
            insertRowNhacsi(i);
        }
    }
    else if (str == "Casi") {
        for (var i = 0; i < casi.length; i++) {
            insertRowCasi(i);
        }
    }
    else {
        selectNhacsi.innerHTML = "";
        populateSelect(nhacsi, selectNhacsi);
        for (var i = 0; i < bannhac.length; i++) {
            insertRowBannhac(i);
        }
    }

    lastChecked = null;
    
}

///////////////////////////////////////////////////////// Bản nhạc sĩ

buttonNhapNhacsi = document.getElementById("nhapNhacsi");
buttonTimNhacsi = document.getElementById("timNhacsi");
buttonXoaNhacsi = document.getElementById("xoaNhacsi");
buttonLammoiNhacsi = document.getElementById("lammoiNhacsi");

var inputTennhacsi = document.getElementById("tennhacsi");
var tableNhacsi = document.getElementById("nhacsi").getElementsByTagName('tbody')[0];

function toggleRadioNhacsi(radio) {
    if (radio === lastChecked) {
        radio.checked = false;
        lastChecked = null;
        inputTennhacsi.value = "";
    } else {
        lastChecked = radio;
        var index = parseInt(radio.id);
        inputTennhacsi.value = nhacsi[index];
    }
}

function insertRowNhacsi(id) {
    // Tạo một hàng mới
    var newRow = tableNhacsi.insertRow();

    // Tạo ô và thêm nội dung vào mỗi ô
    var cellXoa = newRow.insertCell(0);
    cellXoa.classList.add("text-center");
    cellXoa.innerHTML = '<td><input type="checkbox" id =' +  id.toString() + '></td>';

    var cellSua = newRow.insertCell(1);
    cellSua.classList.add("text-center");
    cellSua.innerHTML = '<td><input type="radio" name="sua" onclick="toggleRadioNhacsi(this)" id =' +  id.toString() + '></td>';

    var cellMa = newRow.insertCell(2);
    cellMa.classList.add("text-center", "text-warning", "fw-bolder");
    cellMa.textContent = (id + 1).toString();

    var cellBannhac = newRow.insertCell(3);
    cellBannhac.innerHTML = "<td>" + nhacsi[id] + "</td>";
}

document.addEventListener('DOMContentLoaded', function() {
    for (var i = 0; i < nhacsi.length; i++) {
        insertRowNhacsi(i)
    }
});

buttonNhapNhacsi.onclick = function() {
    if (inputTennhacsi.value != "") {
        if (lastChecked == null) {
            nhacsi.push(inputTennhacsi.value);
            insertRowNhacsi(nhacsi.length - 1);
        }
        else {
            nhacsi[parseInt(lastChecked.id)] = inputTennhacsi.value;
        
            // Xóa tất cả các dòng từ bảng
            tableNhacsi.innerHTML = "";

            // Thêm lại các dòng từ mảng banthuam
            for (var i = 0; i < nhacsi.length; i++) {
                insertRowNhacsi(i);
            }

            lastChecked = null;

            inputTennhacsi.value = "";
        }
    }
};

buttonXoaNhacsi.onclick = function() {
    // Lấy tất cả các checkbox
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Lặp qua tất cả các checkbox và kiểm tra xem chúng đã được chọn hay không
    for (var i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            // Xóa checkbox từ mảng
            nhacsi.splice(checkboxes[i].id, 1);
        }
    }

    // Xóa tất cả các dòng từ bảng
    tableNhacsi.innerHTML = "";

    // Thêm lại các dòng từ mảng banthuam
    for (var i = 0; i < nhacsi.length; i++) {
        insertRowNhacsi(i);
    }
}

buttonTimNhacsi.onclick = function() {
    if (inputTennhacsi.value != "") {
        var index = [];
        for (var i = 0; i < nhacsi.length; i++) {
            if (nhacsi[i].toLocaleLowerCase().includes(inputTennhacsi.value.toLocaleLowerCase())) {
                index.push(i);
            }
        }
        
        // Xóa tất cả các dòng từ bảng
        tableNhacsi.innerHTML = "";
        
        // Thêm lại các dòng từ mảng banthuam
        for (var i = 0; i < index.length; i++) {
            insertRowNhacsi(index[i]);
        }
    }
};

buttonLammoiNhacsi.onclick = function() {
    // Xóa tất cả các dòng từ bảng
    tableNhacsi.innerHTML = "";
    
    // Thêm lại các dòng từ mảng banthuam
    for (var i = 0; i <nhacsi.length; i++) {
        insertRowNhacsi(i);
    }

    lastChecked = null;

    inputTennhacsi.value = "";
}

var hNhacsi = document.getElementById("hNhacsi");
var bNhacsi = document.getElementById("bNhacsi");

///////////////////////////////////////////////////////// Bản ca sĩ

buttonNhapCasi = document.getElementById("nhapCasi");
buttonTimCasi = document.getElementById("timCasi");
buttonXoaCasi = document.getElementById("xoaCasi");
buttonLammoiCasi = document.getElementById("lammoiCasi");

var inputTencasi = document.getElementById("tencasi");
var tableCasi= document.getElementById("bangcasi").getElementsByTagName('tbody')[0];

function toggleRadioCasi(radio) {
    if (radio === lastChecked) {
        radio.checked = false;
        lastChecked = null;
        inputTencasi.value = "";
    } else {
        lastChecked = radio;
        var index = parseInt(radio.id);
        inputTencasi.value = casi[index];
    }
}

function insertRowCasi(id) {
    // Tạo một hàng mới
    var newRow = tableCasi.insertRow();

    // Tạo ô và thêm nội dung vào mỗi ô
    var cellXoa = newRow.insertCell(0);
    cellXoa.classList.add("text-center");
    cellXoa.innerHTML = '<td><input type="checkbox" id =' +  id.toString() + '></td>';

    var cellSua = newRow.insertCell(1);
    cellSua.classList.add("text-center");
    cellSua.innerHTML = '<td><input type="radio" name="sua" onclick="toggleRadioCasi(this)" id =' +  id.toString() + '></td>';

    var cellMa = newRow.insertCell(2);
    cellMa.classList.add("text-center", "text-warning", "fw-bolder");
    cellMa.textContent = (id + 1).toString();

    var cellBannhac = newRow.insertCell(3);
    cellBannhac.innerHTML = "<td>" + casi[id] + "</td>";
}

buttonNhapCasi.onclick = function() {
    if (inputTencasi.value != "") {
        if (lastChecked == null) {
            casi.push(inputTencasi.value);
            insertRowCasi(casi.length - 1);
        }
        else {
            casi[parseInt(lastChecked.id)] = inputTencasi.value;
        
            // Xóa tất cả các dòng từ bảng
            tableCasi.innerHTML = "";

            // Thêm lại các dòng từ mảng banthuam
            for (var i = 0; i < casi.length; i++) {
                insertRowCasi(i);
            }

            lastChecked = null;

            inputTencasi.value = "";
        }
    }
};

buttonXoaCasi.onclick = function() {
    // Lấy tất cả các checkbox
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Lặp qua tất cả các checkbox và kiểm tra xem chúng đã được chọn hay không
    for (var i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            // Xóa checkbox từ mảng
            casi.splice(checkboxes[i].id, 1);
        }
    }

    // Xóa tất cả các dòng từ bảng
    tableCasi.innerHTML = "";

    // Thêm lại các dòng từ mảng banthuam
    for (var i = 0; i < casi.length; i++) {
        insertRowCasi(i);
    }
}

buttonTimCasi.onclick = function() {
    if (inputTencasi.value != "") {
        var index = [];
        for (var i = 0; i < casi.length; i++) {
            if (casi[i].toLocaleLowerCase().includes(inputTencasi.value.toLocaleLowerCase())) {
                index.push(i);
            }
        }
        
        // Xóa tất cả các dòng từ bảng
        tableCasi.innerHTML = "";
        
        // Thêm lại các dòng từ mảng banthuam
        for (var i = 0; i < index.length; i++) {
            insertRowCasi(index[i]);
        }
    }
};

buttonLammoiCasi.onclick = function() {
    // Xóa tất cả các dòng từ bảng
    tableCasi.innerHTML = "";
    
    // Thêm lại các dòng từ mảng banthuam
    for (var i = 0; i < casi.length; i++) {
        insertRowCasi(i);
    }

    lastChecked = null;

    inputTencasi.value = "";
}

var hCasi = document.getElementById("hCasi");
var bCasi = document.getElementById("bCasi");

///////////////////////////////////////////////////////// Bản nhạc
buttonNhapBannhac = document.getElementById("nhapBannhac");
buttonTimBannhac = document.getElementById("timBannhac");
buttonXoaBannhac = document.getElementById("xoaBannhac");
buttonLammoiBannhac = document.getElementById("lammoiBannhac");

var selectNhacsi = document.getElementById("bangnhacsi");
var inputTenbannhac = document.getElementById("tenbannhac");
var tableBannhac= document.getElementById("bangbannhac").getElementsByTagName('tbody')[0];

var hBannhac = document.getElementById("hBannhac");
var bBannhac = document.getElementById("bBannhac");

function toggleRadioBannhac(radio) {
    if (radio === lastChecked) {
        radio.checked = false;
        lastChecked = null;
        inputTenbannhac.value = "";
        selectNhacsi.value = "-1";
    } else {
        lastChecked = radio;
        var index = parseInt(radio.id);
        inputTenbannhac.value = bannhac[index][0];
        selectNhacsi.value = bannhac[radio.id][1];
    }
}

function insertRowBannhac(id) {
    // Tạo một hàng mới
    var newRow = tableBannhac.insertRow();

    // Tạo ô và thêm nội dung vào mỗi ô
    var cellXoa = newRow.insertCell(0);
    cellXoa.classList.add("text-center");
    cellXoa.innerHTML = '<td><input type="checkbox" id =' +  id.toString() + '></td>';

    var cellSua = newRow.insertCell(1);
    cellSua.classList.add("text-center");
    cellSua.innerHTML = '<td><input type="radio" name="sua" onclick="toggleRadioBannhac(this)" id =' +  id.toString() + '></td>';

    var cellMa = newRow.insertCell(2);
    cellMa.classList.add("text-center", "text-warning", "fw-bolder");
    cellMa.textContent = (id + 1).toString();

    var cellBannhac = newRow.insertCell(3);
    cellBannhac.innerHTML = "<td>" + bannhac[id][0] + "</td>";

    var cellNhacsi = newRow.insertCell(4);
    cellNhacsi.innerHTML = "<td>" + nhacsi[bannhac[id][1]] + "</td>";
}

buttonNhapBannhac.onclick = function() {
    if (inputTenbannhac.value != "" && selectNhacsi.value != "-1") {
        if (!isValueExists(bannhac, [inputTenbannhac.value, parseInt(selectNhacsi.value)])) {
            if (lastChecked == null) {
                bannhac.push([inputTenbannhac.value, parseInt(selectNhacsi.value)]);
                insertRowBannhac(bannhac.length - 1);
            }
            else {
                bannhac[parseInt(lastChecked.id)][0] = inputTenbannhac.value;
                bannhac[parseInt(lastChecked.id)][1] = selectNhacsi.value;
            
                // Xóa tất cả các dòng từ bảng
                tableBannhac.innerHTML = "";
    
                // Thêm lại các dòng từ mảng banthuam
                for (var i = 0; i < bannhac.length; i++) {
                    insertRowBannhac(i);
                }
    
                lastChecked = null;

                inputTenbannhac.value = "";
                selectNhacsi.value = "-1";
            }
        }
    }
};

buttonXoaBannhac.onclick = function() {
    // Lấy tất cả các checkbox
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Lặp qua tất cả các checkbox và kiểm tra xem chúng đã được chọn hay không
    for (var i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            // Xóa checkbox từ mảng
            bannhac.splice(checkboxes[i].id, 1);
        }
    }

    // Xóa tất cả các dòng từ bảng
    tableBannhac.innerHTML = "";

    // Thêm lại các dòng từ mảng banthuam
    for (var i = 0; i < bannhac.length; i++) {
        insertRowBannhac(i);
    }
}


buttonTimBannhac.onclick = function() {
    if (inputTenbannhac.value != "" || selectNhacsi.value != "-1") {
        var index = [];
        for (var i = 0; i < bannhac.length; i++) { 
            if (inputTenbannhac.value != "" && selectNhacsi.value != "-1") {
                if (bannhac[i][0].toLocaleLowerCase().includes(inputTenbannhac.value.toLocaleLowerCase()) && selectNhacsi.value == bannhac[i][1].toString()) {
                    index.push(i);
                }
            } else if (inputTenbannhac.value != "") {
                if (bannhac[i][0].toLocaleLowerCase().includes(inputTenbannhac.value.toLocaleLowerCase())) {
                    index.push(i);
                }
            } else if (selectNhacsi.value != "-1") {
                if (selectNhacsi.value == bannhac[i][1].toString()) {
                    index.push(i);
                }
            }
        }
        
        // Xóa tất cả các dòng từ bảng
        tableBannhac.innerHTML = "";
        
        // Thêm lại các dòng từ mảng banthuam
        for (var i = 0; i < index.length; i++) {
            insertRowBannhac(index[i]);
        }
    }
};

buttonLammoiBannhac.onclick = function() {
    // Xóa tất cả các dòng từ bảng
    tableBannhac.innerHTML = "";
    
    // Thêm lại các dòng từ mảng banthuam
    for (var i = 0; i <bannhac.length; i++) {
        insertRowBannhac(i);
    }

    lastChecked = null;

    inputTenbannhac.value = "";
    selectNhacsi.value = "-1";
}





