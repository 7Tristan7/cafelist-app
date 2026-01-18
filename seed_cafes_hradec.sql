-- =====================================================
-- CaféList - Kompletní data kaváren v Hradci Králové
-- Vytvořeno: Leden 2026
-- =====================================================

-- Nejprve smažeme existující data (volitelně - odkomentuj pokud chceš smazat)
-- DELETE FROM ratings;
-- DELETE FROM cafes;

-- =====================================================
-- KAVÁRNY - 20+ reálných kaváren z Hradce Králové
-- =====================================================

INSERT INTO cafes (name, address, description, latitude, longitude, has_wifi, noise_level, good_for_study, has_food, is_specialty, is_historic, created_by)
VALUES

-- 1. Simple Café - Specialty kavárna
('Simple Café', 'Švehlova 463/4, Hradec Králové', 
'Stylová specialty kavárna s profesionálními baristy. Nabízí espresso, cappuccino a filtrovanou kávu z Etiopie, Keni nebo Kostariky. Moderní minimalistický design, ideální pro práci na notebooku.',
50.2290, 15.6872, true, 'tiché', true, true, true, false, NULL),

-- 2. Café Na kole - Oblíbená kavárna v centru
('Café Na kole', 'Velké náměstí 130/24, Hradec Králové',
'Oblíbená kavárna přímo na Velkém náměstí. Výběrová káva z předních českých i zahraničních pražíren. Nabízí sendviče, saláty a domácí dezerty. Zahrádka s kočkami!',
50.2097, 15.8327, true, 'střední', true, true, true, false, NULL),

-- 3. CHROAST Espresso Bar "Námko"
('CHROAST Espresso Bar', 'Malé náměstí 8/24, Hradec Králové',
'Vlastní pražírna kávy s espresso barem. Vyhlášená pro velejemnou chuť kávy. Malý útulný prostor, zaměřený čistě na kvalitní kávu. Ideální pro rychlou zastávku.',
50.2085, 15.8340, false, 'tiché', false, false, true, false, NULL),

-- 4. Pepe Coffee - Pražírna
('Pepe Coffee', 'Švehlova 307, Hradec Králové',
'Pražírna kávy fungující od roku 2014. Zaměřuje se na výběrovou kávu z Nikaragui a Brazílie. Vynikající zákusky a makronky. Možnost nakoupit kávu domů.',
50.2285, 15.6880, true, 'střední', true, true, true, false, NULL),

-- 5. Petrof Café - Hudební kavárna
('Petrof Café', 'Kuklenská 1074, Hradec Králové',
'Unikátní hudební kavárna v komplexu PETROF. Káva pražená přímo v hradecké pražírně. Atmosféru dotváří vystavené obrazy a samohrající klavír Petrof. Luxusní prostředí.',
50.2150, 15.8520, true, 'tiché', true, true, true, true, NULL),

-- 6. Cona Coffee
('Cona Coffee', 'Gočárova třída 1135, Hradec Králové',
'Moderní kavárna kousek od hlavního nádraží. Široká nabídka kávy včetně alternativních příprav (V60, Aeropress). Báječné dorty a dezerty.',
50.2110, 15.8200, true, 'střední', true, true, true, false, NULL),

-- 7. Kavárna Vozáb
('Kavárna Vozáb', 'Velké náměstí 143, Hradec Králové',
'Tradičnější kavárna s příjemnou nabídkou. Klidné prostředí vhodné pro posezení s rodinou nebo přáteli. Klasická střední cesta mezi tradicí a modernou.',
50.2095, 15.8330, true, 'střední', false, true, false, true, NULL),

-- 8. Café & Bistro V Pekárně
('Café V Pekárně', 'Gočárova třída 868, Hradec Králové',
'Příjemné prostředí s milou obsluhou. Kvalitní jídlo a snídaně. Rozmanitá nabídka, vyšší cenová kategorie ale odpovídá kvalitě.',
50.2105, 15.8180, true, 'střední', false, true, false, false, NULL),

