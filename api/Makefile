up:
	docker compose -f docker/dev/docker-compose.yml up -d --force-recreate --remove-orphans

up-build:
	docker compose -f docker/dev/docker-compose.yml up -d --force-recreate --remove-orphans --build

down:
	docker compose -f docker/dev/docker-compose.yml down

rm-volumes:
	docker compose -f docker/dev/docker-compose.yml down -v

bash:
	docker exec -it bart.app bash
