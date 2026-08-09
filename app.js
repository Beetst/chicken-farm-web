/*
 * ตลาดไก่ชน — Frontend
 * ------------------------------------------------------------
 * หลักการ: ไม่มีรหัสผ่าน/ความลับใด ๆ ฝังในไฟล์นี้
 *  - หน้า admin จะถามรหัสจากผู้ใช้ แล้วส่งไปให้เซิร์ฟเวอร์ตรวจ (verifyAdmin)
 *  - รหัสที่ผู้ใช้พิมพ์เก็บชั่วคราวใน sessionStorage (หายเมื่อปิดแท็บ) เพื่อใช้เซ็นการเขียน/ลบ
 */

const API_URL = "https://script.google.com/macros/s/AKfycbw2EjuN4YN68imbs7EN_Cl9Td7OuMmjifeHJmxrEoVRwvPzD5k1-U5T7JnukIL0vC72/exec";

const isAdminPage = !!document.getElementById("post-form");
let adminPassword = sessionStorage.getItem("adminPw") || "";

let listings = [];

const postForm = document.getElementById("post-form");
const listingsEl = document.getElementById("listings");
const searchEl = document.getElementById("search");

const modal = document.getElementById("offer-modal");
const modalTitle = document.getElementById("modal-title");
const modalOffers = document.getElementById("modal-offers");
const offerForm = document.getElementById("offer-form");
const offerListingId = document.getElementById("offer-listing-id");
const modalClose = document.getElementById("modal-close");
const deleteBtn = document.getElementById("delete-listing");

/* ---------- เรียก API ---------- */
async function api(payload) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  });
  return res.json();
}

async function fetchListings() {
  listingsEl.innerHTML = '<p class="empty-msg">กำลังโหลดข้อมูล...</p>';
  const res = await fetch(API_URL);
  listings = await res.json();
  render(searchEl ? searchEl.value : "");
}

/* ---------- ประตูตรวจสิทธิ์แอดมิน (ตัดสินโดยเซิร์ฟเวอร์) ---------- */
async function ensureAdmin() {
  if (adminPassword) {
    const r = await api({ action: "verifyAdmin", password: adminPassword });
    if (r.ok) return true;
    sessionStorage.removeItem("adminPw");
    adminPassword = "";
  }
  for (let i = 0; i < 3; i++) {
    const input = prompt("ใส่รหัสผ่านเจ้าของฟาร์ม");
    if (input === null) break;
    const r = await api({ action: "verifyAdmin", password: input });
    if (r.ok) {
      adminPassword = input;
      sessionStorage.setItem("adminPw", input);
      return true;
    }
    alert("รหัสผ่านไม่ถูกต้อง");
  }
  document.body.innerHTML = '<p style="text-align:center;margin-top:60px;">ไม่ได้รับอนุญาต <a href="index.html">กลับหน้าแรก</a></p>';
  return false;
}

/* ---------- แสดงผล ---------- */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function render(filter = "") {
  listingsEl.innerHTML = "";
  const q = filter.trim().toLowerCase();
  const filtered = listings.filter(l =>
    !q || String(l.name).toLowerCase().includes(q) || String(l.location || "").toLowerCase().includes(q)
  );

  if (filtered.length === 0) {
    listingsEl.innerHTML = '<p class="empty-msg">ยังไม่มีประกาศ</p>';
    return;
  }

  filtered.slice().reverse().forEach(listing => {
    const card = document.createElement("div");
    card.className = "listing-card";

    const img = document.createElement("img");
    img.src = listing.image || "https://placehold.co/400x300?text=%E0%B9%84%E0%B8%81%E0%B9%88%E0%B8%8A%E0%B8%99";
    img.alt = listing.name;
    card.appendChild(img);

    const body = document.createElement("div");
    body.className = "card-body";

    const offers = listing.offers || [];
    const bestOffer = offers.length ? Math.max(...offers.map(o => Number(o.price))) : null;

    body.innerHTML = `
      <h3>${escapeHtml(listing.name)}</h3>
      <div class="price">เริ่มต้น ${Number(listing.price).toLocaleString()} บาท</div>
      <div class="meta">${escapeHtml(listing.location || "-")} • ติดต่อ: ${escapeHtml(listing.contact)}</div>
      <div class="detail">${escapeHtml(listing.detail || "")}</div>
      <div class="offer-count">${offers.length} ข้อเสนอ${bestOffer ? ` • สูงสุด ${bestOffer.toLocaleString()} บาท` : ""}</div>
    `;

    const btn = document.createElement("button");
    btn.textContent = isAdminPage ? "ดูข้อเสนอ / จัดการ" : "ดู / เสนอราคา";
    btn.addEventListener("click", () => openModal(listing.id));
    body.appendChild(btn);

    card.appendChild(body);
    listingsEl.appendChild(card);
  });
}

