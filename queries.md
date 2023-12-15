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
    g.⁠ 2012 ⁠, 
    g.⁠ 2013 ⁠, 
    g.⁠ 2014 ⁠, 
    g.⁠ 2015 ⁠, 
    g.⁠ 2016 ⁠, 
    g.⁠ 2017 ⁠, 
    g.⁠ 2018 ⁠,
    e.months, 
    e.elements, 
    e.unittemp,
    e.⁠ 2011 ⁠ as temp_2011,
    e.⁠ 2012 ⁠, 
    e.⁠ 2013 ⁠, 
    e.⁠ 2014 ⁠, 
    e.⁠ 2015 ⁠, 
    e.⁠ 2016 ⁠, 
    e.⁠ 2017 ⁠, 
    e.⁠ 2018 ⁠
FROM 
    globalco2emissions_2011_2018 g
JOIN 
    environment_temperature_change_2011_2018 e ON g.country = e.country;