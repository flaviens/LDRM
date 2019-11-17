import sqlite3

conn = sqlite3.connect('base.db')
c = conn.cursor()

c.execute('''SELECT * from HOUSES''')
rows = c.fetchall()

for row in rows:
    print(row)

conn.commit()