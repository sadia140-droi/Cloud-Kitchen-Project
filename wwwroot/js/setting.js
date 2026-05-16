const SETTINGS_KEY = 'ck_settings_v1';
const defaults = {
    open: false,
    openTime: '10:00',
    closeTime: '22:00',
    payments: { jazz: false, easy: false, cod: true },
    notifications: { newOrder: true, payments: true, messages: false }
};
let settings = {};

function loadSettings() { const raw = localStorage.getItem(SETTINGS_KEY); if (raw) { try { settings = JSON.parse(raw); } catch (e) { settings = defaults; saveSettings(); } } else { settings = defaults; saveSettings(); } applyToForm(); }
function saveSettings() { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); renderStatus(); }
function resetDefaults() { if (!confirm('Reset settings to defaults?')) return; settings = defaults; saveSettings(); applyToForm(); }
function deleteAccount() { if (!confirm('This will delete the local data for this account. Continue?')) return; localStorage.clear(); alert('Local data cleared.'); location.reload(); }

// DOM refs
const storeOpen = document.getElementById('storeOpen');
const storeStatusText = document.getElementById('storeStatusText');
const openTime = document.getElementById('openTime');
const closeTime = document.getElementById('closeTime');
const payJazz = document.getElementById('payJazz');
const payEasy = document.getElementById('payEasy');
const payCOD = document.getElementById('payCOD');
const notifNewOrder = document.getElementById('notifNewOrder');
const notifPayments = document.getElementById('notifPayments');
const notifMessages = document.getElementById('notifMessages');
const btnSaveAll = document.getElementById('btnSaveAll');
const btnReset = document.getElementById('btnReset');
const btnDelete = document.getElementById('btnDelete');

// password
const curPass = document.getElementById('curPass');
const newPass = document.getElementById('newPass');
const confirmPass = document.getElementById('confirmPass');
const btnChangePass = document.getElementById('btnChangePass');
const passMsg = document.getElementById('passMsg');

function applyToForm() { storeOpen.checked = !!settings.open; openTime.value = settings.openTime || '10:00'; closeTime.value = settings.closeTime || '22:00'; payJazz.checked = !!settings.payments.jazz; payEasy.checked = !!settings.payments.easy; payCOD.checked = !!settings.payments.cod; notifNewOrder.checked = !!settings.notifications.newOrder; notifPayments.checked = !!settings.notifications.payments; notifMessages.checked = !!settings.notifications.messages; renderStatus(); }
function renderStatus() { storeStatusText.textContent = storeOpen.checked ? 'Open' : 'Closed'; }

// events
storeOpen.addEventListener('change', () => { settings.open = storeOpen.checked; saveSettings(); });
openTime.addEventListener('change', () => { settings.openTime = openTime.value; saveSettings(); });
closeTime.addEventListener('change', () => { settings.closeTime = closeTime.value; saveSettings(); });
payJazz.addEventListener('change', () => { settings.payments.jazz = payJazz.checked; saveSettings(); });
payEasy.addEventListener('change', () => { settings.payments.easy = payEasy.checked; saveSettings(); });
payCOD.addEventListener('change', () => { settings.payments.cod = payCOD.checked; saveSettings(); });
notifNewOrder.addEventListener('change', () => { settings.notifications.newOrder = notifNewOrder.checked; saveSettings(); });
notifPayments.addEventListener('change', () => { settings.notifications.payments = notifPayments.checked; saveSettings(); });
notifMessages.addEventListener('change', () => { settings.notifications.messages = notifMessages.checked; saveSettings(); });

btnSaveAll.addEventListener('click', () => { // sync form -> settings then save
    settings.open = storeOpen.checked; settings.openTime = openTime.value; settings.closeTime = closeTime.value; settings.payments = { jazz: payJazz.checked, easy: payEasy.checked, cod: payCOD.checked }; settings.notifications = { newOrder: notifNewOrder.checked, payments: notifPayments.checked, messages: notifMessages.checked };
    saveSettings(); alert('Settings saved locally.');
});
btnReset.addEventListener('click', resetDefaults);
btnDelete.addEventListener('click', deleteAccount);

// change password (local demo only)
btnChangePass.addEventListener('click', () => {
    const cur = curPass.value, nw = newPass.value, cf = confirmPass.value;
    if (!nw || nw.length < 6) { passMsg.textContent = 'New password must be at least 6 characters.'; passMsg.style.color = 'red'; return; }
    if (nw !== cf) { passMsg.textContent = 'Passwords do not match.'; passMsg.style.color = 'red'; return; }
    // demo: just store in localStorage (NOT secure). In real app, send to backend.
    localStorage.setItem('ck_demo_pass', nw);
    passMsg.textContent = 'Password changed (demo).'; passMsg.style.color = 'green'; curPass.value = ''; newPass.value = ''; confirmPass.value = '';
});

// init
loadSettings();