up:
	docker compose -f docker/dev/docker-compose.yml up -d --force-recreate --remove-orphans

up-build:
	docker compose -f docker/dev/docker-compose.yml up -d --force-recreate --remove-orphans --build

down:
	docker compose -f docker/dev/docker-compose.yml down

rm-volumes:
	docker compose -f docker/dev/docker-compose.yml down -v

api-bash:
	docker exec -it art.api bash

client-bash:
	docker exec -it art.client bash

caddy-reload:
	docker exec -w /etc/caddy art.caddy caddy reload

caddy-fmt:
	docker exec -w /etc/caddy art.caddy caddy fmt --overwrite