-- 9. Galerie Café
('Galerie Café', 'Velké náměstí 32, Hradec Králové',
'Útulná stylová kavárna s galerií. Poctivý šálek kávy s možností zakousnout zákusek nebo dortík. Umělecká atmosféra.',
50.2092, 15.8325, true, 'tiché', true, false, false, true, NULL),

-- 10. Salieri Café
('Salieri Café', 'Gočárova třída 506, Hradec Králové',
'Oblíbená kavárna existující už 15 let. Pestrá paleta kávových nápojů včetně příchutí, limonády, koktejly. Snídaňové menu.',
50.2115, 15.8165, true, 'hlučné', false, true, false, false, NULL),

-- 11. Diverse Café
('Diverse Café', 'Gočárova třída 1520, Hradec Králové',
'Novější podnik otevřený v roce 2016. Moderní design, příjemná atmosféra. Dobrá káva a lehké občerstvení.',
50.2125, 15.8140, true, 'střední', true, true, false, false, NULL),

-- 12. Kafe Stánek
('Kafe Stánek', 'Hlavní nádraží, Hradec Králové',
'Luxusní káva přímo na hlavním nádraží. Rychlá obsluha, milý personál. Ideální pro cestující.',
50.2120, 15.8195, false, 'hlučné', false, false, true, false, NULL),

-- 13. Bio Central
('Bio Central', 'Kavčí plácek 121, Hradec Králové',
'Bio kavárna s důrazem na kvalitu a udržitelnost. Specialty káva, organické suroviny. Vegan-friendly.',
50.2088, 15.8350, true, 'tiché', true, true, true, false, NULL),

-- 14. kafe je láska
('kafe je láska', 'Pospíšilova 365, Hradec Králové',
'Jedna z nejlepších specialty kaváren podle European Coffee Trip. Kavárna s vášní pro skvělou kávu. Přátelská atmosféra.',
50.2070, 15.8290, true, 'tiché', true, true, true, false, NULL),

-- 15. To je Bistro
('To je Bistro', 'Chelčického 380, Hradec Králové',
'Kombinace bistra a kavárny. Skvělá káva i jídlo. Oblíbené místo na pracovní obědy i odpolední kafe.',
50.2060, 15.8270, true, 'střední', true, true, true, false, NULL),

-- 16. MOKKA ODA
('MOKKA ODA', 'Třída Karla IV. 502, Hradec Králové',
'Specialty kavárna s orientálním nádechem. Výběrová káva, originální recepty. Klidné prostředí.',
50.2055, 15.8310, true, 'tiché', true, true, true, true, NULL),

-- 17. CrossCafe Knihovna
('CrossCafe Knihovna', 'Hradební 656, Hradec Králové',
'Síťová kavárna přímo v budově knihovny. Ideální pro studenty. WiFi, zásuvky, klidné prostředí.',
50.2080, 15.8380, true, 'tiché', true, true, false, false, NULL),

-- 18. La Café
('La Café', 'Velké náměstí 16, Hradec Králové',
'Elegantní kavárna přímo na náměstí. Vynikající dezerty a dorty. Příjemné posezení v historickém centru.',
50.2098, 15.8320, true, 'střední', false, true, false, true, NULL),

-- 19. Café Montaña
('Café Montaná', 'Pražská 392, Hradec Králové',
'Pražírna kávy se zaměřením na prvotřídní kvalitu. Nabízí i kurzy pro baristy. Profesionální přístup.',
50.2045, 15.8250, true, 'středí', true, false, true, false, NULL),

-- 20. Kavárna Artičok
('Kavárna Artičok', 'Dukelská 1713, Hradec Králové',
'Útulná kavárna s domáckou atmosférou. Domácí zákusky a koláče. Vhodné pro rodiny s dětmi.',
50.2130, 15.8100, true, 'střední', false, true, false, false, NULL),

