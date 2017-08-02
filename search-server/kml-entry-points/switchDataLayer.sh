#!/usr/bin/env bash

if [ "$1" = "disable-search" ]; then
	echo "disabling search..."
	curl -sS 'http://localhost:5000/search-disable'
	exit 0
fi

echo "enabling search..."
curl -sS 'http://localhost:5000/search-enable'

echo "switch data layer..."
cat $1 > slave.kml
open slave.kml &
