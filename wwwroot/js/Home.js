
    (function () {
            /* CART */
            const cartBtn = document.getElementById('cartBtn');
    const overlay = document.getElementById('overlay');
    const cartItemsEl = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    const cartCountEl = document.getElementById('cartCount');
    const closeCartBtn = document.getElementById('closeCart');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const continueBtn = document.getElementById('continueBtn');
    const cartEmptyEl = document.getElementById('cartEmpty');
    let cart = [];

    function saveCart() {localStorage.setItem('cloudkitchen_cart_v1', JSON.stringify(cart)); updateCartUI(); }
    function loadCart() { try { const raw = localStorage.getItem('cloudkitchen_cart_v1'); return raw ? JSON.parse(raw) : []; } catch (e) { return []; } }
    cart = loadCart();

    function addItem(item) { const found = cart.find(i => i.title === item.title); if (found) {found.qty += 1; } else {cart.push({ ...item, qty: 1 }); } saveCart(); }
    function removeItem(title) {cart = cart.filter(i => i.title !== title); saveCart(); }
    function updateCartUI() {
        cartItemsEl.innerHTML = '';
    if (cart.length === 0) {cartEmptyEl.style.display = 'block'; cartCountEl.style.display = 'none'; cartTotalEl.textContent = '0'; return; }
    cartEmptyEl.style.display = 'none';
    let total = 0;
                cart.forEach(item => {
                    const div = document.createElement('div'); div.className = 'cart-item';
    div.innerHTML = `<img src="${item.img}"><div style="flex:1"><strong>${item.title}</strong><br>Rs.${item.price}</div>
        <div class="qty-control">
            <button class="minus">-</button><span>${item.qty}</span><button class="plus">+</button>
        </div>
        <button class="btn btn-outline remove-btn">Remove</button>`;
        cartItemsEl.appendChild(div);

                    div.querySelector('.plus').addEventListener('click', () => {item.qty += 1; saveCart(); });
                    div.querySelector('.minus').addEventListener('click', () => {item.qty > 1 ? item.qty -= 1 : removeItem(item.title); saveCart(); });
                    div.querySelector('.remove-btn').addEventListener('click', () => {removeItem(item.title); });

        total += item.price * item.qty;
                });
        cartTotalEl.textContent = total;
        cartCountEl.textContent = cart.length; cartCountEl.style.display = 'block';
            }

            cartBtn.addEventListener('click', () => {overlay.style.display = 'flex'; });
            closeCartBtn.addEventListener('click', () => {overlay.style.display = 'none'; });
            clearCartBtn.addEventListener('click', () => {cart = []; saveCart(); });
            checkoutBtn.addEventListener('click', () => {alert('Proceed to checkout...'); });
            continueBtn.addEventListener('click', () => {overlay.style.display = 'none'; });

        // wire add buttons inside main cards
        function wireMainAddButtons() {
            document.querySelectorAll('.add-btn').forEach(b => {
                // remove existing duplicate handlers (safe)
                b.replaceWith(b.cloneNode(true));
            });
                document.querySelectorAll('.add-btn').forEach(b => {
            b.addEventListener('click', e => {
                const card = e.target.closest('.deal-card');
                const item = { title: card.dataset.title, price: +card.dataset.price, img: card.dataset.img };
                addItem(item);
                alert(`${item.title} added to cart!`);
            });
                });
            }

        wireMainAddButtons();
        updateCartUI();

        /* SEARCH TOGGLE */
        const searchToggle = document.getElementById('searchToggle');
        const searchBox = document.getElementById('searchBox');
        let searchOpen = false;
            searchToggle.addEventListener('click', () => {
                if (searchOpen) {searchBox.style.width = '0'; searchBox.style.opacity = '0'; }
        else {searchBox.style.width = '220px'; searchBox.style.opacity = '1'; }
        searchOpen = !searchOpen;
            });

        /* HERO SLIDER */
        const slides = document.getElementById('slides');
        const slideCount = slides.children.length;
        let currentSlide = 0;
        const pager = document.getElementById('pager');
        const sliderWrap = document.getElementById('sliderWrap');

        for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
            currentSlide = i;
        updateSlider();
        resetAutoSlide();
                });
        pager.appendChild(dot);
            }

        function updateSlider() {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
                Array.from(pager.children).forEach((dot, idx) => {dot.classList.toggle("active", idx === currentSlide); });
            }

            document.getElementById('prevBtn').addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider(); resetAutoSlide();
            });
            document.getElementById('nextBtn').addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slideCount;
        updateSlider(); resetAutoSlide();
            });

        let autoSlideInterval = null;
        function startAutoSlide() {stopAutoSlide(); autoSlideInterval = setInterval(() => {currentSlide = (currentSlide + 1) % slideCount; updateSlider(); }, 4000); }
        function stopAutoSlide() { if (autoSlideInterval) clearInterval(autoSlideInterval); autoSlideInterval = null; }
        function resetAutoSlide() {startAutoSlide(); }
            sliderWrap.addEventListener('mouseenter', () => stopAutoSlide());
            sliderWrap.addEventListener('mouseleave', () => startAutoSlide());
        updateSlider(); startAutoSlide();

            /* CTA BUTTONS */
            document.getElementById('seeMenuBtn').addEventListener('click', () => {window.location.href = 'kitchen_list.html'; });
            document.getElementById('orderNowBtn').addEventListener('click', () => {window.location.href = 'login.html'; });

        /* VIEW ALL -> Expand inline below deals grid */
        (function () {
                const viewAllBtn = document.getElementById('viewAllBtn');
        const dealsGrid = document.getElementById('dealsGrid');
        const expanded = document.getElementById('dealsExpanded');
        const expandedGrid = document.getElementById('expandedGrid');
        let isOpen = false;

        // Populate expanded area by cloning the existing .deal-card nodes (keeps data-* attributes)
        function populateExpanded() {
            expandedGrid.innerHTML = ''; // reset
        const cards = dealsGrid.querySelectorAll('.deal-card');
        if (!cards.length) return;
                    cards.forEach(card => {
                        // create a compact/expanded card using dataset values
                        const title = card.dataset.title || card.querySelector('.title')?.textContent || '';
        const price = card.dataset.price || '';
        const img = card.dataset.img || card.querySelector('img')?.src || '';

        const wrapper = document.createElement('div');
        wrapper.className = 'expanded-card';
        wrapper.innerHTML = `<img src="${img}" alt="${title}">
            <div class="expanded-body">
                <div>
                    <div class="title">${title}</div>
                    <div class="desc">Rs. ${price} — ${card.querySelector('.card-body > div > div')?.textContent || ''}</div>
                </div>
                <div style="display:flex;gap:8px;align-items:center;justify-content:space-between;margin-top:8px;">
                    <div style="font-weight:700">Rs. ${price}</div>
                    <div><button class="btn btn-primary exp-add">Add</button></div>
                </div>
            </div>`;
                        // wire add inside expanded
                        wrapper.querySelector('.exp-add').addEventListener('click', () => {
                            const item = {title, price: +price, img };
            addItem(item);
            // give quick feedback
            const btn = wrapper.querySelector('.exp-add');
            btn.textContent = 'Added';
            btn.disabled = true;
                            setTimeout(() => {btn.textContent = 'Add'; btn.disabled = false; }, 900);
                        });
            expandedGrid.appendChild(wrapper);
                    });
                }

            function openExpanded() {
                populateExpanded();
            expanded.classList.add('open');
            expanded.setAttribute('aria-hidden', 'false');
            viewAllBtn.setAttribute('aria-expanded', 'true');
            isOpen = true;
                    // scroll to the expanded area smoothly
                    setTimeout(() => {
                expanded.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 160);
                }

            function closeExpanded() {
                expanded.classList.remove('open');
            expanded.setAttribute('aria-hidden', 'true');
            viewAllBtn.setAttribute('aria-expanded', 'false');
            isOpen = false;
                    // optional: scroll back to top of deals section
                    setTimeout(() => {
                dealsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 160);
                }

                viewAllBtn.addEventListener('click', (e) => {
                e.preventDefault();
            if (isOpen) closeExpanded(); else openExpanded();
                });

                // If window resized or user navigates, ensure expanded area repopulates correctly if open
                window.addEventListener('resize', () => { if (isOpen) populateExpanded(); });
            })();

        })();
       