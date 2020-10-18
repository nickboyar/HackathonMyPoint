var courier_imdicate_img=(busy,online)=>{
    var img_div;
    var img_url = "/koddavinchi/img/";
    if(online!=1){
        img_url +="offline.png";
    }
    if(online==1&busy!=1){
        img_url +="free.png";
    }
    if(busy==1){
        img_url +="in_work.png";
    }
    img_div ="<img src="+img_url+" class='courier_imdicate_img'>";
    return img_div;
}
var print_filials = (data_list) => {
    console.log(organisations_data);
    DG.then(function () {
    map.remove();
    map = DG.map('map', {
            center: [data_list[0].latitude, data_list[0].longitude],
            zoom: 12
        });
    document.getElementById("search_filial").style.display = 'block';
    var selected_organization = document.getElementById("organisation_name_select").value;
    var print_filials = '<select id="filial_select" name="filial" class="selectfield margin" onchange="centred(organisations_data)"><option>Выберите филиал</option>'
    for (var i=0; i<data_list.length;i++){
        if (selected_organization==data_list[i].name.replace(/[\s]*/g, '')){
            print_filials+='<option value='+data_list[i].address.replace(/[\s]*/g, '')+' >'+data_list[i].address+'</option>';
            var IcUrl=SelectIc(data_list[i].products);
            //console.log(IcUrl);
            var Ic=DG.icon({
                iconAnchor: [20, 20],
                iconUrl: '/koddavinchi/img/'+IcUrl,
                iconSize: [40, 40]}
                );
            var marker = DG.marker([data_list[i].latitude, data_list[i].longitude],{icon:Ic})
            .bindLabel(data_list[i].address)
            .bindPopup(data_list[i].name)
            .addTo(map);
        }
    }
    print_filials+='</select>';
    document.getElementById('filials').innerHTML = print_filials;
    });
}
var print_bildings=(data_list)=>{
    var print_organisations = [];
    var to_print='<select onchange="print_filials(organisations_data)" id="organisation_name_select" name="organisation_name" class="selectfield margin"><option disabled>Выберите организацию</option>';
    for (var i=0; i<data_list.length;i++){
        var contains = false;
        for (var j=0; j<print_organisations.length; j++){
            if(print_organisations[j]===data_list[i].name){
                contains = true;
                break;
            }
        }
        if(!contains){
            print_organisations[print_organisations.length] = data_list[i].name;
            to_print+="<option value="+data_list[i].name.replace(/[\s]*/g, '');
            to_print+=">"+data_list[i].name+"</option>";
        }
    }
    to_print+='</select>';
    document.getElementById('organizations').innerHTML = to_print;
}
var SelectIc = (product)=>{
    switch(product) {
        case 'Кафе':
            return 'cafe (1).png';
        case 'Продукты':
            return 'products.png';
        case 'Цветы':
            return 'flowers (1).png';
        case 'Лекарства':
            return 'medicines (1).png';
    }    
}
var create_map = (points_data)=>{
    DG.then(function () {
        map = DG.map('map', {
            center: [points_data[0].latitude, points_data[0].longitude],
            zoom: 13
        });
        for (var i = 0; i < points_data.length; i++) {
            var IcUrl=SelectIc(points_data[i].products);
            //console.log(IcUrl);
            var Ic=DG.icon({
                iconAnchor: [20, 20],
                iconUrl: '/koddavinchi/img/'+IcUrl,
                iconSize: [40, 40]}
                );
            var marker = DG.marker([points_data[i].latitude, points_data[i].longitude],{icon:Ic})
            .bindLabel(points_data[i].address)
            .bindPopup(points_data[i].name)
            .addTo(map);
        }
    });
}
var print_couriers=(couriers_data)=>{
    var print_courier="";
    for(var i=0;i<couriers_data.length;i++){
        print_courier+="<div onclick='print_to_orders()' id="+couriers_data[i].id_courier+" class='courier_list'><img src='/koddavinchi/img/courier_icon.png' class='courier_list_img'>"+couriers_data[i].courier_name+"<br>"
            +"<img src='/koddavinchi/img/raiting_icon.png' class='courier_list_img'>Рейтинг курьера:"+couriers_data[i].courier_rating+"<br>"
            +"<img src='/koddavinchi/img/map_icon.png' class='courier_list_img'>Дистанция доставки:"+couriers_data[i].distance+"<br>"
            +"<img src='/koddavinchi/img/time_icon.png' class='courier_list_img'>Время доставки:"+couriers_data[i].travel_time+"</div><hr> ";
    }
    console.log(couriers_data);
    document.getElementById('courier_list').style.display = 'block';
    document.getElementById('couriers').innerHTML = print_courier;
}
var orders_courier_data; 
var load_order_to_database=()=>{
    var result;
    var request1 = new XMLHttpRequest(); // Создаем экземпляр класса XMLHttpRequest
    var url = "load_temp_order.php"; // Указываем путь до файла на сервере, который будет обрабатывать наш запрос 
    var params = "finish_address=" + document.getElementById("order_adress").value+ "&stock=" + id_bilding(organisations_data);
    request1.open("POST", url); 
    request1.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //В заголовке говорим что тип передаваемых данных закодирован. 
    request1.addEventListener("readystatechange", () => {
        if(request1.readyState === 4 && request1.status === 200) {
            result = JSON.parse(request1.responseText);
            var index = result[0].id_order;
            var request2 = new XMLHttpRequest(); // Создаем экземпляр класса XMLHttpRequest
            var url2 = "delete_temp_order.php"; // Указываем путь до файла на сервере, который будет обрабатывать наш запрос 
            var params2 = "id=" + index;
            request2.open("POST", url2);
            request2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request2.send(params2);
            console.log(result);
            orders_courier_data = result;
            print_couriers(orders_courier_data);
        }
    });
    request1.send(params);
}
var id_bilding =(bilding_list)=>{
    var filial_select_value = document.getElementById("filial_select").value;
    for (var i=0; i<bilding_list.length; i++){
        if( filial_select_value==bilding_list[i].address.replace(/[\s]*/g, '')){
           return bilding_list[i].id;
        }
    }
}
var select_order_to_print=(orders_courier_data,select_courier_id)=>{
    for (var i=0; i<orders_courier_data.length; i++){
        if( select_courier_id==orders_courier_data[i].id_courier){
           return orders_courier_data[i];
        }
    }
}
var print_to_orders=()=>{
    if(confirm("Подтвердить выбор курьера?")){
        document.getElementById('courier_list').style.display = 'none';
        var select_courier_id = event.target.id;
        var data_to_insert = select_order_to_print(orders_courier_data,select_courier_id);
        var request = new XMLHttpRequest(); // Создаем экземпляр класса XMLHttpRequest
        var url = "load_order.php"; // Указываем путь до файла на сервере, который будет обрабатывать наш запрос 
        var params = "lat=" + data_to_insert.lat_order+ "&lon=" + data_to_insert.lon_order
            +"&address=" + data_to_insert.address_order+ "&courier_id=" + data_to_insert.id_courier
            + "&id_building=" + data_to_insert.id_building;
        console.log(params);
        request.open("POST", url); 
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //В заголовке говорим что тип передаваемых данных закодирован. 
        request.addEventListener("readystatechange", () => {
            if(request.readyState === 4 && request.status === 200) {
            }
        });
        document.getElementById("make_oder").style.display="block";
        request.send(params);
        clean_courier_list();
    }
}
var clean_courier_list=()=>{
  document.getElementById('couriers').innerHTML = "";  
}
var print_statistic=()=>{
    var request = new XMLHttpRequest(); // Создаем экземпляр класса XMLHttpRequest
        var url = "count_couriers.php"; // Указываем путь до файла на сервере, который будет обрабатывать наш запрос 
        var params = "";
        console.log(params);
        request.open("POST", url); 
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //В заголовке говорим что тип передаваемых данных закодирован. 
        request.addEventListener("readystatechange", () => {
            if(request.readyState === 4 && request.status === 200) {
                result = JSON.parse(request.responseText);
                document.getElementById('online_couriers_num').innerHTML =result[0].online+"<img src='/koddavinchi/img/online_courier.png' class='status_icon'>";
                document.getElementById('free_couriers_num').innerHTML = result[0].not_busy+"<img src='/koddavinchi/img/free_courier.png' class='status_icon'>";
            }
        });
        request.send(params);
}
print_statistic();
setInterval(print_statistic, 5000);
var print_orders_list=(couriers_data)=>{
    var print_list="<div class='orders_list'>Список заказов</div>";
    for(var i=0;i<couriers_data.length;i++){
        print_list+="<hr><div id='order"+couriers_data[i].id_order+"' class='orders_list'>Заказ номер:"+couriers_data[i].id_order+"<br>"
            +"Курьер: "+couriers_data[i].name_courier+"<br>"
            +"Подтвердили заказ:<br>"+couriers_data[i].accepted+"<p>"
            +(couriers_data[i].order_taken==1?'Товар у курьера':'Курьер направляется за товаром')+"</div>";
    }
    //print_list+="<hr>";
    //console.log(print_list);
    document.getElementById('active_orders_list').innerHTML = print_list;
}
var print_active_orders=()=>{
    var request = new XMLHttpRequest(); // Создаем экземпляр класса XMLHttpRequest
        var url = "get_active_orders.php"; // Указываем путь до файла на сервере, который будет обрабатывать наш запрос 
        var params = "";
        console.log(params);
        request.open("POST", url); 
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //В заголовке говорим что тип передаваемых данных закодирован. 
        request.addEventListener("readystatechange", () => {
            if(request.readyState === 4 && request.status === 200) {
                result = JSON.parse(request.responseText);
                //console.log(result);
                print_orders_list(result);
            }
        });
        request.send(params);
}
print_active_orders();
setInterval(print_active_orders, 4000);

function centred(organisations_data) {
    var numb = document.getElementById("filial_select").value;
    for (var i=0;organisations_data.length;i++){
        if(numb==organisations_data[i].address.replace(/[\s]*/g, '')){
            map.setView([organisations_data[i].latitude ,organisations_data[i].longitude] ,14);
            return;
        }
    }
}
//print_filials(organisations_data)
