node:
	docker run -p 3000:3000 --mount type=bind,source=$(CURDIR)/app/src,target=/app --name node node:latest

build:
	docker build -t mynode:latest ./


mynode:
	docker run -d -p 3000:3000 --mount type=bind,source=$(CURDIR)/app,target=/app --name mynode mynode:latest

mysql:
	docker run -d -e MYSQL_ROOT_PASSWORD=root --mount type=bind,source=$(CURDIR)/db,target=/var/lib/mysql --name db mysql:latest

mysqlsh:
	docker exec -it db bash
	
rm:
	docker rm mynode

dcup:
	docker compose up -d $1

dcstop:
	docker compose stop

dcbash:
	docker compose exec -it mynode bash

dcrm:
	docker compose rm -f mynode nginx db

ndb:
	mysql -h 127.0.0.1 -P 3306 -u root -p

dclogs:
	docker compose logs $1

prune:
	docker system prune -af

test-post:
	curl --request POST localhost:8080/people && echo
	curl -d '[{"name":"persike"}, {"name":"thorSM"}]' -H "Content-Type: application/json" -X POST http://localhost:8080/people && echo
	curl -d '{ "name": "persike", "age": "18" }' -H "Content-Type: application/json" -X POST http://localhost:8080/people && echo
	curl -d '{}' -H "Content-Type: application/json" -X POST http://localhost:8080/people && echo
	curl -d '[]' -H "Content-Type: application/json" -X POST http://localhost:8080/people && echo

test-get:
	curl localhost:8080/ && echo
	curl localhost:8080/people && echo
