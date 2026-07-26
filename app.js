const browserStatus = document.querySelector("[data-browser-status]");
const installerPanel = document.querySelector("[data-installer-panel]");
const secureAndSerial = window.isSecureContext && "serial" in navigator;

if (secureAndSerial) {
  browserStatus.textContent = "Trình duyệt đã sẵn sàng";
  browserStatus.dataset.state = "ready";
} else {
  browserStatus.textContent = window.isSecureContext
    ? "Hãy mở bằng Chrome hoặc Edge trên máy tính"
    : "Trang cài đặt cần kết nối HTTPS";
  browserStatus.dataset.state = "blocked";
  installerPanel.dataset.unsupported = "true";
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();
