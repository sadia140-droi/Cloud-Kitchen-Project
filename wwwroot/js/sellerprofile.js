const PROFILE_KEY = 'ck_profile_v1';
function esc(s) { if (s == null) return ''; return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

const defaults = { name: 'Amna Ramzan', shop: "Amna's Kitchen", phone: '0300-0000000', email: 'amna@example.com', address: 'Lahore, Pakistan', photo: 'images/profile.png' };
let profile = {};

function loadProfile() { const raw = localStorage.getItem(PROFILE_KEY); if (raw) { try { profile = JSON.parse(raw); } catch (e) { profile = defaults; saveProfile(); } } else { profile = defaults; saveProfile(); } renderProfile(); }
function saveProfile() { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); renderProfile(); }

// DOM
const avatarImg = document.getElementById('avatarImg');
const profileName = document.getElementById('profileName');
const profileShop = document.getElementById('profileShop');
const profilePhone = document.getElementById('profilePhone');
const viewName = document.getElementById('viewName');
const viewShop = document.getElementById('viewShop');
const viewPhone = document.getElementById('viewPhone');
const viewEmail = document.getElementById('viewEmail');
const viewAddress = document.getElementById('viewAddress');

const btnEdit = document.getElementById('btnEdit');
const profileForm = document.getElementById('profileForm');
const profileView = document.getElementById('profileView');
const inputName = document.getElementById('inputName');
const inputShop = document.getElementById('inputShop');
const inputPhone = document.getElementById('inputPhone');
const inputEmail = document.getElementById('inputEmail');
const inputAddress = document.getElementById('inputAddress');
const inputPhoto = document.getElementById('inputPhoto');
const photoPreview = document.getElementById('photoPreview');
const saveProfileBtn = document.getElementById('saveProfile');
const cancelEditBtn = document.getElementById('cancelEdit');

function renderProfile() {
    avatarImg.src = profile.photo || 'images/profile.png'; profileName.textContent = profile.name || ''; profileShop.textContent = (profile.shop ? profile.shop + ' • Seller' : 'Seller'); profilePhone.textContent = profile.phone || '';
    viewName.innerHTML = esc(profile.name); viewShop.innerHTML = esc(profile.shop); viewPhone.innerHTML = esc(profile.phone); viewEmail.innerHTML = esc(profile.email); viewAddress.innerHTML = esc(profile.address);
    photoPreview.src = profile.photo || 'images/profile.png';
}

btnEdit.addEventListener('click', () => { openEditor(); });
function openEditor() { profileView.style.display = 'none'; profileForm.style.display = 'block'; inputName.value = profile.name || ''; inputShop.value = profile.shop || ''; inputPhone.value = profile.phone || ''; inputEmail.value = profile.email || ''; inputAddress.value = profile.address || ''; photoPreview.src = profile.photo || 'images/profile.png'; }

inputPhoto.addEventListener('change', e => { const f = e.target.files && e.target.files[0]; if (!f) return; const fr = new FileReader(); fr.onload = () => { photoPreview.src = fr.result; }; fr.readAsDataURL(f); });

saveProfileBtn.addEventListener('click', () => {
    const name = inputName.value.trim(); if (!name) { alert('Name is required'); return; }
    profile.name = name; profile.shop = inputShop.value.trim(); profile.phone = inputPhone.value.trim(); profile.email = inputEmail.value.trim(); profile.address = inputAddress.value.trim(); profile.photo = photoPreview.src || profile.photo;
    saveProfile(); profileForm.style.display = 'none'; profileView.style.display = 'block';
});

cancelEditBtn.addEventListener('click', () => { profileForm.style.display = 'none'; profileView.style.display = 'block'; });

// init
loadProfile();