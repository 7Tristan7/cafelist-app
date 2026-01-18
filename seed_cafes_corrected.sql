-- OPRAVA GPS SOUŘADNIC - Správné souřadnice z mapy.cz
-- Hradec Králové centrum: ~50.2090° N, 15.8320° E

DELETE FROM ratings;
DELETE FROM cafes;

INSERT INTO cafes (name, address, description, latitude, longitude, has_wifi, noise_level, good_for_study, has_food, is_specialty, is_historic)
VALUES
-- VELKÉ NÁMĚSTÍ (50.2090, 15.8317)
('Café Na kole', 'Velké náměstí 130/24, Hradec Králové', 'Specialty kavárna na historickém náměstí. Výběrová káva, domácí zákusky.', 50.2100, 15.8355, true, 'střední', true, true, true, true),
('Café 149', 'Velké náměstí 149, Hradec Králové', 'Kavárna v srdci historického centra s výhledem na náměstí.', 50.2092, 15.8320, true, 'střední', true, true, false, true),
('Sport Café', 'Velké náměstí 151/10, Hradec Králové', 'Sportovní kavárna přímo na náměstí. Projekce zápasů, snacky.', 50.2088, 15.8315, true, 'hlučné', false, true, false, true),
('Galerie Café', 'Velké náměstí 139/140, Hradec Králové', 'Kavárna u galerie. Klidná atmosféra, umělecký interiér.', 50.2094, 15.8322, true, 'tiché', true, true, false, true),

-- MALÉ NÁMĚSTÍ (50.2105, 15.8340)
('CHROAST Espresso Bar Námko', 'Malé náměstí 8/24, Hradec Králové', 'Špičková specialty kavárna. Precizní espresso, light roast.', 50.2105, 15.8342, true, 'tiché', true, false, true, true),

-- V KOPEČKU (50.2078, 15.8305)
('La.CAFÉ Bistro Bar', 'V Kopečku 81/1, Hradec Králové', 'Stylové bistro pod náměstím. Brunch, koktejly, kvalitní káva.', 50.2080, 15.8308, true, 'střední', true, true, false, false),
('CrossCafe Kopeček', 'V Kopečku 80/2, Hradec Králové', 'Pobočka řetězce CrossCafe. Rychlá obsluha, konzistentní káva.', 50.2078, 15.8305, true, 'střední', false, true, false, false),

-- ŠVEHLOVA (50.2065, 15.8280)
('Simple Café', 'Švehlova 463/4, Hradec Králové', 'Útulná kavárna na práci. Klidné prostředí, WiFi, zásuvky.', 50.2068, 15.8285, true, 'tiché', true, true, true, false),
('Kavárna Vozáb', 'Švehlova 308/5, Hradec Králové', 'Tradiční kavárna s výběrem zákusků. Domácí atmosféra.', 50.2065, 15.8278, true, 'tiché', true, true, false, false),
('Pepe Coffee', 'Švehlova 307/3, Hradec Králové', 'Pražírna kávy s kavárnou. Čerstvě pražená zrna na místě.', 50.2063, 15.8275, true, 'střední', true, true, true, false),
('Eggsit Café', 'Švehlova 504/16, Hradec Králové', 'Snídaňová kavárna. Vajíčka všemi způsoby, smoothies.', 50.2060, 15.8270, true, 'střední', false, true, false, false),
('Assenza Café', 'Švehlova 443, Hradec Králové', 'Italská kavárna. Autentické espresso, tiramisu.', 50.2062, 15.8272, true, 'tiché', true, true, false, false),

-- ELIŠČINO NÁBŘEŽÍ (50.2092, 15.8285)
('Kavárna Pod Eliškou', 'Eliščino nábřeží 310/21, Hradec Králové', 'Kavárna s výhledem na Labe. Letní terasa, zmrzlina.', 50.2095, 15.8290, true, 'střední', true, true, false, true),
('Café Nábřeží', 'Eliščino nábřeží 310/21, Hradec Králové', 'Romantická kavárna u řeky. Výhled, klidná atmosféra.', 50.2092, 15.8285, true, 'tiché', true, true, false, true),
('Kavárna Muzeum', 'Eliščino nábřeží 465/7, Hradec Králové', 'Kavárna v budově muzea. Kulturní zázemí, výstavy.', 50.2088, 15.8280, true, 'tiché', true, true, false, true),