function openModal(id) {
  const listing = listings.find(l => l.id === id);
  if (!listing) return;
  modalTitle.textContent = `${listing.name} — เริ่มต้น ${Number(listing.price).toLocaleString()} บาท`;
  if (offerListingId) offerListingId.value = id;
  if (deleteBtn) deleteBtn.dataset.id = id;
  renderOffers(listing);
  modal.classList.remove("hidden");
}

function renderOffers(listing) {
  modalOffers.innerHTML = "";
  const offers = listing.offers || [];
  if (offers.length === 0) {
    modalOffers.innerHTML = '<p class="empty-msg">ยังไม่มีข้อเสนอ</p>';
    return;
  }
  offers.slice().sort((a, b) => b.price - a.price).forEach(o => {
    const row = document.createElement("div");
    row.className = "offer-item";
    row.innerHTML = `<span>${escapeHtml(o.name)}</span><span>${Number(o.price).toLocaleString()} บาท</span>`;
    modalOffers.appendChild(row);
  });
}

/* ---------- ฟอร์มลงประกาศ (แอดมิน) ---------- */
if (postForm) {
  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = postForm.querySelector("button[type=submit]");
    submitBtn.disabled = true;
    const r = await api({
      action: "addListing",
      password: adminPassword,
      name: document.getElementById("name").value.trim(),
      price: document.getElementById("price").value,
      location: document.getElementById("location").value.trim(),
      contact: document.getElementById("contact").value.trim(),
      detail: document.getElementById("detail").value.trim(),
      image: document.getElementById("image").value.trim()
    });
    submitBtn.disabled = false;
    if (!r.ok) { alert("ลงประกาศไม่สำเร็จ: " + (r.error || "")); return; }
    postForm.reset();
    await fetchListings();
  });
}

/* ---------- ค้นหา ---------- */
if (searchEl) {
  searchEl.addEventListener("input", () => render(searchEl.value));
}

/* ---------- ฟอร์มเสนอราคา (สาธารณะ) ---------- */
if (offerForm) {
  offerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = offerListingId.value;
    const submitBtn = offerForm.querySelector("button[type=submit]");
    submitBtn.disabled = true;
    const r = await api({
      action: "addOffer",
      listingId: id,
      name: document.getElementById("offer-name").value.trim(),
      price: document.getElementById("offer-price").value
    });
    submitBtn.disabled = false;
    if (!r.ok) { alert("เสนอราคาไม่สำเร็จ: " + (r.error || "")); return; }
    offerForm.reset();
    await fetchListings();
    const listing = listings.find(l => l.id === id);
    if (listing) renderOffers(listing);
  });
}

/* ---------- ลบประกาศ (แอดมิน) ---------- */
if (deleteBtn) {
  deleteBtn.addEventListener("click", async () => {
    const id = deleteBtn.dataset.id;
    if (!confirm("ลบประกาศนี้ใช่หรือไม่?")) return;
    const r = await api({ action: "deleteListing", password: adminPassword, id });
    if (!r.ok) { alert("ลบไม่สำเร็จ: " + (r.error || "")); return; }
    modal.classList.add("hidden");
    await fetchListings();
  });
}

/* ---------- ปิด modal ---------- */
if (modalClose) modalClose.addEventListener("click", () => modal.classList.add("hidden"));
if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });

/* ---------- เริ่มทำงาน ---------- */
async function init() {
  if (isAdminPage) {
    const ok = await ensureAdmin();
    if (!ok) return;               // ไม่ผ่าน = หยุด ไม่โหลดอะไรต่อ
  }
  await fetchListings();
}
init();
