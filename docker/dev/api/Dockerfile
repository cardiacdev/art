FROM docker.boewa-software.de/boewa-software/gitlab-ci/php-nginx-dev:8.1

# Weitere Pakete installieren
RUN apt-get clean && apt-get update
RUN apt-get install -y make php8.1-gd php8.1-pgsql php8.1-xdebug --option=Dpkg::Options::=--force-confdef

# Dateisystem von unnötigem Balast befreien
RUN apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/*

# SSL Zertifikat für Nginx
RUN mkdir -p /etc/nginx/ssl/ \
    && openssl req \
            -x509 \
            -subj "/C=US/ST=Denial/L=Nowhere/O=Dis" \
            -nodes \
            -days 365 \
            -newkey rsa:2048 \
            -keyout /etc/nginx/ssl/nginx.key \
            -out /etc/nginx/ssl/nginx.cert

# Nginx-Konfiguration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# PHP-Konfiguration
RUN sed -i 's#.*error_log.*#error_log=/var/www/app/var/log/php/errors.log#g' /etc/php/${PHP_VERSION}/fpm/php.ini && \
    sed -i 's#.*error_log.*#error_log=/var/www/app/var/log/php/errors.log#g' /etc/php/${PHP_VERSION}/cli/php.ini && \
    sed -i 's#.*max_execution_time.*#max_execution_time=1800#g' /etc/php/${PHP_VERSION}/fpm/php.ini && \
    sed -i 's#.*max_execution_time.*#max_execution_time=1800#g' /etc/php/${PHP_VERSION}/cli/php.ini && \
    sed -i 's#.*upload_max_filesize.*#upload_max_filesize=64M#g' /etc/php/${PHP_VERSION}/fpm/php.ini && \
    sed -i 's#.*upload_max_filesize.*#upload_max_filesize=64M#g' /etc/php/${PHP_VERSION}/cli/php.ini && \
    sed -i 's#.*zend.assertions.*#zend.assertions=1#g' /etc/php/${PHP_VERSION}/fpm/php.ini && \
    sed -i 's#.*zend.assertions.*#zend.assertions=1#g' /etc/php/${PHP_VERSION}/cli/php.ini && \
    sed -i 's#.*memory_limit.*#memory_limit=3G#g' /etc/php/${PHP_VERSION}/fpm/php.ini && \
    sed -i 's#.*memory_limit.*#memory_limit=3G#g' /etc/php/${PHP_VERSION}/cli/php.ini

WORKDIR /var/www/app
