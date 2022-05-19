nodesh:
	docker exec -it node bash

node:
	docker run -p 3000:3000 --mount type=bind,source=$(CURDIR)/app/src,target=/app --name node node:latest

build:
	docker build -t mynode:latest ./

mynodesh:
	docker exec -it mynode bash

mynode:
	docker run -d -p 3000:3000 --mount type=bind,source=$(CURDIR)/app,target=/app --name mynode mynode:latest

mysql:
	docker run -d -e MYSQL_ROOT_PASSWORD=root --mount type=bind,source=$(CURDIR)/db,target=/var/lib/mysql --name db mysql:latest

mysqlsh:
	docker exec -it db bash
	
rm:
	docker rm mynode

comp:
	docker-compose up -d $1

scomp:
	docker-compose stop

test-post:
	curl --request POST localhost:3000/people
	echo
	curl -d '[{"name":"persike"}, {"name":"thorSM"}]' -H "Content-Type: application/json" -X POST http://localhost:3000/people
	echo
	curl -d '{ "name": "persike", "age": "18" }' -H "Content-Type: application/json" -X POST http://localhost:3000/people
	echo
	curl -d '{}' -H "Content-Type: application/json" -X POST http://localhost:3000/people
	echo
	curl -d '[]' -H "Content-Type: application/json" -X POST http://localhost:3000/people

test-get:
	curl localhost:3000/
	echo
	curl localhost:3000/people
	echo
