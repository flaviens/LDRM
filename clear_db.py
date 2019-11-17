import sqlite3

conn = sqlite3.connect('base.db')
c = conn.cursor()

c.execute('''DELETE * from HOUSES''')
c.commit()