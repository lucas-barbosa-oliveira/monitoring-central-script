#!/bin/bash

ping 192.168.3.2 &

cd $1/../applications/monitoring-central/openice/bin
./OpenICE
