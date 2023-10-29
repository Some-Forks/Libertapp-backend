#!/bin/bash
cd /app
npm run typeorm:${APP} migration:run;
npm run start:${APP}