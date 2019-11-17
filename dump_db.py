import sqlite3

conn = sqlite3.connect("base.db")
cur = conn.cursor()
cur.execute("SELECT * FROM HOUSES")

rows = cur.fetchall()

for row in rows:
    print(row)