-- 21. Café Dragon
('Café Dragon', 'Gočárova třída 800, Hradec Králové',
'Asijsky laděná kavárna. Nabízí i bubble tea a asijské dezerty. Mladistvá atmosféra.',
50.2108, 15.8175, true, 'hlučné', false, true, false, false, NULL),

-- 22. Kavárna U Elišky
('Kavárna U Elišky', 'Eliščino nábřeží 456, Hradec Králové',
'Klidná kavárna s výhledem na řeku. Tradiční české zákusky. Historická budova.',
50.2065, 15.8295, true, 'tiché', true, true, false, true, NULL)

ON CONFLICT DO NOTHING;

-- =====================================================
-- RECENZE - Realistické recenze pro každou kavárnu
-- (Poznámka: user_id musí odpovídat existujícím uživatelům)
-- =====================================================

-- Získání ID vložených kaváren
-- Použijeme subquery pro vložení recenzí

-- Pro Simple Café
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Absolutně nejlepší káva v Hradci! Barista přesně věděl co dělá, káva z Etiopie byla božská. Klidné prostředí, ideální na práci.', NOW() - INTERVAL '30 days'
FROM cafes WHERE name = 'Simple Café' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Skvělá specialty káva, trochu vyšší ceny ale odpovídá kvalitě. Doporučuji filtr z Kenya.', NOW() - INTERVAL '25 days'
FROM cafes WHERE name = 'Simple Café' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Moderní prostředí, výborná káva, příjemná obsluha. Vrátím se!', NOW() - INTERVAL '15 days'
FROM cafes WHERE name = 'Simple Café' LIMIT 1;

-- Pro Café Na kole
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Moje oblíbená kavárna! Zahrádka s kočkami je úžasná. Sendviče jsou super čerstvé.', NOW() - INTERVAL '28 days'
FROM cafes WHERE name = 'Café Na kole' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Přímo na náměstí, skvělá poloha. Káva výborná, občas plno lidí.', NOW() - INTERVAL '20 days'
FROM cafes WHERE name = 'Café Na kole' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Výběrová káva za rozumnou cenu. Dezerty domácí a chutné.', NOW() - INTERVAL '10 days'
FROM cafes WHERE name = 'Café Na kole' LIMIT 1;

-- Pro CHROAST
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Nejlepší espresso v městě! Vlastní pražárna, cítíte čerstvost v každém doušku.', NOW() - INTERVAL '35 days'
FROM cafes WHERE name = 'CHROAST Espresso Bar' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Malý prostor, ale káva je naprosto výjimečná. Chodím sem každý den.', NOW() - INTERVAL '22 days'
FROM cafes WHERE name = 'CHROAST Espresso Bar' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Pro milovníky opravdové kávy povinná zastávka. Single origin zde má smysl.', NOW() - INTERVAL '8 days'
FROM cafes WHERE name = 'CHROAST Espresso Bar' LIMIT 1;

-- Pro Pepe Coffee
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Pražírna s tradicí! Makronky jsou neodolatelné, káva perfektní.', NOW() - INTERVAL '40 days'
FROM cafes WHERE name = 'Pepe Coffee' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Kupuju si tu kávu domů už 3 roky. Brazílie medium roast je můj favorit.', NOW() - INTERVAL '18 days'
FROM cafes WHERE name = 'Pepe Coffee' LIMIT 1;

-- Pro Petrof Café
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Zážitek! Samohrající klavír Petrof, obrazy na stěnách, a k tomu skvělá káva. Jako v luxusním salonu.', NOW() - INTERVAL '45 days'
FROM cafes WHERE name = 'Petrof Café' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Unikátní prostředí, perfektní pro schůzky. Trochu dražší, ale plně to stojí za to.', NOW() - INTERVAL '30 days'
FROM cafes WHERE name = 'Petrof Café' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Překrásné místo. Káva dobrá, atmosféra nezapomenutelná.', NOW() - INTERVAL '12 days'
FROM cafes WHERE name = 'Petrof Café' LIMIT 1;

