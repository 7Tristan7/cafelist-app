-- IMPORTANT: First delete all existing data
DELETE FROM ratings;
DELETE FROM cafes;

-- INSERT ALL HRADEC KRÁLOVÉ CAFES WITH CORRECT COORDINATES
-- Hradec Králové center is approximately: 50.2092° N, 15.8327° E

INSERT INTO cafes (name, address, description, latitude, longitude, has_wifi, noise_level, good_for_study, has_food, is_specialty, is_historic)
VALUES
-- VELKÉ NÁMĚSTÍ area (lat ~50.2092, lon ~15.8327)
('Café Na kole', 'Velké náměstí 130/24, Hradec Králové', 'Specialty kavárna na historickém náměstí. Výběrová káva, domácí zákusky.', 50.2094, 15.8325, true, 'střední', true, true, true, true),
('Café 149', 'Velké náměstí 149, Hradec Králové', 'Kavárna v srdci historického centra s výhledem na náměstí.', 50.2090, 15.8330, true, 'střední', true, true, false, true),
('Sport Café', 'Velké náměstí 151/10, Hradec Králové', 'Sportovní kavárna přímo na náměstí. Projekce zápasů, snacky.', 50.2088, 15.8332, true, 'hlučné', false, true, false, true),
('Galerie Café', 'Velké náměstí 139/140, Hradec Králové', 'Kavárna u galerie. Klidná atmosféra, umělecký interiér.', 50.2091, 15.8328, true, 'tiché', true, true, false, true),

-- MALÉ NÁMĚSTÍ area (lat ~50.2100, lon ~15.8340)
('CHROAST Espresso Bar Námko', 'Malé náměstí 8/24, Hradec Králové', 'Špičková specialty kavárna. Precizní espresso, light roast.', 50.2100, 15.8340, true, 'tiché', true, false, true, true),

-- V KOPEČKU area (lat ~50.2085, lon ~15.8315)
('La.CAFÉ Bistro Bar', 'V Kopečku 81/1, Hradec Králové', 'Stylové bistro pod náměstím. Brunch, koktejly, kvalitní káva.', 50.2085, 15.8315, true, 'střední', true, true, false, false),
('CrossCafe Kopeček', 'V Kopečku 80/2, Hradec Králové', 'Pobočka řetězce CrossCafe. Rychlá obsluha, konzistentní káva.', 50.2084, 15.8316, true, 'střední', false, true, false, false),

-- ŠVEHLOVA area (lat ~50.2070, lon ~15.8290)
('Simple Café', 'Švehlova 463/4, Hradec Králové', 'Útulná kavárna na práci. Klidné prostředí, WiFi, zásuvky.', 50.2072, 15.8292, true, 'tiché', true, true, true, false),
('Kavárna Vozáb', 'Švehlova 308/5, Hradec Králové', 'Tradiční kavárna s výběrem zákusků. Domácí atmosféra.', 50.2070, 15.8288, true, 'tiché', true, true, false, false),
('Pepe Coffee', 'Švehlova 307/3, Hradec Králové', 'Pražírna kávy s kavárnou. Čerstvě pražená zrna na místě.', 50.2071, 15.8286, true, 'střední', true, true, true, false),
('Eggsit Café', 'Švehlova 504/16, Hradec Králové', 'Snídaňová kavárna. Vajíčka všemi způsoby, smoothies.', 50.2068, 15.8280, true, 'střední', false, true, false, false),
('Assenza Café', 'Švehlova 443, Hradec Králové', 'Italská kavárna. Autentické espresso, tiramisu.', 50.2069, 15.8285, true, 'tiché', true, true, false, false),

-- ELIŠČINO NÁBŘEŽÍ area (lat ~50.2080, lon ~15.8350)
('Kavárna Pod Eliškou', 'Eliščino nábřeží 310/21, Hradec Králové', 'Kavárna s výhledem na Labe. Letní terasa, zmrzlina.', 50.2082, 15.8355, true, 'střední', true, true, false, true),
('Café Nábřeží', 'Eliščino nábřeží 310/21, Hradec Králové', 'Romantická kavárna u řeky. Výhled, klidná atmosféra.', 50.2080, 15.8358, true, 'tiché', true, true, false, true),
('Kavárna Muzeum', 'Eliščino nábřeží 465/7, Hradec Králové', 'Kavárna v budově muzea. Kulturní zázemí, výstavy.', 50.2078, 15.8360, true, 'tiché', true, true, false, true),

-- GOČÁROVA area (lat ~50.2050, lon ~15.8230)
('CrossCafe Gočárova', 'Gočárova tř. 761, Hradec Králové', 'Velká pobočka CrossCafe. Terasa, parkování poblíž.', 50.2052, 15.8232, true, 'střední', true, true, false, false),
('Pepe Coffee Gočárova', 'Gočárova třída 504/54, Hradec Králové', 'Druhá pobočka Pepe s pražírnou. Kurzy přípravy kávy.', 50.2055, 15.8228, true, 'střední', true, true, true, false),

