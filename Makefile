up:
	docker compose -f docker/dev/docker-compose.yml up -d --force-recreate --remove-orphans

up-build:
	docker compose -f docker/dev/docker-compose.yml up -d --force-recreate --remove-orphans --build

down:
	docker compose -f docker/dev/docker-compose.yml down

rm-volumes:
	docker compose -f docker/dev/docker-compose.yml down -v

api-bash:
	docker exec -it bart.api bash

client-bash:
	docker exec -it bart.client bash

caddy-reload:
	docker exec -w /etc/caddy bart.caddy caddy reload

caddy-fmt:
	docker exec -w /etc/caddy bart.caddy caddy fmt --overwrite
