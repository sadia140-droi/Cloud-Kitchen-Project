const ORDERS_KEY = 'ck_orders_v2';

// helper
function generateId() { return 'ORD' + Math.floor(Math.random() * 900000 + 100000) }
function fmtTime(ms) { const d = new Date(ms); return d.toLocaleString(); }
function since(ms) { const s = Math.floor((Date.now() - ms) / 1000); if (s < 60) return s + 's ago'; if (s < 3600) return Math.floor(s / 60) + 'm ago'; if (s < 86400) return Math.floor(s / 3600) + 'h ago'; return Math.floor(s / 86400) + 'd ago'; }
function esc(s) { if (s == null) return ''; return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

const sample = [
    { id: generateId(), customer: 'Ali', phone: '03001234567', items: [{ name: 'Chicken Biryani', qty: 2, price: 350 }], total: 700, placedAt: Date.now() - 3e6, status: 'New', address: 'Street 5, Lahore' },
    { id: generateId(), customer: 'Sara', phone: '03007654321', items: [{ name: 'Beef Karahi', qty: 1, price: 450 }], total: 450, placedAt: Date.now() - 26e5, status: 'Preparing', address: 'Block B, Islamabad' },
    { id: generateId(), customer: 'Hassan', phone: '03111223344', items: [{ name: 'Chicken Roll', qty: 3, price: 150 }], total: 450, placedAt: Date.now() - 18e5, status: 'Out for Delivery', address: 'Gulberg' }
];

let orders = [];
function loadOrders() {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (raw) { try { orders = JSON.parse(raw) } catch (e) { orders = sample.slice(); saveOrders(); } }
    else { orders = sample.slice(); saveOrders(); }
}
function saveOrders() { localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); document.getElementById('lastSync').textContent = 'Last sync: ' + new Date().toLocaleTimeString(); }

const ordersBody = document.getElementById('ordersBody');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const totalCount = document.getElementById('totalCount');
const newCount = document.getElementById('newCount');
const pendingCount = document.getElementById('pendingCount');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const modalCancel = document.getElementById('modalCancel');
const modalNext = document.getElementById('modalNext');

let currentViewOrderId = null;

function statusBadgeHtml(status) {
    const cls = status === 'New' ? 's-new' : status === 'Preparing' ? 's-prep' : status === 'Out for Delivery' ? 's-out' : status === 'Delivered' ? 's-delivered' : 's-cancel';
    return `<span class="status-badge ${cls}">${esc(status)}</span>`;
}

function render() {
    const q = (searchInput.value || '').trim().toLowerCase();
    const status = statusFilter.value;
    ordersBody.innerHTML = '';
    const filtered = orders.filter(o => {
        if (status !== 'All' && o.status !== status) return false;
        if (!q) return true;
        if (o.customer.toLowerCase().includes(q)) return true;
        if (o.phone && o.phone.includes(q)) return true;
        if (o.items.some(it => it.name.toLowerCase().includes(q))) return true;
        return false;
    });

    if (filtered.length === 0) {
        ordersBody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:26px;color:#666">No orders found.</td></tr>`;
    } else {
        filtered.forEach(o => {
            const itemsCount = o.items.reduce((s, i) => s + i.qty, 0);
            const placed = since(o.placedAt);
            const badge = statusBadgeHtml(o.status);
            const tr = document.createElement('tr');
            tr.innerHTML = `
        <td>${o.id}</td>
        <td><strong>${esc(o.customer)}</strong><div style="color:var(--muted);font-size:0.95rem">${esc(o.phone || '')}</div></td>
        <td>${itemsCount} item(s)</td>
        <td>Rs. ${Number(o.total).toFixed(0)}</td>
        <td style="color:var(--muted)">${placed}</td>
        <td>${badge}</td>
        <td>
          <button class="action-btn btn-view" data-id="${o.id}">View</button>
          ${o.status !== 'Delivered' && o.status !== 'Cancelled' ? `<button class="action-btn btn-next" data-id="${o.id}">Next</button>` : ''}
          ${o.status !== 'Delivered' && o.status !== 'Cancelled' ? `<button class="action-btn btn-cancel" data-id="${o.id}">Cancel</button>` : ''}
        </td>
      `;
            ordersBody.appendChild(tr);
        });
    }

    // attach listeners
    document.querySelectorAll('.btn-view').forEach(b => b.onclick = e => openView(e.currentTarget.dataset.id));
    document.querySelectorAll('.btn-next').forEach(b => b.onclick = e => nextStatus(e.currentTarget.dataset.id));
    document.querySelectorAll('.btn-cancel').forEach(b => b.onclick = e => cancelOrder(e.currentTarget.dataset.id));

    // counts
    totalCount.textContent = orders.length;
    newCount.textContent = orders.filter(o => o.status === 'New').length;
    pendingCount.textContent = orders.filter(o => ['Preparing', 'Out for Delivery'].includes(o.status)).length;
}

