#!/usr/bin/env bash

hbshed clean install generate-sources

#Need 'npm ln' in 3 projects concerned
npm ln flexio-nodes-reconciliation
npm ln hotballoon
npm ln @flexio-oss/atmosphere-layers
