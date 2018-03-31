/*    
 <script src="../models/NguoiDung.js"></script>
 <script src="../models/DanhSachNguoiDung.js"></script>
 */

$(document).ready(function () {
    $("#btnTimKiemNguoiDung").click(function(){
        $("#tblNguoiDung").fadeOut();

    });
    //Xử lý sự kiện cho nút  thêm người dùng để hiển thị popup
    $("#btnThemNguoiDung").click(function () {
        var modalHeader = `Thêm người dùng`;
        var modalFooter = `
        <button type="button" id="btnThemND" class="btn btn-success" >Thêm người dùng</button>
        <button type="button" id="btnDong" class="btn btn-danger"  data-dismiss="modal">Đóng</button>
         `;
        $(".modal-title").html(modalHeader);
        $(".modal-footer").html(modalFooter);
        $("#btnModal").trigger("click");
    });

    //Xử lý sự kiện cho nút thêm người dùng 
    $("body").delegate("#btnThemND", "click", ThemNguoiDung);

    var danhSachNguoiDung = new DanhSachNguoiDung();
    function ThemNguoiDung() {
        //Dom bằng jquery
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var sodt = $("#SoDienThoai").val();
        //Fill vào đối tượng
        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, sodt);
        // random điểm
        var diem = Math.floor(Math.random() * 10);
        nguoiDung.Diem = diem;

        //Gọi phương thức thêm người dùng
        danhSachNguoiDung.ThemNguoiDung(nguoiDung);
        //Load table người dùng
        loadNguoiDungTable(danhSachNguoiDung.DSND);
        //Hiển thị hộp thoại sweetalert
        swal("Thêm thành công", "Hoàn tất!", "info");
        //Gọi nút button đóng click
        $("#btnDong").trigger("click");
        VeBieuDo();
    }

    function loadNguoiDungTable(DSND) {
        //Không dùng document thử dùng với jquery
        // $("#tblDanhSachNguoiDung").html("");
        var noiDungTable = "";
        for (var i = 0; i < DSND.length; i++) {
            var nguoiDung = DSND[i];
            noiDungTable += `
                <tr class="trNguoiDung">
                    <td> <input type="checkbox" class="ckbTaiKhoan" value = "${nguoiDung.TaiKhoan}"> </td>
                    <td>  ${nguoiDung.TaiKhoan} </td>
                    <td>  ${nguoiDung.MatKhau} </td>
                    <td>  ${nguoiDung.HoTen} </td>
                    <td>  ${nguoiDung.Email} </td>
                    <td>  ${nguoiDung.SoDienThoai}</td>
                </tr>
              `
        }
        $("#tblDanhSachNguoiDung").html(noiDungTable);
    }

    //Thống kê
    function VeBieuDo() {
        Highcharts.chart('container', {

            title: {
                text: 'Solar Employment Growth by Sector, 2010-2016'
            },

            subtitle: {
                text: 'Source: thesolarfoundation.com'
            },

            yAxis: {
                title: {
                    text: 'Number of Employees'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },

            series: [{
                name: 'Điểm người dùng',
                data: danhSachNguoiDung.ThongKeDiem
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });
    }

    console.log("tinh abc100");
});