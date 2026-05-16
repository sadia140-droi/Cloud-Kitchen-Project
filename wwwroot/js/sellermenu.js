const MENU_KEY = 'ck_menu_v1';
function idGen() { return 'M' + Math.floor(Math.random() * 900000 + 100000) }
function esc(s) { if (s == null) return ''; return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') }

const sample = [
    { id: idGen(), name: 'Chicken Biryani', category: 'Entrees', price: 350, available: true, image: '' },
    { id: idGen(), name: 'Beef Karahi', category: 'Entrees', price: 450, available: true, image: '' },
    { id: idGen(), name: 'Gulab Jamun', category: 'Desserts', price: 120, available: true, image: '' }
];

let menu = [];
function loadMenu() { const raw = localStorage.getItem(MENU_KEY); if (raw) { try { menu = JSON.parse(raw) } catch (e) { menu = sample.slice(); saveMenu(); } } else { menu = sample.slice(); saveMenu(); } }
function saveMenu() { localStorage.setItem(MENU_KEY, JSON.stringify(menu)); renderMenu(); }

const menuBody = document.getElementById('menuBody');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalTitle = document.getElementById('modalTitle');
const itemName = document.getElementById('itemName');
const itemCategory = document.getElementById('itemCategory');
const itemPrice = document.getElementById('itemPrice');
const itemAvail = document.getElementById('itemAvail');
const itemImage = document.getElementById('itemImage');
const imgPreview = document.getElementById('imgPreview');
const btnAdd = document.getElementById('btnAdd');
const saveItem = document.getElementById('saveItem');
const cancelItem = document.getElementById('cancelItem');

let editingId = null;

function renderMenu() {
    const q = (searchInput.value || '').trim().toLowerCase();
    const cat = categoryFilter.value;
    menuBody.innerHTML = '';
    const filtered = menu.filter(it => {
        if (cat !== 'All' && it.category !== cat) return false;
        if (!q) return true;
        if (it.name.toLowerCase().includes(q)) return true;
        if (it.category.toLowerCase().includes(q)) return true;
        return false;
    });
    if (filtered.length === 0) { menuBody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:18px;color:#666">No items found.</td></tr>'; return; }
    filtered.forEach(it => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
              <td><div style="display:flex;gap:10px;align-items:center"><img src="${it.image || 'images/placeholder.png'}" style="width:56px;height:56px;border-radius:8px;object-fit:cover" alt=""/><div><strong>${esc(it.name)}</strong><div style="color:var(--muted);font-size:0.9rem">${esc(it.category)}</div></div></div></td>
              <td>${esc(it.category)}</td>
              <td>Rs. ${Number(it.price).toFixed(0)}</td>
              <td><button class="toggle" data-id="${it.id}">${it.available ? 'Yes' : 'No'}</button></td>
              <td>
                <button class="btn btn-edit" data-id="${it.id}">Edit</button>
                <button class="btn btn-del" data-id="${it.id}">Delete</button>
              </td>
            `;
        menuBody.appendChild(tr);
    });
    // listeners
    document.querySelectorAll('.toggle').forEach(b => b.onclick = e => {
        const id = e.currentTarget.dataset.id; const item = menu.find(x => x.id === id); if (!item) return; item.available = !item.available; saveMenu();
    });
    document.querySelectorAll('.btn-edit').forEach(b => b.onclick = e => {
        const id = e.currentTarget.dataset.id; openEdit(id);
    });
    document.querySelectorAll('.btn-del').forEach(b => b.onclick = e => {
        const id = e.currentTarget.dataset.id; if (confirm('Delete this item?')) { menu = menu.filter(x => x.id !== id); saveMenu(); }
    });
}

function openAdd() { editingId = null; modalTitle.textContent = 'Add Menu Item'; itemName.value = ''; itemCategory.value = ''; itemPrice.value = ''; itemAvail.value = 'true'; imgPreview.src = 'images/placeholder.png'; itemImage.value = ''; modalBackdrop.style.display = 'flex'; }
function openEdit(id) { const it = menu.find(x => x.id === id); if (!it) return; editingId = id; modalTitle.textContent = 'Edit Menu Item'; itemName.value = it.name; itemCategory.value = it.category; itemPrice.value = it.price; itemAvail.value = it.available ? 'true' : 'false'; imgPreview.src = it.image || 'images/placeholder.png'; itemImage.value = ''; modalBackdrop.style.display = 'flex'; }

itemImage.addEventListener('change', e => {
    const f = e.target.files && e.target.files[0]; if (!f) return; const fr = new FileReader(); fr.onload = () => { imgPreview.src = fr.result }; fr.readAsDataURL(f);
});

saveItem.onclick = () => {
    const name = itemName.value.trim(); const category = itemCategory.value.trim() || 'Uncategorized'; const price = Number(itemPrice.value) || 0; const avail = itemAvail.value === 'true'; const image = imgPreview.src && imgPreview.src.indexOf('data:') === 0 ? imgPreview.src : (imgPreview.src || '');
    if (!name) { alert('Name required'); return; }
    if (editingId) { const it = menu.find(x => x.id === editingId); if (!it) return; it.name = name; it.category = category; it.price = price; it.available = avail; it.image = image; }
    else { menu.unshift({ id: idGen(), name, category, price, available: avail, image }); }
    saveMenu(); modalBackdrop.style.display = 'none';
}

cancelItem.onclick = () => { modalBackdrop.style.display = 'none'; }
btnAdd.onclick = openAdd;

searchInput.addEventListener('input', debounce(renderMenu, 180));
categoryFilter.addEventListener('change', renderMenu);

function debounce(fn, ms) { let t; return function (...a) { clearTimeout(t); t = setTimeout(() => fn.apply(this, a), ms) } }

// init
loadMenu(); renderMenu();