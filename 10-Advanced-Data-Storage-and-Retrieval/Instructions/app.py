import numpy as np
import datetime as dt
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Measurement = Base.classes.measurement
Station = Base.classes.station

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)



#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/(start)<br/>"
        f"/api/v1.0/(start)/(end)<br/>"
    )


@app.route("/api/v1.0/percipation")
def percip():
    
    # List all routes that are available.
    # /api/v1.0/precipitation
    # Convert the query results to a Dictionary using date as the key and prcp as the value.
    # Return the JSON representation of your dictionary.

    # Calculate the date 1 year ago from the last data point in the database
    final_date = session.query(Measurement.date).order_by(Measurement.date.desc()).first()[0]
    # print(final_date)
    year = final_date[:4]
    # print(year)
    year = int(year)-1
    # print(year)
    year = str(year)

    first_date = year + final_date[4:]
   
    
    # Perform a query to retrieve the data and precipitation scores
    percip_data = session.query(Measurement.date, Measurement.prcp).filter(Measurement.date >= first_date).all()
    
    percip_list = []
    for date, prcp in percip_data:
        percip_list.append({date:prcp})
        date1 = date
        percip1 = percip
    print(percip_list)
    
    
    
#     percip_list = []
#     for percip, date in percip_data:
#         percip_dict = {}
#         percip_dict(date) = percip
#         percip_list.append(percip_dict)
        
        
        
    
    return jsonify([{date1:percip1}])

@app.route("/api/v1.0/stations")
def stations():
    
    # /api/v1.0/stations

# Return a JSON list of stations from the dataset.


    return jsonify()


@app.route("/api/v1.0/tobs")
def tobs():
    
    # /api/v1.0/tobs

# query for the dates and temperature observations from a year from the last data point.
# Return a JSON list of Temperature Observations (tobs) for the previous year.

    return jsonify()

@app.route("/api/v1.0/<start>")
           
           # /api/v1.0/<start> and /api/v1.0/<start>/<end>

# Return a JSON list of the minimum temperature, the average temperature, and the max temperature for a given start or start-end range.>")
def start(start):

    return jsonify()

@app.route("/api/v1.0/<start>/<end>")
def end(start,end):
           
           # When given the start only, calculate TMIN, TAVG, and TMAX for all dates greater than and equal to the start date.

# When given the start and the end date, calculate the TMIN, TAVG, and TMAX for dates between the start and end date inclusive.

    return jsonify()


if __name__ == '__main__':
    app.run(debug=True)