-- MASARYKOVO NÁMĚSTÍ area (lat ~50.2060, lon ~15.8300)
('Dobrá čajovna', 'Masarykovo náměstí 396/15, Hradec Králové', 'Autentická čajovna. Vodní dýmky, orientální atmosféra.', 50.2062, 15.8302, false, 'tiché', true, true, false, false),
('Férová palačinkárna', 'Masarykovo náměstí 396/15, Hradec Králové', 'Fair trade palačinky a káva. Rodinné prostředí.', 50.2061, 15.8303, true, 'střední', false, true, false, false),

-- TŘÍDA KARLA IV. area (lat ~50.2040, lon ~15.8260)
('Coffee Čtyřlístek', 'Třída Karla IV. 610/21, Hradec Králové', 'Bezbariérová kavárna. Přátelská obsluha, kvalitní káva.', 50.2042, 15.8262, true, 'tiché', true, true, false, false),

-- HRADECKÁ area (lat ~50.2110, lon ~15.8380)
('CrossCafe Knihovna', 'Hradecká 1250/2, Hradec Králové', 'CrossCafe u knihovny. Populární mezi studenty.', 50.2112, 15.8382, true, 'střední', true, true, false, false),
('Hradecká kavárna', 'Komenského 240, Hradec Králové', 'Tradiční kavárna naproti soudu. Domácí zákusky.', 50.2108, 15.8375, true, 'tiché', true, true, false, true),

-- ČELAKOVSKÉHO area (lat ~50.2065, lon ~15.8270)
('Nokafe', 'Čelakovského 487/8, Hradec Králové', 'Kavárna a chlebárna. Čerstvý kváskový chléb, specialty káva.', 50.2067, 15.8272, true, 'střední', true, true, true, false),

-- S.K. NEUMANNA area (lat ~50.2055, lon ~15.8250)
('Cona Coffee', 'S. K. Neumanna 726/12, Hradec Králové', 'Pražírna a kavárna. Micro-lot kávy, degustace.', 50.2057, 15.8252, true, 'tiché', true, false, true, false),

-- TOMKOVA area (lat ~50.2020, lon ~15.8200)
('LamCafé Coffee Shop and Roastery', 'Tomkova 188/1, Hradec Králové', 'Pražírna s kavárnou. Vlastní pražená zrna, workshopy.', 50.2022, 15.8202, true, 'střední', true, true, true, false),

-- DUKELSKÁ area (lat ~50.2030, lon ~15.8220)
('CrossCafe Atrium', 'OC Atrium, Dukelská tř. 1713/7, Hradec Králové', 'CrossCafe v nákupním centru. Rychlá obsluha.', 50.2032, 15.8222, true, 'hlučné', false, true, false, false),
('GoCoffee Hradec Králové', 'Dukelská třída 1642/6, Hradec Králové', 'Moderní kavárna. Alternativní přípravy, cold brew.', 50.2034, 15.8225, true, 'střední', true, true, true, false),

-- PETROF / NOVÝ HRADEC (lat ~50.1950, lon ~15.8150)
('Petrof Café', 'Na Brně 2136/4, Hradec Králové', 'Kavárna v PETROF Gallery. Klavíry, elegantní prostředí.', 50.1952, 15.8152, true, 'tiché', true, true, false, false),

-- TŘEBEŠ area (lat ~50.1980, lon ~15.8400)
('kafe je láska', 'Třída E. Beneše 571/98, Hradec Králové - Třebeš', 'Rodinná kavárna. Bio čaje, dětský koutek, dog-friendly.', 50.1982, 15.8402, true, 'tiché', true, true, true, false),

-- FUTURUM / MALŠOVICE area (lat ~50.1920, lon ~15.8450)
('Starbucks Coffee Hradec Králové', 'OC Futurum, Jana Koziny 916, Hradec Králové', 'Mezinárodní síť kaváren. Frappuccino, klasika.', 50.1922, 15.8452, true, 'hlučné', false, true, false, false),
('Bistro v Pekárně', 'Františka Halase 1887/12a, Hradec Králové', 'Pekárna a bistro u Futura. Čerstvé pečivo, snídaně.', 50.1925, 15.8448, true, 'střední', false, true, false, false);

-- ADD 3 REVIEWS FOR EACH CAFE
INSERT INTO ratings (cafe_id, stars, comment)
SELECT 
  c.id, 
  r.stars, 
  r.comment
FROM cafes c
CROSS JOIN (
  VALUES 
    (5, 'Výborná káva a příjemná atmosféra! Určitě se vrátím.'),
    (4, 'Dobré místo na práci, WiFi funguje skvěle.'),
    (5, 'Nejlepší kavárna v Hradci, milá obsluha.')
) AS r(stars, comment);
