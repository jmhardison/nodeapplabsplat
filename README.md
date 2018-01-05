# Node App Lab Splat
Designed to consume Microsoft SQL and provide a few endpoints for load generation.

The following environment variables must exist in order for the API to work.

* PORT - Port for the API to listen on.
* SQLPORT - Port that SQL is listening on.
* SQLSERVER - Hostname or IP of SQL Server.
* SQLUSER - SQL User account. (Cannot be Windows user, local SQL user.)
* SQLPASS - SQL User Password.
* SQLDB - DB Name

## Consuming
A status endpoint is available once launched:

* `/v1/status` - Will return a status of running if successful.
  * `"status": "running"`

* `/v1/splat` - Will create a new splat in the database and return information.


## Running Docker

To launch this API with docker, use the following. You may swap in a docker environment file if you choose, replacing values with real values.
`docker run -d -p 3001:3001 -e "SQLPORT=1433" -e "SQLSERVER=172.0.0.1" -e "SQLUSER=username" -e "SQLPASS=userpassword" -e "SQLDB=dbname"`