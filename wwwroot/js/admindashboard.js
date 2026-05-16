(function () {
    // Mock Data
    const users = [{ id: 'U1', name: 'Ali' }, { id: 'U2', name: 'Sara' }, { id: 'U3', name: 'Omar' }];
    const vendors = [{ id: 'V1', name: 'Amna\'s Kitchen' }, { id: 'V2', name: 'Baba Karahi' }, { id: 'V3', name: 'Zesty Pizza' }];
    const orders = [{ id: 'O101', customer: 'Ali', items: 3, total: 850, status: 'pending' }, { id: 'O100', customer: 'Sara', items: 2, total: 560, status: 'delivered' }];

    // Update KPIs
    document.getElementById('kUsers').textContent = users.length;
    document.getElementById('kVendors').textContent = vendors.length;
    document.getElementById('kOrders').textContent = orders.length;
    const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
    document.getElementById('kRevenue').textContent = 'Rs. ' + totalRevenue.toLocaleString();

    // Render recent orders
    const tbody = document.querySelector('#recentOrders tbody');
    orders.forEach(o => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${o.id}</td><td>${o.customer}</td><td>${o.items}</td><td>Rs. ${o.total}</td><td>${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</td>`;
        tbody.appendChild(tr);
    });

    // Profile dropdown toggle
    const profilePill = document.getElementById('profilePill');
    const profileMenu = document.getElementById('profileMenu');
    profilePill.addEventListener('click', () => { profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block'; });
    document.addEventListener('click', e => { if (!profilePill.contains(e.target)) profileMenu.style.display = 'none'; });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => { if (confirm('Logout?')) location.href = 'admin-login.html'; });
    document.getElementById('logoutTop').addEventListener('click', () => { if (confirm('Logout?')) location.href = 'admin-login.html'; });
})();