-- GOČÁROVA TŘÍDA (50.2111, 15.8210)
('CrossCafe Gočárova', 'Gočárova třída 761/20, Hradec Králové', 'Velká pobočka CrossCafe. Terasa, parkování poblíž.', 50.2111, 15.8210, true, 'střední', true, true, false, false),
('Pepe Coffee Gočárova', 'Gočárova třída 504/54, Hradec Králové', 'Druhá pobočka Pepe s pražírnou. Kurzy přípravy kávy.', 50.2108, 15.8205, true, 'střední', true, true, true, false),

-- CENTRUM - OSTATNÍ ULICE
('Dobrá čajovna', 'Velké náměstí 32, Hradec Králové', 'Autentická čajovna. Vodní dýmky, orientální atmosféra.', 50.2085, 15.8325, false, 'tiché', true, true, false, true),
('Férová palačinkárna', 'Velké náměstí 32, Hradec Králové', 'Fair trade palačinky a káva. Rodinné prostředí.', 50.2084, 15.8326, true, 'střední', false, true, false, true),
('Coffee Čtyřlístek', 'Třída ČSA 300, Hradec Králové', 'Bezbariérová kavárna. Přátelská obsluha, kvalitní káva.', 50.2055, 15.8250, true, 'tiché', true, true, false, false),

-- TOMKOVA / LABSKÁ KOTLINA
('LamCafé Coffee Shop and Roastery', 'Tomkova 188/1, Hradec Králové', 'Pražírna s kavárnou. Vlastní pražená zrna, workshopy.', 50.2102, 15.8321, true, 'střední', true, true, true, false),

-- HRADECKÁ / KNIHOVNA
('CrossCafe Knihovna', 'Hradecká 1250/2, Hradec Králové', 'CrossCafe u knihovny. Populární mezi studenty.', 50.2130, 15.8245, true, 'střední', true, true, false, false),
('Hradecká kavárna', 'Komenského 240, Hradec Králové', 'Tradiční kavárna naproti soudu. Domácí zákusky.', 50.2125, 15.8240, true, 'tiché', true, true, false, true),

-- ČELAKOVSKÉHO
('Nokafe', 'Čelakovského 487/8, Hradec Králové', 'Kavárna a chlebárna. Čerstvý kváskový chléb, specialty káva.', 50.2070, 15.8300, true, 'střední', true, true, true, false),

-- S.K. NEUMANNA
('Cona Coffee', 'S. K. Neumanna 726/12, Hradec Králové', 'Pražírna a kavárna. Micro-lot kávy, degustace.', 50.2048, 15.8195, true, 'tiché', true, false, true, false),

-- ATRIUM / DUKELSKÁ
('CrossCafe Atrium', 'OC Atrium, Dukelská tř. 1713/7, Hradec Králové', 'CrossCafe v nákupním centru. Rychlá obsluha.', 50.2140, 15.8190, true, 'hlučné', false, true, false, false),
('GoCoffee Hradec Králové', 'Dukelská třída 1642/6, Hradec Králové', 'Moderní kavárna. Alternativní přípravy, cold brew.', 50.2135, 15.8185, true, 'střední', true, true, true, false),

-- PETROF GALLERY (Na Brně)
('Petrof Café', 'Na Brně 2136/4, Hradec Králové', 'Kavárna v PETROF Gallery. Klavíry, elegantní prostředí.', 50.1985, 15.8052, true, 'tiché', true, true, false, false),

-- TŘEBEŠ (tř. Edvarda Beneše)
('kafe je láska', 'třída Edvarda Beneše 571/98, Hradec Králové - Třebeš', 'Rodinná kavárna. Bio čaje, dětský koutek, dog-friendly.', 50.2290, 15.6872, true, 'tiché', true, true, true, false),

-- OC FUTURUM (Brněnská)
('Starbucks Coffee Hradec Králové', 'OC Futurum, Brněnská 1825/23a, Hradec Králové', 'Mezinárodní síť kaváren. Frappuccino, klasika.', 50.1969, 15.8488, true, 'hlučné', false, true, false, false),
('Bistro v Pekárně', 'Brněnská 1850, Hradec Králové', 'Pekárna a bistro u Futura. Čerstvé pečivo, snídaně.', 50.1965, 15.8482, true, 'střední', false, true, false, false);

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