-- Pro Cona Coffee
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Super kavárna u nádraží! Alternativní přípravy na vysoké úrovni.', NOW() - INTERVAL '25 days'
FROM cafes WHERE name = 'Cona Coffee' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'V60 káva zde chutná famózně. Dorty jsou umělecká díla.', NOW() - INTERVAL '15 days'
FROM cafes WHERE name = 'Cona Coffee' LIMIT 1;

-- Pro Kavárna Vozáb
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Tradičnější styl, ale velmi příjemné. Ideální pro schůzku s rodiči.', NOW() - INTERVAL '50 days'
FROM cafes WHERE name = 'Kavárna Vozáb' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 3, 'OK kavárna, nic extra ale solidní základ. Zákusky chutné.', NOW() - INTERVAL '35 days'
FROM cafes WHERE name = 'Kavárna Vozáb' LIMIT 1;

-- Pro Café V Pekárně
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Snídaně jsou fantastické! Trochu dražší, ale porce jsou velké.', NOW() - INTERVAL '20 days'
FROM cafes WHERE name = 'Café V Pekárně' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Nejlepší snídaně v Hradci. Obsluha vždy s úsměvem.', NOW() - INTERVAL '5 days'
FROM cafes WHERE name = 'Café V Pekárně' LIMIT 1;

-- Pro Galerie Café
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Útulné místo s krásným uměním na stěnách. Káva i atmosféra 5*.', NOW() - INTERVAL '42 days'
FROM cafes WHERE name = 'Galerie Café' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Klidné, vhodné na čtení knihy. Zákusky domácí.', NOW() - INTERVAL '28 days'
FROM cafes WHERE name = 'Galerie Café' LIMIT 1;

-- Pro Salieri Café
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, '15 let tradice se cítí! Široká nabídka, koktejly také výborné.', NOW() - INTERVAL '55 days'
FROM cafes WHERE name = 'Salieri Café' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 3, 'Trochu hlučnější, ale nabídka je obrovská. Limonády skvělé v létě.', NOW() - INTERVAL '30 days'
FROM cafes WHERE name = 'Salieri Café' LIMIT 1;

-- Pro Diverse Café
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Moderní kavárna s příjemným designem. Pro práci na laptopu ideální.', NOW() - INTERVAL '18 days'
FROM cafes WHERE name = 'Diverse Café' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Dobrá káva, WiFi funguje perfektně. Elektřina u stolů.', NOW() - INTERVAL '7 days'
FROM cafes WHERE name = 'Diverse Café' LIMIT 1;

-- Pro Kafe Stánek
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Překvapivě dobrá káva na nádraží! Rychlá obsluha před vlakem.', NOW() - INTERVAL '60 days'
FROM cafes WHERE name = 'Kafe Stánek' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Specialty coffee přímo na nádraží - super překvapení!', NOW() - INTERVAL '40 days'
FROM cafes WHERE name = 'Kafe Stánek' LIMIT 1;

-- Pro Bio Central
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Pro vegany a bio nadšence ráj! Káva organic, vše čerstvé.', NOW() - INTERVAL '33 days'
FROM cafes WHERE name = 'Bio Central' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Klidné místo, zdravé jídlo, fair trade káva. Líbí se mi filosofie.', NOW() - INTERVAL '20 days'
FROM cafes WHERE name = 'Bio Central' LIMIT 1;

-- Pro kafe je láska
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Jméno odpovídá! Opravdu cítíte lásku v každém šálku. Baristé jsou profíci.', NOW() - INTERVAL '15 days'
FROM cafes WHERE name = 'kafe je láska' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'European Coffee Trip doporučil a měli pravdu. Top specialty!', NOW() - INTERVAL '8 days'
FROM cafes WHERE name = 'kafe je láska' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Absolutní špička. Flat white jako nikde jinde v ČR.', NOW() - INTERVAL '3 days'
FROM cafes WHERE name = 'kafe je láska' LIMIT 1;