function nextStatus(id) {
    const o = orders.find(x => x.id === id);
    if (!o) return;
    if (o.status === 'New') o.status = 'Preparing';
    else if (o.status === 'Preparing') o.status = 'Out for Delivery';
    else if (o.status === 'Out for Delivery') o.status = 'Delivered';
    saveOrders(); render();
}

function cancelOrder(id) {
    const o = orders.find(x => x.id === id);
    if (!o) return;
    if (confirm('Are you sure you want to cancel this order?')) { o.status = 'Cancelled'; saveOrders(); render(); }
}

function openView(id) {
    const o = orders.find(x => x.id === id); if (!o) return;
    currentViewOrderId = id;
    modalTitle.textContent = `Order ${o.id} — ${o.customer}`;
    modalBody.innerHTML = `
    <div style="display:flex;gap:18px;flex-wrap:wrap">
      <div style="flex:1">
        <div><strong>Customer:</strong> ${esc(o.customer)}</div>
        <div style="color:var(--muted)">Phone: ${esc(o.phone || '-')}</div>
        <div style="color:var(--muted)">Address: ${esc(o.address || '-')}</div>
      </div>
      <div style="flex:1">
        <div><strong>Placed:</strong> ${fmtTime(o.placedAt)}</div>
        <div style="color:var(--muted)"><strong>Status:</strong> ${esc(o.status)}</div>
        <div style="color:var(--muted)"><strong>Total:</strong> Rs. ${Number(o.total).toFixed(0)}</div>
      </div>
    </div>
    <div style="margin-top:12px">
      <strong>Items</strong>
      <div style="margin-top:8px;border-radius:8px;padding:10px;background:#fbf7f2">
        ${o.items.map(it => `<div style="display:flex;justify-content:space-between;padding:6px 4px">${esc(it.name)} <span style="color:var(--muted)">x${it.qty}</span> <strong>Rs. ${Number(it.price).toFixed(0)}</strong></div>`).join('')}
      </div>
    </div>
  `;
    modalBackdrop.style.display = 'flex';
    modalCancel.style.display = (o.status === 'Delivered' || o.status === 'Cancelled') ? 'none' : 'inline-block';
    modalNext.style.display = (o.status === 'Delivered' || o.status === 'Cancelled') ? 'none' : 'inline-block';
    modalNext.textContent = nextLabel(o.status);
}

function nextLabel(status) {
    if (status === 'New') return 'Start Preparing';
    if (status === 'Preparing') return 'Mark Out for Delivery';
    if (status === 'Out for Delivery') return 'Mark Delivered';
    return 'Next';
}

closeModal.onclick = () => { modalBackdrop.style.display = 'none'; currentViewOrderId = null; }
modalBackdrop.onclick = (e) => { if (e.target === modalBackdrop) { modalBackdrop.style.display = 'none'; currentViewOrderId = null; } }
modalCancel.onclick = () => { if (!currentViewOrderId) return; cancelOrder(currentViewOrderId); modalBackdrop.style.display = 'none'; }
modalNext.onclick = () => { if (!currentViewOrderId) return; nextStatus(currentViewOrderId); modalBackdrop.style.display = 'none'; }

// search & filter
searchInput.addEventListener('input', debounce(render, 180));
statusFilter.addEventListener('change', render);

function debounce(fn, ms) { let t; return function (...a) { clearTimeout(t); t = setTimeout(() => fn.apply(this, a), ms); } }

// init
loadOrders();
render();