# Use the standard nodejs image as a base
FROM dockerfile/nodejs

# Install production dependencies.
ADD package.json /app/
ADD server /app/server
ADD *.js /app/
ADD *.md /app/
ADD *.mst /app/
ADD html /app/html

RUN cd /app && npm install
RUN cd /app && node generate.js

# Set working directory for the app:
WORKDIR /app

# Expose the correct port for your app. This will be picked up by "Catalogue" who
# will make sure Nginx redirects to this port. 
EXPOSE 9000

CMD node /app/server/server.js
