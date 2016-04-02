#!/bin/bash 

# Is the server running?

### SERVER
ip="localhost";
port=9000
app="$ip:$port"

### API INFO
new_endpoint=$1
schemaTest=$2

### HTTP METHOD TESTS

# POST
echo -e "@$schemaTest"
echo -e "Testing POST to new endpoint: ${new_endpoint}";
object=`curl -s -X POST "${app}/api/${new_endpoint}" -H'Content-Type: application/json' --data "@$schemaTest"`
echo -e "$object" | jq .

# GET
id=`echo $object | jq -r ._id`;
echo -e "Testing GET to new endpoint: ${new_endpoint}/${id}";
curl -s -X GET "${app}/api/${new_endpoint}/${id}" | jq .

# DELETE
echo -e "Testing DELETE to new endpoint: ${new_endpoint}/${id}";
curl -s -X DELETE "${app}/api/${new_endpoint}/${id}"
echo -e "Testing GET after DELETE to new endpoint: ${new_endpoint}/${id}";
curl -s "${app}/api/${new_endpoint}/${id}" | jq .

# PUT
