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
