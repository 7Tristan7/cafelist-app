-- =====================================================
-- CaféList - Přidání Recenzí
-- Tento SQL skript spusť v Supabase SQL Editoru
-- (Supabase Dashboard -> SQL Editor -> New Query)
-- =====================================================

-- Smazání existujících recenzí
DELETE FROM ratings;

-- =====================================================
-- RECENZE - 30 realistických recenzí
-- =====================================================

-- Café Na kole
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'Moje oblíbená kavárna! Zahrádka s kočkami je úžasná. Sendviče jsou super čerstvé.', NOW() - INTERVAL '28 days'
FROM cafes WHERE name = 'Café Na kole' LIMIT 1;

INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 4, 'Přímo na náměstí, skvělá poloha. Káva výborná, občas plno lidí.', NOW() - INTERVAL '20 days'
FROM cafes WHERE name = 'Café Na kole' LIMIT 1;

INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'Výběrová káva za rozumnou cenu. Dezerty domácí a chutné.', NOW() - INTERVAL '10 days'
FROM cafes WHERE name = 'Café Na kole' LIMIT 1;

-- Cona Coffee
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'V60 káva zde chutná famózně. Dorty jsou umělecká díla.', NOW() - INTERVAL '15 days'
FROM cafes WHERE name = 'Cona Coffee' LIMIT 1;

INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 4, 'Super kavárna u nádraží! Alternativní přípravy na vysoké úrovni.', NOW() - INTERVAL '25 days'
FROM cafes WHERE name = 'Cona Coffee' LIMIT 1;

-- Pepe Coffee
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'Pražírna s tradicí! Makronky jsou neodolatelné, káva perfektní.', NOW() - INTERVAL '40 days'
FROM cafes WHERE name = 'Pepe Coffee' LIMIT 1;

INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 4, 'Kupuju si tu kávu domů už 3 roky. Brazílie medium roast je můj favorit.', NOW() - INTERVAL '18 days'
FROM cafes WHERE name = 'Pepe Coffee' LIMIT 1;

-- Simple Café
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'Absolutně nejlepší káva v Hradci! Barista přesně věděl co dělá, káva z Etiopie byla božská.', NOW() - INTERVAL '30 days'
FROM cafes WHERE name = 'Simple Café' LIMIT 1;

INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 4, 'Skvělá specialty káva, trochu vyšší ceny ale odpovídá kvalitě.', NOW() - INTERVAL '25 days'
FROM cafes WHERE name = 'Simple Café' LIMIT 1;

INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'Moderní prostředí, výborná káva, příjemná obsluha. Vrátím se!', NOW() - INTERVAL '15 days'
FROM cafes WHERE name = 'Simple Café' LIMIT 1;

-- Petrof Café
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'Zážitek! Samohrající klavír Petrof, obrazy na stěnách, a k tomu skvělá káva.', NOW() - INTERVAL '45 days'
FROM cafes WHERE name = 'Petrof Café' LIMIT 1;

INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'Unikátní prostředí, perfektní pro schůzky. Trochu dražší, ale plně to stojí za to.', NOW() - INTERVAL '30 days'
FROM cafes WHERE name = 'Petrof Café' LIMIT 1;

-- kafe je láska
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'Jméno odpovídá! Opravdu cítíte lásku v každém šálku. Baristé jsou profíci.', NOW() - INTERVAL '15 days'
FROM cafes WHERE name = 'kafe je láska' LIMIT 1;

INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'European Coffee Trip doporučil a měli pravdu. Top specialty!', NOW() - INTERVAL '8 days'
FROM cafes WHERE name = 'kafe je láska' LIMIT 1;

INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'Absolutní špička. Flat white jako nikde jinde v ČR.', NOW() - INTERVAL '3 days'
FROM cafes WHERE name = 'kafe je láska' LIMIT 1;

