create table metrop.centroids as 
select
  id,
  st_centroid(geom) geom
from metrop.grid;

alter table metrop.centroids add primary key (id);
create index on metrop.centroids using gist (geom);
