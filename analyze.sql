-- Vuorikatu: 5973739
-- Kalasatama: 5961893

-- create index on metrop.matrix(pt_r_t);


select
  from_id id,
  |/sum(t),
  (select geom from metrop.grid where id = from_id) geom
from (
  select from_id, pt_r_t^2 t from metrop.matrix l where to_id = 5973739 and pt_r_t <= 60 and pt_r_t != -1
  union all
  select from_id, pt_r_t^2 t from metrop.matrix m where to_id = 5961893 and pt_r_t <= 60 and pt_r_t != -1
  union all
  select from_id, pt_r_t^2 t from metrop.matrix m where to_id = 5962393 and pt_r_t <= 60 and pt_r_t != -1
  union all
  select from_id, pt_r_t^2 t from metrop.matrix m where to_id = 5121893 and pt_r_t <= 60 and pt_r_t != -1
  union all
  select from_id, pt_r_t^2 t from metrop.matrix m where to_id = 5961203 and pt_r_t <= 60 and pt_r_t != -1
  union all
  select from_id, pt_r_t^2 t from metrop.matrix m where to_id = 5961483 and pt_r_t <= 60 and pt_r_t != -1
  union all
  select from_id, pt_r_t^2 t from metrop.matrix m where to_id = 5961393 and pt_r_t <= 60 and pt_r_t != -1
  union all
  select from_id, pt_r_t^2 t from metrop.matrix m where to_id = 5961810 and pt_r_t <= 60 and pt_r_t != -1
  union all
  select from_id, pt_r_t^2 t from metrop.matrix m where to_id = 5961854 and pt_r_t <= 60 and pt_r_t != -1
  union all
  select from_id, pt_r_t^2 t from metrop.matrix m where to_id = 5960893 and pt_r_t <= 60 and pt_r_t != -1
) a
group by from_id
having count(*) = 4
;