-- CHROAST
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'Nejlepší espresso v městě! Vlastní pražárna, cítíte čerstvost v každém doušku.', NOW() - INTERVAL '35 days'
FROM cafes WHERE name = 'CHROAST Espresso Bar' LIMIT 1;

INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 4, 'Malý prostor, ale káva je naprosto výjimečná. Chodím sem každý den.', NOW() - INTERVAL '22 days'
FROM cafes WHERE name = 'CHROAST Espresso Bar' LIMIT 1;

-- CrossCafe Knihovna
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 4, 'Pro studenty ideální! WiFi, klid, zásuvky. Káva standard CrossCafe.', NOW() - INTERVAL '48 days'
FROM cafes WHERE name = 'CrossCafe Knihovna' LIMIT 1;

-- LamCafé
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'Skvělá pražírna! Workshopy jsou super, naučíte se vše o kávě.', NOW() - INTERVAL '20 days'
FROM cafes WHERE name = 'LamCafé Coffee Shop and Roastery' LIMIT 1;

-- Kavárna Muzeum
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'Krásný výhled na Labe, klidná atmosféra. Ideální po návštěvě muzea.', NOW() - INTERVAL '12 days'
FROM cafes WHERE name = 'Kavárna Muzeum' LIMIT 1;

-- Nokafe
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'Nejlepší kváskový chléb v Hradci! A káva je taky skvělá.', NOW() - INTERVAL '10 days'
FROM cafes WHERE name = 'Nokafe' LIMIT 1;

-- Galerie Café
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'Útulné místo s krásným uměním na stěnách. Káva i atmosféra 5*.', NOW() - INTERVAL '42 days'
FROM cafes WHERE name = 'Galerie Café' LIMIT 1;

-- GoCoffee
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 4, 'Moderní kavárna, cold brew je skvělý v létě!', NOW() - INTERVAL '14 days'
FROM cafes WHERE name = 'GoCoffee Hradec Králové' LIMIT 1;

-- Eggsit Café
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'Nejlepší snídaně ve městě! Vajíčka Benedict jsou perfektní.', NOW() - INTERVAL '7 days'
FROM cafes WHERE name = 'Eggsit Café' LIMIT 1;

-- Starbucks
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 3, 'Klasický Starbucks, nic překvapivého. Dobré pro rychlou kávu.', NOW() - INTERVAL '30 days'
FROM cafes WHERE name = 'Starbucks Coffee Hradec Králové' LIMIT 1;

-- Kavárna Vozáb
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 4, 'Tradičnější styl, ale velmi příjemné. Ideální pro schůzku s rodiči.', NOW() - INTERVAL '50 days'
FROM cafes WHERE name = 'Kavárna Vozáb' LIMIT 1;

-- Salieri Café
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 4, '15 let tradice se cítí! Široká nabídka, koktejly také výborné.', NOW() - INTERVAL '55 days'
FROM cafes WHERE name = 'Salieri Café' LIMIT 1;

INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 3, 'Trochu hlučnější, ale nabídka je obrovská. Limonády skvělé v létě.', NOW() - INTERVAL '30 days'
FROM cafes WHERE name = 'Salieri Café' LIMIT 1;

-- Alen Bakery
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 4, 'Čerstvé pečivo, rychlá obsluha. Ideální pro kávu s sebou.', NOW() - INTERVAL '25 days'
FROM cafes WHERE name = 'Alen Bakery' LIMIT 1;

-- Dobrá čajovna
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 5, 'Klidné místo s orientální atmosférou. Čaje jsou výborné!', NOW() - INTERVAL '18 days'
FROM cafes WHERE name = 'Dobrá čajovna' LIMIT 1;

-- CrossCafe Kopeček
INSERT INTO ratings (cafe_id, stars, comment, created_at)
SELECT id, 3, 'Standardní CrossCafe, rychlé a spolehlivé.', NOW() - INTERVAL '35 days'
FROM cafes WHERE name = 'CrossCafe Kopeček' LIMIT 1;

-- =====================================================
-- HOTOVO: 30+ recenzí přidáno
-- =====================================================
