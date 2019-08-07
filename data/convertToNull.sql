update metrop.matrix
    set walk_t = case walk_t when -1 then null else walk_t end,
    walk_d = case walk_d when -1 then null else walk_d end,
     bike_s_t = case bike_s_t when -1 then null else bike_s_t end,
     bike_f_t = case bike_f_t when -1 then null else bike_f_t end,
     bike_d = case bike_d when -1 then null else bike_d end,
     pt_r_tt = case pt_r_tt when -1 then null else pt_r_tt end,
     pt_r_t = case pt_r_t when -1 then null else pt_r_t end,
     pt_r_d = case pt_r_d when -1 then null else pt_r_d end,
     pt_m_tt = case pt_m_tt when -1 then null else pt_m_tt end,
     pt_m_t = case pt_m_t when -1 then null else pt_m_t end,
     pt_m_d = case pt_m_d when -1 then null else pt_m_d end,
     car_r_t = case car_r_t when -1 then null else car_r_t end,
     car_r_d = case car_r_d when -1 then null else car_r_d end,
     car_m_t = case car_m_t when -1 then null else car_m_t end,
     car_m_d = case car_m_d when -1 then null else car_m_d end,
     car_sl_t = case car_sl_t when -1 then null else car_sl_t end
where
  walk_t = -1
  or walk_d =  -1
  or bike_s_t = -1
  or bike_f_t = -1
  or bike_d =  -1
  or pt_r_tt = -1
  or pt_r_t =  -1
  or pt_r_d =  -1
  or pt_m_tt = -1
  or pt_m_t =  -1
  or pt_m_d =  -1
  or car_r_t = -1
  or car_r_d = -1
  or car_m_t = -1
  or car_m_d = -1
  or car_sl_t = -1
;
