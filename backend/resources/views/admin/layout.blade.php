<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Dashboard') · Kavitha Sweets Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: { DEFAULT: '#8B0000', dark: '#6d0000' },
                        gold: { DEFAULT: '#FFD700', dark: '#e0b900' },
                        cream: { DEFAULT: '#FFF8F2' },
                        brown: { DEFAULT: '#3E2723' },
                    },
                    fontFamily: {
                        heading: ['"Playfair Display"', 'Georgia', 'serif'],
                        body: ['Poppins', 'system-ui', 'sans-serif'],
                    },
                },
            },
        }
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body class="bg-[#f6efe6] font-body text-brown antialiased">

    <div class="flex min-h-screen">
        <!-- Sidebar -->
        <aside class="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-[#2a0000] text-cream lg:flex">
            <div class="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                <span class="grid h-10 w-10 place-items-center rounded-full bg-primary text-gold font-bold text-lg">K</span>
                <div>
                    <p class="font-heading text-lg font-bold text-white leading-tight">Kavitha Sweets</p>
                    <p class="text-[11px] text-gold">Admin Panel</p>
                </div>
            </div>
            <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                @php
                    $items = [
                        ['label' => 'Dashboard', 'route' => 'admin.dashboard', 'icon' => 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z'],
                        ['label' => 'Products', 'route' => 'admin.products.index', 'icon' => 'M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2zm0 4.3L7.6 8.6v6.8L12 17.7l4.4-2.3V8.6L12 6.3z'],
                        ['label' => 'Categories', 'route' => 'admin.categories.index', 'icon' => 'M2 5h9v14H2zM13 5h9v9h-9z'],
                        ['label' => 'Orders', 'route' => 'admin.orders.index', 'icon' => 'M6 2l3 6h6l3-6h1a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h2z'],
                        ['label' => 'Gallery', 'route' => 'admin.gallery.index', 'icon' => 'M4 5h16v14H4zM4 15l4-4 3 3 3-3 4 4M9 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z'],
                        ['label' => 'Reviews', 'route' => 'admin.reviews.index', 'icon' => 'M12 2l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6l3-6z'],
                        ['label' => 'Banners', 'route' => 'admin.banners.index', 'icon' => 'M4 4h16v12H4zM4 20h16M2 2v20'],
                        ['label' => 'Enquiries', 'route' => 'admin.enquiries.index', 'icon' => 'M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2zM8 9h8M8 13h5'],
                        ['label' => 'Settings & SEO', 'route' => 'admin.settings.edit', 'icon' => 'M12 15a3 3 0 100-6 3 3 0 000 6zm7.5-3A7.5 7.5 0 015.1 12a7.5 7.5 0 0114.4 0z'],
                    ];
                @endphp
                @foreach ($items as $item)
                    <a href="{{ route($item['route']) }}"
                       class="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition
                              {{ request()->routeIs($item['route'] . '*') ? 'bg-primary text-gold' : 'text-cream/75 hover:bg-white/5 hover:text-white' }}">
                        <svg class="h-4.5 w-4.5 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="{{ $item['icon'] }}"/>
                        </svg>
                        {{ $item['label'] }}
                    </a>
                @endforeach
            </nav>
            <div class="px-4 py-4 border-t border-white/10 space-y-2">
                <a href="{{ url('/') }}" target="_blank" class="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-cream/75 hover:bg-white/5 hover:text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
                    View Website
                </a>
                <form method="POST" action="{{ route('admin.logout') }}">
                    @csrf
                    <button type="submit" class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-cream/75 hover:bg-red-900/60 hover:text-white">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                        Logout
                    </button>
                </form>
            </div>
        </aside>

        <!-- Main -->
        <div class="flex-1 lg:pl-64">
            <!-- Mobile header -->
            <header class="sticky top-0 z-30 flex items-center justify-between bg-[#2a0000] px-5 py-3 text-white lg:hidden">
                <p class="font-heading font-bold">Kavitha Sweets Admin</p>
                <form method="POST" action="{{ route('admin.logout') }}">
                    @csrf
                    <button class="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold">Logout</button>
                </form>
            </header>

            <main class="p-5 lg:p-8">
                @if (session('success'))
                    <div class="mb-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                        <span aria-hidden="true">✓</span> {{ session('success') }}
                    </div>
                @endif

                @if ($errors->any())
                    <div class="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        <ul class="list-disc pl-4">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                @yield('content')
            </main>
        </div>
    </div>

    <script>
        document.addEventListener('submit', (e) => {
            if (e.target.dataset.confirm) {
                if (!confirm(e.target.dataset.confirm)) e.preventDefault();
            }
        });
    </script>
    @stack('scripts')
</body>
</html>
