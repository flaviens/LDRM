import sqlite3

conn = sqlite3.connect('base.db')
c = conn.cursor()

c.execute('''CREATE TABLE HOUSES
             ([generated_id] INTEGER PRIMARY KEY AUTOINCREMENT, [fullname] text, [address] text, [longitude] FLOAT, [latitude] FLOAT, [image] text, [self_rating] INT, [image_rating] INT)''')

conn.commit()

# con = sqlite3.connect('base.db')
# cursor = con.cursor()
# cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
# print(cursor.fetchall())