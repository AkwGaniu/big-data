CREATE TABLE derived_ev_sales AS
SELECT
  region AS country,
  parameter,
  powertrain,
  year,
  value
FROM
  ev_sales
WHERE
  year BETWEEN 2010 AND 2018
  AND parameter = 'EV sale'
  AND powertrain = 'EV'
  AND country IN ('United Kingdom', 'United States', 'Uruguay', 'Zimbabwe', 'Ukraine', 'Turkey');

%jdbc(hive)
INSERT OVERWRITE TABLE derived_ev_sales
SELECT
    CASE
        WHEN country = 'USA' THEN 'United States'
        ELSE country
    END AS country,
    parameter,
    powertrain,
    year,
    value
FROM
  derived_ev_sales;


CREATE TABLE climate_change AS
SELECT 
    g.country, 
    g.unitco2emission, 
    g.industry,
    g.⁠ 2011 ⁠ as co2_2011,
    e.months, 
    e.elements, 
    e.unittemp,
    e.⁠ 2011 ⁠ as temp_2011,
FROM 
    globalco2emissions_2011_2018 g
JOIN 
    environment_temperature_change_2011_2018 e ON g.country = e.country;


SELECT
  e.timestamp,
  e.coal_production,
  e.wind_production,
  e.gas_production,
  c.co2_emission,
  c.co2_emission / e.coal_production AS coal_carbon_intensity,
  c.co2_emission / e.wind_production AS wind_carbon_intensity,
  c.co2_emission / e.gas_production AS gas_carbon_intensity
FROM
  electricity_production e
JOIN
  co2_emissions c ON e.timestamp = c.timestamp;