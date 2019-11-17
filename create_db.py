import sqlite3

conn = sqlite3.connect('base.db')
c = conn.cursor()

c.execute('''CREATE TABLE HOUSES
             ([generated_id] INTEGER PRIMARY KEY AUTOINCREMENT, [fullname] text, [address] text, [comment] text, [longitude] DOUBLE, [latitude] DOUBLE, [image] text, [image_rating] INT, [haswater] VARCHAR(5), [haselectricity] VARCHAR(5))''')

conn.commit()

# con = sqlite3.connect('base.db')
# cursor = con.cursor()
# cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
# print(cursor.fetchall())