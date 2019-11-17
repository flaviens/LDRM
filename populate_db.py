green_latitudes = []
green_longitudes = []

with open("Green.csv") as greenFile:
    for line in greenFile.readlines():
        green_latitude, green_longitude = line.split(';')
        green_latitudes.append(float(green_latitude))
        green_longitudes.append(float(green_longitude))

yellow_latitudes = []
yellow_longitudes = []

with open("Yellow.csv") as yellowFile:
    for line in yellowFile.readlines():
        yellow_latitude, yellow_longitude = line.split(';')
        yellow_latitudes.append(float(yellow_latitude))
        yellow_longitudes.append(float(yellow_longitude))

red_latitudes = []
red_longitudes = []

with open("Red.csv") as redFile:
    for line in redFile.readlines():
        red_latitude, red_longitude = line.split(';')
        red_latitudes.append(float(red_latitude))
        red_longitudes.append(float(red_longitude))

import sqlite3

conn = sqlite3.connect("base.db")
cur = conn.cursor()

for i in range(len(green_latitudes)):
    cur.execute("INSERT INTO HOUSES VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", ("Unknown", "Unknown", "None", green_longitudes[i], green_latitudes[i], "", "Green", "1.0", "NA", "NA"))

for i in range(len(yellow_latitudes)):
    cur.execute("INSERT INTO HOUSES VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", ("Unknown", "Unknown", "None", yellow_longitudes[i], yellow_latitudes[i], "", "Yellow", "1.0", "NA", "NA"))

for i in range(len(red_latitudes)):
    cur.execute("INSERT INTO HOUSES VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", ("Unknown", "Unknown", "None", red_longitudes[i], red_latitudes[i], "", "Red", "1.0", "NA", "NA"))

conn.commit()