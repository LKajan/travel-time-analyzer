
import os
from glob import glob

sql_files = [open(f'import_sql_{i}.sql', 'w') for i in range(4)]

files = glob('./HelsinkiTravelTimeMatrix2018/**/*.txt')
for i, file_path in enumerate(files):
    sql_files[i % 4].write(f"\\copy metrop.matrix FROM '{file_path}' WITH DELIMITER ';' CSV HEADER;\n")
