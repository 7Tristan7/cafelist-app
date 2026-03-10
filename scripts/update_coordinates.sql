-- =====================================================
-- CaféList - OPRAVA GPS souřadnic (verified)
-- Únor 2026
-- =====================================================
-- Tyto souřadnice byly ověřeny přes Google Maps / web search

-- =====================================================
-- OVĚŘENÉ SOUŘADNICE - spusť v Supabase SQL Editoru
-- =====================================================

-- Starbucks Coffee OC Futurum - Brněnská 1825/23a
-- Zdroj: Google Maps / maptons.com
UPDATE cafes 
SET latitude = 50.1968684, longitude = 15.8493529
WHERE name ILIKE '%Starbucks%';

-- Café Na kole - Velké náměstí 130/24
-- Zdroj: kudyznudy.cz
UPDATE cafes 
SET latitude = 50.209998, longitude = 15.835524
WHERE name ILIKE '%Na kole%';

-- Simple Café - Švehlova 463/4
-- Zdroj: google/web search
UPDATE cafes 
SET latitude = 50.2092275, longitude = 15.8327683
WHERE name ILIKE '%Simple%';

-- =====================================================
-- OVĚŘENÍ - spusť po updatech
-- =====================================================
-- SELECT name, address, latitude, longitude 
-- FROM cafes 
-- WHERE name ILIKE '%Starbucks%' 
--    OR name ILIKE '%Na kole%' 
--    OR name ILIKE '%Simple%';
