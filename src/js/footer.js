class Footer extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <div class="fixed-bottom footer-info">WS Status: <span id="status-connect" class="bold">N/A</span> &nbsp;| <span id='clock-date' class="date-time"></span> &nbsp;<span id='clock-time' class="date-time"></span> | Email: <a class="mail-to bold" href="mailto:nhadautu198x@gmail.com">nhadautu198x@gmail.com</a> | F319: anhth32</div>
        <!-- Modal -->
        <div class="modal fade" id="detailModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" role="dialog">
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                <h6 class="modal-title" id="detailModalLabel"></h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="detailModalContent">
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <span class="loadingTitle">Đang tải dữ liệu...</span>
                    </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-success btn-sm bold" id="btn-modal-action" onclick='window.commonJS.refreshTickerDetailData()'>Tải dữ liệu mới</button>
                <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal">Đóng</button>
                </div>
            </div>
            </div>
        </div>
        <!-- Toast -->
        <div class="toast-container position-absolute p-3 bottom-0 start-50 translate-middle-x" style="z-index: 11">
          <div id="disconnectionMessageToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
              <strong class="me-auto">Thông Báo</strong>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
              Mất kết nối đến Server WS. Vui lòng thử nhấn nút [Kết nối lại].
              <div class="mt-2 pt-2 border-top text-center">
                <button type="button" class="btn btn-primary btn-sm" onclick="window.commonJS.reconnectWS()">Kết nối lại</button>
              </div>
            </div>
          </div>
        </div>
        <div class="toast-container position-absolute p-3 bottom-0 start-50 translate-middle-x" style="z-index: 11">
          <div id="upadateNewVersionMessageToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header text-white bg-primary">
              <strong class="me-auto">Thông Báo</strong>
            </div>
            <div class="toast-body">
              Đã có phiên bản cập nhật mới. Vui lòng nhấn nút <b>[Cập nhật]</b>.
              <div class="mt-2 pt-2 border-top text-center">
                <button type="button" class="btn btn-primary btn-sm" onclick="updateNewVersionSW()">Cập nhật</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }
}
customElements.define('footer-component', Footer);