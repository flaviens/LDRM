import sqlite3

conn = sqlite3.connect('base.db')
c = conn.cursor()

c.execute('''CREATE TABLE HOUSES
             ([generated_id] INTEGER PRIMARY KEY AUTOINCREMENT, [fullname] text, [address] text, [comment] text, [longitude] DOUBLE, [latitude] DOUBLE, [image] VARCHAR(100), [image_class] FLOAT, [image_confidence] INT, [haswater] VARCHAR(5), [haselectricity] VARCHAR(5))''')

conn.commit()
