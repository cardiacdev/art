ARG PHP_VERSION=8.2

FROM ubuntu:focal
ARG PHP_VERSION
ENV PHP_VERSION $PHP_VERSION
RUN PHP_MAJOR_VERSION=$(echo $PHP_VERSION | cut -d'.' -f1)

# Add S6 supervisor (for graceful stop)
ADD https://github.com/just-containers/s6-overlay/releases/download/v2.2.0.3/s6-overlay-amd64.tar.gz /tmp/
RUN tar xzf /tmp/s6-overlay-amd64.tar.gz -C / --exclude="./bin" && \
    tar xzf /tmp/s6-overlay-amd64.tar.gz -C /usr ./bin
ENTRYPOINT ["/init"]
CMD []

# Disable frontend dialogs
ENV DEBIAN_FRONTEND noninteractive
ENV NODE_VERSION 20

# Add ppa, curl and syslogd
RUN apt-get update && \
    apt-get install -y ca-certificates curl gnupg inetutils-syslogd software-properties-common && \
    # nginx-Quelle hinzufügen und GPG-Key importieren
    echo "deb https://nginx.org/packages/ubuntu/ focal nginx" >> /etc/apt/sources.list.d/nginx.list && \
    echo "deb-src https://nginx.org/packages/ubuntu/ focal nginx" >> /etc/apt/sources.list.d/nginx.list && \
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys ABF5BD827BD9BF62 && \
    # PHP und die restlichen Pakete installieren
    LC_ALL=C.UTF-8 apt-add-repository ppa:ondrej/php -y && \
    apt-get update && \
    apt-get install -y \
    php${PHP_VERSION}-fpm \
    php${PHP_VERSION}-curl \
    php${PHP_VERSION}-cli \
    php${PHP_VERSION}-intl \
    php${PHP_VERSION}-mysql \
    php${PHP_VERSION}-pgsql \
    php${PHP_VERSION}-xml \
    php${PHP_VERSION}-bcmath \
    php${PHP_VERSION}-mbstring \
    php-ast \
    php${PHP_VERSION}-zip \
    php${PHP_VERSION}-sqlite3 \
    php${PHP_VERSION}-apcu \
    php${PHP_VERSION}-gd \
    php${PHP_VERSION}-xdebug \
    ssh \
    git \
    zip \
    unzip \
    curl \
    nano \
    htop \
    nginx && \
    # PHP-CLI-Exectutable "verfügbar" machen
    mkdir -p /run/php && chmod -R 755 /run/php && \
    # nginx konfigurieren
    echo "daemon off;" >> /etc/nginx/nginx.conf && \
    # PHP konfigurieren
    sed -i -e 's|.*listen =.*|listen=9000|g' \
        -i -e 's|.*access.log =.*|access.log=/proc/self/fd/2|g' \
        -i -e 's|.*user =.*|user=root|g' \
        -i -e 's|.*group =.*|group=root|g'  \
        -i -e "s/;catch_workers_output\s*=\s*yes/catch_workers_output = yes/g" \
        -i -e 's#.*clear_env.*#clear_env=no#g' /etc/php/${PHP_VERSION}/fpm/pool.d/www.conf && \
    sed -i 's|.*error_log =.*|error_log=/proc/self/fd/2|g' /etc/php/${PHP_VERSION}/fpm/php-fpm.conf && \
    sed -i 's#.*variables_order.*#variables_order=EGPCS#g' /etc/php/${PHP_VERSION}/fpm/php.ini

# Node.js installieren
RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_VERSION.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update -y && \
    apt-get install -y nodejs

RUN if [ "$PHP_MAJOR_VERSION" = "7" ]; then \
        apt-get install -y \
        php${PHP_VERSION}-json \
        apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/* \
    else \
        apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/* \
    ; fi

# PHP-Version Switchen (da Ubuntu evtl. schon eine abweichende Version mitliefert)
# siehe auch https://stackoverflow.com/a/42619419
RUN update-alternatives --set php /usr/bin/php${PHP_VERSION} && \
    update-alternatives --set phar /usr/bin/phar${PHP_VERSION} && \
    update-alternatives --set phar.phar /usr/bin/phar.phar${PHP_VERSION}

# Prozess zum Starten des Webservers
COPY start-nginx.sh /etc/services.d/nginx/run
RUN chmod 755 /etc/services.d/nginx/run

# Prozess für PHP-fpm
COPY start-fpm.sh /etc/services.d/php_fpm/run
RUN chmod 755 /etc/services.d/php_fpm/run

# Composer installieren und erlauben als Root ausgeführt zu werden
COPY --from=composer /usr/bin/composer /usr/bin/composer
COPY --from=composer:1 /usr/bin/composer /usr/bin/composer1
ENV COMPOSER_ALLOW_SUPERUSER "1"

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
