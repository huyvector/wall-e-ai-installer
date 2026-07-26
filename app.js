const translations = {
  vi: {
    metaDescription: "Cài firmware Wall-E AI cho XIAO ESP32-S3 Sense trực tiếp từ trình duyệt.",
    ogDescription: "Cắm USB. Chọn thiết bị. Wall-E sẵn sàng.",
    heroTitle: "Cắm USB.<br>Đánh thức <em>Wall‑E.</em>",
    heroDescription: "Bộ cài chính thức cho robot Wall‑E AI by Huy Vector. Không cần VS Code, không cần cài driver nạp riêng.",
    webInstaller: "BỘ CÀI WEB",
    readyToFlash: "Sẵn sàng nạp firmware",
    checkingBrowser: "Đang kiểm tra trình duyệt…",
    browserReady: "Trình duyệt đã sẵn sàng",
    useDesktopBrowser: "Hãy mở bằng Chrome hoặc Edge trên máy tính",
    httpsRequired: "Trang cài đặt cần kết nối HTTPS",
    installButton: "Kết nối và cài Wall‑E AI",
    unsupportedBrowser: "Thiết bị này chưa hỗ trợ nạp qua trình duyệt. Hãy dùng Chrome hoặc Edge trên máy tính.",
    openNewTab: "Hãy mở trang cài đặt trong một tab riêng để cấp quyền USB.",
    usbHint: "Dùng cáp USB truyền dữ liệu. Giữ BOOT rồi nhấn RESET nếu thiết bị không xuất hiện trong danh sách cổng.",
    threeSteps: "Ba bước là xong",
    localProcess: "Toàn bộ quá trình diễn ra trên máy tính của bạn.",
    stepOneTitle: "Cắm cáp USB",
    stepOneBody: "Kết nối XIAO ESP32‑S3 Sense bằng cáp có truyền dữ liệu.",
    stepTwoTitle: "Chọn thiết bị",
    stepTwoBody: "Bấm nút cài đặt và chọn cổng USB/JTAG của ESP32‑S3.",
    stepThreeTitle: "Chờ Wall‑E thức dậy",
    stepThreeBody: "Không rút cáp trong lúc nạp. Thiết bị sẽ tự khởi động lại.",
    beforeStart: "TRƯỚC KHI BẮT ĐẦU",
    fullInstall: "Một bản cài đầy đủ,<br>không phụ thuộc OTA.",
    board: "Bo mạch",
    format: "Định dạng",
    verification: "Kiểm tra",
    buildVerified: "Đã xác minh bản build",
    importantNote: "Lưu ý quan trọng",
    wifiWarning: "Cài firmware sẽ xoá Wi‑Fi đã lưu. Sau khi Wall‑E khởi động, kết nối mạng <b>Wall‑E AI</b> để cấu hình lại Wi‑Fi.",
    designedBy: "Thiết kế & phát triển bởi Huy Vector",
    installerOnline: "Bộ cài đang hoạt động",
  },
  en: {
    metaDescription: "Install Wall-E AI firmware for XIAO ESP32-S3 Sense directly from your browser.",
    ogDescription: "Plug in USB. Select your device. Wall-E is ready.",
    heroTitle: "Plug in USB.<br>Wake up <em>Wall‑E.</em>",
    heroDescription: "The official installer for Wall‑E AI by Huy Vector. No VS Code or separate flashing software required.",
    webInstaller: "WEB INSTALLER",
    readyToFlash: "Ready to install firmware",
    checkingBrowser: "Checking your browser…",
    browserReady: "Your browser is ready",
    useDesktopBrowser: "Open this page in Chrome or Edge on a computer",
    httpsRequired: "The installer requires a secure HTTPS connection",
    installButton: "Connect and install Wall‑E AI",
    unsupportedBrowser: "This device does not support browser installation. Use Chrome or Edge on a computer.",
    openNewTab: "Open the installer in a new tab to grant USB access.",
    usbHint: "Use a USB data cable. Hold BOOT and press RESET if the device does not appear in the port list.",
    threeSteps: "Ready in three steps",
    localProcess: "The entire installation runs locally on your computer.",
    stepOneTitle: "Connect the USB cable",
    stepOneBody: "Connect the XIAO ESP32‑S3 Sense using a USB data cable.",
    stepTwoTitle: "Select your device",
    stepTwoBody: "Click install and select the ESP32‑S3 USB/JTAG port.",
    stepThreeTitle: "Wake up Wall‑E",
    stepThreeBody: "Do not unplug the cable while flashing. The device will restart automatically.",
    beforeStart: "BEFORE YOU BEGIN",
    fullInstall: "A complete factory install,<br>with no OTA dependency.",
    board: "Board",
    format: "Format",
    verification: "Verification",
    buildVerified: "Build verified",
    importantNote: "Important note",
    wifiWarning: "Installing firmware clears saved Wi‑Fi settings. After Wall‑E restarts, connect to <b>Wall‑E AI</b> to configure Wi‑Fi again.",
    designedBy: "Designed & built by Huy Vector",
    installerOnline: "Installer online",
  },
};

const browserStatus = document.querySelector("[data-browser-status]");
const installerPanel = document.querySelector("[data-installer-panel]");
const languageButtons = document.querySelectorAll("[data-language]");
const secureAndSerial = window.isSecureContext && "serial" in navigator;
let currentLanguage = "en";

function updateBrowserStatus() {
  const copy = translations[currentLanguage];
  if (secureAndSerial) {
    browserStatus.textContent = copy.browserReady;
    browserStatus.dataset.state = "ready";
    return;
  }

  browserStatus.textContent = window.isSecureContext
    ? copy.useDesktopBrowser
    : copy.httpsRequired;
  browserStatus.dataset.state = "blocked";
  installerPanel.dataset.unsupported = "true";
}

function setLanguage(language, remember = true) {
  currentLanguage = translations[language] ? language : "en";
  const copy = translations[currentLanguage];

  document.documentElement.lang = currentLanguage;
  document.title = "Wall-E AI — Web Installer";
  document.querySelector('meta[name="description"]').content = copy.metaDescription;
  document.querySelector('meta[property="og:description"]').content = copy.ogDescription;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = copy[element.dataset.i18n];
    if (value) element.textContent = value;
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const value = copy[element.dataset.i18nHtml];
    if (value) element.innerHTML = value;
  });
  languageButtons.forEach((button) => {
    const active = button.dataset.language === currentLanguage;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  updateBrowserStatus();
  if (remember) localStorage.setItem("wall-e-language", currentLanguage);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

const savedLanguage = localStorage.getItem("wall-e-language");
const browserPrefersVietnamese = navigator.languages
  ? navigator.languages.some((language) => language.toLowerCase().startsWith("vi"))
  : navigator.language?.toLowerCase().startsWith("vi");
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const detectedLanguage = browserPrefersVietnamese || timeZone === "Asia/Ho_Chi_Minh"
  ? "vi"
  : "en";

setLanguage(savedLanguage || detectedLanguage, false);
document.querySelector("[data-year]").textContent = new Date().getFullYear();
