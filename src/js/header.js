class Header extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <ul class="nav nav-tabs tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link menu-item-custom thong-ke-to-chuc" href="/thong-ke-to-chuc"><h7>Thống Kê Tổ Chức</h7></a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link menu-item-custom thong-ke-tong-hop" href="/thong-ke-tong-hop"><h7>Thống kê tổng hợp</h7></a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link menu-item-custom thong-ke-theo-nganh" href="/thong-ke-theo-nganh"><h7>Thống Kê Theo Ngành</h7></a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link menu-item-custom loc-co-phieu" href="/loc-co-phieu"><h7>Lọc Cổ Phiếu</h7></a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link menu-item-custom phan-tich-ky-thuat-co-phieu" href="/phan-tich-ky-thuat-co-phieu"><h7>Phân Tích Kỹ Thuật</h7></a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link menu-item-custom dinh-gia-co-phieu" href="/dinh-gia-co-phieu"><h7>Định Giá Cổ Phiếu</h7></a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link menu-item-custom bang-gia-co-phieu"" href="/bang-gia-co-phieu"><h7>Live Board</h7></a>
            </li>
        </ul>
        <div id="mySidenav" class="sidenav">
            <img class="logo" src="../src/images/logo.svg" alt="Nhà đầu tư 198x"><a href="javascript:void(0)" class="closebtn" onclick="window.mobileJS.closeNav()">&times;</a>
            <ul class="nav nav-tabs tabs" id="myTab" role="tablist" style="display: inline !important;">
                <li class="nav-item" role="presentation">
                    <a class="nav-link menu-item-custom thong-ke-to-chuc" href="/thong-ke-to-chuc"><h7>Thống Kê Tổ Chức</h7></a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link menu-item-custom thong-ke-tong-hop" href="/thong-ke-tong-hop"><h7>Thống kê tổng hợp</h7></a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link menu-item-custom thong-ke-theo-nganh" href="/thong-ke-theo-nganh"><h7>Thống Kê Theo Ngành</h7></a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link menu-item-custom loc-co-phieu" href="/loc-co-phieu"><h7>Lọc Cổ Phiếu</h7></a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link menu-item-custom phan-tich-ky-thuat-co-phieu" href="/phan-tich-ky-thuat-co-phieu"><h7>Phân Tích Kỹ Thuật</h7></a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link menu-item-custom dinh-gia-co-phieu" href="/dinh-gia-co-phieu"><h7>Định Giá Cổ Phiếu</h7></a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link menu-item-custom bang-gia-co-phieu" href="/bang-gia-co-phieu"><h7>Live Board</h7></a>
                </li>
            </ul>
      </div>     
      <span id="btnNavigation" style="font-size:27px;cursor:pointer;padding-left:3px;background: #41413f;color: white;" onclick="window.mobileJS.openNav()">&#9776;</span>
        
      `;
    }
}

customElements.define('header-component', Header);
