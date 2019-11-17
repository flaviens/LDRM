import sqlite3

ans = input("Are you sure you want to clear the database? (yes/no) ")
print(ans)
if ans:
    conn = sqlite3.connect('base.db')
    c = conn.cursor()

    c.execute('''DROP TABLE HOUSES''')
    rows = c.fetchall()

    print("Done, all clear.")

else:
    print("Aborting")
    exit(0)


    