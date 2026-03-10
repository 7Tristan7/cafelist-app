-- SQL skript pro reset hesla admin účtu a nastavení admin role
-- Spusť tento skript v Supabase SQL Editor: https://supabase.com/dashboard/project/bwiybjaqudjdxepgcpot/sql

-- POZNÁMKA: Supabase hesla nelze resetovat přímo přes SQL, protože jsou šifrovaná.
-- Místo toho použij JEDNU z těchto možností:

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- MOŽNOST 1: Reset hesla přes Supabase Dashboard (DOPORUČENO)
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- 1. Jdi na: https://supabase.com/dashboard/project/bwiybjaqudjdxepgcpot/auth/users
-- 2. Najdi uživatele: admin@test.com  
-- 3. Klikni na tři tečky (...) vedle uživatele
-- 4. Vyber "Send password reset email" NEBO "Reset password"
-- 5. Nastav nové heslo (např: admin123)

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- MOŽNOST 2: Nastav admin roli stávajícímu účtu
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- Nejdřív zjisti, jestli účet admin@test.com existuje:
SELECT 
    u.id,
    u.email,
    u.created_at,
    p.role,
    p.name
FROM 
    auth.users u
    LEFT JOIN profiles p ON p.id = u.id
WHERE 
    u.email = 'admin@test.com';

-- Pokud účet EXISTUJE, nastav mu admin roli:
-- (Pokud profil neexistuje, vytvoř ho)
INSERT INTO profiles (id, name, role)
SELECT id, 'Admin', 'admin'
FROM auth.users
WHERE email = 'admin@test.com'
ON CONFLICT (id) 
DO UPDATE SET role = 'admin';

-- Ověř, že se role nastavila:
SELECT 
    u.email,
    p.role,
    p.name
FROM 
    profiles p
    JOIN auth.users u ON u.id = p.id
WHERE 
    u.email = 'admin@test.com';

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- MOŽNOST 3: Vytvoř NOVÝ admin účet (pokud admin@test.com neexistuje)
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- 1. Jdi na aplikaci: https://cafelist-app.vercel.app/register
-- 2. Zaregistruj nový účet s VLASTNÍM heslem
-- 3. Po registraci spusť tento SQL příkaz (UPRAV EMAIL):

UPDATE profiles
SET role = 'admin'
WHERE id = (
    SELECT id 
    FROM auth.users 
    WHERE email = 'TVUJ_NOVY_EMAIL@example.com'  -- <-- UPRAV TADY
);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- DOPORUČENÍ: Použij MOŽNOST 1 (Dashboard reset) nebo MOŽNOST 3 (nový účet)
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
