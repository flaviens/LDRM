import sqlite3

conn = sqlite3.connect('base.db')
c = conn.cursor()

c.execute('''CREATE TABLE HOUSES
             ([generated_id] INTEGER PRIMARY KEY AUTO_INCREMENT, [fullname] text, [address] integer, [longitude] FLOAT, [latitude] FLOAT, [Date] date)''')

conn.commit()