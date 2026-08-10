<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin Login · Kavitha Sweets &amp; Bakery</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: { extend: {
                colors: { primary: { DEFAULT: '#8B0000', dark: '#6d0000' }, gold: { DEFAULT: '#FFD700' }, cream: { DEFAULT: '#FFF8F2' }, brown: { DEFAULT: '#3E2723' } },
                fontFamily: { heading: ['"Playfair Display"', 'Georgia', 'serif'], body: ['Poppins', 'system-ui', 'sans-serif'] },
            }},
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body class="min-h-screen bg-[#2a0000] font-body text-brown antialiased">

    <div class="flex min-h-screen items-center justify-center px-4 py-10">
        <div class="w-full max-w-md rounded-3xl bg-cream p-8 shadow-2xl">
            <div class="text-center">
                <span class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary font-heading text-2xl font-bold text-gold">K</span>
                <h1 class="mt-4 font-heading text-2xl font-bold text-brown">Kavitha Sweets &amp; Bakery</h1>
                <p class="mt-1 text-sm text-brown">Admin Login</p>
            </div>

            @if ($errors->any())
                <div class="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {{ $errors->first() }}
                </div>
            @endif

            <form method="POST" action="{{ route('admin.login') }}" class="mt-6 space-y-4">
                @csrf
                <div>
                    <label class="text-xs font-semibold uppercase tracking-wider text-brown">Username or Email</label>
                    <input type="text" name="email" value="{{ old('email') }}" required autofocus
                           class="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none">
                </div>
                <div>
                    <label class="text-xs font-semibold uppercase tracking-wider text-brown">Password</label>
                    <input type="password" name="password" required
                           class="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none">
                </div>
                <label class="flex items-center gap-2 text-sm text-brown">
                    <input type="checkbox" name="remember" class="rounded border-primary/30 text-primary">
                    Remember me
                </label>
                <button type="submit" class="w-full rounded-full bg-primary py-3 text-sm font-semibold text-gold transition hover:bg-primary-dark">
                    Sign In
                </button>
            </form>

            <p class="mt-6 text-center text-xs text-brown">
                Admin credentials: <code class="rounded bg-white px-1.5 py-0.5">admin / admin123</code>
            </p>
        </div>
    </div>

</body>
</html>