-- Pro To je Bistro
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Skvělé obědy plus dobrá káva. Business lunch zde je výhra.', NOW() - INTERVAL '25 days'
FROM cafes WHERE name = 'To je Bistro' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Kombinace jídla a kávy na jedničku. Polední menu se mění.', NOW() - INTERVAL '12 days'
FROM cafes WHERE name = 'To je Bistro' LIMIT 1;

-- Pro MOKKA ODA
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Orientální atmosféra, zajímavé recepty. Turecká káva perfektní!', NOW() - INTERVAL '38 days'
FROM cafes WHERE name = 'MOKKA ODA' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Jiné než ostatní kavárny, originální koncept. Doporučuji.', NOW() - INTERVAL '22 days'
FROM cafes WHERE name = 'MOKKA ODA' LIMIT 1;

-- Pro CrossCafe Knihovna
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Pro studenty ideální! WiFi, klid, zásuvky. Káva standard CrossCafe.', NOW() - INTERVAL '48 days'
FROM cafes WHERE name = 'CrossCafe Knihovna' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 3, 'Síťovka, takže víš co dostaneš. Pro studium v knihovně super.', NOW() - INTERVAL '30 days'
FROM cafes WHERE name = 'CrossCafe Knihovna' LIMIT 1;

-- Pro La Café
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Elegantní místo na náměstí. Dorty jsou nádherné a chutné!', NOW() - INTERVAL '35 days'
FROM cafes WHERE name = 'La Café' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Vynikající dezerty, káva dobrá. Historické centrum adds to charm.', NOW() - INTERVAL '18 days'
FROM cafes WHERE name = 'La Café' LIMIT 1;

-- Pro Café Montaña
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Pražírna s know-how! Byl jsem na kurzu barista - super zkušenost.', NOW() - INTERVAL '52 days'
FROM cafes WHERE name = 'Café Montaná' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Profesionální přístup, káva prvotřídní. Kupuju zrna domů.', NOW() - INTERVAL '28 days'
FROM cafes WHERE name = 'Café Montaná' LIMIT 1;

-- Pro Kavárna Artičok
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'S dětmi super! Přátelská atmosféra, domácí koláče.', NOW() - INTERVAL '45 days'
FROM cafes WHERE name = 'Kavárna Artičok' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Útulné místo, jako u babičky. Zákusky domácí, káva ok.', NOW() - INTERVAL '22 days'
FROM cafes WHERE name = 'Kavárna Artičok' LIMIT 1;

-- Pro Café Dragon
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Bubble tea je tu skvělé! Asijské dezerty zajímavé.', NOW() - INTERVAL '30 days'
FROM cafes WHERE name = 'Café Dragon' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 3, 'Pro mladé super, trochu hlučnější. Káva průměrná, bubble tea top.', NOW() - INTERVAL '15 days'
FROM cafes WHERE name = 'Café Dragon' LIMIT 1;

-- Pro Kavárna U Elišky
INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 5, 'Výhled na řeku, klid, tradiční zákusky. Jako v jiné době.', NOW() - INTERVAL '58 days'
FROM cafes WHERE name = 'Kavárna U Elišky' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'Historická budova, příjemná atmosféra. Ideální pro klidné odpoledne.', NOW() - INTERVAL '35 days'
FROM cafes WHERE name = 'Kavárna U Elišky' LIMIT 1;

INSERT INTO ratings (cafe_id, rating, comment, created_at)
SELECT id, 4, 'České klasické zákusky, dobrá káva. Doporučuji větrník!', NOW() - INTERVAL '10 days'
FROM cafes WHERE name = 'Kavárna U Elišky' LIMIT 1;

-- =====================================================
-- REFRESH VIEW - Aktualizace průměrných hodnocení
-- =====================================================

-- Pokud máš materialized view, refresh:
-- REFRESH MATERIALIZED VIEW cafes_with_ratings;

-- Hotovo! 22 kaváren + 50+ recenzí vloženo.
