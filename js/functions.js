/*Variáveis que devem receber os valores enviados no data.txt e settings.txt*/

var _ModeloID, _ModeloStatus;
var _MinTemp, _MaxTemp, _CurTemp;
var _MinUmiAr, _MaxUmiAr, _CurUmiAr;
var _Ventilacao, _Iluminacao, _Balanco;

function atualizarLogs() {
    console.log("Atualizar logs");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("textareaLog").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "data/data.txt", true);
    xhttp.send();

    getData();
}

//função para pegar os dados de data.txt e settings.txt e segmentar nas variáveis;
    /*example> A001;Progress;37,4;37,8;37,5;60;80;75;0;1;0;*/
    /*exemple> _ModeloID;_ModeloStatus;_MinTemp;_MaxTemp;_CurTemp;_MinUmiAr;_MaxUmiAr;_CurUmiAr;_Ventilacao;_Iluminacao;_Balanco;*/

function getData() {
    console.log("getdata");
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "data/data.txt", true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState == 4) {
            if (rawFile.status == 200 || rawFile.status == 0) {

                var res = rawFile.responseText.split(";", 11);

                document.getElementById("sts_ModeloID").innerHTML = res[0];
                _ModeloID = parseInt(res[0]);

                document.getElementById("sts_ModeloStatus").innerHTML = res[1];
                _ModeloStatus = parseInt(res[1]);

                document.getElementById("lbl_MinTemp").innerHTML = res[2] + " ºC";
                _MinTemp = parseInt(res[2]);

                document.getElementById("lbl_MaxTemp").innerHTML = res[3] + " ºC";
                _MaxTemp = parseInt(res[3]);

                document.getElementById("lbl_CurTemp").innerHTML = res[4] + " ºC";
                _CurTemp = parseInt(res[4]);

                document.getElementById("lbl_MinUmiAr").innerHTML = res[5] + " %";
                _MinUmiAr = parseInt(res[5]);

                document.getElementById("lbl_MaxUmiAr").innerHTML = res[6] + " %";
                _MaxUmiAr = parseInt(res[6]);

                document.getElementById("lbl_CurUmiAr").innerHTML = res[7] + "  %";
                _CurUmiAr = parseInt(res[7]);

                if (res[8] == '0') {
                    _Ventilacao = 0;
                    document.getElementById("fan_Status").innerHTML = "Desligada";
                } else if (res[8] == '1') {
                    _Ventilacao = 1;
                    document.getElementById("fan_Status").innerHTML = "Ligada";
                } else {
                    document.getElementById("fan_Status").innerHTML = "Dado desconhecido";
                    console.log("data doesn't match with parameter _Ventilacao; ");
                }

                if (res[9] == '0') {
                    _Iluminacao = 0;
                    document.getElementById("led_Status").innerHTML = "Desligada";
                } else if (res[9] == '1') {
                    _Iluminacao = 1;
                    document.getElementById("led_Status").innerHTML = "Ligada";
                } else {
                    document.getElementById("led_Status").innerHTML = "Dado desconhecido";
                    console.log("data doesn't match with parameter _Iluminacao; ");
                }
                if (res[10] == '0') {
                    _Balanco = 0;
                    document.getElementById("swing_Status").innerHTML = "Desligada";
                } else if (res[10] == '1') {
                    _Balanco = 1;
                    document.getElementById("swing_Status").innerHTML = "Ligada";
                } else {
                    document.getElementById("swing_Status").innerHTML = "Dado desconhecido";
                    console.log("data doesn't match with parameter _Balanco; ");
                }
            }
        }
    }
    rawFile.send(null);
}


//funcão para enviar dados para o arduino (valores de configuração e de controle)
// _MinTemp _MaxTemp _MinUmiAr _MaxUmiAr _Ventilacao _Iluminacao _Balanco
function dataCOM() {

}



//FUNÇÕES SEGMENTADAS

//função para atualizar os dados de Temperatura

function atualizaTemp() {
    console.log("Atualizar Temp");
    document.getElementById("lbl_MinTemp").innerHTML = _MinTemp + "º";              // informação contidadas em settings.txt
    document.getElementById("lbl_MaxTemp").innerHTML = _MaxTemp + "º";              // informação contidadas em settings.txt
    document.getElementById("lbl_CurTemp").innerHTML = _CurTemp + "º";              // informação contidadas em data.txt
}

//função para atualizar os dados de Umidade do Ar

function atualizaUmiAr() {
    console.log("Atualizar UmiAr");
    document.getElementById("lbl_MinUmiAr").innerHTML = _MinUmiAr + "%";              // informação contidadas em settings.txt
    document.getElementById("lbl_MaxUmiAr").innerHTML = _MaxUmiAr + "%";              // informação contidadas em settings.txt
    document.getElementById("lbl_CurUmiAr").innerHTML = _CurUmiAr + "%";              // informação contidadas em data.txt
}


//função para mostrar e atualizar ModeloID em uso, Status da incubação, status de ventilação, iluminação e cama de balanço

function atualizaStatus() {
    console.log("Atualizar Status");

    document.getElementById("sts_ModeloID").innerHTML = _ModeloID;              // informação contidadas em settings.txt
    document.getElementById("sts_ModeloStatus").innerHTML = _ModeloStatus;      // informação contidadas em data.txt
    document.getElementById("fan_Status").innerHTML = _Ventilacao;              // informação contidadas em data.txt
    document.getElementById("led_Status").innerHTML = _Iluminacao;              // informação contidadas em data.txt
    document.getElementById("swing_Status").innerHTML = _Balanco;               // informação contidadas em data.txt
}
