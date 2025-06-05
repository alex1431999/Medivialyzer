# Starts all services and we start electron outside of docker since electron
# and docker don't work very well together
docker-compose up & yarn workspace medivialyzer-electron serve