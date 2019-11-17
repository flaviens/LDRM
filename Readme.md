# LDRM

## Abstract

## How to use

### Creating and populating the data

First, the database has to be cleared to make sure that it contains no old unwanted data. It can be populated with data that is respectively present in the Green.csv, Yellow.csv and Red.csv files.

```python3
# This requires a Python 3 installation.

python3 clear_db
python3 create_db
python3 populate_db # To populate the database with the test scenario
```

### Running the server


```bash
sudo apt install nodejs
sudo apt install npm
```

```bash
npm install
node index.js
```

If the last command fails, then it may indicate additional dependencies.

### Using the application

Remark: For the moment, images must be placed in the folder _public/images_.

To run the application, just run the server on localhost (or remote server) on specified port (8080 by default).

There are 3 main pages:
* **Damage reporting (default)**: Is a form to let the user enter the damage in his house.
* **Success/damage estimation**: Provides some feedback to the user. Pops when damage is reported.
* **Damage map**: Provides visual data on the destroyed zones.

## How it works

The application stores all the data in a SQL database (local for the moment) in a single table under the scheme:

```
[generated_id] INTEGER PRIMARY KEY AUTOINCREMENT, [fullname] text, [address] text, [comment] text, [longitude] DOUBLE, [latitude] DOUBLE, [image] VARCHAR(100), [image_class] FLOAT, [image_confidence] INT, [haswater] VARCHAR(5), [haselectricity] VARCHAR(5)
```

Once the user has entered data, for usage ease:
* The photo is being sent to the **IBM** computer vision service for labelling estimation between {green, yellow, red}.
* The address is sent to the LocationIQ API to get the coordinates.

Then, some feedback is provided, and the data is added to the global map.

**To use the map**, first press the respective button to load the data, then press the button to display them.